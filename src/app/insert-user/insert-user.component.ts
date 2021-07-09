import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { StringifyOptions } from 'querystring';
import { FilesService } from '../files.service';
import { User } from '../models/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-insert-user',
  templateUrl: './insert-user.component.html',
  styleUrls: ['./insert-user.component.css']
})
export class InsertUserComponent implements OnInit {

  constructor(private filesService:FilesService, private userService:UsersService, private notifier:NotifierService) {
    this.notifier=notifier;
   }

 
  imagesrc:string;
  image;
  submitted:boolean=false;
  picturePath:string;
  regForm:FormGroup;


  ngOnInit(): void {
    this.submitted=false;
    this.regForm=new FormGroup({
      name: new FormControl("",[Validators.minLength(1), Validators.required]),
      surname: new FormControl("", [Validators.required,Validators.minLength(1)]),
      username: new FormControl("", [Validators.required, Validators.minLength(1)]),
      password: new FormControl("",[Validators.required, Validators.maxLength(24)]),
      re_password:new FormControl("", [Validators.required,Validators.minLength(1)]),
      email:new FormControl("",[Validators.required, Validators.minLength(1),Validators.email]),
      city: new FormControl("", [Validators.required,Validators.minLength(1)]),
      country: new FormControl("", [Validators.required, Validators.minLength(1)])

    })
  }

  onFileChange(event) {

      if(event.target.files.length > 0) 
       { const file = event.target.files[0];
        this.image = file;
         this.imagesrc=event.target.files[0].name;
         
       }


  }

  onPasswordChange() {
    let password=this.regForm.get('password');
    let re_password=this.regForm.get('re_password');
    if (re_password.value ==password.value) {
      this.re_password.setErrors(null);
    } else {
      this.re_password.setErrors({ mismatch: true });
    }
    let regex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    if(regex.test(password.value)){
      let reg2=/(.)\1\1\1/;
      if(reg2.test(password.value)){
        this.password.setErrors({multiple:true})
      }else {
        this.password.setErrors(null);
      }
    }else {
      this.password.setErrors({multiple:true})
    }
  }


  register(){
  this.submitted=true;
  if(this.regForm.valid){ //sva polja ok, moze unos
    let name=this.regForm.get('name').value;
    let surname=this.regForm.get('surname').value;
    let username=this.regForm.get('username').value;
    let password=this.regForm.get('password').value;
    let re_password=this.regForm.get('re_password').value;
    let email=this.regForm.get('email').value;
    let city=this.regForm.get('city').value;
    let country=this.regForm.get('country').value;
    if (this.image != undefined) { //korisnik je ubacio svoju profilnu sliku
      this.filesService.uploadProfilePhoto(this.image).subscribe((response) => {
        let path: string = response['path'];
        this.picturePath="../.." + path.substring(26).replace("\\", "/").replace("\\", "/").replace("\\", "/");
        let user = new User(name, surname, username, password,this.picturePath,email,city,country,true)
        this.userService.register(user).subscribe(res =>{
          if(res['message']=='userAdded'){
            this.notifier.notify('success', "User added")
          }
          else if(res['message']=='usernameExists'){
            this.notifier.notify('warning', "Username already exists")
          }
          else if(res['message']=='emailExists'){
            this.notifier.notify('warning',"Email already exists")
          }
          else {
            this.notifier.notify('error', res['message']);
          }
        })
      });
  }else { //korisnik nije ubacio profilnu sliku
      let path="../../assets/users/genericProfilePhoto.png"
      let user = new User(name, surname, username, password, path,email,city,country,true);
        this.userService.register(user).subscribe(res =>{
          if(res['message']=='userAdded'){
            this.notifier.notify('success', "User added");
          }
          else if(res['message']=='usernameExists'){
            this.notifier.notify('warning', "Username already exists");
          }
          else if(res['message']=='emailExists'){
            this.notifier.notify('warning',"Email already exists");
          }
          else {
            this.notifier.notify('error', res['message']);
          }
        })

  }
    
  }
}


get name(){
  return this.regForm.get('name');
}
get surname(){
  return this.regForm.get('surname');
}
get username(){
  return this.regForm.get('username');
}
get password(){
  return this.regForm.get('password');
}
get re_password(){
  return this.regForm.get('re_password');
}
get email(){
  return this.regForm.get('email');
}
get city(){
  return this.regForm.get('city');
}
get country(){
  return this.regForm.get('country');
}
}
