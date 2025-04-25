import { Component, OnInit } from '@angular/core';
import { ArchiveService } from 'backend/services/archives/archive.service';
declare function FilterkeyWord_all_table(): void
@Component({
  selector: 'app-comptabilite',
  templateUrl: './comptabilite.component.html',
  styleUrls: ['./comptabilite.component.css']
})
export class ComptabiliteComponent implements OnInit {
findedA : any={}
p:any =0
  constructor(private archiveService: ArchiveService) { }

  ngOnInit(): void {
    FilterkeyWord_all_table()
    this.archiveService.getArchive().subscribe(
      (data)=>{
        this.findedA = data.findedA
      }
    )
  }

  editArchive(id:any){

  }

  deleteArchive(id:any){

  }
}
