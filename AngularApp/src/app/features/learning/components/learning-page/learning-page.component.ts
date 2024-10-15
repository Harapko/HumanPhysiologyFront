import { Component } from '@angular/core';
import {SectionComponent} from "../section/section.component";
import {HeadlineComponent} from "../headline/headline.component";
import {ArticleComponent} from "../article/article.component";

@Component({
  selector: 'app-learning-page',
  standalone: true,
  imports: [
    SectionComponent,
    HeadlineComponent,
    ArticleComponent
  ],
  templateUrl: './learning-page.component.html',
  styleUrl: './learning-page.component.scss'
})
export class LearningPageComponent {

}
