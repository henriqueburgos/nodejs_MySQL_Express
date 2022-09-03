const repository = require("../Repository/usuarioRepository.js");

async function getByid(id) {
  return repository.getByid(id);
}
function getAll() {
  return repository.getAll();
}

function newUser(data) {
  return repository.newUser(data);
}
function editUser(data,id) {
  return repository.editUser(data,id);
}
function deleteuser(id){
  return repository.deleteuser(id)

}
module.exports = { getByid, getAll, newUser,deleteuser,editUser};
