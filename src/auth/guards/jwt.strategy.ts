import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ENV } from "../../../shared/src/constants/environment";
import { User } from "../../users/interfaces/user.entity";
import { UsersService } from "../../users/users.service";

interface JWTPayload {
    sub: number;
    username: string;
    iat: number;
    exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ENV.JWT.Secret,
        });
    }

    public async validate(payload: JWTPayload): Promise<User> {
        const user = await this.usersService.findOne({ username: payload.username }) as User;
        //@ts-ignore
        delete user.password;
        return user;
    }
}
