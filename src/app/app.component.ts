import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  loggedIn:boolean;
  adminOptions:boolean;
  userOptions:boolean;
  agentOptions:boolean;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
       /* let user = JSON.parse(localStorage.getItem('ulogovan'))
        if(user!=null){
          this.loggedIn=true;
        this.userOptions = user.userType == "korisnik";
        this.agentOptions = user.userType == "agent";
        this.adminOptions = user.userType == "administrator";
        }else {
          this.loggedIn=false;
        }*/
  }


}
