import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
signupUrl = 'http://localhost:3000/signup'
  constructor(private httpClient:HttpClient) { }

  signup(user:any){
    return this.httpClient.post<{message:any}>(`${this.signupUrl}/signup`, user)
  }

  login(user:any){
    return this.httpClient.post<{user:any, message:any}>(`${this.signupUrl}/login`, user)
  }
}
