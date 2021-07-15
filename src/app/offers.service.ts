import { HttpClient } from '@angular/common/http';
import { Injectable, ɵɵInheritDefinitionFeature } from '@angular/core';
import { Offer } from './models/offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  sendOffer(offer:Offer){
    const data={
      typeOfOffer:offer.typeOfOffer,
      idAdvertisement:offer.idAdvertisement,
      nameOfAdvertisement:offer.nameOfAdvertisement,
      offerFrom:offer.offerFrom,
      offerTo:offer.offerTo,
      date1:offer.date1,
      date2:offer.date2,
      accepted:offer.accepted,
      transactionFees:offer.transactionFees,
      status:offer.status,
      price:offer.price
    }
    return this.http.post(`${this.uri}/offers/sendOffer`, data);

  }

  acceptOfferSale(idOffer, offerFrom, offerTo, idAdvertisement){
    const data={
      idOffer:idOffer,
      offerFrom:offerFrom,
      offerTo:offerTo,
      idAdvertisement:idAdvertisement
    }
    return this.http.post(`${this.uri}/offers/acceptOfferSale`, data);
  }

  declineOfferSale(idOffer){
    const data={
      idOffer:idOffer
    }
    return this.http.post(`${this.uri}/offers/declineOfferSale`, data);
  }

  getOffersForAdRent(idAdvertisement){
    const data={
      idAdvertisement:idAdvertisement
    }
    return this.http.post(`${this.uri}/offers/getOffersForAdRent`, data);
  }

  getAllAcceptedOffersSale(){
    return this.http.get(`${this.uri}/offers/getAllAcceptedOffersSale`);
  }
  getAllAcceptedOffersRent(){
    return this.http.get(`${this.uri}/offers/getAllAcceptedOffersRent`);
  }

  getMyOffersSale(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/offers/getMyOffersSale`, data);
  }

  getMyOffersRent(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/offers/getMyOffersRent`, data);
  }

  acceptOfferRent(idOffer, idAdvertisement, offerFrom, offerTo, date1, date2){
    const data={
      idOffer:idOffer,
      idAdvertisement:idAdvertisement,
      offerFrom:offerFrom,
      offerTo:offerTo,
      date1:date1,
      date2:date2
    }
    return this.http.post(`${this.uri}/offers/acceptOfferRent`, data);
  }

}
