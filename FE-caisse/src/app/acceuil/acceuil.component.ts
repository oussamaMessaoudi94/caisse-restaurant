import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddCaisseService } from 'services/add-caisse/add-caisse.service';
import { PrintCaisseComponent } from '../print-caisse/print-caisse.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AddProdService } from 'services/add-prod/add-prod.service';

declare function caisse(): void
@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  findedProd: any = {}
  selected :any
  selectedProducts: any[] = [];
  selectedCategories: any[] = [];
  filteredProducts: any[] = [];
  selectedCateg: any[] = [];
  sum: number = 0
  caisseForm!: FormGroup
  constructor(private fb: FormBuilder, private addCaisse: AddCaisseService, private addProdService: AddProdService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    caisse()

    this.addProdService.getProd().subscribe(
      (data) => {
        this.findedProd = data.res
      }
    )
  }

  moveAdd(id: any) {
    const selectedProd = this.findedProd.find((prod: any) => prod._id === id);
    if (selectedProd) {
      // Prevent adding duplicates (optional)
      if (!this.selectedProducts.some((p:any) => p._id === selectedProd._id)) {
        this.selectedProducts.push(selectedProd);
        this.sum += selectedProd.qty * selectedProd.prix
      }
      console.log('Selected Products:', this.selectedProducts);
    } else {
      console.log('Product not found with ID:', id);
    }
  }

  butCoffe(id:any){
    const selectedProds = this.findedProd.filter((prod: any) => prod.specify === 'coffee');
    
    selectedProds.forEach((prod: any) => {
      // Prevent adding duplicates
      if (!this.selectedCategories.some((p: any) => p._id === prod._id)) {
        this.selectedCategories.push(prod);
      }
    });

    console.log('Selected Categories:', this.selectedCategories);
  }

  butFood(id:any){
    const selectedProds = this.findedProd.filter((prod: any) => prod.specify === 'food');
    
    selectedProds.forEach((prod: any) => {
      // Prevent adding duplicates
      if (!this.selectedCategories.some((p: any) => p._id === prod._id)) {
        this.selectedCategories.push(prod);
      }
    });

    console.log('Selected Categories:', this.selectedCategories);
  }
  butGlace(id:any){
    const selectedProds = this.findedProd.filter((prod: any) => prod.specify === 'Glace');
    
    selectedProds.forEach((prod: any) => {
      // Prevent adding duplicates
      if (!this.selectedCategories.some((p: any) => p._id === prod._id)) {
        this.selectedCategories.push(prod);
      }
    });

    console.log('Selected Categories:', this.selectedCategories);
  }
  
  loadProductsByCategory(category: string) {
    this.filteredProducts = this.findedProd.filter((prod: any) => prod.specify === category);
    console.log('Products for category', category, ':', this.filteredProducts);
}

selectProduct(productId: any) {
  const selectedProd = this.filteredProducts.find((prod: any) => prod._id === productId);
  
  if (selectedProd) {
    if (!this.selectedCategories.some((p: any) => p._id === selectedProd._id)) {
      this.selectedCategories.push(selectedProd);
      this.sum += selectedProd.qty * selectedProd.prix;
    }
    console.log('Selected Categories:', this.selectedCategories);
  } else {
    console.log('Product not found with ID:', productId);
  }
}
  removeProd(id: any) {
    this.selectedProducts = this.selectedProducts.filter(prod => prod._id !== id);
  }

  print() {
    let x = {name:'', prix:'', qty:'', id:'', specify:''}
    for (let i = 0; i < this.selectedProducts.length; i++) {
      x.name = this.selectedProducts[i].name
      x.prix = this.selectedProducts[i].prix
      x.qty = this.selectedProducts[i].qty
      x.specify = this.selectedProducts[i].specify
      x.id = this.selectedProducts[i]._id
      this.addCaisse.caisse(x).subscribe(
        (data)=>{
          console.log(data.message);
          
        }
      )
    }
this.router.navigate(['printCaisse'])
  }
}
