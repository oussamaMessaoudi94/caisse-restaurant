import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PrintCaisseComponent } from './print-caisse/print-caisse.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AddProdComponent } from './add-prod/add-prod.component';
import { HeaderComponent } from './header/header.component';
import { TableProdComponent } from './table-prod/table-prod.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComptabiliteComponent } from './comptabilite/comptabilite.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    PrintCaisseComponent,
    AcceuilComponent,
    AddProdComponent,
    HeaderComponent,
    TableProdComponent,
    ComptabiliteComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
