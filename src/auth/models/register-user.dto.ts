import { IsNotEmpty } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    public username: string;

    @IsNotEmpty()
    public password: string;
}
