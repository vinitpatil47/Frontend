import { Component, OnInit, ElementRef } from '@angular/core';
import { Crop } from '../crop';
import { HttpClient } from '@angular/common/http';
import { BackserviceService } from '../backservice.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  public crop : Crop[] = [];
  public state : String[] = [];
  public district : String[] = [];
  public season = ['Kharif     ','Rabi       ','Whole Year '];
  public crop1 : String[] = [];
  public date  = new Date();

  public url = 'https://cropprediction.herokuapp.com';

  constructor(private http: HttpClient,public backservice : BackserviceService,private router : Router) { }

  ngOnInit(): void {
    this.backservice.crop.State_Name = "Select state name";
    this.backservice.crop.District_Name = "Select district name";
    this.backservice.crop.Season = "Select season name";
    this.backservice.crop.Crop = "Select crop name";
  
	

    this.http.get<String[]>(this.url + '/getstate/')
    .subscribe
    (
        data =>
        {
            this.state = data;
        },
        error =>
        {
          console.log(error);
        }
    );
  }

  public getyield(i : any,j : any)
  {
    console.log(this.crop[i].Crop);
    this.http.post('http://127.0.0.1:5000/employee',this.crop[i])
    .subscribe
    (
      data => 
      {
        console.log(this.crop[i].Crop + " " + data[0][0]);
        this.backservice.output[i] = data[0][0];

        if(j == 1)
        {
          this.backservice.cropfinal = this.crop;
          this.router.navigate(['prediction']);
        }
       },
       error =>
       {
         console.log(error);
       }
     )
  }

 public OnSubmit()
 {
   if(this.backservice.crop.Crop == "Select crop name")
   {
     var i : any;
      for(i = 0 ; i < this.crop1.length ; i++)
      {
          this.crop[i] = new Crop();
          this.crop[i] = this.backservice.crop;
          this.crop[i].Crop = this.crop1[i];

          console.log(i);

          if(this.backservice.crop.Rainfall == null)
              this.crop[i].Rainfall = 2000;

          if(i < this.crop1.length-1)
            this.getyield(i,0);
          else  
            this.getyield(i,1);
      }
   }
   else
  {
      this.crop[0] = new Crop();
      this.crop[0] = this.backservice.crop;
      this.getyield(0,1);
  }
  
 }

 public changestate(i : Event)
 {
   this.backservice.crop.Crop_Year = this.date.getFullYear();
   if(this.backservice.crop.State_Name != "Select state name")
   {
      this.http.get<String[]>(this.url + '/getdistrict/' + this.backservice.crop.State_Name)
      .subscribe
      (
          data =>
          {
              this.district = data;
              this.crop1 = null;
              this.backservice.crop.District_Name = "Select district name";
              this.backservice.crop.Crop = "Select crop name";
          },
          error =>
          {
              console.log(error);
          }
      );
   }
   else
   {
        this.district = null;
        this.crop1 = null;
        this.backservice.crop.District_Name = "Select district name";
        this.backservice.crop.Crop = "Select crop name";
   }
    
 }

 public changedistrict(i : any)
 {
      if(this.backservice.crop.District_Name != "Select district name")
      {
        this.http.get<String[]>(this.url + '/getcrop/'+ this.backservice.crop.State_Name + '/' + this.backservice.crop.District_Name)
        .subscribe
        (
            data =>
            {
                this.crop1 = data;
                this.backservice.crop.Crop = "Select crop name";
            },
            error =>
            {
              console.log(error);
            }
        );
      }
      else
      {
          this.crop1 = null;
          this.backservice.crop.Crop = "Select crop name";
      }
 }

}
