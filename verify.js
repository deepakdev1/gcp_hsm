//
// TODO(developer): Uncomment these variables before running the sample.
//
// const projectId = 'your-project-id';
// const locationId = 'us-east1';
// const keyRingId = 'my-key-ring';
// const keyId = 'my-key';
// const versionId = '1';
// const message = 'my message to verify';
// const signatureBuffer = Buffer.from('...');

const projectId = 'lofty-craft-348508';
const locationId = 'europe-west2';
const keyRingId = 'hsm-test';
const keyId = 'sign_key';
const versionId = '1';
const message = 'MEYCIQCUy8u8UDHa8klhLIS5JlQbx1BQgmsaZhVhHBR316dtEAIhAIEcyu6FfOgP3YqFneyWuCtJLTtCbbuAyGnkYEhSr7TF';
const signatureBuffer = Buffer.from(message);
console.log('initial buffer is', Buffer.toString(signatureBuffer));

// Imports the Cloud KMS library
const {KeyManagementServiceClient} = require('@google-cloud/kms');

// Instantiates a client
const client = new KeyManagementServiceClient();

// Build the key name
const versionName = client.cryptoKeyVersionPath(
  projectId,
  locationId,
  keyRingId,
  keyId,
  versionId
);

async function verifyAsymmetricSignatureEc() {
  // Get public key
  const [publicKey] = await client.getPublicKey({
    name: versionName,
  });

  // Create the verifier. The algorithm must match the algorithm of the key.
  const crypto = require('crypto');
  const verify = crypto.createVerify('sha256');
  verify.update(message);
  verify.end();

  // Build the key object
  const key = {
    key: publicKey.pem,
  };

  // Verify the signature using the public key
  const verified = verify.verify(key, signatureBuffer);
  console.log('sig buffer is', Buffer.toString(signatureBuffer));
  return verified;
}

return verifyAsymmetricSignatureEc();