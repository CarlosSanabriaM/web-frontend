import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

/**
 * This module is used to import all the Angular Material components that will be used in the application.
 * Add the module in the imports and the exports arrays.
 */
@NgModule({
  imports: [
    MatTableModule,
    MatSliderModule,
    MatButtonModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule
  ],
  exports: [
    MatTableModule,
    MatSliderModule,
    MatButtonModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule
  ]
})
export class AngularMaterialModule {}
