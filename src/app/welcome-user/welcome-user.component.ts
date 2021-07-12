import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.css']
})
export class WelcomeUserComponent implements OnInit {


  constructor(private router:Router, private notifier:NotifierService, private estateService:EstateService) { }

  searchType:string
  citySearch:string="";
  city:boolean
  price:boolean
  minPriceSearch:number=0;
  maxPriceSearch:number;
  allApprovedEstates:Estate[];
  priceSearch:number;
  isLoggedIn:boolean
  maxPriceSale:number;
  promotedEstates:Estate[];
  maxPriceRent:number;
  ngOnInit(): void {
    this.city=false;
    this.price=false;
    this.isLoggedIn=JSON.parse(localStorage.getItem('ulogovan'))!=null; 
    this.estateService.getAllApprovedEstates().subscribe((e:Estate[])=>{
      if(e){
        this.maxPriceSale=0;
        this.maxPriceRent=0;
        this.allApprovedEstates=e;
        for(let i=0;i<this.allApprovedEstates.length;i++){
          if(this.allApprovedEstates[i].typeOfAdvertisement=='prodaja'){
            if(this.maxPriceSale<this.allApprovedEstates[i].price){
              this.maxPriceSale=this.allApprovedEstates[i].price
            }
          }if(this.allApprovedEstates[i].typeOfAdvertisement=='iznajmljivanje'){
            if(this.maxPriceRent<this.allApprovedEstates[i].price){
              this.maxPriceRent=this.allApprovedEstates[i].price
            }
          }
        }
      }
    })
    this.estateService.getAllPromotedEstates().subscribe((e:Estate[])=>{
      if(e){
        this.promotedEstates=e;
        for(let i=0;i<this.promotedEstates.length;i++){
          let o={image:this.promotedEstates[i].gallery[0], thumbImage:this.promotedEstates[i].gallery[0], alt:'', title:this.promotedEstates[i].name};
          this.imagesObject.push(o);
        }
        this.notifier.notify("success", ""+this.promotedEstates.length);
      }
    })
  }
  imagesObject:Array<Object>=[];

  details(id){
    this.router.navigate(['/estateInfo/'+id]);
  }

  search() {
    if(this.city && !this.price){
     //pretraga po gradu
     this.estateService.searchByCity(this.citySearch).subscribe((e:Estate[])=>{
      if(e){
        this.allApprovedEstates=e;
      }
    })
    }
    else if(!this.city && this.price){
     //pretraga po ceni
     this.notifier.notify('error', this.minPriceSearch+","+this.maxPriceSearch)
     this.estateService.searchByPrice(this.minPriceSearch, this.maxPriceSearch).subscribe((e:Estate[])=>{
      if(e){
        this.allApprovedEstates=e;
      }
    })
    }
    else if(this.city && this.price){
      //pretraga i po ceni i po gradu
      this.estateService.searchByPriceAndCity(this.citySearch,this.minPriceSearch,this.maxPriceSearch).subscribe((e:Estate[])=>{
        if(e){
          this.allApprovedEstates=e;
        }
      })
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
