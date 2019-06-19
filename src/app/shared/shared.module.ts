import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollDirective } from './scroll.directive';

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
  declarations: [ ScrollDirective ],
  exports: [ ScrollDirective ]
})
export class SharedModule {}
