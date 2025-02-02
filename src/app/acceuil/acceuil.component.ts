import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AddCaisseService } from 'backend/services/add-caisse/add-caisse.service';
import { PrintCaisseComponent } from '../print-caisse/print-caisse.component';
import { Router } from '@angular/router';
declare function caisse(): void
declare function toggle(): void
@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  finded: any = {}
  sum: number = 0
  constructor(private fb: FormBuilder, private addCaisse: AddCaisseService, private router:Router) { }

  ngOnInit(): void {
    caisse()
    toggle()

    this.addCaisse.caisseCheck().subscribe(
      (data) => {
        this.finded = data.res

        for (let i = 0; i < this.finded.length; i++) {
          this.sum += this.finded[i].prix

        }
      }
    )

  }

  pizza() {
    let p = { name: '', prix: '' }
    p.name = 'pizza',
      p.prix = '11'

    this.addCaisse.caisse(p).subscribe(
      (data) => {
        console.log(data.message);

      }
    )
    location.reload()
  }

  burger() {
    let b = { name: '', prix: '' }
    b.name = 'burger',
      b.prix = '12'
    this.addCaisse.caisse(b).subscribe(
      (data) => {
        console.log(data.message);

      }
    )
    location.reload()
  }
  pasta() {
    let pa = { name: '', prix: '' }
    pa.name = 'pasta',
      pa.prix = '16'
    this.addCaisse.caisse(pa).subscribe(
      (data) => {
        console.log(data.message);

      }
    )
    location.reload()
  }
  salad() {
    let s = { name: '', prix: '' }
    s.name = 'salad',
      s.prix = '20'
    this.addCaisse.caisse(s).subscribe(
      (data) => {
        console.log(data.message);


      }
    )
    location.reload()
  }

  deleteById(id: any) {
    this.addCaisse.deleteById(id).subscribe(
      (data) => {
        console.log(data.message);

      }
    )
    location.reload()
  }

  print(){
this.router.navigate([`printCaisse`])
  }
}
