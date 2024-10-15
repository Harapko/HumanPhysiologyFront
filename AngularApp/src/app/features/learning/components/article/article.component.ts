import {Component, inject} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {ArticleService} from "../../services/article.service";
import {Observable} from "rxjs";
import {Article} from "../../interfaces/Article";

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    NgOptimizedImage,
    AsyncPipe
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  private articleService = inject(ArticleService);

  public articleList$?: Observable<Article[]>;
  ngOnInit(){

    this.articleService.variable$.subscribe(newValue => {
      this.refreshArticleList(newValue)
    })
  }


  private refreshArticleList(headlineId: string){
    this.articleList$ = this.articleService.getArticleByHeadlineId(headlineId);
  }
}
