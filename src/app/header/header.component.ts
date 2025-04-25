import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
declare function toggle(): void

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token:any={}
  constructor(private router: Router) { }

  ngOnInit(): void {
    toggle()
        const decodeToken = (token: string | null)=>{
          if (!token) {
              return null
          }
          return jwtDecode(token)
      }
      const rawToken = localStorage.getItem('token');
      this.token = decodeToken(rawToken);
  }

  removeToken(){
    localStorage.removeItem('token')
    this.router.navigate(['login']).then(()=>{
      location.reload()
    })

  }
}
