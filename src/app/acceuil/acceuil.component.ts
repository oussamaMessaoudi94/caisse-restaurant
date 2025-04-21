import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddCaisseService } from 'backend/services/add-caisse/add-caisse.service';
import { PrintCaisseComponent } from '../print-caisse/print-caisse.component';
import { ActivatedRoute, Router } from '@angular/router';
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
  sum2: number = 0
  selectedItem: any = null;
  id: any
  findedId: any = {}
  caisseForm!: FormGroup
  constructor(private fb: FormBuilder, private addCaisse: AddCaisseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    caisse()
    toggle()
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.addCaisse.caisseCheckId(this.id).subscribe(
        (data) => {
          this.findedId = data.resId;
          console.log('✅ Caisse found:', this.findedId);
        },
        (error) => {
          console.error('❌ Failed to load caisse:', error);
        }
      );
    } else {
      console.warn('⚠️ No ID found in the route!');
    }
    this.addCaisse.caisseCheck().subscribe(
      (data) => {
        this.finded = data.res

        for (let i = 0; i < this.finded.length; i++) {
          this.sum2 = (this.finded[i].prix * this.finded[i].qty)
          this.sum += this.sum2
        }
      }
    )
  }

  pizza() {
    let p = { name: '', prix: '', qty: '' }
    p.name = 'pizza',
      p.prix = '11'
    p.qty = '1'


    this.addCaisse.caisse(p).subscribe(
      (data) => {
        console.log(data.message);

      }
    )
    location.reload()
  }

  burger() {
    let b = { name: '', prix: '', qty: '' }
    b.name = 'burger',
      b.prix = '12'
    b.qty = '1'
    this.addCaisse.caisse(b).subscribe(
      (data) => {
        console.log(data.message);

      }
    )
    location.reload()
  }
  pasta() {
    let pa = { name: '', prix: '', qty: '' }
    pa.name = 'pasta',
      pa.prix = '16'
    pa.qty = '2'
    this.addCaisse.caisse(pa).subscribe(
      (data) => {
        console.log(data.message);

      }
    )
    location.reload()
  }
  salad() {
    let s = { name: '', prix: '', qty: '' }
    s.name = 'salad',
      s.prix = '20'
    s.qty = '1'
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

  print() {
    this.router.navigate([`printCaisse`])
  }

  openModal(id: any) {
    this.selectedItem = id;
    this.router.navigate([`home/${id}`])

  }

  closeModal() {
    this.selectedItem = null;
    this.router.navigate([`home`])
  }
  update(id: any) {
    this.addCaisse.caisseCheckPut(this.findedId).subscribe(
      (response) => {
        console.log("✅ Update successful:", response.message);
      },
      (error) => {
        console.error("❌ Update failed:", error);
      }
    );
  }
}
