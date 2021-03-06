import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service' ;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  restaurants = [];
  selected_Rest : any;
  show_nest = true;
  

  constructor(
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.getRestFromService()
  }
  getRestFromService(){
    this._httpService.getRestaurants().subscribe(data=>{
      console.log("Got our restaurants", data)
      this.restaurants = data['data']
    })
  }
  deleteRestaurant(id){
    console.log("Delete this rest", id)
    this._httpService.deleteByID(id).subscribe(data=>{
      console.log("Deleted restaurant and returned")
      this.getRestFromService()
    })
  }
  showEdit(rest){
    console.log("Trying to edit this restaurant", rest)
    this.selected_Rest = rest 
  }

}
