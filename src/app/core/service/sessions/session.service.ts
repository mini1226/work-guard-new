import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  baseURL = environment.baseUrl+'session';

  constructor(private http: HttpClient) {

  }


  public saveSession(body :any) :Observable<any>{
    return this.http.post<any>(this.baseURL ,body,{}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }



  public getSessionCount() :Observable<any>{
    return this.http.get<any>(this.baseURL);
  }


  public getUpcomingSession() :Observable<any>{
    return this.http.get<any>(this.baseURL+'/not-completed');
  }



  public getCompletedSessionCount(body: FormData): Observable<any> {
    return this.http.post<any>(this.baseURL + '/completed', body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  public getAllSessionCount(body: FormData): Observable<any> {
    return this.http.post<any>(this.baseURL + '/count', body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
