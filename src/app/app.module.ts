import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EditorComponent } from './share/editor/editor.component';
import { NgxElectronModule } from 'ngx-electron';
import { MkeditComponent } from './page/mkedit/mkedit.component';
import { appRoutesConfig } from './app.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    MkeditComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    RouterModule.forRoot(appRoutesConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
