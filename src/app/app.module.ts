import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { TopicsModule } from './topics/topics.module';
import { TextModule } from './text/text.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    // application modules
    TopicsModule,
    TextModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
