import { Component, OnInit } from '@angular/core';

/** Root component of the text module that represents the text section. */
@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: [ './text.component.css' ]
})
export class TextComponent implements OnInit {

  /** Name of the text section. */
  readonly SECTION_NAME = 'Texto';

  constructor() { }

  ngOnInit() {
  }

}
