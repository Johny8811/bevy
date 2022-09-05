import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getRemoteConfig } from 'firebase/remote-config';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { isDev } from '../../utils/isDev';

import { FIREBASE_CONFIG_DEV, FIREBASE_CONFIG_PROD } from './constants';

// Initialize Firebase
const app = initializeApp(isDev() ? FIREBASE_CONFIG_DEV : FIREBASE_CONFIG_PROD);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const remoteConfig = getRemoteConfig(app);

remoteConfig.settings.minimumFetchIntervalMillis = 900000; // 15 minutes

if (isDev()) {
  remoteConfig.settings.minimumFetchIntervalMillis = 120000; // 2 minutes
}
