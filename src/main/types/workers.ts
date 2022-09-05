import { OnfleetWorker } from '@onfleet/node-onfleet/Resources/Workers';

export type OnFleetWorker = Pick<OnfleetWorker, 'id' | 'name' | 'phone'>;

export type OnFleetWorkers = OnFleetWorker[];
