import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-agent',
  templateUrl: './welcome-agent.component.html',
  styleUrls: ['./welcome-agent.component.css']
})
export class WelcomeAgentComponent implements OnInit {

  constructor() { }

  
  isLoggedIn:boolean;
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem('ulogovan'))!=null;
  }

}
