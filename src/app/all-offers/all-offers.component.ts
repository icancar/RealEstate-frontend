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
  usernameToGet:string;
  myOffersSale:Offer[];
  myOffersRent:Offer[];
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem("ulogovan"))!=null;
    if(this.isLoggedIn){
      this.user=JSON.parse(localStorage.getItem("ulogovan"));
      if(this.user.userType=='administrator' || this.user.userType=='agent'){
        this.usernameToGet='agencija';
      }else {
        this.usernameToGet=this.user.username;
      }
      this.offerService.getMyOffersSale(this.usernameToGet).subscribe((o:Offer[])=>{
        if(o){
          this.myOffersSale=o;
          this.ready1=true;
        }
      })
      this.offerService.getMyOffersRent(this.usernameToGet).subscribe((o:Offer[])=>{
        if(o){
          this.myOffersRent=o;
          this.ready2=true;
        }
      })
    }else {
      this.router.navigate(["/"]);
    }


  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  ready1:boolean=false;
  ready2:boolean=false;
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
        this.ready1=false;
        window.location.reload();
        this.offerService.getMyOffersSale(this.user.username).subscribe((o:Offer[])=>{
          if(o){
            this.myOffersSale=o;
            this.ready1=true;
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
        window.location.reload();
        if(this.prvaTabela){
          this.ready1=false;
        }
        if(this.drugaTabela){
          this.ready2=false;
        }
        this.offerService.getMyOffersSale(this.user.username).subscribe((o:Offer[])=>{
          if(o){
            this.myOffersSale=o;
            if(this.prvaTabela){
              this.ready1=true;
            }
            if(this.drugaTabela){
              this.ready2=true;
            }
          }
        })
      }else {
        this.notifier.notify("error", res['message']);
      }
    })
  }

  acceptOfferRent(idOffer, idAdvertisement, offerFrom, offerTo, date1, date2){
    this.offerService.acceptOfferRent(idOffer, idAdvertisement, offerFrom, offerTo, date1, date2).subscribe((res)=>{
      if(res['message']=="offerAccepted"){
        this.notifier.notify("success", "Ponuda prihvacena!");
        this.ready2=false;
        window.location.reload();
       /* this.offerService.getMyOffersRent(this.user.username).subscribe((o:Offer[])=>{
          if(o){
            this.myOffersRent=o;
            this.ready2=true;
          }
        })*/
      }
    })
  }
}
