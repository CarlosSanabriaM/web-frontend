import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsComponent } from './topics.component';
import { TopicsTextComponent } from './topics-text/topics-text.component';
import { TopicsWordcloudComponent } from './topics-wordcloud/topics-wordcloud.component';
import { TopicsConfigurationComponent } from './topics-configuration/topics-configuration.component';
import { TopicDocumentsCardComponent } from './topic-documents-card/topic-documents-card.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from '../shared/shared.module';

/**
 * Domain feature module for the topics section.
 *
 * This type of modules consists mostly of declarations. Only the top component is exported.
 * This type of modules are typically imported exactly once by a larger feature module
 * (in this case, the AppModule, because routing is not used).
 */
@NgModule({
  // declare all the components that belong to this module
  declarations: [
    TopicsComponent,
    TopicsTextComponent,
    TopicsWordcloudComponent,
    TopicsConfigurationComponent,
    TopicDocumentsCardComponent
  ],
  // declare all the modules needed in this module, even if they are imported in another modules
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    SharedModule
  ],
  // export the top component of this module
  exports: [ TopicsComponent ]
})
export class TopicsModule {}
