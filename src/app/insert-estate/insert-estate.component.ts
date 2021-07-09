import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { EstateService } from '../estate.service';
import { FilesService } from '../files.service';
import { Estate } from '../models/estate';
import { User } from '../models/user';

@Component({
  selector: 'app-insert-estate',
  templateUrl: './insert-estate.component.html',
  styleUrls: ['./insert-estate.component.css']
})
export class InsertEstateComponent implements OnInit {

  constructor(private notifier:NotifierService, private fileService:FilesService, private estateService:EstateService) { }


  estateForm:FormGroup;
  submitted:boolean=false;
  photosFile: File[];
  numberOfFloors1:string;
  photos:string[]=[];
  loggedInUser:User;
  ownerUsername:string;
  approvedBoolean:boolean;
  furnitureBoolean:boolean;
  ngOnInit(): void {
    this.notifier.notify('success', "WELCOME");
    this.submitted=false;
    this.loggedInUser=JSON.parse(localStorage.getItem('ulogovan'));
    this.estateForm=new FormGroup({
      name: new FormControl("",Validators.required),
      municipality: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      street: new FormControl("", Validators.required),
      streetNumber: new FormControl("", Validators.required),
      typeOfAdvertisement: new FormControl(""),
      price: new FormControl("", Validators.required),
      size: new FormControl("", Validators.required),
      typeOfEstate: new FormControl(""),
      numberOfFloors: new FormControl(""),
      floorNumber: new FormControl("", Validators.required),
      furniture: new FormControl(""),
      numberOfRooms: new FormControl("", Validators.required),
    })
    
  }

  get name(){
    return this.estateForm.get('name');
  }
  get municipality(){
    return this.estateForm.get('municipality');
  }
  get city(){
    return this.estateForm.get('city');
  }
  get street(){
    return this.estateForm.get('street');
  }
  get streetNumber(){
    return this.estateForm.get('streetNumber');
  }
  get typeOfAdvertisement(){
    return this.estateForm.get('typeOfAdvertisement');
  }
  get price(){
    return this.estateForm.get('price');
  }
  get size() {
    return this.estateForm.get('size');
  }
  get typeOfEstate() {
    return this.estateForm.get('typeOfEstate');
  }
  get numberOfFloors() {
    return this.estateForm.get('numberOfFloors');
  }
  get floorNumber() {
    return this.estateForm.get('floorNumber');
  }
  get furniture() {
    return this.estateForm.get('furniture');
  }
  get numberOfRooms() {
    return this.estateForm.get('numberOfRooms');
  }

  insert(){
    this.notifier.notify("warning", this.floorNumber.value)
    this.submitted=true;
    if(this.photos.length>=0 && this.photos.length<3){
      this.notifier.notify('warning', "Potrebno je dodati vise od 3 fotografije nekretnine")
    }else {
      if(this.estateForm.valid){ //sve je ok sa parametrima;
        this.fileService.uploadEstatePhotos(this.photosFile).subscribe((response)=>{
          if(response) this.notifier.notify("success", "Slike uploadovane!");
          if(this.loggedInUser.userType=='agent'){
            this.ownerUsername="agencija";
          }else {
            this.ownerUsername=this.loggedInUser.username;
          }
          if(this.furniture.value=="yes"){
            this.furnitureBoolean=true;
          }else if(this.furniture.value=="no"){
            this.furnitureBoolean=false;
          }
          if(this.loggedInUser.userType=='administrator' || this.loggedInUser.userType=='agent'){
            this.approvedBoolean=true;
          }else if(this.loggedInUser.userType=='korisnik'){
            this.approvedBoolean=false;
          }
          let estate=new Estate(this.name.value,this.municipality.value,this.city.value,this.street.value,this.ownerUsername, this.streetNumber.value, this.typeOfAdvertisement.value,this.size.value, this.price.value,this.typeOfEstate.value,this.numberOfFloors.value,this.floorNumber.value,this.photos,this.furnitureBoolean,this.numberOfRooms.value,this.approvedBoolean );
          this.estateService.insertEstate(estate).subscribe(res =>{
            if(res['message']=='estateAdded'){
              this.notifier.notify('success', "Estate added")
            }
            else {
              this.notifier.notify('error', res['message']);
            }
          })
        });
      }
    }
  

  }


  onFilesChange(event){
    if (event.target.files.length > 0) {
      this.photosFile = event.target.files;
      this.photos = [];
      for (let i = 0; i < this.photosFile.length; i++) {
        this.photos.push("../../assets/properties/" + this.photosFile[i].name);
      }
    }
  }
}
