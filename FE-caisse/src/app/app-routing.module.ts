import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintCaisseComponent } from './print-caisse/print-caisse.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AddProdComponent } from './add-prod/add-prod.component';
import { TableProdComponent } from './table-prod/table-prod.component';
import { ComptabiliteComponent } from './comptabilite/comptabilite.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  
  {path:'', component:AcceuilComponent},
  {path:'printCaisse', component:PrintCaisseComponent, canActivate: [AuthGuard]},
  {path:'add-prod', component:AddProdComponent, canActivate: [AuthGuard]},
  {path:'add-prod/:id', component:AddProdComponent, canActivate: [AuthGuard]},
  {path:'my-prod', component:TableProdComponent, canActivate: [AuthGuard]},
  {path:'comptabilite', component:ComptabiliteComponent, canActivate: [AuthGuard]},
  {path:'comptabilite/:id', component:ComptabiliteComponent, canActivate: [AuthGuard]},
  {path:'login', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
