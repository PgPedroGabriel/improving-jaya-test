import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  action: string;

  @IsNotEmpty()
  @IsString()
  repository: string;

  @IsNotEmpty()
  @IsNumber()
  issue_number: number;
}
