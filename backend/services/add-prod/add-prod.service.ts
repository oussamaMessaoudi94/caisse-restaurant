import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddProdService {
prodUrl='http://localhost:3000/addProduct'
  constructor(private httpClient:HttpClient) { }

  addProd(produit:any){
    return this.httpClient.post<{message:any}>(`${this.prodUrl}/addProd`,produit)
  }

  getProd(){
    return this.httpClient.get<{res:any}>(`${this.prodUrl}`)
  }

  getProdById(id:any){
    return this.httpClient.get<{resId:any}>(`${this.prodUrl}/${id}`)
  }

  editProd(trandfert:any){
    return this.httpClient.put<{message:any}>(`${this.prodUrl}/${trandfert._id}`, trandfert)
  }

  deleteProd(id:any){
    return this.httpClient.delete<{message:any}>(`${this.prodUrl}/${id}`)
  }
}
