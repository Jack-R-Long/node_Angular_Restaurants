import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {HttpService} from '../http.service' ;  //Import service

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.css']
})
export class RestaurantEditComponent implements OnInit {
  editRestaurant = {
    'title' : "",
    'cuisine' : ""
  }
  postErrors = {
    'title' : "",
    'cuisine' : ""
  }
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      // console.log("Got the rest to watch", params['id'])
      this.findEditRestaurant(params['id'])
  });
  }
  findEditRestaurant(id){
    this._httpService.getById(id).subscribe(data =>{
      console.log("Got restaurant by ID and returned", data)
      this.editRestaurant = data['data']
    })
  }
  editRestaurantData(){
    this.postErrors = {
      'title' : "",
      'cuisine' : ""
    }
    // console.log("Posting this info", this.newRestaurant)
    this._httpService.editRestaurant(this.editRestaurant).subscribe(data =>{
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
        this.editRestaurant = {
          'title' : "",
          'cuisine' : ""
        }
        this._router.navigate(['restaurants']);
      }
    })
  }

  
}
