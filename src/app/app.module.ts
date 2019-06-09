import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopicsSectionComponent } from './topics-section/topics-section.component';
import { TextSectionComponent } from './text-section/text-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { AngularBootstrapModule } from './angular-bootstrap.module';

@NgModule({
  declarations: [
    AppComponent,
    TopicsSectionComponent,
    TextSectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularBootstrapModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
