import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, ParseIntPipe, Post, Put, Query, Res, UploadedFile, UseInterceptors, Request } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { BuildsService } from "./builds.service";
import { Build } from "./interfaces/build.entity";
import { Response } from "express";
import { RequirePermission } from "../auth/permissions/permission.decorator";
import { BuildType, CreateBuildTypeDTO } from "./interfaces/build_type.entity";
import { Permission } from "@realmsense/types";

@Controller("builds")
export class BuildsController {

    constructor(private buildsService: BuildsService) { }

    @Put("upload")
    @RequirePermission(Permission.MANAGE_BUILDS)
    @HttpCode(201)
    @UseInterceptors(
        FileInterceptor("file", { storage: diskStorage({ destination: "./build_uploads" }) })
    )
    public async upload(@UploadedFile() file: Express.Multer.File): Promise<Express.Multer.File> {
        if (!file)
            throw new HttpException("Missing File", HttpStatus.UNPROCESSABLE_ENTITY);

        return file;
    }

    @Post("create")
    @RequirePermission(Permission.MANAGE_BUILDS)
    public async create(@Body() build: Build): Promise<Build> {
        return this.buildsService.create(build);
    }

    @Post("disable")
    @RequirePermission(Permission.MANAGE_BUILDS)
    public async disable(
        @Request() request: any,
        @Query("id", ParseIntPipe) id: number
    ): Promise<Build> {
        return this.buildsService.disable(request.user, id);
    }

    @Get("download")
    public async download(
        @Query("id", ParseIntPipe) buildId: number,
        @Request() request: any,
        @Res() response: Response
    ): Promise<void> {
        const data = await this.buildsService.getBuildFile(request.user, buildId);
        data.pipe(response);
    }

    @Get()
    public async find(
        @Request() request: any,
        @Query("id", ParseIntPipe) id: number
    ): Promise<Build> {
        return this.buildsService.getBuilds(request.user, id);
    }

    @Get("all")
    @RequirePermission(Permission.MANAGE_BUILDS)
    public async findAll(): Promise<Build[]> {
        return this.buildsService.getAllBuilds();
    }

    @Get("enabled")
    public async findEnabled(
        @Request() request: any,
    ): Promise<Build[]> {
        return this.buildsService.getBuilds(request.user);
    }

    // Build Types
    @Post("createType")
    @RequirePermission(Permission.MANAGE_BUILDS)
    public async createType(@Body() buildType: CreateBuildTypeDTO): Promise<void> {
        return this.buildsService.createType(buildType);
    }

    @Get("types")
    public async findAllBuildTypes(): Promise<BuildType[]> {
        return this.buildsService.findAllBuildTypes();
    }

    @Get("type")
    public async findType(@Query("name") name: string): Promise<BuildType> {
        console.log(name);
        return this.buildsService.findBuildType(name);
    }

}
