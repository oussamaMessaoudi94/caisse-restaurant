import { NgModule } from '@angular/core';
import { Route, RouterModule, RouterState, Routes } from '@angular/router';
import { PrintCaisseComponent } from './print-caisse/print-caisse.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AddProdComponent } from './add-prod/add-prod.component';
import { TableProdComponent } from './table-prod/table-prod.component';
import { ComptabiliteComponent } from './comptabilite/comptabilite.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'', component:AcceuilComponent},
  {path:'printCaisse', component:PrintCaisseComponent},
  {path:'add-prod', component:AddProdComponent},
  {path:'add-prod/:id', component:AddProdComponent},
  {path:'my-prod', component:TableProdComponent},
  {path:'comptabilite', component:ComptabiliteComponent},
  {path:'login', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
