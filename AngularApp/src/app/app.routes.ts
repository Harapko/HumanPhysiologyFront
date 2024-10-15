import { Routes } from '@angular/router';
import {MainPageComponent} from "./features/main/components/main-page/main-page.component";
import {LearningPageComponent} from "./features/learning/components/learning-page/learning-page.component";

export const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'learn', component: LearningPageComponent}
];
