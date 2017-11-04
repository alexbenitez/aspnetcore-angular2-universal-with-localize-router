import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppModuleShared } from './app.module';
import { AppComponent } from './app.component';
import { ServerTransferStateModule } from '@angular/platform-server';

import { ServerPrebootModule } from 'preboot/server';

// export class LocalizeUniversalLoader extends LocalizeParser {
//   /**
//    * Gets config from the server
//    * @param routes
//    */
//   public load(routes: Routes): Promise<any> {
//     return new Promise((resolve: any) => {
//       let data: any = JSON.parse(fs.readFileSync(`assets/locales.json`, 'utf8'));
//       this.locales = data.locales;
//       this.prefix = data.prefix;
//       this.init(routes).then(resolve);
//     });
//   }
// }

// export function localizeLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
//   return new LocalizeUniversalLoader(translate, location, settings);
// }

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    // Our Common AppModule
    AppModuleShared,

    ServerModule,
    ServerPrebootModule.recordEvents({ appRoot: 'app-root' }),
    NoopAnimationsModule,

    // HttpTransferCacheModule still needs fixes for 5.0
    //   Leave this commented out for now, as it breaks Server-renders
    //   Looking into fixes for this! - @MarkPieszak
    // ServerTransferStateModule // <-- broken for the time-being with ASP.NET
  ]
})
export class AppModule {

  constructor() { }

}
