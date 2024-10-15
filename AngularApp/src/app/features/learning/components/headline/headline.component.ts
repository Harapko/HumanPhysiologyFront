import {Component, inject} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {HeadlineService} from "../../services/headline.service";
import {Observable} from "rxjs";
import {Headline} from "../../interfaces/Headline";
import {ArticleService} from "../../services/article.service";

@Component({
  selector: 'app-headline',
  standalone: true,
  imports: [
    NgOptimizedImage,
    AsyncPipe
  ],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.scss'
})
export class HeadlineComponent {
  private headlineService = inject(HeadlineService);
  private articleService = inject(ArticleService);

  public headlineList$?: Observable<Headline[]>;

  ngOnInit(){

    this.headlineService.variable$.subscribe(newValue => {
      this.refreshHeadlineList(newValue);
    })
  }

  private refreshHeadlineList(sectionId: string){
    this.headlineList$ = this.headlineService.getHeadlineBySectionId(sectionId);
  }

  public buttonClick(headlineId: string){
    this.articleService.changeVariable(headlineId);
  }
}
