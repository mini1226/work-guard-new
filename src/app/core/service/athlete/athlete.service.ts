import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Athlete} from "../../models/models";

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  baseURL = environment.baseUrl + 'athlete/';

  constructor(private http: HttpClient) {

  }


  public saveAthlete(body: any): Observable<any> {
    return this.http.post<any>(this.baseURL, body, {}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public getAthleteCount(body: FormData): Observable<any> {
    return this.http.post<any>(this.baseURL + 'count', body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  public getAthleteAll(coach_id: any): Observable<any> {
    const params = {
      'coach_id': coach_id
    }
    return this.http.get<any>(this.baseURL, {params});

  }


  updateAthlete(body: Athlete): Observable<any> {
    return this.http.put<any>(this.baseURL, body, {}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getAthleteDetail(isEditId: any): Observable<any> {
    return this.http.get<any>(this.baseURL + isEditId);

  }
}
