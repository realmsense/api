import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ENV } from "../shared/src/constants/environment";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { AuthKeyGuard } from "./auth/guards/authkey.guard";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { PermissionGuard } from "./auth/guards/permission.guard";
import { BuildsModule } from "./builds/builds.module";
import { DiscordModule } from "./tracker/discord/discord.module";
import { PlayersModule } from "./tracker/players/players.module";
import { RealmsModule } from "./tracker/realms/realms.module";
import { UsersModule } from "./users/users.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(ENV.Database.config),
        BuildsModule,
        AuthModule,
        UsersModule,
        RealmsModule,
        PlayersModule,
        DiscordModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        },
        {
            provide: APP_GUARD,
            useClass: PermissionGuard
        },
        {
            provide: APP_GUARD,
            useClass: AuthKeyGuard
        },
    ],
})
export class AppModule { }
