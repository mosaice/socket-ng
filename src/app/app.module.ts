import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { WsService } from './Shared/ws.service';
import { AppComponent } from './app.component';
import { NgIoModule, NgIoConfig } from 'ng-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

const config: NgIoConfig = { url: 'ws://localhost:3000', options: {} };
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgIoModule.forRoot(config),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }]
})
export class AppModule {}
