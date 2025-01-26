import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
declare function caisse():void
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'caisse-restaurant';
  caisseForm!:FormGroup
  Pizza:any='pizza - $10'
  Burger:any='Burger - $7'
y:any={}
  constructor(private fb:FormBuilder) {}

  ngOnInit(): void {
    caisse()

    this.caisseForm = this.fb.group({
pizza:['']
    })
    
  }

  click1(){
     this.y={pizza:'',burger:''}
    this.y.pizza=this.Pizza
   console.log(this.y);

  }
}


