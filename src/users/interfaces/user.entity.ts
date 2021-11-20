import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IUser, Permission } from "../../../shared/src";
import { ENV } from "../../../shared/src/constants/environment";
import { DiscordLink } from "./discord-link.entity";

@Entity({ database: ENV.Database.db.Customers })
export class User implements IUser {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true })
    public email?: string;

    @OneToOne(() => DiscordLink)
    @JoinColumn()
    public discordLink: DiscordLink;

    @Column()
    @IsNotEmpty()
    public username: string;

    @Column()
    @IsNotEmpty()
    public password: string;

    @Column({ type: "simple-json", default: "[]" })
    @IsNotEmpty()
    public permissions: Permission[];

    @Column({ default: true })
    public enabled: boolean;

    @Column({ type: "timestamp" })
    public createdAt: Date;

    @Column({ type: "simple-json", default: "[]" })
    @IsNotEmpty()
    public watchList: string[];
}
