import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

/** Component that represents the content of the Angular Material Snackbar used to show the error messages to the user. */
@Component({
  selector: 'app-error-snack-bar',
  templateUrl: './error-snack-bar.component.html',
  styleUrls: [ './error-snack-bar.component.css' ]
})
export class ErrorSnackBarComponent implements OnInit {

  /**
   * @param data Data passed to the snackbar. In this case, is the error message.
   */
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
  }

}
