import { Body, Controller, Delete, Get, HttpCode, MessageEvent, Patch, Put, Query, Sse } from "@nestjs/common";
import { Observable } from "rxjs";
import { IRealm } from "../../../shared/src";
import { AuthKeyConstants, SkipJWTAuth } from "../../auth/auth.constants";
import { RequireAuthKey } from "../../auth/guards/authkey.guard";
import { RealmDto } from "./interfaces/realm.dto";
import { RealmsService } from "./realms.service";

@Controller("tracker/realms")
export class RealmsController {

    constructor(private realmService: RealmsService) { }

    @Delete("")
    @RequireAuthKey(AuthKeyConstants.Realms)
    @SkipJWTAuth()
    public deleteRealms(@Query("objectId") objectId?: number): void {
        return this.realmService.deleteRealms(objectId);
    }

    @Put("")
    @HttpCode(201)
    @RequireAuthKey(AuthKeyConstants.Realms)
    @SkipJWTAuth()
    public createRealm(@Body() realmDto: RealmDto): void {
        return this.realmService.createRealm(realmDto);
    }

    @Patch("")
    @RequireAuthKey(AuthKeyConstants.Realms)
    @SkipJWTAuth()
    public updateRealm(@Body() realmDto: RealmDto): void {
        return this.realmService.updateRealm(realmDto);
    }

    @Get("")
    public getRealms(@Query("serverName") serverName?: string): IRealm[] {
        return this.realmService.getRealms(serverName);
    }

    @Sse("events")
    public events(): Observable<MessageEvent> {
        return this.realmService.sendEvents();
    }
}
