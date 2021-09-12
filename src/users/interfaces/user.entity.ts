import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Permission } from "src/auth/permissions/permission.enum";

@Entity()
export class User {
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
