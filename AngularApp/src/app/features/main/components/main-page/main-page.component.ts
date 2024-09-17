import { Component } from '@angular/core';
import {BannerComponent} from "../banner/banner.component";
import {OpportunitiesComponent} from "../opportunities/opportunities.component";
import {ReviewsComponent} from "../reviews/reviews.component";
import {SubscribeComponent} from "../subscribe/subscribe.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    BannerComponent,
    OpportunitiesComponent,
    ReviewsComponent,
    SubscribeComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
