
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { PermissionGuard } from "src/auth/permissions/permission.guard";
import { BuildsController } from "./builds.controller";
import { BuildsService } from "./builds.service";
import { Build } from "./interfaces/build.entity";
import { BuildType } from "./interfaces/build_type.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Build]),
        TypeOrmModule.forFeature([BuildType])
    ],
    controllers: [BuildsController],
    providers: [
        BuildsService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        },
        {
            provide: APP_GUARD,
            useClass: PermissionGuard
        },
    ],
})
export class BuildsModule { }
