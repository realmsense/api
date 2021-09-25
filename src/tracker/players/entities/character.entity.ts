import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { IPlayer } from "@realmsense/types";
import { Account } from "./account.entity";
import { Database } from "../../../db.constants";
import { PlayerDto } from "../dto/player.dto";

@Entity({ database: Database.Tracker })
export class Character implements Partial<IPlayer> {

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public objectType: number;

    @ManyToOne(() => Account, (account) => account.characters)
    public account?: Account;

    @Column({ default: true })
    public alive: boolean;

    // XP
    @Column({ default: 0 }) public level             : number;
    @Column({ default: 0 }) public exp               : number;
    @Column({ default: 0 }) public nextLevelExp      : number;
    @Column({ default: 0 }) public nextClassQuestFame: number;
    @Column({ default: 0 }) public xpBoosted         : number;
    @Column({ default: 0 }) public xpTimer           : number;
    @Column({ default: 0 }) public lootDropTimer     : number;
    @Column({ default: 0 }) public lootTierTimer     : number;

    // Stats
    @Column({ default: 0 }) public maxHP    : number;
    @Column({ default: 0 }) public hp       : number;
    @Column({ default: 0 }) public maxMP    : number;
    @Column({ default: 0 }) public mp       : number;
    @Column({ default: 0 }) public dexterity: number;
    @Column({ default: 0 }) public attack   : number;
    @Column({ default: 0 }) public defense  : number;
    @Column({ default: 0 }) public vitality : number;
    @Column({ default: 0 }) public wisdom   : number;
    @Column({ default: 0 }) public speed    : number;

    // Stats - boost
    public boostMaxMP     : number;
    public boostMaxHP     : number;
    public boostDexterity : number;
    public boostAttack    : number;
    public boostDefense   : number;
    public boostSpeed     : number;
    public boostVitality  : number;
    public boostWisdom    : number;
    public projectileSpeed: number;
    public projectileLife : number;

    // Stats - exalts
    @Column({ default: 0 }) public exaltedBonusDamage: number;
    @Column({ default: 0 }) public exaltedHP         : number;
    @Column({ default: 0 }) public exaltedMP         : number;
    @Column({ default: 0 }) public exaltedDexterity  : number;
    @Column({ default: 0 }) public exaltedAttack     : number;
    @Column({ default: 0 }) public exaltedDefense    : number;
    @Column({ default: 0 }) public exaltedSpeed      : number;
    @Column({ default: 0 }) public exaltedVitality   : number;
    @Column({ default: 0 }) public exaltedWisdom     : number;

    // Inventory
    @Column({ type: "simple-json", default: "[]" }) public potions  : number[];
    @Column({ type: "simple-json", default: "[]" }) public inventory: number[];
    @Column({ type: "simple-json", default: "[]" }) public backpack : number[];
    @Column({ default: false }) public hasBackpack                  : boolean;

    // Sprite
    public  size                          : number;
    @Column({ default: 0 }) public texture: number;
    @Column({ default: 0 }) public tex1   : number;
    @Column({ default: 0 }) public tex2   : number;

    constructor(player?: PlayerDto) {
        if (!player) return;

        this.objectType         = player.objectType;
        this.alive              = true;
        this.level              = player.level;
        this.exp                = player.exp;
        this.nextLevelExp       = player.nextLevelExp;
        this.nextClassQuestFame = player.nextClassQuestFame;
        this.xpBoosted          = player.xpBoosted;
        this.xpTimer            = player.xpTimer;
        this.lootDropTimer      = player.lootDropTimer;
        this.lootTierTimer      = player.lootTierTimer;
        this.maxHP              = player.maxHP;               // Stats
        this.hp                 = player.hp;
        this.maxMP              = player.maxMP;
        this.mp                 = player.mp;
        this.dexterity          = player.dexterity;
        this.attack             = player.attack;
        this.defense            = player.defense;
        this.vitality           = player.vitality;
        this.wisdom             = player.wisdom;
        this.speed              = player.speed;
        this.boostMaxMP         = player.boostMaxMP;          // Stats - boost
        this.boostMaxHP         = player.boostMaxHP;
        this.boostDexterity     = player.boostDexterity;
        this.boostAttack        = player.boostAttack;
        this.boostDefense       = player.boostDefense;
        this.boostSpeed         = player.boostSpeed;
        this.boostVitality      = player.boostVitality;
        this.boostWisdom        = player.boostWisdom;
        this.projectileSpeed    = player.projectileSpeed;
        this.projectileLife     = player.projectileLife;
        this.exaltedBonusDamage = player.exaltedBonusDamage;  // Stats - exalts
        this.exaltedHP          = player.exaltedHP;
        this.exaltedMP          = player.exaltedMP;
        this.exaltedDexterity   = player.exaltedDexterity;
        this.exaltedAttack      = player.exaltedAttack;
        this.exaltedDefense     = player.exaltedDefense;
        this.exaltedSpeed       = player.exaltedSpeed;
        this.exaltedVitality    = player.exaltedVitality;
        this.exaltedWisdom      = player.exaltedWisdom;
        this.potions            = player.potions;             // Inventory 
        this.inventory          = player.inventory;
        this.backpack           = player.backpack;
        this.hasBackpack        = player.hasBackpack;
        this.size               = player.size;                // Sprite
        this.texture            = player.texture;
        this.tex1               = player.tex1;
        this.tex2               = player.tex2;
    }
}