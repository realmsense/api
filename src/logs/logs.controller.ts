import { Body, Controller, Get, Put, Query, Sse, MessageEvent } from "@nestjs/common";
import { ENV, IBotStatus, Permission } from "@realmsense/shared";
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
    @RequireAuthKey(ENV.Authkey.Logs)
    public addBotStatus(@Body() statusDTO: BotStatusDTO): void {
        statusDTO.time = new Date();
        return this.logsService.addBotStatus(statusDTO);
    }

    @Get("botStatus/current")
    @RequirePermission(Permission.ACCESS_LOGS)
    public getCurrentBotStatus(): IBotStatus[] {
        return this.logsService.getCurrentBotStatus();
    }
   
    @Get("botStatus/history")
    @RequirePermission(Permission.ACCESS_LOGS)
    public getBotStatusHistory(@Query("guid") guid?: string): IBotStatus[] {
        return this.logsService.getBotStatusHistory(guid);
    }

    @Sse("botStatus/events")
    public realmEvents(): Observable<MessageEvent> {
        return this.logsService.sendBotStatusEvents();
    }
}