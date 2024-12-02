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
  public allSection$: Observable<Section[]> = this.sectionService.getAllSection();

  public isAddSectionFormVisible = signal<boolean>(false);
  public isUpdateSectionFormVisible = signal<boolean>(false);
  public section = signal<Section[]>([]);

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

  constructor() {
    this.allSection$.subscribe({
      next: (data) => this.section.set(data),
    });
  }

  public ngOnInit(){
    this.addSectionForm()
    this.updateSectionForm()
  }

  public changeHeadline(sectionId: string){
    this.headlineService.changeVariable(sectionId);
  }

  public postAddSection(){
    if(this.addSectionFG.valid){
      this.sectionService.postAddSection(this.addSectionFG.value)
        .subscribe(res => {
          const section : Section = {
            id: this.addSectionFG.value.id,
            sectionName: this.addSectionFG.value.title,
          }
          this.section.set([...this.section(), section])
          this.isAddSectionFormVisible = signal<boolean>(false);
        })

    }
  }

  public putUpdateSection(id: string){
    if(this.updateSectionFG.valid){
      this.updateSectionFG.value.id = id;
      this.sectionService.putUpdateSection(this.updateSectionFG.value)
        .subscribe(res => {
          const updateSection = this.section().map((section) =>
          section.id === id ? { ...section, sectionName: this.updateSectionFG.value.title } : section);
          this.section.set(updateSection);
          this.isUpdateSectionFormVisible = signal<boolean>(false);
        },
          error => {
          console.log(this.updateSectionFG.value);
          })

    }
  }


  public deleteSection(sectionId: string){
    this.sectionService.deleteSection(sectionId).subscribe(res=>{
      // this.allSection$ = this.sectionService.getAllSection();
      const updateSectionList = this.section().filter((section) => section.id !== sectionId);
      this.section.set(updateSectionList);
      console.log(res);
    })
  }

}
