import { isDev } from '../../utils/isDev';

const LOCAL_DEVELOPMENT = true;

const BE_URL_DEV_LOCAL = 'http://localhost:5001/bevy-dev/europe-west3';
const BE_URL_DEV = 'https://europe-west3-bevy-dev.cloudfunctions.net';
const BE_URL_PROD = 'https://europe-west3-bevy-c8798.cloudfunctions.net';

const DEV_BASE = LOCAL_DEVELOPMENT ? BE_URL_DEV_LOCAL : BE_URL_DEV;
const BASE_URL = isDev() ? DEV_BASE : BE_URL_PROD;

export const ON_FLEET_EXPORT_TASKS_TO_DB = `${BASE_URL}/onFleet-exportTasksToDb`;
export const ON_FLEET_GET_WORKERS = `${BASE_URL}/onFleet-getWorkers`;
export const TASKS_GET_TASKS = `${BASE_URL}/tasks-getTasks`;
export const TASKS_BATCH_CREATE = `${BASE_URL}/tasks-batchCreate`;
export const UPDATE_USER_INFO = `${BASE_URL}/user-updateUser`;
