//
// TODO(developer): Uncomment these variables before running the sample.
//
// const projectId = 'my-project';
// const locationId = 'us-east1';
// const keyRingId = 'my-key-ring';
// const keyId = 'my-key';
// const member = 'user:foo@example.com';

const projectId = 'lofty-craft-348508';
const locationId = 'europe-west2';
const keyRingId = 'hsm-test';
const keyId = 'sign_key';
const member = 'serviceAccount:hsm-sa@lofty-craft-348508.iam.gserviceaccount.com';
// Imports the Cloud KMS library
const {KeyManagementServiceClient} = require('@google-cloud/kms');

// Instantiates a client
const client = new KeyManagementServiceClient();

// Build the resource name
const resourceName = client.cryptoKeyPath(
  projectId,
  locationId,
  keyRingId,
  keyId
);

// The resource name could also be a key ring.
// const resourceName = client.keyRingPath(projectId, locationId, keyRingId);

async function iamGetPolicy() {
  const [policy] = await client.getIamPolicy({
    resource: resourceName,
  });

  for (const binding of policy.bindings) {
    console.log(`Role: ${binding.role}`);
    for (const member of binding.members) {
      console.log(`  - ${member}`);
    }
  }

  return policy;
}

return iamGetPolicy();