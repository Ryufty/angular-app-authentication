// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true, 
  firebase: {
    apiKey: "AIzaSyA2169ZVSLzev1d_VAXYZYNrFHLSaLWAoc",
    authDomain: "angularfire-a3c5d.firebaseapp.com",
    databaseURL: "https://angularfire-a3c5d.firebaseio.com",
    projectId: "angularfire-a3c5d",
    storageBucket: "angularfire-a3c5d.appspot.com",
    messagingSenderId: "41886908576"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
