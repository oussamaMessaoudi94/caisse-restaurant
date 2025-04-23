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
}
