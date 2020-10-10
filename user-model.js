const db = require('./database/dbConfig');

function find(){
    return db('users').select('id','username')
}


function findById(id){
    return db('users')
    .select('id','username')
    .where('id',id)
}

async function add(user){
    const [id] = await db('users').insert(user)
    return findById(id)
}

function findBy(filter){
    return db('users')
    .select('id','username','password')
    .where(filter)
}

module.exports = {
    find,
    findById,
    add,
    findBy
}