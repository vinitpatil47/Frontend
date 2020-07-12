import { Component, OnInit } from '@angular/core';
import { BackserviceService } from '../backservice.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {

  constructor(public backservice : BackserviceService) { }

  ngOnInit(): void {
  }

}
