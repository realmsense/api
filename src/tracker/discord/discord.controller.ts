import { Controller, Get, MessageEvent, Query, Sse, UseGuards } from "@nestjs/common";
import { ENV, Permission, IPlayer, IRealm } from "@realmsense/shared";
import { Observable } from "rxjs";
import { SkipJWTAuth } from "../../auth/auth.constants";
import { RequireAuthKey } from "../../auth/guards/authkey.guard";
import { DiscordPermissionGuard, RequireDiscordPermissionKey } from "../../auth/guards/discord-permission.guard";
import { PlayersService } from "../players/players.service";
import { RealmsService } from "../realms/realms.service";
import { DiscordService } from "./discord.service";


@SkipJWTAuth()
@UseGuards(DiscordPermissionGuard)
@RequireAuthKey(ENV.Authkey.Discord)
@Controller("discord")
export class DiscordController {

    constructor(
        private discordService: DiscordService,
        private playersService: PlayersService,
        private realmService: RealmsService
    ) { }

    @Get("playerLocation")
    @RequireDiscordPermissionKey(Permission.TRACKER_ACCESS)
    public async getPlayerLocation(
        @Query("name") name: string
    ): Promise<IPlayer[]> {
        if (name == "") return [];
        return this.playersService.searchPlayer(name);
    }

    @Get("realmInfo")
    @RequireDiscordPermissionKey(Permission.TRACKER_ACCESS)
    public async getRealmInfo(
        @Query("serverName") serverName: string,
        @Query("realmName") realmName: string
    ): Promise<IRealm | undefined> {
        return this.realmService.searchRealm(serverName, realmName);
    }
    
    @Sse("realmEvents")
    public realmEvents(): Observable<MessageEvent> {
        return this.realmService.sendEvents();
    }
}
