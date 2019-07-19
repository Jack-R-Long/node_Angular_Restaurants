import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service' ;
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  selectRestaurant : {
    title: "",
    cuisine: "",
    reviews: [""],
  }
  sortedReviews = [];

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("Got the rest to watch", params['id'])
      this.findEditRestaurant(params['id'])
  });
  }
  findEditRestaurant(id){
    this._httpService.getById(id).subscribe(data =>{
      console.log("Got restaurant by ID and returned", data)
      this.selectRestaurant = data['data']
      this._httpService.getSortedReviews(id).subscribe(data =>{
        console.log("Got sorted reviews", data)
        this.sortedReviews = data['data']
      })
    })
  }

}
