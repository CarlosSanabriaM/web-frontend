import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollDirective } from './scroll.directive';
import { ErrorSnackBarComponent } from './error-snack-bar/error-snack-bar.component';

/**
 * Shared module that allows to organize the code.
 *
 * Commonly used directives, pipes, and components are included in this module.
 * Then, this module can be imported wherever is needed, in other parts of your app.
 *
 * Services are not included here. Importing a module with services means that you will
 * have a new instance of that service, which typically is not what you need.
 * The most common way to get a hold of shared services is through Angular dependency injection.
 */
@NgModule({
  imports: [ CommonModule ],
  declarations: [
    ScrollDirective,
    ErrorSnackBarComponent
  ],
  exports: [
    ScrollDirective,
    ErrorSnackBarComponent
  ],
  // List of components that should be compiled when this module is defined.
  // Is needed to access ErrorSnackBarComponent component from the UtilsService.
  entryComponents: [ ErrorSnackBarComponent ]
})
export class SharedModule {}
