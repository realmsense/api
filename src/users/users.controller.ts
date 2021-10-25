import { Body, Controller, Get, ParseIntPipe, Post, Put, Query, Request, Res } from "@nestjs/common";
import { Response } from "express";
import { User } from "./interfaces/user.entity";
import { UsersService } from "./users.service";
import { RequirePermission } from "../auth/guards/permission.guard";
import { Permission } from "../../types/src";
import { SkipJWTAuth } from "../auth/auth.constants";
import { LinkDiscordDTO } from "./interfaces/link-discord.dto";


@Controller("user")
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) { }

    @Get("profile")
    public async getProfile(@Request() req: any): Promise<User> {
        return req.user;
    }

    @Get("link-discord")
    @SkipJWTAuth()
    public async redirectDiscordOAuth(@Res() res: Response): Promise<void> {
        return this.usersService.redirectDiscordOAuth(res);
    }

    @Post("link-discord")
    public async linkDiscord(
        @Request() req,
        @Body() linkDiscordDTO: LinkDiscordDTO
    ): Promise<void> {
        return this.usersService.linkDiscord(req.user, linkDiscordDTO.code);
    }

    @Get("all")
    @RequirePermission(Permission.MANAGE_USERS)
    public async getAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Put("update")
    @RequirePermission(Permission.MANAGE_USERS)
    public async update(
        @Query("id", ParseIntPipe) id: number,
        @Body() updatedUser: Partial<User>
    ): Promise<void> {
        return this.usersService.update(id, updatedUser);
    }
}
