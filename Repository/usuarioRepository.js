const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  password: "isamor10",
  database: "mypetshow",
});

const usuarios = "SELECT * FROM usuario";
const usuario = "SELECT * FROM usuario WHERE id =";
const userDelete="DELETE FROM usuario WHERE id="

function getByid(id) {
  return new Promise((resolve) => {
    db.query(usuario + id, (err, result) => {
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

function editUser(data,id) {
  return new Promise((resolve) => {
    db.query(
      `UPDATE usuario SET nome='${data.nome}', idade=${data.idade},email='${data.email}', nick='${data.nick}' WHERE id= ${id}`,
      (err, result) => {
        result.message="usuario editado com sucesso"
        if (result) resolve(result);
      }
    );
  });
}
function newUser(data) {
  return new Promise((resolve) => {
    db.query(
      `INSERT usuario(nome,idade,email,nick) VALUE('${data.nome}',${data.idade},'${data.email}','${data.nick}')`,
      (err, result) => {
        if (result) resolve(result);
      }
    );
  });
}

function deleteuser(id){
  return new Promise((resolve)=>{
db.query(userDelete+id, (err,resul)=>{
  if (resul) resolve(resul)
})
})
}

module.exports = { getByid, getAll, newUser,deleteuser,editUser};
