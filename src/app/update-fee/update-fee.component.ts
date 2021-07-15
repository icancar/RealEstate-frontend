import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EstateService } from '../estate.service';
import { Fee } from '../models/fee';
import { User } from '../models/user';

@Component({
  selector: 'app-update-fee',
  templateUrl: './update-fee.component.html',
  styleUrls: ['./update-fee.component.css']
})
export class UpdateFeeComponent implements OnInit {

  constructor(private router:Router, private estateService:EstateService, private notifier:NotifierService) { }


  user:User;
  actualFee:Fee;
  isLoggedIn:boolean;
  fee:FormGroup;
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem('ulogovan'))!=null;
    if(this.isLoggedIn){
      this.user=JSON.parse(localStorage.getItem('ulogovan'));
      if(this.user.userType!='administrator'){
        localStorage.clear();
        this.router.navigate(["/"]);
      }
      this.estateService.getFee(this.user.username).subscribe((f:Fee)=>{
        this.actualFee=f;
        this.fee=new FormGroup({
          prodaja: new FormControl(this.actualFee.prodaja, Validators.required),
          iznajmljivanje: new FormControl(this.actualFee.iznajmljivanje, Validators.required)
        })
      })
    
    }else {
      this.router.navigate(["/"]);
    }
    
  }
submitted:boolean=false;

  get prodaja(){
    return this.fee.get("prodaja");
  }
  get iznajmljivanje(){
    return this.fee.get("iznajmljivanje");
  }


  logout(){
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  updateFee(){
    this.submitted=true;
    this.estateService.updateFee(this.prodaja.value, this.iznajmljivanje.value, this.user.username).subscribe((res)=>{
      if(res["message"]=='feeUpdated'){
        this.notifier.notify("success", "Procenti azurirani!")
      }else {
        this.notifier.notify("error", res["message"]);
      }
    })
  }
}
