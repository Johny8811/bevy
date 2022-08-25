import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getRemoteConfig } from 'firebase/remote-config';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { isDev } from '../../utils/isDev';

import { FIREBASE_CONFIG_DEV } from './constants';

// Initialize Firebase
const app = initializeApp(
  isDev()
    ? // TODO: add production config
      FIREBASE_CONFIG_DEV
    : FIREBASE_CONFIG_DEV
);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const remoteConfig = getRemoteConfig(app);
