import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { IPlayer, IWorldPosData, GuildRank } from "@realmsense/types";
import { Character } from "./character.entity";
import { Database } from "../../../db.constants";
import { PlayerDto } from "../dto/player.dto";

@Entity({ database: Database.Tracker })
export class Account implements Partial<IPlayer> {
    
    @PrimaryColumn()
    public playerID: number;

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

    constructor(player?: PlayerDto) {
        if (!player) return;

        this.accountID       = player.accountID;
        this.name            = player.name;
        this.nameChosen      = player.nameChosen;
        this.playerID        = player.playerID;
        this.supporter       = player.supporter;
        this.supporterPoints = player.supporterPoints;
        this.numStars        = player.numStars;
        this.accountFame     = player.accountFame;
        this.credits         = player.credits;
        this.fortuneToken    = player.fortuneToken;
        this.currentFame     = player.currentFame;
        this.legendaryRank   = player.legendaryRank;
        this.forgeFire       = player.forgeFire;
        this._119            = player._119;
        this.guildName       = player.guildName;
        this.guildRank       = player.guildRank;
    }
}