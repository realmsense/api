
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
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
        BuildsService
    ],
})
export class BuildsModule { }
