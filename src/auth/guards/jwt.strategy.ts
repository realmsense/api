import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { jwtConstants } from "../constants";
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
            secretOrKey: jwtConstants.secret,
        });
    }

    public async validate(payload: JWTPayload): Promise<User> {
        const user: User = await this.usersService.findOne(payload.username);
        delete user.password;
        return user;
    }
}
