import {inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Section} from "../interfaces/Section";

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private http = inject(HttpClient)

  private baseUrl = "http://localhost:5255/";

  public getAllSection() : Observable<Section[]>{
    return this.http.get<Section[]>(`${this.baseUrl}GetAllSection`)
  }

  public postAddSection(data: FormData) : Observable<string> {
    return this.http.post<string>(`${this.baseUrl}CreateSection`, data)
  }

  public putUpdateSection(data: FormData) : Observable<string> {
    return this.http.put<string>(`${this.baseUrl}UpdateSection`, data)
  }

  public deleteSection(id: string) : Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}DeleteSection?id=${id}`)
  }

}
