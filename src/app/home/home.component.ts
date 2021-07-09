import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private notifier:NotifierService, private estateService:EstateService) { }

  searchType:string
  citySearch:string
  city:boolean
  price:boolean
  minPriceSearch:number;
  maxPriceSearch:number;
  allApprovedEstates:Estate[];
  priceSearch:number;
  isLoggedIn:boolean
  maxPriceSale:number;
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
  }

  imageObject: Array<object> = [{
    image: 'assets/users/cop.jpg',
    thumbImage: 'assets/users/cop.jpg',
    alt: 'alt of image',
    title: 'Slika 1'
},{
  image: 'assets/users/cop.jpg',
  thumbImage: 'assets/users/cop.jpg',
  alt: 'alt of image',
  title: 'Slika 2'
},{
  image: 'assets/users/cop.jpg',
  thumbImage: 'assets/users/cop.jpg',
  alt: 'alt of image',
  title: 'Slika 3'
},{
  image: 'assets/users/cop.jpg',
  thumbImage: 'assets/users/cop.jpg',
  alt: 'alt of image',
  title: 'Slika 4'
},{
  image: 'assets/users/cop.jpg',
  thumbImage: 'assets/users/cop.jpg',
  alt: 'alt of image',
  title: 'Slika 5'
},{
  image: 'assets/users/cop.jpg',
  thumbImage: 'assets/users/cop.jpg',
  alt: 'alt of image',
  title: 'Slika 6'
},{
  image: 'assets/users/cop.jpg',
  thumbImage: 'assets/users/cop.jpg',
  alt: 'alt of image',
  title: 'Slika 7'
},{
  image: 'assets/users/cop.jpg',
  thumbImage: 'assets/users/cop.jpg',
  alt: 'alt of image',
  title: 'Slika 8 '
},{
  image: 'assets/users/cop.jpg',
  thumbImage: 'assets/users/cop.jpg',
  alt: 'alt of image',
  title: 'Slika 9'
},{
  image: 'assets/users/cop.jpg',
  thumbImage: 'assets/users/cop.jpg',
  alt: 'alt of image',
  title: 'Slika 10'
},{
  image: 'assets/users/cop.jpg',
  thumbImage: 'assets/users/cop.jpg',
  alt: 'alt of image',
  title: 'Slika 11'
},{
  image: 'assets/users/cop.jpg',
  thumbImage: 'assets/users/cop.jpg',
  alt: 'alt of image',
  title: 'Slika 12'
},{
  image: 'assets/users/cop.jpg',
  thumbImage: 'assets/users/cop.jpg',
  alt: 'alt of image',
  title: 'Slika 13'
},
];

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

  details(id){
    this.router.navigate(['/estateInfo/'+id]);
  }
}
