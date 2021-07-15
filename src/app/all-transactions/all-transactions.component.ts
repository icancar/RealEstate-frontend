import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '../models/offer';
import { User } from '../models/user';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css']
})
export class AllTransactionsComponent implements OnInit {

  constructor(private router:Router, private offerService:OffersService) { }


  isLoggedIn:boolean;
  user:User;
  offersSale:Offer[];
  offersRent:Offer[];
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem("ulogovan"))!=null;
    if(this.isLoggedIn){
      this.user=JSON.parse(localStorage.getItem("ulogovan"));
      if(this.user.userType=='korisnik'){
        localStorage.clear();
        this.router.navigate(["/"]);
      }
      this.offerService.getAllAcceptedOffersSale().subscribe((o:Offer[])=>{
        this.offersSale=o;
        this.prihodOdProdaje();
      })
      this.offerService.getAllAcceptedOffersRent().subscribe((o:Offer[])=>{
        this.offersRent=o;
        this.prihodOdIznajmljivanja();
      })
    }else {
      this.router.navigate(["/"]);

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

  prihodProdaja:number =0;
  prihodIznajmljivanje:number=0;


  prihodOdProdaje(){
    for(let i=0;i<this.offersSale.length;i++){
      if(this.offersSale[i].offerTo=='agencija'){
        this.prihodProdaja+=this.offersSale[i].price;
      }
      this.prihodProdaja+=this.offersSale[i].transactionFees;
    }
  }

  prihodOdIznajmljivanja(){
    for(let i=0;i<this.offersSale.length;i++){
      if(this.offersRent[i].offerTo=='agencija'){
        this.prihodIznajmljivanje+=this.offersRent[i].price;
      }
      this.prihodIznajmljivanje+=this.offersRent[i].transactionFees;
    }
  }

}
