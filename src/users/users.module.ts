import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "./interfaces/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [UsersService],
    controllers: [UsersController],
    providers: [
        UsersService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    ],
})
export class UsersModule { }
