import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {HttpService} from '../http.service' ;  //Import service

@Component({
  selector: 'app-nested-edit',
  templateUrl: './nested-edit.component.html',
  styleUrls: ['./nested-edit.component.css']
})
export class NestedEditComponent {
  @Input() editRestaurant: any; // use the @Input decorator to indicate this comes from the parent
  @Input() is_appear: boolean; // use the @Input decorator to indicate this comes from the parent
  // editRestaurant = {
  //   'title' : "",
  //   'cuisine' : ""
  // }
  postErrors = {
    'title' : "",
    'cuisine' : ""
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
  ) {  }
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
        // this.editRestaurant = {
        //   'title' : "",
        //   'cuisine' : ""
        // }
        // this._router.navigate(['restaurants']);
        this.is_appear = false; 
      }
    })
  }

}
