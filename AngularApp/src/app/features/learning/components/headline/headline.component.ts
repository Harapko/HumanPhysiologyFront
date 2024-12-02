import {Component, inject, signal, WritableSignal} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {HeadlineService} from "../../services/headline.service";
import {Observable} from "rxjs";
import {Headline} from "../../interfaces/Headline";
import {ArticleService} from "../../services/article.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-headline',
  standalone: true,
  imports: [
    NgOptimizedImage,
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.scss'
})
export class HeadlineComponent {
  private headlineService = inject(HeadlineService);
  private articleService = inject(ArticleService);
  private fb = inject(FormBuilder);

  public headlineList$?: Observable<Headline[]>;
  public addHeadlineFG! : FormGroup;
  public headlineListSignal = signal<Headline[]>([]);

  public isCreateHeadlineFormVisible = signal<boolean>(false);

  constructor() {
    this.headlineList$?.subscribe({
      next: (data) => this.headlineListSignal.set(data)
    })
  }

  ngOnInit(){

    this.headlineService.variable$.subscribe(newValue => {
      this.refreshHeadlineList(newValue);
    })
    this.addHeadlineForm();
  }

  private addHeadlineForm(){
    this.addHeadlineFG = this.fb.group({
      title : ['', Validators.required],
      file : ['']
    })
  }


  private refreshHeadlineList(sectionId: string){
    this.headlineList$ = this.headlineService.getHeadlineBySectionId(sectionId);
  }

  public changeArticle(headlineId: string){
    this.articleService.changeVariable(headlineId);
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file.name);
    }
  }

  public postAddHeadline(){
    if (this.addHeadlineFG.valid){
      this.headlineService.postAddHeadline(this.addHeadlineFG.value).subscribe(() => {
      })
    }
  }
}
