import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EstateService } from '../estate.service';
import { FilesService } from '../files.service';
import { Estate } from '../models/estate';
import { User } from '../models/user';

@Component({
  selector: 'app-edit-estate-info',
  templateUrl: './edit-estate-info.component.html',
  styleUrls: ['./edit-estate-info.component.css']
})
export class EditEstateInfoComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute, private estateService:EstateService, private notifier:NotifierService, private fileService:FilesService) { }
  isLoggedIn:boolean;
  user:User;
  estate:Estate;
  estateInfo:FormGroup;
  idEstate:number;
  submitted:boolean=false;
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem("ulogovan"))!=null;
    if(this.isLoggedIn){
      this.user=JSON.parse(localStorage.getItem("ulogovan"));
    }else {
      this.router.navigate(["/"]);
    }
    this.idEstate=parseInt(this.route.snapshot.paramMap.get('id'));
    if(this.idEstate!=null){
      this.estateService.getEstateViaId(this.idEstate).subscribe((e:Estate)=>{
        this.estate=e;
        this.photos=this.estate.gallery;
        this.estateInfo=new FormGroup({
        name: new FormControl(this.estate.name,Validators.required),
      municipality: new FormControl(this.estate.municipality, Validators.required),
      city: new FormControl(this.estate.city, Validators.required),
      street: new FormControl(this.estate.street, Validators.required),
      streetNumber: new FormControl(this.estate.streetNumber, Validators.required),
      typeOfAdvertisement: new FormControl(this.estate.typeOfAdvertisement),
      price: new FormControl(this.estate.price, Validators.required),
      size: new FormControl(this.estate.size, Validators.required),
      typeOfEstate: new FormControl(this.estate.typeOfEstate, Validators.required),
      numberOfFloors: new FormControl(this.estate.numberOfFloors.toString()),
      floorNumber: new FormControl(this.estate.floorNumber.toString()),
      furniture: new FormControl(this.estate.furniture==true? "yes":'no', Validators.required),
      numberOfRooms: new FormControl(this.estate.numberOfRooms, Validators.required),
        })
      })
    }
  }


  logout(){
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  get name(){
    return this.estateInfo.get('name');
  }
  get municipality(){
    return this.estateInfo.get('municipality');
  }
  get city(){
    return this.estateInfo.get('city');
  }
  get street(){
    return this.estateInfo.get('street');
  }
  get streetNumber(){
    return this.estateInfo.get('streetNumber');
  }
  get typeOfAdvertisement(){
    return this.estateInfo.get('typeOfAdvertisement');
  }
  get price(){
    return this.estateInfo.get('price');
  }
  get size() {
    return this.estateInfo.get('size');
  }
  get typeOfEstate() {
    return this.estateInfo.get('typeOfEstate');
  }
  get numberOfFloors() {
    return this.estateInfo.get('numberOfFloors');
  }
  get floorNumber() {
    return this.estateInfo.get('floorNumber');
  }
  get furniture() {
    return this.estateInfo.get('furniture');
  }
  get numberOfRooms() {
    return this.estateInfo.get('numberOfRooms');
  }
  photos:string[]=[];
  photosFile: File[];

  onFilesChange(event){
    if (event.target.files.length > 0) {
      this.photosFile = event.target.files;
      this.photos = [];
      for (let i = 0; i < this.photosFile.length; i++) {
        this.photos.push("../../assets/properties/" + this.photosFile[i].name);
      }
      if(this.photosFile.length<3 && this.photosFile.length>=0){
        this.notifier.notify('warning', 'Morate odabrati bar 3 fotografije.')
      }else{
        this.fileService.uploadEstatePhotos(this.photosFile).subscribe((response)=>{
          if(response) {this.notifier.notify('success', "Slike uploadovane");
          this.estateService.updateEstatePhotos(this.idEstate,this.photos).subscribe((res)=>{
            if(res['message']=='estatePhotosUpdated'){
              this.notifier.notify('success', "Slike azurirane!")
            }
            else {
              this.notifier.notify('error', res['message']);
            }
          })
        }
        })
        }
        }
  }
  furnitureBoolean:boolean;
  insert(){
    this.submitted=true;
      if(this.estateInfo.valid){ //sve je ok sa parametrima;
          if(this.furniture.value=='yes'){
            this.furnitureBoolean=true;
          }else{
            this.furnitureBoolean=false;
          }
          this.estateService.updateEstate(this.idEstate,this.name.value,this.municipality.value,this.city.value,this.street.value,this.streetNumber.value,this.typeOfAdvertisement.value,this.price.value,this.size.value,this.typeOfEstate.value,this.numberOfFloors.value,this.floorNumber.value,this.furnitureBoolean,this.numberOfRooms.value).subscribe(res =>{
            if(res['message']=='estateUpdated'){
              this.notifier.notify('success', "Oglas azuriran")
            }
            else {
              this.notifier.notify('error', res['message']);
            }
          })
       
      }
  }
}
