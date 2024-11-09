import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  baseURL = environment.baseUrl+'athlete';

  constructor(private http: HttpClient) {

  }


  public saveAthlete(body :any) :Observable<any>{
    return this.http.post<any>(this.baseURL ,body,{}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }



  public getAthleteCount() :Observable<any>{
    return this.http.get<any>(this.baseURL+'/count');
  }




}
