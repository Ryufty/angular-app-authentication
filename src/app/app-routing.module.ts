import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFormComponent } from './user-form/user-form.component'
import { SecretPageComponent } from './secret-page/secret-page.component';
import { SubsPageComponent } from './subs-page/subs-page.component';
import { AdminGuard } from './core/admin.guard';

const routes: Routes = [
  { path: 'home', component: UserFormComponent},
  { path: 'secret', component: SecretPageComponent },
  { path: 'subs', component: SubsPageComponent },
  { path: 'content', component: UserProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
