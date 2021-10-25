import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ICharacter, IServer } from "../../../../shared/src";
import { Secret } from "../../../../shared/src/constants/secrets/secrets";
import { PlayerDto } from "../dto/player.dto";
import { Account } from "./account.entity";

@Entity({ database: Secret.Database.db.Tracker })
export class Character implements ICharacter {

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public objectType: number;

    @Column({ type: "timestamp" }) public updatedTime: number;

    @ManyToOne(() => Account, (account) => account.characters)
    public account?: Account;

    @Column({ default: true })
    public alive: boolean;

    @Column({ type: "simple-json" })
    public server: IServer;
    
    @Column()
    public location: string;

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

    constructor(playerDto?: PlayerDto) {
        if (!playerDto) return;

        this.objectType         = playerDto.objectType;
        this.updatedTime        = Date.now(),
        this.alive              = true;
        this.server             = playerDto.server;
        this.location           = playerDto.location;
        this.level              = playerDto.level;
        this.exp                = playerDto.exp;
        this.nextLevelExp       = playerDto.nextLevelExp;
        this.nextClassQuestFame = playerDto.nextClassQuestFame;
        this.xpBoosted          = playerDto.xpBoosted;
        this.xpTimer            = playerDto.xpTimer;
        this.lootDropTimer      = playerDto.lootDropTimer;
        this.lootTierTimer      = playerDto.lootTierTimer;
        this.maxHP              = playerDto.maxHP;               // Stats
        this.hp                 = playerDto.hp;
        this.maxMP              = playerDto.maxMP;
        this.mp                 = playerDto.mp;
        this.dexterity          = playerDto.dexterity;
        this.attack             = playerDto.attack;
        this.defense            = playerDto.defense;
        this.vitality           = playerDto.vitality;
        this.wisdom             = playerDto.wisdom;
        this.speed              = playerDto.speed;
        this.boostMaxMP         = playerDto.boostMaxMP;          // Stats - boost
        this.boostMaxHP         = playerDto.boostMaxHP;
        this.boostDexterity     = playerDto.boostDexterity;
        this.boostAttack        = playerDto.boostAttack;
        this.boostDefense       = playerDto.boostDefense;
        this.boostSpeed         = playerDto.boostSpeed;
        this.boostVitality      = playerDto.boostVitality;
        this.boostWisdom        = playerDto.boostWisdom;
        this.projectileSpeed    = playerDto.projectileSpeed;
        this.projectileLife     = playerDto.projectileLife;
        this.exaltedBonusDamage = playerDto.exaltedBonusDamage;  // Stats - exalts
        this.exaltedHP          = playerDto.exaltedHP;
        this.exaltedMP          = playerDto.exaltedMP;
        this.exaltedDexterity   = playerDto.exaltedDexterity;
        this.exaltedAttack      = playerDto.exaltedAttack;
        this.exaltedDefense     = playerDto.exaltedDefense;
        this.exaltedSpeed       = playerDto.exaltedSpeed;
        this.exaltedVitality    = playerDto.exaltedVitality;
        this.exaltedWisdom      = playerDto.exaltedWisdom;
        this.potions            = playerDto.potions;             // Inventory 
        this.inventory          = playerDto.inventory;
        this.backpack           = playerDto.backpack;
        this.hasBackpack        = playerDto.hasBackpack;
        this.size               = playerDto.size;                // Sprite
        this.texture            = playerDto.texture;
        this.tex1               = playerDto.tex1;
        this.tex2               = playerDto.tex2;
    }
}