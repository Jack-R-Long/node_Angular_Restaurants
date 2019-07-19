import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpService} from './http.service'
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestaurantCreateComponent } from './restaurant-create/restaurant-create.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { RestaurantEditComponent } from './restaurant-edit/restaurant-edit.component';
import { ReviewCreateComponent } from './review-create/review-create.component';
import { NestedEditComponent } from './nested-edit/nested-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantCreateComponent,
    ReviewsComponent,
    RestaurantEditComponent,
    ReviewCreateComponent,
    NestedEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
