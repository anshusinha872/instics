// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDhBekEXl_X6P7mXncvuanlnqar7opcQ3Y',
    authDomain: 'instinctsuserverification.firebaseapp.com',
    projectId: 'instinctsuserverification',
    storageBucket: 'instinctsuserverification.appspot.com',
    messagingSenderId: '435611301157',
    appId: '1:435611301157:web:25c76bdcc03552183056cc',
  },
  APIEndpoint: 'http://localhost:3443/api/v1/', //Local
  // APIEndpoint: 'https://instincts.co.in/api/v1/', //server
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
