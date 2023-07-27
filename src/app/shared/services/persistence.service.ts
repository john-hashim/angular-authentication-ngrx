import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.log('Not able to store to localstorage', e)
    }
  }

  get(key: string) {
    try {
      const localStorageItem = localStorage.getItem(key)
      return localStorageItem ? JSON.parse(localStorageItem) : null
    } catch (e) {
      console.log('Error getting from localstorate', e)
    }
  }
}
