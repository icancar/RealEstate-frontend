import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estate } from './models/estate';

@Injectable({
  providedIn: 'root'
})
export class EstateService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }


  getAllApprovedEstates() {
    return this.http.get(`${this.uri}/estates/getAllApprovedEstates`)
  }
  getAllEstatesRequest(){
    return this.http.get(`${this.uri}/estates/getAllEstatesRequest`)
  }
  acceptEstateRequest(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/estates/acceptRequest`, data);
  }
  declineEstateRequest(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/estates/declineRequest`, data);
  }
  searchByCity(cityName){
    const data={
      cityName:cityName
    }
    return this.http.post(`${this.uri}/estates/searchByCity`, data);
  }
  searchByPrice(priceMin:number, priceMax:number){
    const data={
      priceMin:priceMin,
      priceMax:priceMax
    }
    return this.http.post(`${this.uri}/estates/searchByPrice`, data)
  }
  searchByPriceAndCity(cityName, priceMin:number, priceMax:number){
    const data={
      cityName:cityName,
      priceMin:priceMin,
      priceMax:priceMax
    }
    return this.http.post(`${this.uri}/estates/searchByPriceAndCity`, data)
  }

  getAllEstatesForUser(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/estates/getMyEstates`, data)
  }

  insertEstate(estate:Estate){
    const data={
      name:estate.name,
      municipality:estate.municipality,
      city:estate.city,
      street:estate.street,
      streetNumber:estate.streetNumber,
      ownerUsername:estate.ownerUsername,
      typeOfAdvertisement:estate.typeOfAdvertisement,
      price:estate.price,
      idAdvertisement:5,
      size:estate.size,
      typeOfEstate:estate.typeOfEstate,
      numberOfFloors:estate.numberOfFloors,
      floorNumber:estate.floorNumber,
      gallery:estate.gallery,
      furniture:estate.furniture,
      numberOfRooms:estate.numberOfRooms,
      promoted:false,
      approved:estate.approved,
      views:0
    }
    return this.http.post(`${this.uri}/estates/insertEstate`, data);
  }
}
