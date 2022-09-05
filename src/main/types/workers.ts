import { OnfleetWorker } from '@onfleet/node-onfleet/Resources/Workers';

export type OnFleetWorkers = Pick<OnfleetWorker, 'id' | 'name' | 'phone'>;
