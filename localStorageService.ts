import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})

export class LocalStorageService {

  /*** Guarda cualquier tipo de dato en el navegador. * La 'clave' es como el nombre del archivo, y el 'valor' es el contenido.  */
   public guardarItem<T>(clave: string, valor: T): void {
    try { const valorSerializado = JSON.stringify(valor); localStorage.setItem(clave, valorSerializado); } 
    catch (e) { console.error('Error al guardar en el almacenamiento local', e); }
  }

  /** Recupera un dato guardado usando su 'clave'. * Si no lo encuentra, devuelve nulo.  */
  public obtenerItem<T>(clave: string): T | null {
    try { const valorSerializado = localStorage.getItem(clave); return valorSerializado ? JSON.parse(valorSerializado) as T : null;  } 
    catch (e) {console.error('Error al obtener del almacenamiento local', e); return null; }
  }

  /** Borra un dato guardado usando su 'clave'. */
  public eliminarItem(clave: string): void {
    try {localStorage.removeItem(clave); } 
    catch (e) { console.error('Error al eliminar del almacenamiento local', e);  }
  }
  
}
