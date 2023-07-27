import {HttpClient} from '@angular/common/http'
import {Injectable, inject} from '@angular/core'
import {Observable} from 'rxjs'
import {environment} from 'src/environments/environment'
import {GetFeedResponseInterface} from '../types/getFeedResponce.interface'

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    console.log('working')
    const fullUrl = environment.apiUrl + url
    return this.http.get<GetFeedResponseInterface>(fullUrl)
  }
}
