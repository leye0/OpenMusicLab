import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Nexus_Component_Padding, Nexus_Header_Height } from './app/app.consts';

function getCssVariableValue (variableName: string) { getComputedStyle(document!.documentElement!).getPropertyValue(variableName); }
function setCssVariableValue (variableName: string, value: string) { document!.documentElement!.style!.setProperty(variableName, value); }

(function a () {
  setCssVariableValue('--nexus-component-spacing', `${Nexus_Component_Padding}px`);
  setCssVariableValue('--nexus-header-height', `${Nexus_Header_Height}px`);
})();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

