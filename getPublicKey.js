//
// TODO(developer): Uncomment these variables before running the sample.
//
// const projectId = 'my-project';
// const locationId = 'us-east1';
// const keyRingId = 'my-key-ring';
// const keyId = 'my-key';
const projectId = 'lofty-craft-348508';
const locationId = 'europe-west2';
const keyRingId = 'hsm-test';
const keyId = 'sign_key';
const versionId = '1';

// Imports the Cloud KMS library
const {KeyManagementServiceClient} = require('@google-cloud/kms');

// Instantiates a client
const client = new KeyManagementServiceClient();

// Build the key version name
const versionName = client.cryptoKeyVersionPath(
  projectId,
  locationId,
  keyRingId,
  keyId,
  versionId
);

async function getPublicKey() {
  const [publicKey] = await client.getPublicKey({
    name: versionName,
  });

  // Optional, but recommended: perform integrity verification on publicKey.
  // For more details on ensuring E2E in-transit integrity to and from Cloud KMS visit:
  // https://cloud.google.com/kms/docs/data-integrity-guidelines
  const crc32c = require('fast-crc32c');
  if (publicKey.name !== versionName) {
    throw new Error('GetPublicKey: request corrupted in-transit');
  }
  if (crc32c.calculate(publicKey.pem) !== Number(publicKey.pemCrc32c.value)) {
    throw new Error('GetPublicKey: response corrupted in-transit');
  }

  console.log(`Public key pem: ${publicKey.pem}`);

  return publicKey;
}

return getPublicKey();