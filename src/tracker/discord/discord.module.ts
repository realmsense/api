import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../users/interfaces/user.entity";
import { PlayersModule } from "../players/players.module";
import { RealmsModule } from "../realms/realms.module";
import { DiscordController } from "./discord.controller";
import { DiscordService } from "./discord.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PlayersModule,
        RealmsModule
    ],
    exports: [DiscordService],
    controllers: [DiscordController],
    providers: [
        DiscordService
    ],
})
export class DiscordModule { }
