import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.baseUrl+'auth';

  constructor(private http: HttpClient) {

  }


  public regUser(body :any) :Observable<any>{
    return this.http.post<any>(this.baseURL ,body,{}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }



  public logUser(body :any) :Observable<any>{
    return this.http.post<any>(this.baseURL+'/token',body,{}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public test() :Observable<any>{
    // let headers = new HttpHeaders().append('ngrok-skip-browser-warning', '6024');
    return this.http.get<any>('https://e6606eddb2374734b2e8a8d39575f81b.serveo.net/api/v1/auth/get');
  }




}
