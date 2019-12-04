import { Component, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { IExtendedGoldenLayoutConfig, GoldenLayoutComponent } from 'ngx-golden-layout';

const INITIAL_LAYOUT = <IExtendedGoldenLayoutConfig>{
  content: [{
    type: 'row',
    content: [{
      type: 'component',
      componentName: 'rack',
      title: 'My Rack'
    }
    // ,
    // {
    //   type: 'component',
    //   componentName: 'rack',
    //   title: 'Other rack',
    // }
  ]
  }]
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(GoldenLayoutComponent, { static: true }) layout: GoldenLayoutComponent;
  layoutConfig$ = of(INITIAL_LAYOUT);
  stateChanged(event: any): void {
    console.log(this.layout.getSerializableState());
    // https://golden-layout.com/tutorials/saving-state.html
    // TODO: Save layout.
  }
}
