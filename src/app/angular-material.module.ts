import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * This module is used to import all the Angular Material components that will be used in the application.
 * Add the module in the imports and the exports arrays.
 */
@NgModule({
  imports: [ MatTableModule, MatSliderModule, MatButtonModule, MatTooltipModule ],
  exports: [ MatTableModule, MatSliderModule, MatButtonModule, MatTooltipModule ]
})
export class AngularMaterialModule {}
