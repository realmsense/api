import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { GuildRank, IAccount } from "@realmsense/types";
import { Character } from "./character.entity";
import { Database } from "../../../db.constants";
import { PlayerDto } from "../dto/player.dto";

@Entity({ database: Database.Tracker })
export class Account implements IAccount {
    
    @PrimaryColumn()
    public playerID: number;

    @Column({ type: "timestamp" }) public updatedTime: Date;

    @OneToMany(() => Character, (character) => character.account, { cascade: true })
    public characters?: Character[];

    public  nameChosen    : boolean;
    @Column({ default: "None" }) public name           : string;
    @Column()                    public accountID?     : string;
    @Column({ default: true })   public supporter      : boolean;
    @Column({ default: 0 })      public supporterPoints: number;
    @Column({ default: 0 })      public numStars       : number;
    @Column({ default: 0 })      public accountFame    : number;
    @Column({ default: 0 })      public credits        : number;
    @Column({ default: 0 })      public fortuneToken   : number;
    @Column({ default: 0 })      public currentFame    : number;
    @Column({ default: 0 })      public legendaryRank  : number;
    @Column({ default: 0 })      public forgeFire      : number;
    @Column({ default: 0 })      public _119           : number;

    // Guild
    @Column({ default: "" })
    public guildName: string;
    @Column({ default: GuildRank.NoRank })
    public guildRank: GuildRank;

    constructor(playerDto?: PlayerDto) {
        if (!playerDto) return;

        this.accountID       = playerDto.accountID;
        this.updatedTime     = new Date();
        this.name            = playerDto.name;
        this.nameChosen      = playerDto.nameChosen;
        this.playerID        = playerDto.playerID;
        this.supporter       = playerDto.supporter;
        this.supporterPoints = playerDto.supporterPoints;
        this.numStars        = playerDto.numStars;
        this.accountFame     = playerDto.accountFame;
        this.credits         = playerDto.credits;
        this.fortuneToken    = playerDto.fortuneToken;
        this.currentFame     = playerDto.currentFame;
        this.legendaryRank   = playerDto.legendaryRank;
        this.forgeFire       = playerDto.forgeFire;
        this._119            = playerDto._119;
        this.guildName       = playerDto.guildName;
        this.guildRank       = playerDto.guildRank;
    }
}