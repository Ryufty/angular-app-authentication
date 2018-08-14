import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { CookieService, CookieOptions } from 'angular2-cookie/core';

import { CoreModule } from './core/core.module';
import { AppBootstrapModule } from './core/app-bootstrap.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

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
    CoreModule, 
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFirestoreModule,
    AppBootstrapModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  providers: [AuthService, NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }

