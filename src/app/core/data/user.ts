import { Roles } from './roles'
import { Testability } from '@angular/core';

export class User {
    uid: string;
    username?: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    favoriteColor?: string;
    roles: Roles;
    catchPhrase?: string;
}