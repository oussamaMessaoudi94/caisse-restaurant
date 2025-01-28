import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
archiveUrl = 'http://localhost:3000/archives'
  constructor(private httpClient:HttpClient) { }

  addArchive(archive:any){
    return this.httpClient.post<{message:any}>(`${this.archiveUrl}/addArchive`, archive)
  }
}
