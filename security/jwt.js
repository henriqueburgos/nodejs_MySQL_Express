const jwt = require("jsonwebtoken");
const env = require("../nodemon.json");

function siging(id, perfil) {
  return jwt.sign(
    {
      id: id,
      perfil: perfil,
    },
    env.env.jwt_key,
    {
      expiresIn: "1h",
    }
  );
}

function verifyjwt(token) {
return jwt.verify(token, env.env.jwt_key);
  } 

module.exports = { siging, verifyjwt};
