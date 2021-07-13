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
      this.offerService.getAllAcceptedOffersSale().subscribe((o:Offer[])=>{
        this.offersSale=o;
      })
      this.offerService.getAllAcceptedOffersRent().subscribe((o:Offer[])=>{
        this.offersRent=o;
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

}
