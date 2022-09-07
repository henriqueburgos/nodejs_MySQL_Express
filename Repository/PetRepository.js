const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  password: "isamor10",
  database: "mypetshow",
});
const pets = "SELECT * FROM pets";
const pet = "SELECT * FROM pets WHERE id = ?";
const petDelete = "DELETE FROM pets WHERE id=";
const jwt = require("../security/jwt");

function getByid(id) {
  return new Promise((resolve,reject) => {
    console.log(id);
    db.query(pet, [id], (err, result) => {
      if(err) reject(err)
if (result.length <1) {
  reject({message:"pet não encontrado."})
}
      resolve(result);
    });
  });
}

function getAll() {
  return new Promise((resolve) => {
    db.query(pets, (err, result) => {
      resolve(result);
    });
  });
}

function editpet(data, id) {
  return new Promise((resolve,reject) => {
    db.query(
      `UPDATE pets SET nome_pet=?, dt_nascimento=?,raca_pet=?,sexo_pet=?,matchpet=?,ultima_consulta=? WHERE id=?`,
      [data.nome_pet,data.dt_nascimento, data.raca_pet,data.sexo_pet,data.matchpet, data.ultima_consulta,id],
      (err, result) => {
        if(err) return reject(err)
        if(result.affectedRows==0) return reject({error:"id_not_found",
      message:"Edição invalida, revise os dados ou o id passado pelo endpoint"})
        result.message = "pet editado com sucesso";
        if (result.affectedRows>0) resolve(result);

      }
    );
  });
}
async function newpet(data) {
   return new Promise((resolve, reject) => {
    db.query(
      `INSERT pets(id_tutor,nome_Pet,dt_nascimento,raca_pet,sexo_pet,matchpet,ultima_consulta) 
      VALUES("${data.id_tutor}","${data.nome_pet}","${data.dt_nascimento}","${data.raca_pet}","${data.sexo_pet}","${data.matchpet}","${data.ultima_consulta}")`,
      (err, result) => {
        if (err) return reject(err.message);
      console.log(result)
        result.message = "pet Criado";
        resolve({ message: result.message, pet: {
          id:result.insertId,
          dt_criacao: new Date().toString(),
          
          ...data} });
      }
    );
  });
}

function deletepet(id) {
  return new Promise((resolve) => {
    db.query(petDelete + id, (err, resul) => {
      if (resul) resolve(resul);
    });
  });
}

module.exports = {
  getByid,
  getAll,
  newpet,
  deletepet,
  editpet,
};
