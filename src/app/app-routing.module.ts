import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintCaisseComponent } from './print-caisse/print-caisse.component';
import { AcceuilComponent } from './acceuil/acceuil.component';

const routes: Routes = [
  {path:'', component:AcceuilComponent},
  {path:'printCaisse', component:PrintCaisseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
