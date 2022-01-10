import { Body, Controller, Get, Put, Query } from "@nestjs/common";
import { ENV, IBotStatus } from "@realmsense/shared";
import { SkipJWTAuth } from "../auth/auth.constants";
import { RequireAuthKey } from "../auth/guards/authkey.guard";
import { BotStatusDTO } from "./interfaces/bot-status.dto";
import { LogsService } from "./logs.service";

@SkipJWTAuth()
@RequireAuthKey(ENV.Authkey.Logs)
@Controller("logs")
export class LogsController {

    constructor(
        private logsService: LogsService,
    ) { }


    @Put("botStatus")
    public addBotStatus(@Body() statusDTO: BotStatusDTO): void {
        statusDTO.time = new Date();
        return this.logsService.addBotStatus(statusDTO);
    }

    @Get("botStatus/current")
    public getCurrentBotStatus(): IBotStatus[] {
        return this.logsService.getCurrentBotStatus();
    }
   
    @Get("botStatus/all")
    public getBotStatuses(@Query("guid") guid?: string): IBotStatus[] {
        return this.logsService.getBotStatuses(guid);
    }
}