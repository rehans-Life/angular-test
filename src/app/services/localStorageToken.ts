import { InjectionToken } from '@angular/core';

// Creating an Injectable value provider that returns any type
// we marking providedIn property as Root because we want it
// to be automically be configured in our App.
export const localStorageToken = new InjectionToken<any>('local storage', {
  providedIn: 'root',
  factory() {
    return localStorage;
  },
});
