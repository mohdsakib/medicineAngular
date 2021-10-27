import { Component, OnInit } from '@angular/core';
  
import * as pdfMake from "pdfmake/build/pdfmake";  
import * as pdfFonts from "pdfmake/build/vfs_fonts";  
// pdfMake.vfs = pdfFonts.pdfMake.vfs; 
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs; 
  


class Product{    
  name: any;    
  price: any;    
  qty: any;    
}    
class Invoice{    
  customerName: any;    
  address: any;    
  contactNo: any;    
  email: any;    
      
  products: Product[] = [];    
  additionalDetails: any;    
    
  constructor(){    
    // Initially one empty product row we will show     
    this.products.push(new Product());    
  }    
}




@Component({
  selector: 'app-pdf-on-angular',
  templateUrl: './pdf-on-angular.component.html',
  styleUrls: ['./pdf-on-angular.component.scss']
})
export class PdfOnAngularComponent implements OnInit {
  invoice = new Invoice();

  constructor() { }

  ngOnInit(): void {
  }

     
  generatePDF(action = 'open') {    
        
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
                  headerRows: 1,  
                  widths: ['*', 'auto', 'auto', 'auto'],  
                  body: [  
                      ['Product', 'Price', 'Quantity', 'Amount'],  
                      // ...this.invoice.products.map((p: { name: any; price: number; qty: number; }) => ([p.name, p.price, p.qty, (p.price * p.qty).toFixed(2)])),  
                      // [{ text: 'Total Amount', colSpan: 3 }, {}, {}, this.invoice.products.reduce((sum: number, p: { qty: number; price: number; }) => sum + (p.qty * p.price), 0).toFixed(2)]  
                      [{text : 'PCM'},{text : 50},{text : 5},{text : 50*5}],
                      [{text : 'Lecob'},{text : 100},{text : 5},{text : 100*5}],
                      [{text : 'SP'},{text : 80},{text : 5},{text : 80*5}],
                      [{ text: 'Total Amount', colSpan: 3 }, {}, {}, 1150]      
                  ]  
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
    
  addProduct(){    
    this.invoice.products.push(new Product());    
  }  
}
