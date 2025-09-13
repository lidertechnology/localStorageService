# localStorageService
Servicio para manejar cahce de las apps lidertech.


📋 Informe del Servicio LocalStorageService
El LocalStorageService es un servicio fundamental para la gestión de datos persistentes en el lado del cliente en todas las aplicaciones de Lidertech. 
Su objetivo es proporcionar una interfaz simple, genérica y segura para interactuar con el localStorage del navegador.

🛠️ Diseño y Fundamentos
Principios de Diseño: El servicio encapsula la lógica de localStorage, lo que evita la repetición de código y centraliza el manejo de errores. 
Está diseñado para ser agnóstico a la estructura de datos, permitiendo almacenar cualquier tipo de objeto o array de forma segura.

Gestión de Errores: Todos los métodos están envueltos en bloques try...catch. Esto asegura que la aplicación no se bloquee en caso de que ocurra un error, como un JSON.stringify fallido o un localStorage inaccesible (por ejemplo, en modo de navegación privada).

🚀 Uso en Servicios y Componentes
El servicio se debe utilizar cada vez que sea necesario almacenar datos localmente para mejorar el rendimiento (como el uso de caché) o para preservar el estado de la UI (como los filtros de un formulario o el estado de una paginación).

Inyectar el Servicio: El servicio se inyecta en el componente o servicio donde se requiera.

# Métodos de Uso:

setItem<T>(key: string, value: T): void: Almacena cualquier valor en localStorage. 
El tipo genérico <T> garantiza que puedes guardar cualquier objeto con tipado fuerte.

getItem<T>(key: string): T | null: Recupera un valor almacenado. Devuelve el objeto con su tipado original o null si no se encuentra o si hay un error.

removeItem(key: string): void: Elimina un elemento del localStorage.

🖥️ Ejemplo de Uso en un Servicio
A continuación, un ejemplo de cómo el ReadService utiliza el LocalStorageService para implementar el uso de caché.

TypeScript

  // read.service.ts
  import { inject, Injectable } from '@angular/core';
  import { LocalStorageService } from './local-storage.service';
  
  @Injectable({
    providedIn: 'root'
  })
  export class ReadService<T extends DocumentData> {
  
    private localStorageService = inject(LocalStorageService);
  
    public async obtenerDocumentos(
      collectionName: string,
      options: QueryOptions,
      contexto: string
    ): Promise<void> {
  
      const queryKey = this.generarClaveDeConsulta(collectionName, options);
  
      // Se intenta obtener los datos del caché
      if (options.usoDeCache) {
        const cachedData = this.localStorageService.getItem<(T & { id: string })[]>(queryKey);
        if (cachedData) {
          this._items.set(cachedData);
          this.statesService.setSuccess(contexto);
          if (!options.tiempoReal) {
            return;
          }
        }
      }
  
      // Lógica de consulta a Firestore
      try {
        // ...
        const data: (T & { id: string })[] = []; // Datos obtenidos de Firestore
        this.localStorageService.setItem(queryKey, data); // Se guardan los datos en el caché
        // ...
      } catch (error) {
        // ...
      }
    }

  // Resto del servicio
}
