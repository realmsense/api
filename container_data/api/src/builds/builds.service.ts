import * as fs from "fs"
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Build } from "./interfaces/build.entity";
import { BuildType, CreateBuildTypeDTO } from "./interfaces/build_type.entity";
import { User } from "src/users/interfaces/user.entity";
import { Permission } from "src/auth/permissions/permission.enum";
import { DeepPartial } from "src/helpers";

@Injectable()
export class BuildsService {

    constructor(
        @InjectRepository(Build)
        private buildsRepository: Repository<Build>,
        @InjectRepository(BuildType)
        private buildsTypesRepository: Repository<BuildType>,
    ) { }

    async create(build: Build) {
        if (!fs.existsSync(build.file_path)) {
            throw new ConflictException(`Unable to find the build's file path: '${build.file_path}'. Make sure it is uploaded before creating the build.`);
        }

        // TODO: should be sending build type as a JSON object... maybe
        const buildTypeName = build.type as unknown as string;
        const buildType = await this.findBuildType(buildTypeName);
        if (!buildType) {
            throw new ConflictException(`Unable to find Build Type '${buildTypeName}'`);
        }

        const insertResult = await this.buildsRepository.insert(build);
        return this.buildsRepository.findOne({id: insertResult.identifiers[0].id});
    }

    async getBuildFile(user: User, buildId: number): Promise<fs.ReadStream> {
        const build = await this.getBuilds(user, buildId);
        if (!build) {
            throw new NotFoundException(`No build found with ID ${buildId}`);
        }

        if (!fs.existsSync(build.file_path)) {
            throw new InternalServerErrorException(`File not found for build '${build.name}'`);
        }

        return fs.createReadStream(build.file_path);
    }

    async disable(user: User, buildId: number): Promise<Build> {
        const build = await this.getBuilds(user, buildId);
        if (!build) {
            throw new NotFoundException(`No build found with ID ${buildId}`);
        }

        build.enabled = false;
        return this.buildsRepository.save(build);
    }

    getAllBuilds() {
        return this.buildsRepository.find();
    }


    async getBuilds(user: User): Promise<Build[]>;
    async getBuilds(user: User, id: number): Promise<Build>;
    async getBuilds(user: User, id: number = undefined): Promise<Build[] | Build> {

        const searchBuild: DeepPartial<Build> = {
            type: { name: "" },
            enabled: true
        };

        if (id != undefined) {
            searchBuild.id = id;
        }

        let builds: Build[] = [];

        // Private Testing
        if (user.permissions.includes(Permission.PRIVATE_TESTING)) {
            searchBuild.type.name = "Private Testing";
            const privateTestingBuilds = await this.buildsRepository.find(searchBuild);
            builds = [...builds, ...privateTestingBuilds];
        }

        // Paid Builds
        if (
            user.permissions.includes(Permission.BYPASS_SUBSCRIPTION)
            // TODO: Check if user has an active subscription
        ) {
            searchBuild.type.name = "Stable";
            const stableBuilds = await this.buildsRepository.find(searchBuild);
            builds = [...builds, ...stableBuilds];

            searchBuild.type.name = "Testing";
            const testingBuilds = await this.buildsRepository.find(searchBuild);
            builds = [...builds, ...testingBuilds];
        }

        // Free Trial
        searchBuild.type.name = "Free Trial";
        const freeTrialBuilds = await this.buildsRepository.find(searchBuild);
        builds = [...builds, ...freeTrialBuilds];

        if (!user.permissions.includes(Permission.MANAGE_BUILDS)) {
            for (const build of builds) {
                delete build.type.webhook_url;
                delete build.type.embed_template;
            }
        }

        if (id && builds.length == 1) {
            return builds[0];
        }

        return builds;
    }

    createType(createBuildType: CreateBuildTypeDTO) {
        const buildType: BuildType = {
            ...createBuildType,
            builds: []
        };

        this.buildsTypesRepository.insert(buildType);
    }

    findAllBuildTypes(): Promise<BuildType[]> {
        return this.buildsTypesRepository.find();
    }

    findBuildType(name: string): Promise<BuildType> {
        return this.buildsTypesRepository.findOne({ name });
    }
}
