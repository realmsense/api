import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as fs from "fs";
import { Repository } from "typeorm";
import { Permission } from "../../shared/src";
import { User } from "../users/interfaces/user.entity";
import { Build } from "./interfaces/build.entity";
import { BuildType, CreateBuildTypeDTO } from "./interfaces/build_type.entity";


@Injectable()
export class BuildsService {

    constructor(
        @InjectRepository(Build)
        private buildsRepository: Repository<Build>,
        @InjectRepository(BuildType)
        private buildsTypesRepository: Repository<BuildType>,
    ) { }

    public async create(build: Build): Promise<Build> {
        if (!fs.existsSync(build.file_path)) {
            throw new ConflictException(`Unable to find the build's file path: '${build.file_path}'. Make sure it is uploaded before creating the build.`);
        }

        // TODO: should be sending build type as a JSON object... maybe
        const buildTypeName = build.type as unknown as string;
        const buildType = await this.findBuildType(buildTypeName);
        if (!buildType) {
            throw new ConflictException(`Unable to find Build Type '${buildTypeName}'`);
        }

        await this.buildsRepository.insert(build);
        return build;
    }

    public async getBuildFile(user: User, buildId: number): Promise<fs.ReadStream> {
        const build = await this.getBuild(user, buildId);
        if (!build) {
            throw new NotFoundException(`No build found with ID ${buildId}`);
        }

        if (!fs.existsSync(build.file_path)) {
            throw new InternalServerErrorException(`File not found for build '${build.name}'`);
        }

        return fs.createReadStream(build.file_path);
    }

    public async disable(user: User, buildId: number): Promise<Build> {
        const build = await this.getBuild(user, buildId);
        if (!build) {
            throw new NotFoundException(`No build found with ID ${buildId}`);
        }

        build.enabled = false;
        return this.buildsRepository.save(build);
    }

    public getAllBuilds(): Promise<Build[]> {
        return this.buildsRepository.find();
    }

    private async getAvailableBuilds(user: User): Promise<Build[]> {
        let builds: Build[] = [];

        // Private Testing
        if (user.permissions.includes(Permission.PRIVATE_TESTING)) {
            const privateTestingBuilds = await this.buildsRepository.find({ where: { type: { name: "Private Testing" }, enabled: true } });
            builds = [...builds, ...privateTestingBuilds];
        }

        // Paid Builds
        if (
            // TODO: check if user has an active subscription, or if they are bypassing the check.
            user.permissions.includes(Permission.BYPASS_SUBSCRIPTION)
        ) {
            const stableBuilds = await this.buildsRepository.find({ where: { type: { name: "Stable" }, enabled: true } });
            builds = [...builds, ...stableBuilds];

            const testingBuilds = await this.buildsRepository.find({ where: { type: { name: "Testing" }, enabled: true } });
            builds = [...builds, ...testingBuilds];
        }

        // Free Trial
        const freeTrialBuilds = await this.buildsRepository.find({ where: { type: { name: "Free Trial" }, enabled: true } });
        builds = [...builds, ...freeTrialBuilds];

        // Remove Webhooks from non admins
        if (!user.permissions.includes(Permission.MANAGE_BUILDS)) {
            for (const build of builds) {
                //@ts-ignore
                delete build.type.webhook_url;
                //@ts-ignore
                delete build.type.embed_template;
            }
        }

        return builds;
    }

    public async getBuilds(user: User): Promise<Build[]> {
        return this.getAvailableBuilds(user);
    }

    public async getBuild(user: User, id: number): Promise<Build | undefined> {
        const builds = await this.getAvailableBuilds(user);
        for (const build of builds) {
            if (build.id == id) {
                return build;
            }
        }
        return undefined;
    }

    public createType(createBuildType: CreateBuildTypeDTO): void {
        const buildType: BuildType = {
            ...createBuildType,
            builds: []
        };

        this.buildsTypesRepository.insert(buildType);
    }

    public findAllBuildTypes(): Promise<BuildType[]> {
        return this.buildsTypesRepository.find();
    }

    public findBuildType(name: string): Promise<BuildType | undefined> {
        return this.buildsTypesRepository.findOne({ name });
    }
}
