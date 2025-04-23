import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddProdService } from 'backend/services/add-prod/add-prod.service';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent implements OnInit {
prodForm! : FormGroup
  constructor(private fb: FormBuilder, private addProdService: AddProdService) { }

  ngOnInit(): void {
    this.prodForm = this.fb.group({
      name : [''],
      prix : [''],
      specify : [''],
      qty : ['1']
    })
  }

  addProd(id:any){
this.addProdService.addProd(this.prodForm.value).subscribe(
  (data)=>{
    console.log(data.message);
    
  }
)
  }
}
