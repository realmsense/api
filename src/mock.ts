import { IRealm, Servers } from "@realmsense/types";

export function generateMockRealms(): IRealm[] {
    const realms: IRealm[] = [];
    for (let i = 0; i < 25; i++) {
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
    
        if (Math.random() < 0.5) {
            realm.heroesLeft = randomNum(1, 33),
            realm.ip = "127.0.0.1";
        }
    
        this.realms.push(realm);
    }

    return realms;
}

function randomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}