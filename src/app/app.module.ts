import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { AngularBootstrapModule } from './angular-bootstrap.module';
import { TopicsSectionComponent } from './topics-section/topics-section.component';
import { TextSectionComponent } from './text-section/text-section.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ScrollDirective } from './scroll.directive';
import { ChartistModule } from 'ng-chartist';
import { HistogramComponent } from './text-section/histogram/histogram.component';
import { TextareaComponent } from './text-section/textarea/textarea.component';
import { RelatedTopicsCardComponent } from './text-section/related-topics-card/related-topics-card.component';
import { RelatedDocumentsCardComponent } from './text-section/related-documents-card/related-documents-card.component';
import { TextSummaryCardComponent } from './text-section/text-summary-card/text-summary-card.component';
import { TextOptionsComponent } from './text-section/text-options/text-options.component';
import { TextOptionRelatedTopicsComponent } from './text-section/text-options/text-option-related-topics/text-option-related-topics.component';
import { TextOptionRelatedDocumentsComponent } from './text-section/text-options/text-option-related-documents/text-option-related-documents.component';
import { TextOptionTextSummaryComponent } from './text-section/text-options/text-option-text-summary/text-option-text-summary.component';
import { TopicDocumentsCardComponent } from './topics-section/topic-documents-card/topic-documents-card.component';
import { TopicsTextComponent } from './topics-section/topics-text/topics-text.component';
import { TopicsConfigurationComponent } from './topics-section/topics-configuration/topics-configuration.component';
import { TopicsWordcloudComponent } from './topics-section/topics-wordcloud/topics-wordcloud.component';

@NgModule({
  declarations: [
    AppComponent,
    TopicsSectionComponent,
    TextSectionComponent,
    FooterComponent,
    HeaderComponent,
    ScrollDirective,
    HistogramComponent,
    TextareaComponent,
    RelatedTopicsCardComponent,
    RelatedDocumentsCardComponent,
    TextSummaryCardComponent,
    TextOptionsComponent,
    TextOptionRelatedTopicsComponent,
    TextOptionRelatedDocumentsComponent,
    TextOptionTextSummaryComponent,
    TopicDocumentsCardComponent,
    TopicsTextComponent,
    TopicsConfigurationComponent,
    TopicsWordcloudComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularBootstrapModule,
    ChartistModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
