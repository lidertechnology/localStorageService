import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  public getItem<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) as T : null;
    } catch (e) {
      console.error('Error getting from localStorage', e);
      return null;
    }
  }

  public removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage', e);
    }
  }
}
