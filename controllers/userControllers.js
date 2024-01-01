import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import * as services from '../services/services.js'
import { handleErrors } from '../utils/handleErrors.js';

const getAll = async (req, res) => {
  try{
    const response = await services.getAll(User);
    let users = [];
    response.map( user => {
      users.push({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        loginType: user.loginType
      })
    })
    res.status(200).json(users);
  } catch (errors) {
    const error = handleErrors(errors);
    res.status(500).send({ errors: error })
  } 
}

const getOne = async (req, res) => {

  if(
    !req.params.id
  ) {
    return;
  }

  try {
    const result = await services.getUser( User,req.params.id);
    res.status(200).send({status: "success", data: result});
  } catch(errors) {
    const error = handleErrors(errors);
    res.status(500).send({ errors: error })
  }
}

const updateOne = async (req, res) => {

  if(
    !req.params.id
  ) {
    return;
  }

  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(req.body.password, salt);

  const updateNew = {...req.body, password};
  
  try {
    const result = await services.updateOne(User, req.params.id, updateNew);
    res.status(200).send({status: "success", data: result});
  } catch(errors) {
    const error = handleErrors(errors);
    res.status(500).send({ errors: error })
  }

}

const deleteOne = async (req, res) => {
  if(
    !req.params.id
  ) {
    return;
  }

  try {
    const del = await services.deleteOne(User, req.params.id);
    if(del) {
      const results = await services.getAll(User);
      res.status(200).send({status: "OK", data: results });
    }
  } catch (errors) {
    const error = handleErrors(errors);
    res.status(500).send({ errors: error })
  }
}

export  {
  getAll,
  getOne,
  updateOne,
  deleteOne
}