import { Component, OnInit } from '@angular/core';
import { TextService } from '../text.service';

@Component({
  selector: 'app-text-section',
  templateUrl: './text-section.component.html',
  styleUrls: [ './text-section.component.css' ]
})
export class TextSectionComponent implements OnInit {

  sectionName = 'Texto';
  // TODO: This values shouldn't be hardcoded here
  textAreaNumRows = 30;

  constructor(private textService: TextService) { }

  ngOnInit() {
  }

}
