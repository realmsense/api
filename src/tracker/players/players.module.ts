import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { User } from "../../users/interfaces/user.entity";
import { Account } from "./entities/account.entity";
import { Character } from "./entities/character.entity";
import { RealmsController } from "./players.controller";
import { PlayersService } from "./players.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Account]),
        TypeOrmModule.forFeature([Character]),
        TypeOrmModule.forFeature([User]),
    ],
    exports: [PlayersService],
    controllers: [RealmsController],
    providers: [
        PlayersService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    ],
})
export class PlayersModule { }
