// TODO: package "@onfleet/node-onfleet" has dependency error with webpack 5 and higher,
//  issue reported https://github.com/onfleet/node-onfleet/issues/72, or fix it later
import OnFleet from '@onfleet/node-onfleet';

export const onfleetApi = new OnFleet('a3d2ad58c6a62af1cd64f67df6ce03c7');

console.log('onfleetApi.verifyKey: ', onfleetApi.verifyKey());
