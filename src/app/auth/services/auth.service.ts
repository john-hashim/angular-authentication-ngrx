import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {Observable, map} from 'rxjs'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {AuthResponceInterface} from '../types/authResponce.interface'
import {environment} from 'src/environments/environment'
import {LoginRequestInterface} from '../types/loginRequest.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(responce: AuthResponceInterface) {
    return responce.user
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users'
    return this.http
      .post<AuthResponceInterface>(url, data)
      .pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login'
    return this.http
      .post<AuthResponceInterface>(url, data)
      .pipe(map(this.getUser))
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user'
    return this.http.get<AuthResponceInterface>(url).pipe(map(this.getUser))
  }
}
