import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentType, GoldenLayoutModule } from "ngx-golden-layout";
import * as $ from 'jquery';
import { RackComponent } from './layouts/rack.component';
import { NexusComponentsDirective } from './directives/nexus-components.directive';
import { GridsterModule } from 'angular2gridster';

// It is required to have JQuery as global in the window object.
window['$'] = $;

const componentTypes: ComponentType[] = [{
  type: RackComponent,
  name: 'rack',
}];
@NgModule({
  declarations: [
    AppComponent,
    RackComponent,
    NexusComponentsDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoldenLayoutModule.forRoot(componentTypes),
    GridsterModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RackComponent]
})
export class AppModule { }
