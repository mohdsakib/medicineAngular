import { Component, OnInit } from '@angular/core';
import { Globle } from 'src/app/Globle';
import { Header } from 'src/app/model/header';
import { Stock } from 'src/app/model/stock';
import { StockService } from 'src/app/service/stock-service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  constructor(private stockService : StockService) { }

  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById("updateDiv")).hidden = true;
    
    if(Globle.id >0){
      let id =Globle.id;
      Globle.id=0;
      this.stockService.findById(id).subscribe(
        data =>{
          this.stockDetails = data;
          this.fillData();
          (<HTMLInputElement>document.getElementById("updateDiv")).hidden = false;
        }
      )
    }
  }

  stock = {

   "id": 0,
   "name": "Benedrl Syrup",
   "partyName": "L.K.Drug",
   "quantity": 10,
   "rate": 80,
   "mrp": 95,
   "composition": "Coungh Syrup",
   "batchNo": "125478",
   "manufacturingDate": "2021-03-12",
   "expireDate": "2023-08-15",
   "packing": 5,
   "bonus": 0,
   "hsnCode": 12544,
   "status": true,
   "createdBy": "System"
  
     
 }

 stockDetails : Stock= new Stock();
 header = new Header();
 fillData(){
  (<HTMLInputElement>document.getElementById("name")).value  = this.stockDetails.name;
  (<HTMLInputElement>document.getElementById("partyName")).value = this.stockDetails.partyName;
  ( <HTMLInputElement>document.getElementById("quantity")).value= this.stockDetails.quantity;
  (<HTMLInputElement>document.getElementById("rate")).value= this.stockDetails.rate;
  (<HTMLInputElement>document.getElementById("mrp")).value= this.stockDetails.mrp;
  (<HTMLInputElement>document.getElementById("composition")).value = this.stockDetails.composition;
  (<HTMLInputElement>document.getElementById("batchNo")).value =this.stockDetails.batchNo;
  (<HTMLInputElement>document.getElementById("manufacturingDate")).value = this.stockDetails.manufacturingDate;
  (<HTMLInputElement>document.getElementById("expireDate")).value = this.stockDetails.expireDate;
  (<HTMLInputElement>document.getElementById("packing")).value = this.stockDetails.packing;
  (<HTMLInputElement>document.getElementById("bonus")).value = this.stockDetails.bonus;
  (<HTMLInputElement>document.getElementById("hsnCode")).value = this.stockDetails.hsnCode;
  (<HTMLInputElement>document.getElementById("issuedQuantity")).value = this.stockDetails.issuedQuantity;
 }
 submit()
 {
  localStorage.setItem("user",JSON.stringify(this.header.auth));
  // this.stockDetails.id= 0;//( <HTMLInputElement>document.getElementById("id")).value;
  this.stockDetails.name= (<HTMLInputElement>document.getElementById("name")).value;
  this.stockDetails.partyName= (<HTMLInputElement>document.getElementById("partyName")).value;
  this.stockDetails.quantity= parseInt(( <HTMLInputElement>document.getElementById("quantity")).value);
  this.stockDetails.rate= parseInt((<HTMLInputElement>document.getElementById("rate")).value);
  this.stockDetails.mrp= parseFloat((<HTMLInputElement>document.getElementById("mrp")).value);
  this.stockDetails.composition= (<HTMLInputElement>document.getElementById("composition")).value;
  this.stockDetails.batchNo= (<HTMLInputElement>document.getElementById("batchNo")).value;
  this.stockDetails.manufacturingDate= (<HTMLInputElement>document.getElementById("manufacturingDate")).value;
  this.stockDetails.expireDate= (<HTMLInputElement>document.getElementById("expireDate")).value;
  this.stockDetails.packing= (<HTMLInputElement>document.getElementById("packing")).value;
  this.stockDetails.bonus= parseInt((<HTMLInputElement>document.getElementById("bonus")).value);
  this.stockDetails.hsnCode= parseInt((<HTMLInputElement>document.getElementById("hsnCode")).value);
  this.stockDetails.status= (<HTMLInputElement>document.getElementById("status")).value;
  this.stockDetails.issuedQuantity= parseInt((<HTMLInputElement>document.getElementById("issuedQuantity")).value);
  if(this.stockDetails.id>0){
    this.stockDetails.updatedBy ="Update By System";
  }else{
    this.stockDetails.createdBy ="System"; 
  }

    console.log("data on Submit ",this.stockDetails);
    this.stockService.createStock(this.stockDetails).subscribe(
      data => console.log(data),error => console.error(error)
      )
    this.stockDetails = new Stock();
    this.clear();
  
 }
 clear(){
  (<HTMLInputElement>document.getElementById("name")).value ="";
  (<HTMLInputElement>document.getElementById("partyName")).value ="";
  ( <HTMLInputElement>document.getElementById("quantity")).value ="";
  (<HTMLInputElement>document.getElementById("rate")).value ="";
  (<HTMLInputElement>document.getElementById("mrp")).value ="";
  (<HTMLInputElement>document.getElementById("composition")).value ="";
  (<HTMLInputElement>document.getElementById("batchNo")).value ="";
  (<HTMLInputElement>document.getElementById("manufacturingDate")).value ="";
  (<HTMLInputElement>document.getElementById("expireDate")).value ="";
  (<HTMLInputElement>document.getElementById("packing")).value ="";
  (<HTMLInputElement>document.getElementById("bonus")).value ="";
  (<HTMLInputElement>document.getElementById("hsnCode")).value ="";
  (<HTMLInputElement>document.getElementById("updateDiv")).hidden = true;
 }

}
