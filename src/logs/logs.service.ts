import { Injectable, MessageEvent } from "@nestjs/common";
import { IBotStatus } from "@realmsense/shared";
import { Observable, Subject } from "rxjs";

@Injectable()
export class LogsService {

    private botStatuses: IBotStatus[] = [];
    public readonly events = new Subject<MessageEvent>();
    
    constructor() {
        this.botStatuses = [];
    }

    public addBotStatus(status: IBotStatus): void {
        this.botStatuses.push(status);
        this.callEvent(status);
    }

    public clearBotStatuses(): void {
        this.botStatuses = [];
        this.callEvent("clear");
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

    public callEvent(status: IBotStatus | "clear"): void {
        this.events.next({ data: status });
    }

    public sendBotStatusEvents(): Observable<MessageEvent> {
        return this.events.asObservable();
    }
}
