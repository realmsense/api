import { IsNotEmpty } from "class-validator";
import { IServer } from "../../../shared/src";

export class ServerDTO implements IServer {
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public address: string;
}