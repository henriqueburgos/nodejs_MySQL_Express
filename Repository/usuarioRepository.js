const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  password: "isamor10",
  database: "mypetshow",
});
const bc = require("bcrypt");
const crp = require("../security/crypt");
const usuarios = "SELECT * FROM usuario";
const usuario = "SELECT * FROM usuario WHERE id = ?";
const usuarionemail = "select * from usuario where email = ?";
const userDelete = "DELETE FROM usuario WHERE id=";
const jwt = require("../security/jwt");

function getByid(id) {
  return new Promise((resolve,reject) => {
    console.log(id);
    db.query(usuario, [id], (err, result) => {
      if(err) reject(err)
if (result.length <1) {
  reject({message:"Usuario não encontrado."})
}
      resolve(result);
    });
  });
}

function getAll() {
  return new Promise((resolve) => {
    db.query(usuarios, (err, result) => {
      resolve(result);
    });
  });
}

function editUser(data, id) {
  return new Promise((resolve) => {
    db.query(
      `UPDATE usuario SET nome='${data.nome}', idade=${data.idade},email='${data.email}', nick='${data.nick}' WHERE id= ${id}`,
      (err, result) => {
        result.message = "usuario editado com sucesso";
        if (result) resolve(result);
      }
    );
  });
}
async function newUser(data) {
  data.senha = await crp.criptografar2(data.senha);

  return new Promise((resolve, reject) => {
    db.query(
      `INSERT usuario(nome,idade,email,nick,senha,perfil) VALUES("${data.nome}",${data.idade},"${data.email}","${data.nick}","${data.senha}",${data.perfil})`,
      (err, result) => {
        if (err) return reject(err.message);

        result.message = "Usuario Criado";
        resolve({ message: result.message, usuario: data });
      }
    );
  });
}

function login(data) {

  return new Promise((resolve, reject) => {
    db.query(usuarionemail, [data.email], (err, result) => {
      if (err) return reject(err.message);
      if (result.length > 0) {
    
        bc.compare(data.senha, result[0].senha).then((resultado) => {
          if (resultado) {
            let jwtresult = jwt.siging(result[0].id, result[0].perfil);
            resolve({ status: "Logado", resultado: jwtresult });
          }
          reject({ message: "Falha na Autenticação" });
        });
      }
      if (result.length < 1) reject({ message: "Falha na Autenticação" });
    });
  });
}

function deleteuser(id) {
  return new Promise((resolve) => {
    db.query(userDelete + id, (err, resul) => {
      if (resul) resolve(resul);
    });
  });
}

module.exports = {
  getByid,
  getAll,
  newUser,
  deleteuser,
  editUser,
  
  login,
};
