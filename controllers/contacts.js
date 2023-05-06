const database = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId; // this helps with getting the id


//working on a way to not have to declare db every time
// const getDB = async (database) => { await database.connectDatabase() };
// const db = getDB(database);

// get all contacts from the mongo database
const getAll = async (req, res) => {
  const db = await database.connectDatabase();
  const result = await db.collection('contacts').find().toArray();
  console.log(result);
  res.send(result);
};

// get one contact from the mongo database using an id
const get = async (req, res) => {
  const db = await database.connectDatabase();
  const id = req.params.id;
  const isValidId = /^[0-9a-fA-F]{24}$/.test(id); // check if id is a valid 24-character hex string
  if (!isValidId) {
    res.status(400).send('Invalid contact ID');
    return;
  }
  else{
    console.log('valid ID');
  }

  // const query = { _id: id};
  //const result = await db.collection('contacts').findOne(query);
  const result = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
  console.log(result);
  res.send(result);
};

// create one listing  in the mongo database using 
const createOne = async (req, res) => {
  const db = await database.connectDatabase();
  console.log('attempting to insert: \n' + req.body);
  contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await db.collection('contacts').insertOne(contact);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'could not create the contact.');
  }
};
const createMany = async (req, res) => {
  const db = await database.connectDatabase();
  console.log('attempting to insert: \n' + req.body);

  contacts = [];
  for (contact of req.body){
    newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    contacts.push(newContact);
  };

  const response = await db.collection('contacts').insertMany(contacts);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'could not create the contact.');
  }
};

const update = async (req, res) => {
  const db = await database.connectDatabase();
  
  
};
// delete one contact basecd on the id parameter in the url
const deleteOne = async (req, res) => {
  const db = await database.connectDatabase();
  const id = req.params.id;
  const response = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });
  if (response.acknowledged) {
    res.status(200).json(response);
  } else {
    res.status(500).json(response.error || 'could not delete the contact.');
  }
};

// delete multiple listings based on a json querry, 
const deleteMany = async (req, res) => {
  const db = await database.connectDatabase();
  const query = req.body;
  const response = await db.collection('contacts').deleteMany(query);
  if (response.acknowledged) {
    res.status(200).json(response);
  } else {
    res.status(500).json(response.error || 'could not delete the contacts.');
  }
};


module.exports = {
    get,
    getAll,
    createOne,
    createMany,
    update,
    deleteOne,
    deleteMany

};