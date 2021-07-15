import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { FilesService } from '../files.service';
import { User } from '../models/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private route:ActivatedRoute,private filesService:FilesService,private router:Router, private notifier:NotifierService, private userService:UsersService) { }


  imagesrc:string;
  image;
  isLoggedIn:boolean;
  user:User;
  u1:User;
  loggedInUser:User;
  username:string;
  pictureSource:string;
  userForm:FormGroup=null;
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem('ulogovan'))!=null;
    if(this.isLoggedIn){
      this.loggedInUser=JSON.parse(localStorage.getItem("ulogovan"));
      if(this.loggedInUser.userType=='agent'){
        this.logout();
      }
    }
    if(!this.isLoggedIn){
      localStorage.clear();
      this.router.navigate(['/']);

    }else {
    this.username=this.route.snapshot.paramMap.get('username');
    if(this.username!=null){
      this.notifier.notify('success', ""+this.username);
    }
    else {
    this.u1=JSON.parse(localStorage.getItem('ulogovan'));
    this.username=this.u1.username;
  }
    this.userService.getUserFromUsername(this.username).subscribe((u:User)=>{
        this.user=u;
        this.pictureSource=this.user.picture;
        this.userForm=new FormGroup({
            name: new FormControl(this.user.ime,[Validators.minLength(1), Validators.required]),
            surname: new FormControl(this.user.prezime, [Validators.required,Validators.minLength(1)]),
            city: new FormControl(this.user.city, [Validators.required,Validators.minLength(1)]),
            country: new FormControl(this.user.country, [Validators.required, Validators.minLength(1)])
  
        })
      
    })
    }
  }

  get name(){
    return this.userForm.get('name');
  }
  get surname(){
    return this.userForm.get('surname');
  }
  get city(){
    return this.userForm.get('city');
  }
  get country(){
    return this.userForm.get('country');
  }


  update(){
    this.userService.updateUserInfo(this.user.username, this.name.value, this.surname.value, this.city.value, this.country.value).subscribe(res =>{
      if(res['message']=='userUpdated'){
        this.notifier.notify('success', "Informacije uspjesno azurirane");
        this.userService.getUserFromUsername(this.u1.username).subscribe((u:User)=>{
      if(u){
        this.user=u;
      }
    })
      }
      else {
        this.notifier.notify('error', res['message']);
      }
    })
   
  }

  onFileChange(event) {

    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.image = file;
      this.imagesrc=event.target.files[0].name;
      this.filesService.uploadProfilePhoto(this.image).subscribe((response) => {
        let path: string = response['path'];
        this.user.picture="../.." + path.substring(26).replace("\\", "/").replace("\\", "/").replace("\\", "/");
        this.userService.updatePhoto(this.user.username,"../.." + path.substring(26).replace("\\", "/").replace("\\", "/").replace("\\", "/")).subscribe(res=>{
          if(res['message']=='profilePhotoUpdated'){
            this.notifier.notify("success", "Profilna slika azurirana!")
            this.pictureSource="../.." + path.substring(26).replace("\\", "/").replace("\\", "/").replace("\\", "/");
            this.user=JSON.parse(localStorage.getItem('ulogovan'));
            this.user.picture=this.pictureSource;
            localStorage.clear();
            localStorage.setItem('ulogovan', JSON.stringify(this.user));
          }
          else {
            this.notifier.notify('error', res['message']);
          }
        })
     });
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/"]);
  }


}
