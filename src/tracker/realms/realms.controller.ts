import { Body, Controller, Delete, Get, HttpCode, Patch, Put, Query } from "@nestjs/common";
import { Realm, RealmDto } from "./interfaces/realm.interface";
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
    public getRealms(@Query("serverName") serverName?: string): Realm[] {
        return this.realmService.getRealms(serverName);
    }
}
