import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddCaisseService {
caisseUrl='http://localhost:3000/add-caisse'
  constructor(private httpClient:HttpClient) { }

  caisse(checkout:any){
    return this.httpClient.post<{message:any}>(`${this.caisseUrl}/caisse`,checkout)
  }

  caisseCheck(){
    return this.httpClient.get<{res:any}>(`${this.caisseUrl}`)
  }

  deleteById(id:any){
    return this.httpClient.delete<{message:any}>(`${this.caisseUrl}/${id}`,)
  }

  deleteCaisse(){
    return this.httpClient.delete<{message:any}>(`${this.caisseUrl}`)
  }
}
