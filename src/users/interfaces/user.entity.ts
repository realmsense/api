import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IUser, Permission } from "../../../shared/src";
import { Secret } from "../../../shared/src/constants/secrets/secrets";
import { DiscordLink } from "./discord-link.entity";

@Entity({ database: Secret.Database.db.Customers })
export class User implements IUser {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column()
    @IsNotEmpty()
    public email: string;
    
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
