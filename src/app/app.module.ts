import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { PackageComponent } from './components/package/package.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { StockComponent } from './components/medicine/stock/stock.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { StockSearchComponent } from './components/medicine/stock-search/stock-search.component';
import { CreateInvoiceComponent } from './components/medicine/create-invoice/create-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenrateBillComponent } from './components/medicine/genrate-bill/genrate-bill.component';
import { PdfOnAngularComponent } from './components/medicine/pdf-on-angular/pdf-on-angular.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ServicesComponent,
    PackageComponent,
    ContactusComponent,
    StockComponent,
    SidebarComponent,
    StockSearchComponent,
    CreateInvoiceComponent,
    GenrateBillComponent,
    PdfOnAngularComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
