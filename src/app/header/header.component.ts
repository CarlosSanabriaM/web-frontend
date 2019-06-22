import { Component, Input, OnInit } from '@angular/core';

/** Component that represents the header of the web page. */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {

  /** Page title. */
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
