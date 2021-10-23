import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SkipJWTAuth } from "./auth.constants";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RegisterUserDto } from "./models/register-user.dto";
import { IAuthToken } from "../../types/src";
import { ChangePasswordDTO } from "./models/change-password-dto";

@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("login")
    @SkipJWTAuth()
    @UseGuards(LocalAuthGuard)
    public async login(@Request() req): Promise<IAuthToken> {
        return this.authService.login(req.user);
    }

    @Post("changePassword")
    public async changePassword(
        @Request() req,
        @Body() changePasswordDTO: ChangePasswordDTO
    ): Promise<boolean> {
        return await this.authService.changePassword(req.user, changePasswordDTO.oldPassword, changePasswordDTO.newPassword);
    }

    @Post("register")
    @SkipJWTAuth()
    public async register(@Body() registerUserDto: RegisterUserDto): Promise<void> {
        return this.authService.register(registerUserDto.username, registerUserDto.password);
    }
}
