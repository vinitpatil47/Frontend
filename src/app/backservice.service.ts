import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Crop } from './crop';

@Injectable({
  providedIn: 'root'
})
export class BackserviceService {

  public crop : Crop = new Crop;
  public cropfinal : Crop[] = [];
  public output : Number[] = [];

  constructor(private http : HttpClient) { }


}
