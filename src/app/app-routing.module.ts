import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoiceComponent } from './components/medicine/create-invoice/create-invoice.component';
import { GenrateBillComponent } from './components/medicine/genrate-bill/genrate-bill.component';
import { PdfOnAngularComponent } from './components/medicine/pdf-on-angular/pdf-on-angular.component';
import { StockSearchComponent } from './components/medicine/stock-search/stock-search.component';
import { StockComponent } from './components/medicine/stock/stock.component';

const routes: Routes = [
  {path : '', component : StockComponent},
  { path: 'stock', component: StockComponent },
  { path: 'stock-search', component: StockSearchComponent },
  { path : 'create-invoice', component : CreateInvoiceComponent},
  { path : 'genrate-bill', component : GenrateBillComponent},
  { path : 'pdf-on-angular', component : PdfOnAngularComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
