import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent } from './text.component';
import { TextareaComponent } from './textarea/textarea.component';
import { HistogramComponent } from './histogram/histogram.component';
import { RelatedTopicsCardComponent } from './related-topics-card/related-topics-card.component';
import { RelatedDocumentsCardComponent } from './related-documents-card/related-documents-card.component';
import { TextSummaryCardComponent } from './text-summary-card/text-summary-card.component';
import { TextOptionsComponent } from './text-options/text-options.component';
import { TextOptionRelatedTopicsComponent } from './text-options/text-option-related-topics/text-option-related-topics.component';
import { TextOptionRelatedDocumentsComponent } from './text-options/text-option-related-documents/text-option-related-documents.component';
import { TextOptionTextSummaryComponent } from './text-options/text-option-text-summary/text-option-text-summary.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularBootstrapModule } from '../angular-bootstrap.module';
import { ChartistModule } from 'ng-chartist';

/**
 * Domain feature module for the text section.
 *
 * This type of modules consists mostly of declarations. Only the top component is exported.
 * This type of modules are typically imported exactly once by a larger feature module
 * (in this case, the AppModule, because routing is not used).
 */
@NgModule({
  // declare all the components that belong to this module
  declarations: [
    TextComponent,
    TextareaComponent,
    TextOptionsComponent,
    TextOptionRelatedTopicsComponent,
    TextOptionRelatedDocumentsComponent,
    TextOptionTextSummaryComponent,
    RelatedTopicsCardComponent,
    HistogramComponent,
    RelatedDocumentsCardComponent,
    TextSummaryCardComponent
  ],
  // declare all the modules needed in this module, even if they are imported in another modules
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularBootstrapModule,
    ChartistModule,
    SharedModule
  ],
  // export the top component of this module
  exports: [ TextComponent ]
})
export class TextModule {}
