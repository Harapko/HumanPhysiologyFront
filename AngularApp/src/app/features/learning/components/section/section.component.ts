import {Component, inject, signal} from '@angular/core';
import {SectionService} from "../../services/section.service";
import {Observable} from "rxjs";
import {Section} from "../../interfaces/Section";
import {AsyncPipe} from "@angular/common";
import {HeadlineService} from "../../services/headline.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  private sectionService = inject(SectionService);
  private headlineService = inject(HeadlineService);
  private fb = inject(FormBuilder);

  public addSectionFG!: FormGroup;
  public allSection$?: Observable<Section[]>;

  public isAddSectionFromVisible = signal<boolean>(false);

  private addSectionFrom(){
    this.addSectionFG = this.fb.group({
      title: ['', Validators.required],
    })
  }

  public ngOnInit(){
    this.addSectionFrom()
    this.allSection$ = this.sectionService.getAllSection();
  }

  public buttonClick(sectionId: string){
    this.headlineService.changeVariable(sectionId);
  }

  public postAddSection(){
    if(this.addSectionFG.valid){
      this.sectionService.postAddSection(this.addSectionFG.value)
        .subscribe(res => {
          this.allSection$ = this.sectionService.getAllSection();

        })

    }
  }

}
