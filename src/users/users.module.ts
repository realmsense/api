import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscordLink } from "./interfaces/discord-link.entity";
import { User } from "./interfaces/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([DiscordLink]),
    ],
    exports: [UsersService],
    controllers: [UsersController],
    providers: [
        UsersService
    ],
})
export class UsersModule { }
