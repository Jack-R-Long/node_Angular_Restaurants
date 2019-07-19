import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {HttpService} from '../http.service' ;  //Import service

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.css']
})
export class ReviewCreateComponent implements OnInit {
  editRestaurant = {
    'title' : "",
    'cuisine' : ""
  }
  newReview = {
    'name' : "",
    'stars' : "",
    'review' : "",
    'restaurant_id' : ""
  }
  postErrors = {
    'name' : "",
    'stars' : "",
    'review' : ""
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
      this.newReview['restaurant_id'] = this.editRestaurant['_id']  //Add rest id to comment post data
    })
  }
  postReviewData(){
    this.postErrors = {
      'name' : "",
      'stars' : "",
      'review' : ""
    }
    // console.log("Posting this info", this.newRestaurant)
    this._httpService.postReview(this.newReview).subscribe(data =>{
      if (data['error']){
        console.log("Error creating review")
        if (data['error']['errors']['name']){
          this.postErrors.name =data['error']['errors']['name']['message']
        }
        if (data['error']['errors']['stars']){
          this.postErrors.stars =data['error']['errors']['stars']['message']
        }
        if (data['error']['errors']['review']){
          this.postErrors.review =data['error']['errors']['review']['message']
        }
      }else {
        console.log("Posted new review and returned")
        this.newReview = {
          'name' : "",
          'stars' : "",
          'review' : "",
          'restaurant_id' :this.editRestaurant['_id'] 
        }
        this._router.navigate(["restaurants",this.editRestaurant['_id']])
      }
    })
  }

}
