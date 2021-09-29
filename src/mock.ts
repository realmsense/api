import { Classes, GuildRank, IPlayer, IRealm, Servers } from "@realmsense/types";

function randomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomBool(): boolean {
    return Math.random() < 0.5;
}

function randomEnum<T>(anEnum: T): T[keyof T] {
    const values = Object.values(anEnum);
    const randomInex = Math.floor(Math.random() * values.length);
    return values[randomInex];
}

export function generateMockRealms(amount: number): IRealm[] {
    const realms: IRealm[] = [];
    for (let i = 0; i < amount; i++) {
        const randomServer = Servers[Servers.length * Math.random() | 0];
        const realm: IRealm = {
            maxPlayers: 85,
            name: "Kraken",
            objectID: randomNum(0, 1000),
            openedTime: Date.now(),
            players: randomNum(0, 85),
            pos: {
                x: randomNum(0, 100),
                y: randomNum(0, 100),
            },
            queue: randomNum(0, 5),
            server: randomServer,
            updatedTime: Date.now(),
        };

        if (randomBool()) {
            realm.heroesLeft = randomNum(1, 33);
            realm.ip = "127.0.0.1";
        }

        realms.push(realm);
    }

    return realms;
}

export function generateMockPlayers(amount: number): IPlayer[] {
    const players: IPlayer[] = [];

    for (let i = 0; i < amount; i++) {
        const player: IPlayer = {
            name: "Test Player",
            nameChosen: true,
            accountID: randomNum(0, 1000).toString(),
            playerID: randomNum(0, 1000),
            supporter: randomBool(),
            supporterPoints: randomNum(0, 1000),
            numStars: randomNum(0, 90),
            accountFame: randomNum(0, 10000),
            credits: randomNum(0, 1000),
            fortuneToken: randomNum(0, 1000),
            currentFame: randomNum(0, 10000),
            legendaryRank: randomNum(0, 50),
            forgeFire: randomNum(0, 900),
            _119: randomNum(0, 15),
            level: randomNum(0, 20),
            exp: randomNum(0, 1000),
            nextLevelExp: randomNum(0, 1000),
            nextClassQuestFame: randomNum(0, 1000),
            xpBoosted: randomNum(0, 1000),
            xpTimer: randomNum(0, 1000),
            lootDropTimer: randomNum(0, 1000),
            lootTierTimer: randomNum(0, 1000),
            guildName: "",
            guildRank: GuildRank.NoRank,
            maxHP: randomNum(0, 900),
            hp: randomNum(0, 900),
            maxMP: randomNum(0, 900),
            mp: randomNum(0, 900),
            dexterity: randomNum(0, 70),
            attack: randomNum(0, 70),
            defense: randomNum(0, 70),
            vitality: randomNum(0, 70),
            wisdom: randomNum(0, 70),
            speed: randomNum(0, 70),
            boostMaxMP: 0,
            boostMaxHP: 0,
            boostDexterity: 0,
            boostAttack: 0,
            boostDefense: 0,
            boostSpeed: 0,
            boostVitality: 0,
            boostWisdom: 0,
            projectileSpeed: 100,
            projectileLife: 100,
            exaltedBonusDamage: 0,
            exaltedHP: 0,
            exaltedMP: 0,
            exaltedDexterity: 0,
            exaltedAttack: 0,
            exaltedDefense: 0,
            exaltedSpeed: 0,
            exaltedVitality: 0,
            exaltedWisdom: 0,
            potions: [-1, -1, -1],
            inventory: [32700, 32699, 2707, 8668, -1, 31847, -1, -1, -1, -1],
            hasBackpack: randomBool(),
            backpack: [-1, -1, -2, -1, -1, -1, -1],
            size: 100,
            texture: 0,
            tex1: 21692546,
            tex2: 33549261,
            objectID: randomNum(0, 1000),
            objectType: randomEnum(Classes),
            pos: undefined
        };
        players.push(player);
    }
    return players;
}