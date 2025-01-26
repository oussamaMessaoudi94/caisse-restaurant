import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddCaisseService } from 'backend/services/add-caisse/add-caisse.service';
declare function caisse():void
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'caisse-restaurant';
  finded :any={}
  sum : number=0
  constructor(private fb:FormBuilder, private addCaisse : AddCaisseService) {}

  ngOnInit(): void {
    caisse()

    this.addCaisse.caisseCheck().subscribe(
      (data)=>{
        this.finded = data.res

        for (let i = 0; i < this.finded.length; i++) {
         this.sum += this.finded[i].prix
          
        }
      }
    )
    
  }

  pizza(){
   let p={name:'', prix:''}
    p.name = 'pizza',
    p.prix = '11'
   
    this.addCaisse.caisse(p).subscribe(
      (data)=>{
        console.log(data.message);
        
      }
    )
    location.reload()
  }

  burger(){
    let b={name:'', prix:''}
    b.name = 'burger',
    b.prix = '12'
    this.addCaisse.caisse(b).subscribe(
      (data)=>{
        console.log(data.message);
        
      }
    )
    location.reload()
  }
  pasta(){
    let pa={name:'', prix:''}
    pa.name = 'pasta',
    pa.prix = '16'
    this.addCaisse.caisse(pa).subscribe(
      (data)=>{
        console.log(data.message);
        
      }
    )
    location.reload()
  }
  salad(){
    let s={name:'', prix:''}
    s.name = 'salad',
    s.prix = '20'
    this.addCaisse.caisse(s).subscribe(
      (data)=>{
        console.log(data.message);
       
        
      }
    )
    location.reload()
  }
}


