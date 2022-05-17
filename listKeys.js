//
// TODO(developer): Uncomment these variables before running the sample.
//
const projectId = 'lofty-craft-348508';
const locationId = 'europe-west2';

// Imports the Cloud KMS library
const {KeyManagementServiceClient} = require('@google-cloud/kms');

// Instantiates a client
const client = new KeyManagementServiceClient();

// Build the location name
const locationName = client.locationPath(projectId, locationId);

async function listKeyRings() {
  const [keyRings] = await client.listKeyRings({
    parent: locationName,
  });

  for (const keyRing of keyRings) {
    console.log(keyRing.name);
  }

  return keyRings;
}

return listKeyRings();