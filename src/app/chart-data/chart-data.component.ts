import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Chart } from 'chart.js';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';

@Component({
  selector: 'app-chart-data',
  templateUrl: './chart-data.component.html',
  styleUrls: ['./chart-data.component.css']
})
export class ChartDataComponent implements OnInit {

  constructor(private estateService:EstateService, private notifier:NotifierService) { }
  
  stanProdaja:number=0;
  stanIznajmljivanje:number=0;
  kucaProdaja:number=0;
  kucaIznajmljivanje:number=0;
  cnt1=0;
  cnt2=0;
  cnt3=0;
  cnt4=0;
  cnt5=0;
  cnt6=0;
  cnt7=0;
  cnt8=0;
  cnt9=0;
  cnt10=0;
  cnt11=0;
  cnt12=0;
  cnt13=0;
  cnt14=0;
  cnt15=0;
  cnt16=0;
  updated1=false;
  updated2=false;
  updated3=false;
  data3Kuca:number[]=[1,2];
  data3Stan:number[]=[1,2];
  data1Stanovi:number[]=[0,1,2,3,4,5,6]
  data1Kuce:number[]=[0,0,0,0,0,0,0]

  first:boolean=true;
  second:boolean=false;
  third:boolean=false;
  fourth:boolean=false;


  public barChartOptions1 = {
    scaleShowVerticalLines:false,
    responsive:true,
  };
  public barChartLabels1 = [];
  public barChartType1='bar';
  public barChartLegend1 = true;
  public barChartData1 = [
    {
      data: [], label:"Stan", backgroundColor:"blue"
    },
    {
      data:[], label:"Kuca", backgroundColor: "red"
    }
  ];

  public barChartOptions2 = {
    scaleShowVerticalLines:false,
    responsive:true,
  };
  public barChartLabels2 = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType2='bar';
  public barChartLegend2 = true;
  public barChartData2 = [
    {
      data: [6, 5, 8, 8, 5, 5, 4], label:"Series D", backgroundColor:"blue"
    },
    {
      data:[2, 4, 4, 1, 8, 2, 9], label:"Series C", backgroundColor: "red"
    }
  ];

  public barChartOptions3 = {
    scaleShowVerticalLines:false,
    responsive:true,
  };
  public barChartLabels3 = [];
  public barChartType3='bar';
  public barChartData3 = [
    {
      data:[], label:"Stan", backgroundColor:"blue"
    },
    {
      data:[], label:"Kuca", backgroundColor: "red"
    }
  ];
 
  

  estates:Estate[];
  isLoggedIn:boolean;
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem("ulogovan"))!=null;
    this.estateService.getAllApprovedEstates().subscribe((e:Estate[])=>{
      if(e){
        this.estates=e;
        this.notifier.notify("success", this.estates.length+"")
        this.prebrojStanove();
        this.prebrojKuce();
        this.cnt1=this.prebrojNekretnineUCjenovnomRanguStanovi(0,25000);
        this.cnt2=this.prebrojNekretnineUCjenovnomRanguStanovi(25000,50000);
        this.cnt3=this.prebrojNekretnineUCjenovnomRanguStanovi(50000,75000);
        this.cnt4=this.prebrojNekretnineUCjenovnomRanguStanovi(75000,100000);
        this.cnt5=this.prebrojNekretnineUCjenovnomRanguStanovi(100000,125000);
        this.cnt6=this.prebrojNekretnineUCjenovnomRanguStanovi(125000,150000);
        this.cnt7=this.prebrojNekretnineUCjenovnomRanguStanovi(150000,999999999999);
        this.cnt8=this.prebrojNekretnineUCjenovnomRanguKuce(0,25000);
        this.cnt9=this.prebrojNekretnineUCjenovnomRanguKuce(25000,50000);
        this.cnt10=this.prebrojNekretnineUCjenovnomRanguKuce(50000,75000);
        this.cnt11=this.prebrojNekretnineUCjenovnomRanguKuce(75000,100000);
        this.cnt12=this.prebrojNekretnineUCjenovnomRanguKuce(100000,125000);
        this.cnt13=this.prebrojNekretnineUCjenovnomRanguKuce(125000,150000);
        this.cnt14=this.prebrojNekretnineUCjenovnomRanguKuce(150000,999999999999);
        console.log(this.cnt1, this.cnt2,this.cnt3, this.cnt4, this.cnt5, this.cnt6, this.cnt7, this.cnt8, this.cnt9, this.cnt10, this.cnt11,this.cnt12, this.cnt13, this.cnt14);
        this.newDataPointChart1([this.cnt1, this.cnt8],['0-25000']);
        this.newDataPointChart1([this.cnt2, this.cnt9],['25000-50000']);
        this.newDataPointChart1([this.cnt3, this.cnt10],['50000-75000']);
        this.newDataPointChart1([this.cnt4, this.cnt11],['75000-100000']);
        this.newDataPointChart1([this.cnt5, this.cnt12],['100000-125000']);
        this.newDataPointChart1([this.cnt6, this.cnt13],['125000-150000']);
        this.newDataPointChart1([this.cnt7, this.cnt14],["150000+"]);
        this.newDataPointChart3([this.stanProdaja,this.kucaProdaja],["Prodaja"]);
        this.newDataPointChart3([this.stanIznajmljivanje,this.kucaIznajmljivanje],["Iznajmljivanje"]);
      }else {
        this.notifier.notify("error", "ERROR")
      }
    })   
  }
  prvi(){
    this.first=true;
    this.second=false;
    this.third=false;
  }
  drugi(){
    this.first=false;
    this.second=true;
    this.third=false;
  }
  treci(){
    this.first=false;
    this.second=false;
    this.third=true;
  }

  prebrojStanove(){
    for(let i=0;i<this.estates.length;i++){
      if(this.estates[i].typeOfAdvertisement=='prodaja' && this.estates[i].typeOfEstate=='stan'){
        this.stanProdaja++;
      }
      if(this.estates[i].typeOfAdvertisement=='iznajmljivanje' && this.estates[i].typeOfEstate=='stan'){
        this.stanIznajmljivanje++;
      }
    }
  }

  prebrojKuce(){
    for(let i=0;i<this.estates.length;i++){
      if(this.estates[i].typeOfAdvertisement=='prodaja' && this.estates[i].typeOfEstate=='kuca'){
        this.kucaProdaja++;
      }
      if(this.estates[i].typeOfAdvertisement=='iznajmljivanje' && this.estates[i].typeOfEstate=='kuca'){
        this.kucaIznajmljivanje++;
      }
    }
  }

  prebrojNekretnineUCjenovnomRanguStanovi(min:number,max:number):number{
    let cnt=0;
    for( let i=0;i<this.estates.length;i++){
      if(this.estates[i].price<max && this.estates[i].price>=min && this.estates[i].typeOfEstate=='stan'){
        cnt++;
      }
    }
    return cnt;
  }

  prebrojNekretnineUCjenovnomRanguKuce(min:number,max:number):number{
    let cnt=0;
    for( let i=0;i<this.estates.length;i++){
      if(this.estates[i].price<max && this.estates[i].price>=min && this.estates[i].typeOfEstate=='kuca'){
        cnt++;
      }
    }
    return cnt;
  }

  newDataPointChart1(dataArr = [100, 100, 100], label) {
    this.barChartData1.forEach((dataset, index) => {
      this.barChartData1[index] = Object.assign({}, this.barChartData1[index], {
        data: [...this.barChartData1[index].data, dataArr[index]]
      });
    });

    this.barChartLabels1 = [...this.barChartLabels1, label];
  }

  newDataPointChart3(dataArr = [100, 100, 100], label) {
    this.barChartData3.forEach((dataset, index) => {
      this.barChartData3[index] = Object.assign({}, this.barChartData3[index], {
        data: [...this.barChartData3[index].data, dataArr[index]]
      });
    });

    this.barChartLabels3 = [...this.barChartLabels3, label];
  }
}
