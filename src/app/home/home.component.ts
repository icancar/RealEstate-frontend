import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
  user:User;
  maxPriceSale:number;
  promotedEstates:Estate[];
  maxPriceRent:number;
  ngOnInit(): void {
    this.city=false;
    this.price=false;
    this.isLoggedIn=JSON.parse(localStorage.getItem('ulogovan'))!=null; 
    if(this.isLoggedIn){
      this.user=JSON.parse(localStorage.getItem('ulogovan'));
      if(this.user.userType=='administrator'){
        this.router.navigate(['/welcomeAdmin']);
      }
      if(this.user.userType=='agent'){
        this.router.navigate(['/welcomeAgent']);
      }
      if(this.user.userType=='korisnik'){
        this.router.navigate(['/welcomeUser']);
      }
    }
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
      }
    })
  }
  imagesObject:Array<Object>=[];

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  login(){
    this.router.navigate(['/login']);
  }
  register(){
    this.router.navigate(['/register']);
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

  details(id){
    this.router.navigate(['/estateInfo/'+id]);
  }
}
