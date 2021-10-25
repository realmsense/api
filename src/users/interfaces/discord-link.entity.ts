import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IDiscordLink } from "../../../shared/src";
import { Secret } from "../../../shared/src/constants/secrets/secrets";

@Entity({ database: Secret.Database.db.Customers })
export class DiscordLink implements IDiscordLink {
    
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column() public userId: string;

    @Column() public access_token: string;
    @Column() public token_type: string;
    @Column() public expires_in: number;
    @Column() public refresh_token: string;
    @Column() public scope: string;
}
