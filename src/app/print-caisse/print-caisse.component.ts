import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddCaisseService } from 'backend/services/add-caisse/add-caisse.service';
import { ArchiveService } from 'backend/services/archives/archive.service';

@Component({
  selector: 'app-print-caisse',
  templateUrl: './print-caisse.component.html',
  styleUrls: ['./print-caisse.component.css']
})
export class PrintCaisseComponent implements OnInit {
  finded: any = {}
  sum: number = 0
  date:any
  formatDate:any
  timeString :any
  constructor(private addCaisse: AddCaisseService, private archive:ArchiveService, private router:Router ) { }

  ngOnInit(): void {

    this.addCaisse.caisseCheck().subscribe(
      (data) => {
        this.finded = data.res
console.log(this.finded);

        for (let i = 0; i < this.finded.length; i++) {
          this.sum += this.finded[i].prix

        }
      }
    )

    this.date = new Date
    this.formatDate = this.date.toLocaleDateString()
    const now: Date = new Date();
    const hours: string = String(now.getHours()).padStart(2, '0');
    const minutes: string = String(now.getMinutes()).padStart(2, '0');
    const seconds: string = String(now.getSeconds()).padStart(2, '0');
  
    this.timeString = `${hours}:${minutes}:${seconds}`;
 

  }

  print(){
    for (let i = 0; i < this.finded.length; i++) {
      let p = {name:'', prix:'', qty:'', date:'', time:''}
      p.name = this.finded[i].name,
      p.prix = this.finded[i].prix,
      p.date = this.formatDate,
      p.time = this.timeString
  
      this.archive.addArchive(p).subscribe(
        (data)=>{
          console.log(data.message);
          
        }
      )
      this.addCaisse.deleteCaisse().subscribe(
        (data)=>{
          console.log(data.message);      
        }
      )
    }

   this.router.navigate([''])
  }
}
