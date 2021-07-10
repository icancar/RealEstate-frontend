import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';
import { User } from '../models/user';

@Component({
  selector: 'app-all-estates',
  templateUrl: './all-estates.component.html',
  styleUrls: ['./all-estates.component.css']
})
export class AllEstatesComponent implements OnInit {

  constructor(private notifier:NotifierService,private estateService:EstateService, private router:Router) { }
  user:User;
  estates:Estate[];
  isLoggedIn:boolean;
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem('ulogovan'))!=null;
    this.user=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.user.userType!='agent'){
      localStorage.clear();
      this.router.navigate(["/"]);
    }
    this.estateService.getAllEstates().subscribe((e:Estate[])=>{
      if(e){
        this.estates=e;
      }
    })
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  info(id){
    this.router.navigate(['/estateInfo/'+id]);
  }

  promoteEstate(id){
    this.estateService.promoteEstate(id).subscribe(res=>{
      if(res['message']=='estatePromoted'){
        this.notifier.notify("success", "Estate Promoted!")
        this.estateService.getAllEstates().subscribe((e:Estate[])=>{
          if(e){
            this.estates=e;
          }
        })
      }else {
        this.notifier.notify('error', res['message']);
      }
    })
  }
  unpromoteEstate(id){
    this.estateService.unpromoteEstate(id).subscribe(res=>{
      if(res['message']=='estateUnPromoted'){
        this.notifier.notify("success", "Estate Unpromoted!")
        this.estateService.getAllEstates().subscribe((e:Estate[])=>{
          if(e){
            this.estates=e;
          }
        })
      }else {
        this.notifier.notify('error', res['message']);
      }
    })
  }


  acceptEstateRequest(id){
    this.estateService.acceptEstateRequest(id).subscribe((res)=>{
      if(res['message']=='requestAccepted'){
        this.notifier.notify("success", "Estate approved!")
        this.estateService.getAllEstatesRequest().subscribe((e:Estate[])=>{
          if(e){
            this.estates=e;
          }
        })
      }else {
        this.notifier.notify('error', res['message']);
      }
    })

  }

  declineEstateRequest(id){
    this.estateService.declineEstateRequest(id).subscribe((res)=>{
      if(res['message']=='requestDeclined'){
        this.notifier.notify("success", "Estate not approved!")
        this.estateService.getAllEstatesRequest().subscribe((e:Estate[])=>{
          if(e){
            this.estates=e;
          }
        })
      }else {
        this.notifier.notify('error', res['message']);
      }
    })

  }

}
