import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globle } from 'src/app/Globle';
import { Stock } from 'src/app/model/stock';
import { StockService } from 'src/app/service/stock-service';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss']
})
export class StockSearchComponent implements OnInit {

  stockArr : any;
  stockDetails : Stock = new Stock();
  brandArr : Stock[] =[];
  
  constructor(private stockService : StockService, private router : Router) { }

  ngOnInit(): void {
    // this.getAll();
  }

  getAll(){
    this.stockService.getAll().subscribe(
      data => {
        this.stockArr = data;
    
      }
    )
  }
  searchBrandName(event : any){
    if(event.target.value.length>0){
      this.stockService.findByBrand(event.target.value).subscribe(
        data =>{
          this.brandArr = data;
        }
      )
    }
  }
  search(){
    this.stockDetails.batchNo= (<HTMLInputElement>document.getElementById("batchNo")).value;
    this.stockDetails.name= (<HTMLInputElement>document.getElementById("name")).value;
    this.stockDetails.composition= (<HTMLInputElement>document.getElementById("composition")).value;
    this.stockDetails.quantity= parseInt(( <HTMLInputElement>document.getElementById("quantity")).value);
    this.stockDetails.mrp= parseFloat((<HTMLInputElement>document.getElementById("mrp")).value);
    this.stockDetails.expireDate= (<HTMLInputElement>document.getElementById("expireDate")).value;
    this.stockDetails.issuedQuantity= (<HTMLInputElement>document.getElementById("issuedQuantity")).value;

    this.stockService.multiSearch(this.stockDetails).subscribe(
      data =>{
        this.stockArr = data;
      }
    )
  }
  stockId =0;
  getId(id : number){
    console.log(id);
    Globle.id = id;
  }
  open(){
    if(Globle.id >0){
      this.router.navigate(['/stock']);
    }
  }

}
