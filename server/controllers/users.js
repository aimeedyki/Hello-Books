import {User} from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  // creates a user
  produce(req, res) {
    return User
      .create({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        level: req.body.level,
        profilepic: req.body.profilepic,
      })
          
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error.message)); 
  },




};
