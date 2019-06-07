import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

/**
 * This module is used to import all the Angular Material components that will be used in the application.
 * Add the module in the imports and the exports arrays.
 */
@NgModule({
  imports: [ MatTableModule ],
  exports: [ MatTableModule ]
})
export class AngularMaterialModule {}
