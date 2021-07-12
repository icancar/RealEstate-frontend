import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { User } from '../models/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private router:Router, private notifier:NotifierService, private userSevice:UsersService) { }

  changePasswordForm:FormGroup
  isLoggedIn:boolean
  submitted:boolean
  user:User;
  ngOnInit(): void {
    this.submitted=false;
    this.isLoggedIn=JSON.parse(localStorage.getItem('ulogovan'))!=null; 
    if(this.isLoggedIn){
      this.user=JSON.parse(localStorage.getItem('ulogovan'));
    }else {
      localStorage.clear();
      this.router.navigate(['/']);
    }
    this.changePasswordForm=new FormGroup({
      old_password: new FormControl("", Validators.required),
      new_password: new FormControl("", [Validators.required, Validators.maxLength(24)]),
      re_new_password: new FormControl("",Validators.required)
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  get old_password(){
    return this.changePasswordForm.get('old_password');
  }
  get new_password(){
    return this.changePasswordForm.get('new_password');
  }
  get re_new_password(){
    return this.changePasswordForm.get('re_new_password');
  }


  submit() {
    this.submitted=true;
    if(this.changePasswordForm.valid){
      let user=JSON.parse(localStorage.getItem('ulogovan'));
      if(user!=null && user.password==this.old_password.value){
      this.userSevice.changePassword(user.username, this.old_password.value,this.new_password.value).subscribe((res)=>{
        if(res['message']=='passwordChanged'){
          
          this.notifier.notify('success', "Password successfully changed")
          this.logout();

        }
        else if (res['message']=='UserDoesNotExist'){
          this.notifier.notify('error',"User does not exist")
        }
        else {
          this.notifier.notify('error', res['message']);
        }
      })
    }else {
      this.notifier.notify('error', "Wrong password")
    }
  } 
  }


  onPasswordChange() {
    let password=this.changePasswordForm.get('new_password');
    let re_password=this.changePasswordForm.get('re_new_password');
    if (re_password.value ==password.value) {
      this.re_new_password.setErrors(null);
    } else {
      this.re_new_password.setErrors({ mismatch: true });
    }
    let regex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    if(regex.test(password.value)){
      let reg2=/(.)\1\1\1/;
      if(reg2.test(password.value)){
        this.new_password.setErrors({multiple:true})
      }else {
        this.new_password.setErrors(null);
      }
    }else {
      this.new_password.setErrors({multiple:true})
    }
  }

}
