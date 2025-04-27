import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddProdService } from 'services/add-prod/add-prod.service';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent implements OnInit {
prodForm! : FormGroup
id:any
findId:any={}
title:any
  constructor(private fb: FormBuilder, private addProdService: AddProdService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

      this.id = this.activatedRoute.snapshot.paramMap.get('id')
      if (this.id) {
      this.addProdService.getProdById(this.id).subscribe(
        (data)=>{
          this.findId = data.resId
        }
      )
        this.title = 'Edit Prod'
    } else {
      console.log('not Found ID');
            this.title = 'Add Prod'
    }


    this.prodForm = this.fb.group({
      name : [''],
      prix : [''],
      specify : [''],
      qty : ['1']
    })
  }


  addProd(id:any){
    if (this.id) {
      this.addProdService.editProd(this.findId).subscribe(
        (data)=>{
          console.log(data.message);
        }
      )
      this.router.navigate(['my-prod'])
    } else {
      this.addProdService.addProd(this.prodForm.value).subscribe(
        (data)=>{
          console.log(data.message); 
        }
      )
      this.router.navigate(['my-prod'])
        }
    }
}
