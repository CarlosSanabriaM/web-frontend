import { NgModule } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * This module is used to import all the NG Bootstrap components that will be used in the application.
 * Add the module in the imports and the exports arrays.
 */
@NgModule({
  imports: [
    NgbAlertModule
  ],
  exports: [
    NgbAlertModule
  ]
})
export class AngularBootstrapModule {}
