import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { isDev } from '../../utils/isDev';

import { firebaseConfigDev } from './constants';

// Initialize Firebase
const app = initializeApp(
  isDev()
    ? // TODO: add production config
      firebaseConfigDev
    : firebaseConfigDev
);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
