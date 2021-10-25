import { IsInt, IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Database } from "../../secrets";
import { BuildType } from "./build_type.entity";

@Entity({ database: Database.Default })
export class Build {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @IsNotEmpty()
    public name: string;

    @ManyToOne(() => BuildType, buildType => buildType.builds, { eager: true })
    public type: BuildType;

    @Column()
    @IsInt()
    public file_size: number;

    @Column()
    @IsNotEmpty()
    public file_path: string;

    @Column({ default: true })
    public enabled: boolean;
}
