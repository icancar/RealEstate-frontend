import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-estate-info',
  templateUrl: './estate-info.component.html',
  styleUrls: ['./estate-info.component.css']
})
export class EstateInfoComponent implements OnInit {

  constructor(private route:ActivatedRoute, private notifier:NotifierService) { }

  isLoggedIn:boolean;
  id:string;
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem('ulogovan'))!=null;
    this.id=this.route.snapshot.paramMap.get('id');
    this.notifier.notify('success', ""+this.id);
  }
}
