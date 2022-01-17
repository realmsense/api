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

    public getBotStatusHistory(name?: string): IBotStatus[] {
        if (name) {
            return this.botStatuses.filter((value) => value.name == name);
        }

        return this.botStatuses;
    }
    
    public getCurrentBotStatus(): IBotStatus[] {
        const names: string[] = [];
        const statuses: IBotStatus[] = [];

        const reversed = [...this.botStatuses].reverse();
        for (const botStatus of reversed) {
            if (names.includes(botStatus.name)) {
                continue;
            }

            names.push(botStatus.name);
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
