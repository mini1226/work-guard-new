import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Athlete} from "../../models/models";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  baseURL = environment.baseUrl+'session';

  constructor(private http: HttpClient) {

  }


  public saveSession(body :any) :Observable<any>{
    return this.http.post<any>(this.baseURL+'/' ,body,{}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  public startSession(body :any, id: any) :Observable<any>{
    return this.http.post<any>(this.baseURL+'/'+id+'/start' ,body,{}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  public saveSessionAll(body :any) :Observable<any>{
    return this.http.post<any>(this.baseURL+'/time' ,body,{}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  updateSession(body: any): Observable<any> {
    return this.http.put<any>(this.baseURL+'/', body, {}).pipe(
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

  getAllSessionDetails(coachId: any): Observable<any> {
    return this.http.get<any>(this.baseURL + '/coach/' + coachId, ).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  getSessionById(sessionId: any): Observable<any> {
    return this.http.get<any>(this.baseURL + '/' + sessionId, ).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
