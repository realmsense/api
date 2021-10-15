import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../users/interfaces/user.entity";
import { Account } from "./entities/account.entity";
import { Character } from "./entities/character.entity";
import { PlayersController } from "./players.controller";
import { PlayersService } from "./players.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Account]),
        TypeOrmModule.forFeature([Character]),
        TypeOrmModule.forFeature([User]),
    ],
    exports: [PlayersService],
    controllers: [PlayersController],
    providers: [
        PlayersService
    ],
})
export class PlayersModule { }
