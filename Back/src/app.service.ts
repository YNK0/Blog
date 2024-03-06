import { HttpStatus, Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { Blogbody } from './blog.dto';

@Injectable()
export class AppService {
  private pool: sql.ConnectionPool;

  constructor() {
    this.connect();
  }

  private async connect() {
    try {
      this.pool = await new sql.ConnectionPool({
        user: 'sqlserver',
        password: 'Tk&PF(5)Qn$(5L,F',
        server: '35.226.224.134',
        database: 'Blog',
        options: {
          encrypt: true,
          trustServerCertificate: true,
        },
      }).connect();
    } catch (error) {
      console.error('Failed to connect to SQL Server:', error);
    }
  }

  public async getAll(): Promise<any> {
    try {
      const request = this.pool.request();
      const result = await request.query('SELECT * FROM Entradas');
      return result.recordset;
    } catch (error) {
      console.error('Failed to fetch Entradas:', error);
      return [];
    }
  }

  public async getOne(titulo: String): Promise<any> {
    try {
      const request = this.pool.request();
      request.input('titulo', sql.NVarChar, `%${titulo}%`);
      const result = await request.query(
        'SELECT * FROM Entradas WHERE titulo LIKE @titulo',
      );
      return result.recordset;
    } catch (error) {
      console.error('Failed to fetch Entradas:', error);
      return [];
    }
  }

  public async createOne(blog: Blogbody): Promise<HttpStatus> {
    try {
      const request = this.pool.request();
      request.input('titulo', sql.NVarChar, blog.titulo);
      request.input('autor', sql.NVarChar, blog.autor);
      request.input('fecha', sql.Date, new Date());
      request.input('contenido', sql.NVarChar, blog.contenido);
      await request.query(
        'INSERT INTO Entradas (titulo, autor, fecha, contenido) VALUES (@titulo, @autor, @fecha, @contenido)',
      );
      return HttpStatus.CREATED;
    } catch (error) {
      console.error('Error al guardar registro:', error);
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  public async updateOne(id: number, blog: Blogbody): Promise<HttpStatus> {
    try {
      const request = this.pool.request();
      request.input('id', sql.Int, id);
      request.input('titulo', sql.NVarChar, blog.titulo);
      request.input('autor', sql.NVarChar, blog.autor);
      request.input('contenido', sql.NVarChar, blog.contenido);
      await request.query(
        'UPDATE Entradas SET titulo = @titulo, autor = @autor, contenido = @contenido WHERE id = @id',
      );
      return HttpStatus.OK;
    } catch (error) {
      console.error('Error al actualizar registro:', error);
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  public async deleteOne(id: number): Promise<HttpStatus> {
    try {
      const request = this.pool.request();
      request.input('id', sql.Int, id);
      await request.query('DELETE FROM Entradas WHERE id = @id');
      return HttpStatus.OK;
    } catch (error) {
      console.error('Error al eliminar registro:', error);
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  public async getAutor(autor: String): Promise<any> {
    try {
      const request = this.pool.request();
      request.input('autor', sql.NVarChar, `%${autor}%`);
      const result = await request.query(
        'SELECT * FROM Entradas WHERE autor LIKE @autor',
      );
      return result.recordset;
    } catch (error) {
      console.error('Failed to fetch Entradas:', error);
      return [];
    }
  }

  public async getTitulo(titulo: String): Promise<any> {
    try {
      const request = this.pool.request();
      request.input('titulo', sql.NVarChar, `%${titulo}%`);
      const result = await request.query(
        'SELECT * FROM Entradas WHERE titulo LIKE @titulo',
      );
      return result.recordset;
    } catch (error) {
      console.error('Failed to fetch Entradas:', error);
      return [];
    }
  }

  public async getContenido(contenido: String): Promise<any> {
    try {
      const request = this.pool.request();
      request.input('contenido', sql.NVarChar, `%${contenido}%`);
      const result = await request.query(
        'SELECT * FROM Entradas WHERE contenido LIKE @contenido',
      );
      return result.recordset;
    } catch (error) {
      console.error('Failed to fetch Entradas:', error);
      return [];
    }
  }
}
