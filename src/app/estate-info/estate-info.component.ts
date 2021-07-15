import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';
import { Fee } from '../models/fee';
import { Offer } from '../models/offer';
import { User } from '../models/user';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-estate-info',
  templateUrl: './estate-info.component.html',
  styleUrls: ['./estate-info.component.css']
})
export class EstateInfoComponent implements OnInit {

  constructor(private offerService:OffersService,private route:ActivatedRoute, private notifier:NotifierService, private estateService:EstateService, private router:Router) { }

  fee:Fee;
  startDate:string;
  endDate:string;
  isLoggedIn:boolean;
  id:string;
  iznajmljivanjeB:boolean;
  prodajaB:boolean;
  ucesce:number;
  placanje:string;
  offers:Offer[];
  ukupno:number;
  user:User;
  imagesObject:Array<Object>=[];
  estate:Estate;
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem('ulogovan'))!=null;
    if(this.isLoggedIn){
      this.user=JSON.parse(localStorage.getItem('ulogovan'))
    }else {
      this.router.navigate(["/"]);
    }
    
    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id!=null){
      this.estateService.getEstateViaId(this.id).subscribe((e:Estate)=>{
        if(e){
          this.estate=e;
          if(this.estate.ownerUsername=='agencija' && (this.user.userType=='agent' || this.user.userType=='administrator')){
            this.prodajaB=false;
            this.iznajmljivanjeB=false
          }else {
          if(this.estate.ownerUsername!=this.user.username){
            this.prodajaB=true;
            this.iznajmljivanjeB=true;
          }
          else{
            this.prodajaB=false;
            this.iznajmljivanjeB=false;
          }
        }
          this.ucesce=this.estate.price/5;
          this.ukupno=this.ucesce+this.estate.price;
          for(let i=0;i<this.estate.gallery.length;i++){
            let o={
              image:this.estate.gallery[i],
              alt:'',
              thumbImage:this.estate.gallery[i],
              title:"Slika "+(i+1)            }
            this.imagesObject.push(o);
          }
          this.estateService.getFee("icancar99").subscribe((f:Fee)=>{
            this.fee=f;
          })
          if(this.estate.typeOfAdvertisement=='iznajmljivanje'){
            this.offerService.getOffersForAdRent(this.estate.idAdvertisement).subscribe((o:Offer[])=>{
              if(o){
                this.offers=o;
              }
            })
          }
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

  
  available:boolean=true;
  ponudaRezervacija(){
    if(this.endDate==null && this.startDate==null){
      this.notifier.notify("warning", "Morate odabrati datum")
    }else {
      this.checkAvailability();
      if(this.available){
      let transactionFee=(this.fee.prodaja*this.estate.price)/100;
      if(this.estate.ownerUsername=='agencija' || this.user.userType=='administrator' || this.user.userType=='agent'){
        transactionFee=0;
      }
      let date1=new Date(this.startDate).toISOString().substr(0,10);
      let date2=new Date(this.endDate).toISOString().substring(0,10);
      let o = new Offer("iznajmljivanje",this.estate.idAdvertisement, this.estate.name,this.user.username, this.estate.ownerUsername, date1, date2,false, transactionFee,"waiting", this.estate.price);
      this.offerService.sendOffer(o).subscribe((res)=>{
        if(res['message']=="offerSent"){
          this.notifier.notify("success", "Ponuda poslata!");
        }
      })
      }else {
        this.notifier.notify("warning", "Morate odabrati drugi termin, nekretnina je zauzeta u trazenom periodu!")
      }
     }
  }

  ponudaProdaja(){
    if(this.price==null){
      this.notifier.notify("warning", "Morate unijeti ponudu")
    }
    else {
    let transactionFee=(this.fee.prodaja*this.price)/100;
    if(this.estate.ownerUsername=='agencija' || this.user.userType=='administrator' || this.user.userType=='agent'){
      transactionFee=0;
    }
    let o = new Offer("prodaja",this.estate.idAdvertisement, this.estate.name,this.user.username, this.estate.ownerUsername, "", "",false, transactionFee,"waiting", this.price);
    this.offerService.sendOffer(o).subscribe((res)=>{
      if(res['message']=="offerSent"){
        this.notifier.notify("success", "Ponuda poslata!");
      }
    })
  }
  }


  
  price:number;
  checkAvailability(){
    this.available=true;
    let date1=new Date(this.startDate).toISOString().substr(0,10);
    let date2=new Date(this.endDate).toISOString().substring(0,10);
    let d1=new Date(date1);
    let d2=new Date(date2);
    if(this.offers==null){
      this.available=true;
    }else {
      for(let i=0;i<this.offers.length;i++){
        let o = this.offers[i];
        let df=new Date(o.date1);
        let dt=new Date(o.date2);
        if((df<=d1 && dt>d1)||(df<=d2 && dt>d2)||(d1<df && d2>dt)||(d1>df && d2<dt)){
          this.available=false;
          break;
        }
      }
    }
  }

  
}
