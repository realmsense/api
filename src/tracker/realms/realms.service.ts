import { Injectable, NotFoundException } from "@nestjs/common";
import { Realm } from "./interfaces/realm.interface";

@Injectable()
export class RealmsService {

    private realms: Realm[] = [];

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

    public createRealm(realm: Realm): void {
        // TODO: check if duplicate

        const duplicate = this.realms.find((value) => value.objectID == realm.objectID);
        if (duplicate) {
            // maybe return a message such as the realm was updated, not created?
            this.updateRealm(duplicate);
            return;
        }

        this.realms.push(realm);
    }

    public updateRealm(realm: Realm): void {
        const foundIndex = this.realms.findIndex((value) => value.objectID == realm.objectID);
        if (foundIndex == -1) {
            throw new NotFoundException(`No realm was found with objectId ${realm.objectID}`);
        }

        this.realms[foundIndex] = realm;
    }

    public getRealms(serverName?: string): Realm[] {
        let realms = [...this.realms];
        if (serverName) {
            realms = realms.filter((realm) => realm.server.name == serverName);
        }
        return realms;
    }

    public findRealm(objectId: number): Realm {
        return this.realms.find((realm) => realm.objectID == objectId);
    }
}