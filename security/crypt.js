const hash = require("md5");
const bc = require("bcrypt");

function criptografar(senha) {
  const pass = hash(senha);
  return pass;
}
function criptografar2(senha) {
  return new Promise((resolve, reject) => {
    bc.hash(senha, 10, (err, hash) => {
      if (err) reject(err.message);
      resolve(hash); 
    });
  } );
}

 function compareKeys(senha,cripyo) {
  return bc.compare(senha, cripyo)

  }


console.log(compareKeys('d','$2b$10$bpiEAfKVRN1MSnF2OXCU9e3EjmBbu73zruoFsygV89LVMlTDMDYG2'))

module.exports = { criptografar , criptografar2,compareKeys};
