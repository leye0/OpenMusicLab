import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Equipment_Grid_Padding, Equipment_Header_Height } from './app/app.consts';

function getCssVariableValue (variableName: string) { getComputedStyle(document.documentElement).getPropertyValue(variableName); }
function setCssVariableValue (variableName: string, value: string) { document.documentElement.style.setProperty(variableName, value); }

(function a () {
  setCssVariableValue('--equipment-grid-spacing', `${Equipment_Grid_Padding}px`);
  setCssVariableValue('--equipment-header-height', `${Equipment_Header_Height}px`);
})();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

