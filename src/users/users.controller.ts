import { Body, Controller, Get, ParseIntPipe, Put, Query, Request } from "@nestjs/common";
import { RequirePermission } from "src/auth/permissions/permission.decorator";
import { User } from "./interfaces/user.entity";
import { UsersService } from "./users.service";
import { Permission } from "@realmsense/types";

@Controller("user")
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get("profile")
    public async getProfile(@Request() req: any): Promise<User> {
        return req.user;
    }

    @Get("all")
    @RequirePermission(Permission.MANAGE_USERS)
    public async getAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Put("update")
    @RequirePermission(Permission.MANAGE_USERS)
    public async update(
        @Query("id", ParseIntPipe) id :number,
        @Body() updatedUser: Partial<User>
    ): Promise<void> {
        return this.usersService.update(id, updatedUser);
    }
}
