import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArchiveService } from 'backend/services/archives/archive.service';
declare function FilterkeyWord_all_table(): void
@Component({
  selector: 'app-comptabilite',
  templateUrl: './comptabilite.component.html',
  styleUrls: ['./comptabilite.component.css']
})
export class ComptabiliteComponent implements OnInit {
  findedA: any = {}
  p: any = 0
  id: any
  findId: any = {}
  constructor(private archiveService: ArchiveService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    FilterkeyWord_all_table()
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    if (this.id) {
      this.archiveService.getArchiveId(this.id).subscribe(
        (data) => {
          this.findId = data.findRes
        }
      )
    }
    this.archiveService.getArchive().subscribe(
      (data) => {
        this.findedA = data.findedA
      }
    )
  }
  editArchive(id: any) {
    this.router.navigate([`comptabilite/${id}`])
  }

  deleteArchive(id: any) {
    this.archiveService.deleteArchive(id).subscribe(
      (data) => {
        console.log(data.message)
        location.reload()
      }
    )
  }
  compta() {
    this.router.navigate(['comptabilite'])
  }
  editArchiveId(id: any) {
    this.archiveService.putArchive(this.findId).subscribe(
      (data) => {
        console.log(data.message);
        this.router.navigate(['comptabilite'])
      }
    )
  }
}
