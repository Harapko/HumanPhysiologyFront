import {inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {Headline} from "../interfaces/Headline";
import {ArticleService} from "./article.service";

@Injectable({
  providedIn: 'root'
})
export class HeadlineService {
  private http = inject(HttpClient);

  private baseUrl = "http://localhost:5255/";
  private _variable = new BehaviorSubject<string>("ca73a86b-2f22-428f-8d44-bba2c79475a8");

  public variable$ = this._variable.asObservable();


  public getHeadlineBySectionId(sectionId: string): Observable<Headline[]> {
    return this.http.get<Headline[]>(`${this.baseUrl}GetHeadlineFromSectionId?sectionId=${sectionId}`)
      .pipe(
        catchError(error => {
          const errorMessage = `Failed to retrieve headlines for section ID: ${sectionId}. Error: ${error}`;
          return throwError(() => new Error(errorMessage));
        })
      )
  }

  public changeVariable(newValue: string) {
    this._variable.next(newValue);
  }

  public postAddHeadline(data: FormData) : Observable<string>{
    return this.http.post<string>(`${this.baseUrl}CreateHeadline`, data)
  }
}
