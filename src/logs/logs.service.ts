import { Injectable } from "@nestjs/common";
import { IBotStatus } from "@realmsense/shared";

@Injectable()
export class LogsService {

    private botStatuses: IBotStatus[] = [];
    
    constructor() {
        this.botStatuses = [];
    }

    public addBotStatus(status: IBotStatus): void {
        this.botStatuses.push(status);
    }

    public getBotStatusHistory(guid?: string): IBotStatus[] {
        if (guid) {
            return this.botStatuses.filter((value) => value.guid == guid);
        }

        return this.botStatuses;
    }
    
    public getCurrentBotStatus(): IBotStatus[] {
        const guids: string[] = [];
        const statuses: IBotStatus[] = [];

        const reversed = [...this.botStatuses].reverse();
        for (const botStatus of reversed) {
            if (guids.includes(botStatus.guid)) {
                continue;
            }

            guids.push(botStatus.guid);
            statuses.push(botStatus);
        }
        return statuses;
    }
}
