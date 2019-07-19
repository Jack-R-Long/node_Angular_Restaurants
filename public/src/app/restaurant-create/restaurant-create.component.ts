import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-restaurant-create',
  templateUrl: './restaurant-create.component.html',
  styleUrls: ['./restaurant-create.component.css']
})
export class RestaurantCreateComponent implements OnInit {
  newRestaurant = {
    'title' : "",
    'cuisine' : ""
  }
  postErrors = {
    'title' : "",
    'cuisine' : ""
  }
  constructor(
    private _httpService: HttpService,
    private _router: Router

  ) { }

  ngOnInit() {
  }
  postRestaurantData(){
    this.postErrors = {
      'title' : "",
      'cuisine' : ""
    }
    // console.log("Posting this info", this.newRestaurant)
    this._httpService.postRestaurant(this.newRestaurant).subscribe(data =>{
      if (data['error']){
        console.log("Error creating Restaurant")
        if (data['error']['errors']['title']){
          this.postErrors.title =data['error']['errors']['title']['message']
        }
        if (data['error']['errors']['cuisine']){
          this.postErrors.cuisine =data['error']['errors']['cuisine']['message']
        }
      }else {
        console.log("Posted new Restaurant and returned")
        this.newRestaurant = {
          'title' : "",
          'cuisine' : ""
        }
        this._router.navigate(['restaurants']);
      }
    })
  }

}
