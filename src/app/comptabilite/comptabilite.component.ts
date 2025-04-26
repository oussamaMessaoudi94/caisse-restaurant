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
  p: any= 1
  id: any
  findId: any = {}
  filteredFindedA: any[] = []; // after filtering
  searchTerm: string = '';
  constructor(private archiveService: ArchiveService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
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
        this.filteredFindedA = this.findedA;
        
      }
    )
  }
  onSearch() {
    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      this.filteredFindedA = this.findedA.filter((prod:any) =>
        (prod.name && prod.name.toLowerCase().includes(term)) ||
        (prod.prix && prod.prix.toString().toLowerCase().includes(term)) ||
        (prod.qty && prod.qty.toString().toLowerCase().includes(term)) ||
        (prod.specify && prod.specify.toLowerCase().includes(term)) ||
        (prod.date && prod.date.toLowerCase().includes(term)) ||
        (prod._id && prod._id.toLowerCase().includes(term))
      );
    } else {
      this.filteredFindedA = this.findedA;
    }
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
