import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Bill } from 'src/app/model/bill';
import { StockService } from 'src/app/service/stock-service';
import { ToWords } from 'to-words';

import * as pdfMake from "pdfmake/build/pdfmake";  
import * as pdfFonts from "pdfmake/build/vfs_fonts";  
// pdfMake.vfs = pdfFonts.pdfMake.vfs; 
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs; 


interface SelectProtected {
  readonly wrapperElement: HTMLDivElement;
  readonly inputElement: HTMLInputElement;
}





@Component({
  selector: 'app-genrate-bill',
  templateUrl: './genrate-bill.component.html',
  styleUrls: ['./genrate-bill.component.scss']
})

export class GenrateBillComponent implements OnInit {



selectProtected: SelectProtected = {
    wrapperElement: document.createElement("div"),
    inputElement: document.createElement("input")
};


  //#region Variable_Declaration
  
  dynamicArray: Array<Bill> = [];  
  newDynamic: any = {};
  productNameList : any
  count =1;
  total=0;
  amountInWords : any;
  toWords = new ToWords();
  invoiceNo=1254;
  invoiceDate = new Date().toISOString().toString().split('T')[0];


  private fieldArray: Array<any> = [];
    private newAttribute: any = {};
  

  //#endregion

  constructor(private fb: FormBuilder, private rout: Router,
     private sanitizer: DomSanitizer,
     public formBuilder: FormBuilder,private stockService : StockService) {
      {
       
      
      
    }
      // this.rows[0];

    
    // override the route reuse strategy

  }



  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }
  ngAfterViewInit(): void {
  }
  
  ngOnInit() {
    
    console.log("on load count ",this.count);
    
    this.newDynamic = {
      sno : this.count,
      productName : "",
      pack : "",
      hsnCode  : "",
      batchNo : "",
      experyDate : "",
      quantity : 0,
      mrp : 0,
      rate : 0,
      amount : 0,
      userName : "",
      contactNo : "",
      invoiceNo : 0,
      totalAmount : 0,
      amountInWords : "",
    }
    // this.newDynamic = this.bill;
    this.dynamicArray.push(this.newDynamic);  

    ++this.count;
  }


  
  addRow() {    
    console.log("on add FRow count ",this.count);
    this.newDynamic = {
      sno : this.count,
      productName : "",
      pack : "",
      hsnCode  : "",
      batchNo : "",
      experyDate : "",
      quantity : 0,
      mrp : 0,
      rate : 0,
      amount : 0,
      userName : "",
      contactNo : "",
      invoiceNo : 0,
      totalAmount : 0,
      amountInWords : "",
    }
      this.dynamicArray.push(this.newDynamic);  
      // window.alert('New row added successfully'+ '\n New Row');  
      console.log(this.dynamicArray);  
      ++this.count;
      return true;  
  }  

  deleteRow(index : number) {  
      if(this.dynamicArray.length ==1) {  
        // window.Error("Can't delete the row when there is only one row"+ 'Warning');  
          return false;  
      } else {  
          this.dynamicArray.splice(index, 1);  
          // window.alert('Row deleted successfully'+ ' \nDelete row');  
          return true;  
      }  
  }
  onSubmit(){
  
    console.log("array ",this.dynamicArray);
    for(let i=0;i<this.dynamicArray.length;i++){
      this.dynamicArray[i].userName = (<HTMLInputElement>document.getElementById("customerName")).value;
      this.dynamicArray[i].contactNo = (<HTMLInputElement>document.getElementById("mobileNo")).value;
      this.dynamicArray[i].invoiceNo = this.invoiceNo;
      this.dynamicArray[i].amountInWords = this.amountInWords;
      this.dynamicArray[i].totalAmount = this.total;
    }

  if(this.dynamicArray.length >0){
    this.stockService.genrateBill(this.dynamicArray).subscribe(
      response => {
        console.log(response);
        if (response.byteLength > 0) {
          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);

        }else {
          alert("Data Not Found !!!");
          return
        }
      })
  }
    
  }
  searchProduct(index: any){
    let productName =  this.dynamicArray[index].productName;
    if(productName.length>0){
      this.stockService.findByBrand(productName).subscribe(
        data =>{
          this.productNameList = data;
          for(let i=0;i<this.productNameList.length;i++){
            if(productName===this.productNameList[i].name){
              this.dynamicArray[index].hsnCode = this.productNameList[i].hsnCode;
              this.dynamicArray[index].batchNo = this.productNameList[i].batchNo;
              this.dynamicArray[index].experyDate = this.productNameList[i].expireDate;
              this.dynamicArray[index].mrp = this.productNameList[i].mrp;
              this.dynamicArray[index].pack = this.productNameList[i].packing;
              this.dynamicArray[index].rate = this.productNameList[i].rate;
            }
          }
          console.log("product name List ",this.productNameList);
          
        }
      )
    }
  }
  getAmount(index : any){
    let qty = parseInt(this.dynamicArray[index].quantity);
    let amount = qty * parseFloat(this.dynamicArray[index].rate);
    this.dynamicArray[index].amount = amount;
    this.total = this.total + amount;
    console.log("this.total ",this.total);
    
    this.amountInWords = this.toWords.convert(this.total);
  }

/***************Download and delete File code 
  fileName :any;
  getImageById(id, name) {
    this.fileName = name
    this.invoiceService.getImageById(id).subscribe(
      (response => this.downloadFile(response))//,console.log(data),
    )
  }
  downloadFile(data: Blob) {//data: response
    const blob = new Blob([data]);//, { type: 'text/csv/jpg/png/doc/spreadsheet' }
    const url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = this.fileName;
    a.hidden = true;
    a.click();
    window.URL.revokeObjectURL(url);
    //window.open(url);
  }

  deleteImageById(id, rowIndex) {
    this.invoiceService.deleteImageById(id).subscribe(
      (data => {
        console.log(data), error => console.log(error)
        this.imageL.splice(rowIndex, 1);
        console.log("after delete ImageL ", this.imageL);

        swal("File Deleted Succecfully")
      })
    )
  }
*/


  invPostingPeriodArr : any;
  postingDateCheck() {
    console.log("postingDateCheck() called ");

    var startDate = new Date(this.invPostingPeriodArr.startDate);
    var endDate = new Date(this.invPostingPeriodArr.endDate);
    var postingDate = new Date((<HTMLInputElement>document.getElementById("invPostingDate")).value);
    if (postingDate > endDate) {
      alert("posting Date not in period");
      (<HTMLInputElement>document.getElementById("invPostingDate")).value = "";
      return false;
    }
    if (postingDate < startDate) {

      alert("posting Date not in period");
      (<HTMLInputElement>document.getElementById("invPostingDate")).value = "";
      return false
    }
    return true;
  }

  message : any


  pdfList: any=[]; 
  generatePDF(action = 'open') {   
    this.pdfList.push(
      [{text :'Product'}, {text :'Pack'}, {text :'Quantity'},{text :'MRP'},{text :'Rate'}, {text :'Amount'}], 
    );
    for(let i=0;i<this.dynamicArray.length;i++){
      this.pdfList.push(
        {text : this.dynamicArray[i].productName},{text : this.dynamicArray[i].pack},{text : this.dynamicArray[i].quantity},{text : this.dynamicArray[i].mrp},{text : this.dynamicArray[i].rate}, {text :this.dynamicArray[i].amount}
      )
    }
    this.pdfList.push(
      [{ text: 'Total Amount', colSpan: 3 }, {}, {}, this.total]  
    );
    
        console.log("pdf list ",this.pdfList);
        
    // let docDefinition = {      
    //     header: 'C#Corner PDF Header',      
    //     content: 'Sample PDF generated with Angular and PDFMake for C#Corner Blog'      
    //   };    
    let docDefinition = {  
      content: [  
          // Previous configuration  
          {  
              text: 'Order Details',  
              style: 'sectionHeader'  
          },  
          {  
              table: {  
                  // headerRows: 1,  
                  widths: ['*', 'auto', 'auto', 'auto'],  
                  // body: [  
                  //     ['Product', 'Pack', 'Quantity','MRP','Rate', 'Amount'],  
                  // // ...this.dynamicArray.map(p => ([p.productName, p.pack, p.quantity,p.mrp,p.rate,p.amount ])),  
                  //     this.dynamicArray.map(p => ([ {text : p.productName},{text : p.pack},{text : p.quantity},{text : p.mrp},{text : p.rate}, {text :p.amount}])), 
                  //     // [{text : 'PCM'},{text : 50},{text : 5},{text : 50*5}],
                  //     // [{text : 'Lecob'},{text : 100},{text : 5},{text : 100*5}],
                  //     // [{text : 'SP'},{text : 80},{text : 5},{text : 80*5}],
                  //     // [{ text: 'Total Amount', colSpan: 3 }, {}, {}, 1150]      
                  //     // [{ text: 'Total Amount', colSpan: 3 }, {}, {}, this.invoice.products.reduce((sum, p) => sum + (p.qty * p.price), 0).toFixed(2)]  
                  //     [{ text: 'Total Amount', colSpan: 3 }, {}, {}, this.total]  
                  // ] 
                  body: this.pdfList 
              }  
          }  
      ],  
      // Common Styles  
  } 
    
    if(action==='download'){    
      pdfMake.createPdf(docDefinition).download();    
    }else if(action === 'print'){    
      pdfMake.createPdf(docDefinition).print();          
    }else{    
      pdfMake.createPdf(docDefinition).open();          
    }    
    
  } 

  

}
