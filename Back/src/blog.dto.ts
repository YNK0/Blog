import { IsString, IsNotEmpty } from 'class-validator';

export class Blogbody {
  @IsString()
  @IsNotEmpty()
  titulo: string;
  @IsString()
  @IsNotEmpty()
  autor: string;
  @IsString()
  @IsNotEmpty()
  contenido: string;
}
