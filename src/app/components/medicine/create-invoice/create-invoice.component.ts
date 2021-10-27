import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as  pdfMake  from 'pdfmake/build/pdfmake';  
import * as  pdfFonts from "pdfmake/build/vfs_fonts";  



@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
  lineData: any
  pdfMake: any = pdfFonts.pdfMake.vfs;  
  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
  }
  generatePDF() {  
    let docDefinition = {  
      header: 'C#Corner PDF Header',  
      content: 'Sample PDF generated with Angular and PDFMake for C#Corner Blog'  
    };  
   
    pdfMake.createPdf(docDefinition).open();  
  }  

}
