import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'services/signup/signup.service';
declare function login() :void
  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm!: FormGroup
user:any={}
  constructor(private fb: FormBuilder, private loginService: SignupService, private router :Router) { }

  ngOnInit(): void {
    login()


    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required]],
      code: ['', [Validators.required]]
    })
  }

  signup(id:any){
    if (this.loginForm.value.code == '450') {
      this.loginService.signup(this.loginForm.value).subscribe(
        (data)=>{
          alert(data.message)
        }
      )
    } else {
      alert('code incorrect')
    }
  }

  login(){
    this.loginService.login(this.user).subscribe(
      (data)=>{
        if (data.message == '0') {
          alert('email incorrect')
        } else if (data.message == '1') {
          alert('password incorrect')
        } else {
          localStorage.setItem('token', JSON.stringify(data.user))
          this.router.navigate(['']).then(() => {
            location.reload(); 
          });
        }
      }
     
    )
  }
}
