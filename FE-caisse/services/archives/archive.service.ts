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

  getArchive(){
    return this.httpClient.get<{findedA:any}>(`${this.archiveUrl}`)
  }

  getArchiveId(id:any){
    return this.httpClient.get<{findRes:any}>(`${this.archiveUrl}/${id}`)
  }

  putArchive(transfert:any){
    return this.httpClient.put<{message:any}>(`${this.archiveUrl}/${transfert._id}`, transfert)
  }

  deleteArchive(id:any){
    return this.httpClient.delete<{message:any}>(`${this.archiveUrl}/${id}`,)
  }
}
