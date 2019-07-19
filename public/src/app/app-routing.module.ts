import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RestaurantCreateComponent } from './restaurant-create/restaurant-create.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { RestaurantEditComponent } from './restaurant-edit/restaurant-edit.component';
import { ReviewCreateComponent } from './review-create/review-create.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/restaurants'},
  {path: 'restaurants', component: HomeComponent},
  {path: 'restaurants/new', component: RestaurantCreateComponent},
  {path: 'restaurants/:id', component: ReviewsComponent},
  {path: 'restaurants/:id/edit', component: RestaurantEditComponent},
  {path: 'restaurants/:id/review', component: ReviewCreateComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
