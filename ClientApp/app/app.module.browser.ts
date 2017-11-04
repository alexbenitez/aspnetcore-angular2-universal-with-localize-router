import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ORIGIN_URL, REQUEST } from '@nguniversal/aspnetcore-engine';
import { AppModuleShared, routes } from './app.module';
import { AppComponent } from './app.component';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserPrebootModule } from 'preboot/browser';

import {LocalizeRouterModule, LocalizeParser, LocalizeRouterSettings} from 'localize-router';
import {LocalizeRouterHttpLoader} from 'localize-router-http-loader';
import {RouterModule} from '@angular/router';


export function getOriginUrl() {
  return window.location.origin;
}

export function getRequest() {
  // the Request object only lives on the server
  return { cookie: document.cookie };
}

// export function HttpLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) {
//     return new LocalizeRouterHttpLoader(translate, location, settings, http);
//   }

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserPrebootModule.replayEvents(),
        BrowserAnimationsModule,

        LocalizeRouterModule.forRoot(routes, {
            parser: {
              provide: LocalizeParser,
              useFactory: (translate, location, settings, http) =>
                  new LocalizeRouterHttpLoader(translate, location, settings, http),
              deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
            }
          }),

        // Our Common AppModule
        AppModuleShared

    ],
    providers: [
        {
            // We need this for our Http calls since they'll be using an ORIGIN_URL provided in main.server
            // (Also remember the Server requires Absolute URLs)
            provide: ORIGIN_URL,
            useFactory: (getOriginUrl)
        }, {
            // The server provides these in main.server
            provide: REQUEST,
            useFactory: (getRequest)
        }
    ]
})
export class AppModule { }
