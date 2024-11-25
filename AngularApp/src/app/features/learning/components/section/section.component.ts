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
  public updateSectionFG!: FormGroup;
  public allSection$?: Observable<Section[]>;

  public isAddSectionFromVisible = signal<boolean>(false);
  public isUpdateSectionFromVisible = signal<boolean>(false);

  private addSectionForm(){
    this.addSectionFG = this.fb.group({
      title: ['', Validators.required],
    })
  }

  private updateSectionForm(){
    this.updateSectionFG = this.fb.group({
      id : ['',],
      title: ['', Validators.required],
    })
  }

  public ngOnInit(){
    this.addSectionForm()
    this.updateSectionForm()
    this.allSection$ = this.sectionService.getAllSection();
  }

  public changeSection(sectionId: string){
    this.headlineService.changeVariable(sectionId);
  }

  public postAddSection(){
    if(this.addSectionFG.valid){
      this.sectionService.postAddSection(this.addSectionFG.value)
        .subscribe(res => {
          this.allSection$ = this.sectionService.getAllSection();
          this.isAddSectionFromVisible = signal<boolean>(false);
        })

    }
  }

  public putUpdateSection(id: string){
    if(this.updateSectionFG.valid){
      this.updateSectionFG.value.id = id;
      this.sectionService.putUpdateSection(this.updateSectionFG.value)
        .subscribe(res => {
          this.allSection$ = this.sectionService.getAllSection();
          this.isUpdateSectionFromVisible = signal<boolean>(false);
        },
          error => {
          console.log(this.updateSectionFG.value);
          })

    }
  }


  public deleteSection(sectionId: string){
    this.sectionService.deleteSection(sectionId).subscribe(res=>{
      this.allSection$ = this.sectionService.getAllSection();
      console.log(res);
    })
  }

}
