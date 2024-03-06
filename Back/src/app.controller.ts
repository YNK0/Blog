import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Blogbody } from './blog.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAll(): Promise<string> {
    return this.appService.getAll();
  }

  //Busqueda por titulo
  @Get(':titulo')
  async getOne(@Param('titulo') titulo: String): Promise<string> {
    return this.appService.getOne(titulo);
  }

  //Creacion de entrada
  @Post()
  async createOne(@Body() blog: Blogbody): Promise<HttpStatus> {
    return this.appService.createOne(blog);
  }

  //Actualizacion de entrada
  @Put(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() blog: Blogbody,
  ): Promise<HttpStatus> {
    return this.appService.updateOne(id, blog);
  }

  //Eliminacion de entrada
  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<HttpStatus> {
    return this.appService.deleteOne(id);
  }

  //Busqueda por autor
  @Get('autor/:autor')
  async getAutor(@Param('autor') autor: String): Promise<string> {
    return this.appService.getAutor(autor);
  }

  //Busqueda por titulo
  @Get('titulo/:titulo')
  async getTitulo(@Param('titulo') titulo: String): Promise<string> {
    return this.appService.getTitulo(titulo);
  }

  //Busqueda por contenido
  @Get('contenido/:contenido')
  async getContenido(@Param('contenido') contenido: String): Promise<string> {
    return this.appService.getContenido(contenido);
  }
}
