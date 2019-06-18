import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-section',
  templateUrl: './text-section.component.html',
  styleUrls: [ './text-section.component.css' ]
})
export class TextSectionComponent implements OnInit {

  /** Name of the text section */
  readonly SECTION_NAME = 'Texto';

  constructor() { }

  ngOnInit() {
  }

}
