import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested, IsNumber, IsString } from "class-validator";
import { GuildRank, IPlayer, IWorldPosData } from "@realmsense/types";
import { WorldPosDataDTO } from "../../interfaces/worldposdata.dto";

export class PlayerDto implements IPlayer {
    @IsNumber()
    public objectID: number;
    
    @IsNumber()
    public objectType: number;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => WorldPosDataDTO)
    public pos: IWorldPosData;

    // Account Data
    @IsString()
    public name: string;
    public nameChosen: boolean;
    public accountID: string;
    public playerID: number;
    public supporter: boolean;
    public supporterPoints: number;
    public numStars: number;
    public accountFame: number;
    public credits: number;
    public fortuneToken: number;
    public currentFame: number;
    public legendaryRank: number;
    public forgeFire: number;
    public _119: number; // blueprints possibly?

    // XP
    public level: number;
    public exp: number;
    public nextLevelExp: number;
    public nextClassQuestFame: number;
    public xpBoosted: number;
    public xpTimer: number;
    public lootDropTimer: number;
    public lootTierTimer: number;

    // Guild
    public guildName: string;
    public guildRank: GuildRank;

    // Stats
    public maxHP: number;
    public hp: number;
    public maxMP: number;
    public mp: number;
    public dexterity: number;
    public attack: number;
    public defense: number;
    public vitality: number;
    public wisdom: number;
    public speed: number;

    // Stats - boost
    public boostMaxMP: number;
    public boostMaxHP: number;
    public boostDexterity: number;
    public boostAttack: number;
    public boostDefense: number;
    public boostSpeed: number;
    public boostVitality: number;
    public boostWisdom: number;
    public projectileSpeed: number;
    public projectileLife: number;

    // Stats - exalts
    public exaltedBonusDamage: number;
    public exaltedHP: number;
    public exaltedMP: number;
    public exaltedDexterity: number;
    public exaltedAttack: number;
    public exaltedDefense: number;
    public exaltedSpeed: number;
    public exaltedVitality: number;
    public exaltedWisdom: number;

    // Inventory
    public potions: number[];
    public inventory: number[];
    public hasBackpack: boolean;
    public backpack: number[];

    // Sprite
    public size: number;
    public texture: number;
    public tex1: number;
    public tex2: number;
}