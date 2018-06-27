import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { WsService } from './Shared/ws.service';
import { AppComponent } from './app.component';
import { NgIoModule, NgIoConfig } from 'ng-io';

const config: NgIoConfig = { url: 'ws://localhost:3000', options: {} };
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgIoModule.forRoot(config)],
  bootstrap: [AppComponent]
})
export class AppModule {}
