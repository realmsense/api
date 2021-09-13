import { Injectable, NotFoundException } from "@nestjs/common";
import { IRealm } from "@realmsense/types";

@Injectable()
export class RealmsService {

    private realms: IRealm[] = [];

    constructor( ) { }

    public deleteRealms(objectId?: number): void {
        // no objectId, delete all realms
        if (objectId == undefined) {
            this.realms = [];
            return;
        }

        const foundIndex = this.realms.findIndex((realm) => realm.objectID == objectId);
        if (foundIndex == -1) {
            throw new NotFoundException(`No realm was found with objectId ${objectId}`);
        }

        this.realms.slice(foundIndex, 1);
    }

    public createRealm(realm: IRealm): void {
        // TODO: check if duplicate

        const duplicate = this.realms.find((value) => value.objectID == realm.objectID);
        if (duplicate) {
            // maybe return a message such as the realm was updated, not created?
            this.updateRealm(duplicate);
            return;
        }

        this.realms.push(realm);
    }

    public updateRealm(realm: IRealm): void {
        const foundIndex = this.realms.findIndex((value) => value.objectID == realm.objectID);
        if (foundIndex == -1) {
            throw new NotFoundException(`No realm was found with objectId ${realm.objectID}`);
        }

        this.realms[foundIndex] = realm;
    }

    public getRealms(serverName?: string): IRealm[] {
        let realms = [...this.realms];
        if (serverName) {
            realms = realms.filter((realm) => realm.server.name == serverName);
        }
        return realms;
    }

    public findRealm(objectId: number): IRealm {
        return this.realms.find((realm) => realm.objectID == objectId);
    }
}