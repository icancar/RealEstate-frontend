import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';
import { User } from '../models/user';

@Component({
  selector: 'app-estate-info',
  templateUrl: './estate-info.component.html',
  styleUrls: ['./estate-info.component.css']
})
export class EstateInfoComponent implements OnInit {

  constructor(private route:ActivatedRoute, private notifier:NotifierService, private estateService:EstateService, private router:Router) { }


  startDate:string;
  endDate:string;
  isLoggedIn:boolean;
  id:string;
  ucesce:number;
  placanje:string;
  ukupno:number;
  user:User;
  imagesObject:Array<Object>=[];
  estate:Estate;
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem('ulogovan'))!=null;
    if(this.isLoggedIn){
      this.user=JSON.parse(localStorage.getItem('ulogovan'))
    }
    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id!=null){
      this.estateService.getEstateViaId(this.id).subscribe((e:Estate)=>{
        if(e){
          this.estate=e;
          this.ucesce=this.estate.price/5;
          this.ukupno=this.ucesce+this.estate.price;
          for(let i=0;i<this.estate.gallery.length;i++){
            let o={
              image:this.estate.gallery[i],
              alt:'',
              thumbImage:this.estate.gallery[i],
              title:i+1
            }
            this.imagesObject.push(o);
          }
        }
      })
    }
  }

  reserve(){
    if(this.endDate==null && this.startDate==null){
      this.notifier.notify("warning", "Morate odabrati datum")
    }else {
    this.notifier.notify("success", this.startDate+", "+this.endDate)
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate['/'];
  }
}
