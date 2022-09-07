const repository = require("../Repository/PetRepository");

async function getByid(id) {
  return repository.getByid(id);
}

function getAll() {
  return repository.getAll();
}

function newpet(data) {
  return repository.newpet(data);
}

function editpet(data,id) {
  return repository.editpet(data,id);
}
function deletepet(id){
  return repository.deletepet(id)

}
module.exports = { getByid, getAll, newpet,deletepet,editpet,};
