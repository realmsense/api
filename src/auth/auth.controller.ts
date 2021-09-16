import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SkipJWTAuth } from "./constants";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RegisterUserDto } from "./models/register-user.dto";
import { IAuthToken } from "@realmsense/types";

@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("login")
    @SkipJWTAuth()
    @UseGuards(LocalAuthGuard)
    public async login(@Request() req): Promise<IAuthToken> {
        return this.authService.login(req.user);
    }

    @Post("register")
    @SkipJWTAuth()
    public async register(@Body() registerUserDto: RegisterUserDto): Promise<void> {
        return this.authService.register(registerUserDto.username, registerUserDto.password);
    }
}
