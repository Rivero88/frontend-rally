import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class ImageService {
    private apiUrl = 'http://localhost:8080/images';
  
    constructor(private http: HttpClient) {}
  
    uploadImage(file: File) {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post(`${this.apiUrl}/upload`, formData);
    }
  }
  