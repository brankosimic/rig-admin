import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DriveSession } from '../infrastructure/drive.session';

export function initDrive(driveSession: DriveSession) {
  return () => driveSession.initClient();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{ provide: APP_INITIALIZER, useFactory: initDrive, deps: [DriveSession], multi: true },
  DriveSession],
  bootstrap: [AppComponent]
})
export class AppModule { }
