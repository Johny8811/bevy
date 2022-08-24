// OnFleet
const ON_FLEET_URL = 'https://onfleet.com/api/v2';

export const ON_FLEET_TASKS_BATCH_URL = `${ON_FLEET_URL}/tasks/batch`;

// Our BE
// const BE_URL_DEV = 'http://localhost:5001/bevy-bbf67/us-central1/tasks';
const BE_URL_PROD = 'https://us-central1-bevy-bbf67.cloudfunctions.net/tasks';
const BASE_URL = BE_URL_PROD;

export const USER_TASKS = `${BASE_URL}/user`;
export const ON_FLEET_EXPORT_TASKS_TO_DB = `${BASE_URL}/onFleet/export/saveToDb`;
