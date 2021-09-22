import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { IsNotEmpty} from "class-validator";
import { Build } from "./build.entity";
import { OmitType } from "@nestjs/swagger";
import { Database } from "../../db.constants";

@Entity({ database: Database.Default })
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
