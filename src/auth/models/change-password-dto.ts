import { IsNotEmpty } from "class-validator";

export class ChangePasswordDTO {
    @IsNotEmpty()
    public oldPassword: string;

    @IsNotEmpty()
    public newPassword: string;
}
