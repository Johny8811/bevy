import { isDev } from '../../utils/isDev';

// OnFleet API
const ON_FLEET_URL = 'https://onfleet.com/api/v2';

export const ON_FLEET_TASKS_BATCH_URL = `${ON_FLEET_URL}/tasks/batch`;
export const ON_FLEET_WORKERS = `${ON_FLEET_URL}/workers`;

// Backend
const BE_URL_DEV = 'http://localhost:5001/bevy-dev/us-central1/tasks';
const BE_URL_PROD = 'https://us-central1-bevy-c8798.cloudfunctions.net/tasks';
const BASE_URL = isDev() ? BE_URL_DEV : BE_URL_PROD;

export const TASKS = BASE_URL;
export const ON_FLEET_EXPORT_TASKS_TO_DB = `${BASE_URL}/onFleet/export/saveToDb`;
export const UPDATE_USER_INFO = `${BASE_URL}/user/update`;
