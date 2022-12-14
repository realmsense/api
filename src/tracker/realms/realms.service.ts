import { Injectable, MessageEvent, NotFoundException } from "@nestjs/common";
import { IRealm, IRealmEvent } from "@realmsense/shared";
import { Observable, Subject } from "rxjs";

@Injectable()
export class RealmsService {

    private realms: IRealm[] = [];
    public readonly events = new Subject<MessageEvent>();

    constructor() { }

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

        const realm = this.realms.splice(foundIndex, 1)[0];
        this.callEvent({ ...realm, event: "Deleted" });
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
        this.callEvent({ ...realm, event: "Created" });
    }

    public updateRealm(realm: IRealm): void {
        const foundIndex = this.realms.findIndex((value) => value.objectID == realm.objectID);
        if (foundIndex == -1) {
            throw new NotFoundException(`No realm was found with objectId ${realm.objectID}`);
        }

        this.realms[foundIndex] = realm;
        this.callEvent({ ...realm, event: "Updated" });
    }

    public getRealms(serverName?: string): IRealm[] {
        let realms = [...this.realms];
        if (serverName) {
            realms = realms.filter((realm) => realm.server.name == serverName);
        }
        return realms;
    }

    public findRealm(objectId: number): IRealm | undefined {
        return this.realms.find((realm) => realm.objectID == objectId);
    }

    public searchRealm(serverName: string, realmName: string): IRealm | undefined {
        return this.realms.find((value) => value.server.name == serverName && value.name?.toLowerCase() == realmName.toLowerCase());
    }

    public callEvent(event: IRealmEvent): void {
        this.events.next({ data: event });
    }

    public sendEvents(): Observable<MessageEvent> {
        return this.events.asObservable();
    }
}