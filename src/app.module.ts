import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { BuildsModule } from "./builds/builds.module";
import { DatabaseConfig } from "./db.constants";
import { PlayersModule } from "./tracker/players/players.module";
import { RealmsModule } from "./tracker/realms/realms.module";
import { UsersModule } from "./users/users.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(DatabaseConfig),
        BuildsModule,
        AuthModule,
        UsersModule,
        RealmsModule,
        PlayersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
