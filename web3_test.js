const web3 = require("web3");

console.log(web3.utils.isHex('0xc1912'));

console.log(web3.utils.isAddress('0x521d71d71dba586fd9d8d53ef2f12bcdfac7abf1'));

chksumAddress = web3.utils.toChecksumAddress('0x521d71d71dba586fd9d8d53ef2f12bcdfac7abf1');
console.log('chksum is ', chksumAddress);

//console.log('Bal is ' , web3.eth.getBalance("0x521d71D71DBa586fd9d8D53ef2f12BCDfaC7abF1"));

console.log(web3.eth.getBlockNumber());
