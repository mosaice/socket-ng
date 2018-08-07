import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgIoModule, NgIoConfig } from 'ng-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { APIInterceptor } from './services/api-interceptor.service';
import { AuthGuard, NoAuthGuard } from './services/router.guard';
import { RoomComponent } from './room/room.component';
import { SignInComponent } from './sign-in/sign-in.component';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

export const routes: Routes = [
  { path: '', component: RoomComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SignInComponent, canActivate: [NoAuthGuard] },
  { path: '**', redirectTo: '/' }
];

// const config: NgIoConfig = { url: 'ws://localhost:3000', options: {} };
@NgModule({
  declarations: [AppComponent, RoomComponent, SignInComponent],
  imports: [
    BrowserModule,
    // NgIoModule.forRoot(config),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    NoAuthGuard,
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true }
  ]
})
export class AppModule {}
