import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  uploadProfilePhoto(image) {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post(`${this.uri}/upload/uploadProfilePhoto`, formData);
  }

  uploadEstatePhotos(images){
    const formData = new FormData();

    for(let i = 0 ;i < images.length; i++){
      formData.append('files', images[i]);
    }

    return this.http.post(`${this.uri}/upload/uploadEstatePhotos`, formData);
  }
}
