import { Body, Controller, Get, Put, Query, Sse, MessageEvent, Delete } from "@nestjs/common";
import { IBotStatus, Permission } from "@realmsense/shared";
import { Observable } from "rxjs";
import { SkipJWTAuth } from "../auth/auth.constants";
import { RequireAuthKey } from "../auth/guards/authkey.guard";
import { RequirePermission } from "../auth/guards/permission.guard";
import { BotStatusDTO } from "./interfaces/bot-status.dto";
import { LogsService } from "./logs.service";

@Controller("logs")
export class LogsController {

    constructor(
        private logsService: LogsService,
    ) { }


    @Put("botStatus")
    @SkipJWTAuth()
    @RequireAuthKey()
    public addBotStatus(@Body() statusDTO: BotStatusDTO): void {
        statusDTO.time = new Date();
        return this.logsService.addBotStatus(statusDTO);
    }

    @Delete("botStatus")
    @SkipJWTAuth()
    @RequireAuthKey()
    public clearBotStatus(): void {
        return this.logsService.clearBotStatuses();
    }

    @Get("botStatus/current")
    @RequirePermission(Permission.ACCESS_LOGS)
    public getCurrentBotStatus(): IBotStatus[] {
        return this.logsService.getCurrentBotStatus();
    }
   
    @Get("botStatus/history")
    @RequirePermission(Permission.ACCESS_LOGS)
    public getBotStatusHistory(@Query("name") name?: string): IBotStatus[] {
        return this.logsService.getBotStatusHistory(name);
    }

    @Sse("botStatus/events")
    public realmEvents(): Observable<MessageEvent> {
        return this.logsService.sendBotStatusEvents();
    }
}