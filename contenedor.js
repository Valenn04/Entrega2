const fs = require('fs');

class Contenedor {
    constructor(archivo) {
      this.archivo = archivo;
      this.crearArchivoOLeer();
    }
  
    async crearArchivoOLeer() {
      try {
        await fs.promises.readFile(this.archivo, "utf-8");
      } catch (error) {
        error.code === "ENOENT" ? this.CrearArchivoVacio(): console.log( `Error: ${error.code} Hubo un error inesperado al intentar leer ${this.archivo}`);
      }
    }
  
    async CrearArchivoVacio() {
      fs.writeFile(this.archivo, "[]", (error) => {
        error ? console.log(error): console.log(`El archivo ${this.archivo} fue creado porque no existia`);
      });
    }
  
    async getById(id) {
      try {
        const data = await this.getData();
        const parsedData = JSON.parse(data);
  
        return parsedData.find((producto) => producto.id === id);
      } catch (error) {
        console.log(
          `Error: ${error.code} intente obtener su elemento por ID (${id})`
        );
      }
    }
  
    async deleteById(id) {
      try {
        const data = await this.getData();
        const parsedData = JSON.parse(data);
        const objetoDeIdARemover = parsedData.find(
          (producto) => producto.id === id
        );
  
        if (objetoDeIdARemover) {
          const index = parsedData.indexOf(objetoDeIdARemover);
          parsedData.splice(index, 1);
          await fs.promises.writeFile(this.archivo, JSON.stringify(parsedData));
        } else {
          console.log(`El ID ${id} no existe en el archivo`);
          return null;
        }
      } catch (error) {
        console.log(
          `Error: ${error.code} Hubo un error al intentar eliminar un elemento por su ID (${id})`
        );
      }
    }
  
    async save(object) {
      try {
        const allData = await this.getData();
        const parsedData = JSON.parse(allData);
  
        object.id = parsedData.length + 1;
        parsedData.push(object);
  
        await fs.promises.writeFile(this.archivo, JSON.stringify(parsedData));
        return object.id;
      } catch (error) {
        console.log(
          `Error: ${error.code}  Hubo un error al intentar guardar un elemento`
        );
      }
    }
    
    async deleteAll() {
      try {
        await this.CrearArchivoVacio();
      } catch (error) {
        console.log(
          `Hubo un error (${error.code}) al intentar eliminar todos los objetos`
        );
      }
    }
  
    async getData() {
      const data = await fs.promises.readFile(this.archivo, "utf-8");
      return data;
    }
  
    async getAll() {
      const data = await this.getData();
      return JSON.parse(data);
    }
  }
  
  module.exports = Contenedor;