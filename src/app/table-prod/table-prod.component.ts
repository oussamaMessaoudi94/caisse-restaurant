import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddProdService } from 'backend/services/add-prod/add-prod.service';

declare function FilterkeyWord_all_table(): void

@Component({
  selector: 'app-table-prod',
  templateUrl: './table-prod.component.html',
  styleUrls: ['./table-prod.component.css']
})
export class TableProdComponent implements OnInit {
findProd : any={}
p:any
  constructor(private prodService: AddProdService, private router:Router) { }
  ngOnInit(): void {
    FilterkeyWord_all_table();
    this.prodService.getProd().subscribe(
      (data)=>{
        this.findProd = data.res
      }
    )

  }
 editProd(id:any){
this.router.navigate([`add-prod/${id}`])
 }

 deleteProd(id:any){
  this.prodService.deleteProd(id).subscribe(
    (data)=>{
      console.log(data.message);
    }
  )
  this.router.navigate(['my-prod'])
   }
}
