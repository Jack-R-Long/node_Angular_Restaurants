import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http: HttpClient
  ) { }
  getRestaurants(){
    return this._http.get('/restaurants')
  }
  postRestaurant(newRestaurant){
    return this._http.post('/restaurants', newRestaurant)
  }
  deleteByID(id){
    return this._http.delete(`/restaurants/${id}`)
  }
  getById(id){
    return this._http.get(`/restaurants/${id}`)
  }
  editRestaurant(editedRestaurant){
    return this._http.put(`/restaurants/${editedRestaurant._id}`, editedRestaurant)
  }
  postReview(newReview){
    return this._http.post('/reviews', newReview)
  }
  getSortedReviews(id){
    return this._http.get(`/reviews/${id}`)
  }
  getByTitle(title){
    return this._http.get(`/restaurants_title/${title}`)
  }
}
