import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';

@Component({
  selector: 'app-estate-requests',
  templateUrl: './estate-requests.component.html',
  styleUrls: ['./estate-requests.component.css']
})
export class EstateRequestsComponent implements OnInit {

  constructor(private estateService:EstateService, private router:Router, private notifier:NotifierService) { }

  isLoggedIn:boolean
  allRequestedEstates: Estate[];
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem('ulogovan'))!=null; 
    this.estateService.getAllEstatesRequest().subscribe((e:Estate[])=>{
      if(e){
        this.allRequestedEstates=e;
      }
    })
  }

  details(id){
    this.router.navigate(['/estateInfo/'+id]);
  }
  
  acceptEstateRequest(id){
    this.estateService.acceptEstateRequest(id).subscribe((res)=>{
      if(res['message']=='requestAccepted'){
        this.estateService.getAllEstatesRequest().subscribe((e:Estate[])=>{
          if(e){
            this.allRequestedEstates=e;
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
        this.estateService.getAllEstatesRequest().subscribe((e:Estate[])=>{
          if(e){
            this.allRequestedEstates=e;
          }
        })
      }else {
        this.notifier.notify('error', res['message']);
      }
    })

  }
}
