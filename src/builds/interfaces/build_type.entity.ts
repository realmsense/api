import { OmitType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ENV } from "../../../shared/src";
import { Build } from "./build.entity";

@Entity({ database: ENV.Database.db.Default })
export class BuildType {

    @PrimaryColumn()
    @IsNotEmpty()
    public name: string;

    @OneToMany(() => Build, build => build.type)
    public builds: Build[];

    @Column()
    @IsNotEmpty()
    public webhook_url: string;

    @Column("longtext")
    @IsNotEmpty()
    public embed_template: string;
}

export class CreateBuildTypeDTO extends OmitType(BuildType, ["builds"] as const) {}
