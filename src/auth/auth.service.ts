import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { IAuthToken } from "../../shared/src";
import { ENV } from "../../shared/src/constants/environment";
import { User } from "../users/interfaces/user.entity";
import { UsersService } from "../users/users.service";


@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    public async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.usersService.findOne({ username });
        if (user && bcrypt.compareSync(password, user.password)) {
            // @ts-ignore
            delete user.password; // remove password from user
            return user;
        }
        return null;
    }

    public async login(user: User): Promise<IAuthToken> {
        const payload = { username: user.username, sub: user.id };
        const timestamp = Math.floor(Date.now() / 1000);
        const authToken: IAuthToken = {
            token: this.jwtService.sign(payload),
            expiration: timestamp + ENV.JWT.Expiration
        };
        return authToken;
    }

    public async changePassword(user: User, oldPassword: string, newPassword: string): Promise<boolean> {
        const validOldPass = await this.validateUser(user.username, oldPassword);
        if (!validOldPass) {
            return false;
        }

        user.password = await this.hashPassword(newPassword);
        await this.usersService.update(user.id, user);
        return true;
    }

    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    public async register(username: string, email: string, password: string): Promise<void> {

        // Validate inputs

        // Username characters must only be letters and numbers
        const alphanumeric = /^[a-z0-9]+$/i;
        if (!alphanumeric.test(username)) {
            throw new HttpException("Username contains invalid characters. (Please use an alphanumeric string)", HttpStatus.BAD_REQUEST);
        }

        // Username length
        const MAX_USERNAME_LENGTH = 32;
        if (username.length > MAX_USERNAME_LENGTH) {
            throw new HttpException(`Username is too long. (Max ${MAX_USERNAME_LENGTH} characters)`, HttpStatus.BAD_REQUEST);
        }

        // https://en.wikipedia.org/wiki/Bcrypt#Maximum_password_length - (72 bytes == 72 chars)
        const MAX_PASSWORD_LENGTH = 72;
        if (password.length > MAX_PASSWORD_LENGTH) {
            throw new HttpException(`Password is too long. (Max ${MAX_PASSWORD_LENGTH} characters)`, HttpStatus.BAD_REQUEST);
        }

        // Username must be unique
        const existingUsername = await this.usersService.findOne({ username });
        if (existingUsername) {
            throw new HttpException(`Username "${username}" already in use!`, HttpStatus.CONFLICT);
        }

        // Email must be unique
        const existingEmail = await this.usersService.findOne({ email });
        if (existingEmail) {
            throw new HttpException(`Email "${email}" already in use!`, HttpStatus.CONFLICT);
        }

        const hash = await this.hashPassword(password);

        const user = new User();
        user.username = username;
        user.email = email;
        user.password = hash;
        this.usersService.insert(user);
    }
}
