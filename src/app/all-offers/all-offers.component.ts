import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Offer } from '../models/offer';
import { User } from '../models/user';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.css']
})
export class AllOffersComponent implements OnInit {

  constructor(private notifier:NotifierService,private router:Router, private offerService:OffersService) { }


  isLoggedIn:boolean;
  user:User;
  myOffersSale:Offer[];
  myOffersRent:Offer[];
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem("ulogovan"))!=null;
    if(this.isLoggedIn){
      this.user=JSON.parse(localStorage.getItem("ulogovan"));
      this.offerService.getMyOffersSale(this.user.username).subscribe((o:Offer[])=>{
        if(o){
          this.myOffersSale=o;
        }
      })
      this.offerService.getMyOffersRent(this.user.username).subscribe((o:Offer[])=>{
        if(o){
          this.myOffersRent=o;
        }
      })
    }


  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  prvaTabela:boolean=true;
  drugaTabela:boolean=false;

  prvi(){
    this.prvaTabela=true;
    this.drugaTabela=false;
  }

  drugi(){
    this.prvaTabela=false;
    this.drugaTabela=true;
  }


  acceptOfferSale(idOffer,offerFrom, offerTo, idAdvertisement){
    this.offerService.acceptOfferSale(idOffer,offerFrom,offerTo,idAdvertisement).subscribe((res)=>{
      if(res['message']=='offerAccepted'){
        this.notifier.notify("success", "Ponuda prihvacena!")
        this.offerService.getMyOffersSale(this.user.username).subscribe((o:Offer[])=>{
          if(o){
            this.myOffersSale=o;
          }
        })
        this.offerService.getMyOffersRent(this.user.username).subscribe((o:Offer[])=>{
          if(o){
            this.myOffersRent=o;
          }
        })
      }else {
        this.notifier.notify("error", res['message']);
      }
    })
  }


  declineOfferSale(idOffer){
    this.offerService.declineOfferSale(idOffer).subscribe((res)=>{
      if(res['message']=='offerDeclined'){
        this.notifier.notify("success", "Ponuda odbijena!");
        this.offerService.getMyOffersSale(this.user.username).subscribe((o:Offer[])=>{
          if(o){
            this.myOffersSale=o;
          }
        })
        this.offerService.getMyOffersRent(this.user.username).subscribe((o:Offer[])=>{
          if(o){
            this.myOffersRent=o;
          }
        })
      }else {
        this.notifier.notify("error", res['message']);
      }
    })
  }
}
