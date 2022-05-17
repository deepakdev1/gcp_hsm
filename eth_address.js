const keccak256 = require('keccak256');

function deriveEthAddress(pubKey){
    const address = keccak256(pubKey) // keccak256 hash of  publicKey
    // Get the last 20 bytes of the public key
    console.log('address' , address.toString('hex'))
    return "0x" + address.toString('hex').substring(address.length - 40, address.length)
}

let address1 = deriveEthAddress('MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAExvDRtHQIAUcfd1PcxWcfpoEA3w8QRwQe1Ul0OW9DI9mZLvL0ByF+X1wb6juea/+xAB7KWhezwIodX8WbkJzzSw==')
console.log('address is', address1);



