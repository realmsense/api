import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Permission, IUser } from "@realmsense/types";

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    public id: number;

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
}
