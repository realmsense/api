import { Body, Controller, Delete, Get, HttpCode, Patch, Put, Query, Sse, MessageEvent, Request } from "@nestjs/common";
import { IRealm } from "@realmsense/types";
import { Observable } from "rxjs";
import { RealmDto } from "./interfaces/realm.interface";
import { RealmsService } from "./realms.service";

@Controller("tracker/realms")
export class RealmsController {

    constructor(private realmService: RealmsService) { }

    @Delete("")
    public deleteRealms(@Query("objectId") objectId?: number): void {
        return this.realmService.deleteRealms(objectId);
    }

    @Put("")
    @HttpCode(201)
    public createRealm(@Body() realmDto: RealmDto): void {
        return this.realmService.createRealm(realmDto);
    }

    @Patch("")
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
