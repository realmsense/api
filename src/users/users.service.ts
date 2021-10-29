import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { APIUser, RESTPostOAuth2AccessTokenResult, RouteBases } from "discord-api-types/v9";
import { Response } from "express";
import qs from "qs";
import { FindConditions, Repository } from "typeorm";
import { Secret } from "../../shared/src/constants/secrets/secrets";
import { DiscordLink } from "./interfaces/discord-link.entity";
import { User } from "./interfaces/user.entity";


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(DiscordLink)
        private discordLinkRepository: Repository<DiscordLink>,
    ) { }

    public redirectDiscordOAuth(res: Response): void {
        // TODO: generate and store a `state` variable
        const bruh = new URL(RouteBases.api + "/oauth2/authorize");
        bruh.searchParams.append("client_id", "880231286579527680");
        bruh.searchParams.append("redirect_uri", "http://127.0.0.1:4200/dashboard/profile/link-discord");
        bruh.searchParams.append("response_type", "code");
        bruh.searchParams.append("scope", "identify");
        res.redirect(bruh.toString());
    }

    public async linkDiscord(user: User, oauthCode: string): Promise<void> {
        // TODO: veriify `state` (also need to add to DTO)

        // Exchange oauth code for access token 
        const tokenResponse = await axios.post<RESTPostOAuth2AccessTokenResult>(RouteBases.api + "/oauth2/token",
            qs.stringify({
                "client_id"    : Secret.Discord.ClientID,
                "client_secret": Secret.Discord.ClientSecret,
                "grant_type"   : "authorization_code",
                "code"         : oauthCode,
                "redirect_uri" : Secret.Discord.RedirectURI,
            })
        ).catch((error) => {
            throw new HttpException(error.response.data.error_description, HttpStatus.BAD_REQUEST);
        });

        // Get profile
        const accessToken = tokenResponse.data;
        const profileResponse = await axios.get<APIUser>(RouteBases.api + "/users/@me", {
            headers: {
                "Authorization": `${accessToken.token_type} ${accessToken.access_token}`
            },
            validateStatus: null
        }).catch((error) => {
            throw new HttpException(error.response.data.error_description, HttpStatus.BAD_REQUEST);
        });

        const apiUser = profileResponse.data;

        // Check if userId is used by another account
        const exists = await this.discordLinkRepository.findOne({
            where: {
                userId: apiUser.id
            }
        });

        if (exists) {
            throw new HttpException("Discord account is already linked with another user!", HttpStatus.CONFLICT);
        }

        const discordLink = await this.discordLinkRepository.save({
            ...accessToken,
            userId: apiUser.id
        });

        user.discordLink = discordLink;
        await this.usersRepository.save(user);
    }

    public async findOne(search: FindConditions<User>): Promise<User | undefined> {
        return this.usersRepository.findOne({
            where: search,
            relations: ["discordLink"]
        });
    }

    public async insert(user: User): Promise<void> {
        this.usersRepository.insert(user);
    }

    public async update(id: number, updatedUser: Partial<User>): Promise<void> {
        const foundUser = await this.usersRepository.findOne({ id: id });
        if (!foundUser) {
            throw new NotFoundException(`No user found with ID ${id}`);
        }
        if (Object.keys(updatedUser).length == 0) {
            throw new BadRequestException("At least one updated value is required");
        }
        this.usersRepository.update(id, updatedUser);
    }

    public async findAll(removePass = true): Promise<User[]> {
        const users = await this.usersRepository.find();
        if (removePass) {
            //@ts-ignore
            users.forEach((user) => delete user.password);
        }
        return users;
    }
}
