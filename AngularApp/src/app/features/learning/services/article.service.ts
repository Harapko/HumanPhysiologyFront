import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Article} from "../interfaces/Article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private http = inject(HttpClient);

  private baseUrl = "http://localhost:5255/";
  private _variable = new BehaviorSubject<string>("9d4095b3-e386-4f8e-9a27-d3c04a3cc127");

  public variable$ = this._variable.asObservable();

  getArticleByHeadlineId(headlineId: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}GetArticleFromHeadlineId?headlineId=${headlineId}`)
  }

  public changeVariable(newValue: string) {
    this._variable.next(newValue);
  }
}
