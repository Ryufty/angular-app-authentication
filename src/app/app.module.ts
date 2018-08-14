import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { CookieService, CookieOptions } from 'angular2-cookie/core';

//import { CoreModule } from './core/core.module';
//import { AppBootstrapModule } from './core/app-bootstrap.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { AuthService } from './core/auth.service';
import { NotifyService } from './core/notify.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppRoutingModule } from './app-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SecretPageComponent } from './secret-page/secret-page.component';
import { SubsPageComponent } from './subs-page/subs-page.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { AuthGuard } from './core/auth.guard';
import { AdminGuard } from './core/admin.guard';
import { CanReadGuard } from './core/can-read.guard';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UserFormComponent,
    SecretPageComponent,
    SubsPageComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfire'), // imports firebase/app needed for everything 
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AngularFirestoreModule,
    NgIdleKeepaliveModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [AuthService, NotifyService, AuthGuard, AdminGuard, CanReadGuard],
  bootstrap: [AppComponent],
  exports: [BsDropdownModule, TooltipModule, ModalModule, NgIdleKeepaliveModule]
})
export class AppModule { }

