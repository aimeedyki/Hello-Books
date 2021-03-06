import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import getUserToken from '../helpers/getUserToken';
import { User, Level, Subscription } from '../models';
import signinValidation from '../helpers/signinValidation';
import validatePassword from '../helpers/validatePassword';
import levelChangeValidation from '../helpers/levelChangeValidation';
import usersController from './usersController';

const authController = {
  /** @description Authorizes a User login
    *
    * @param {object} req HTTP request object
    * @param {object} res HTTP response object
    *
    * @returns {object} user details object
    * @returns {string} user token
    */
  login(req, res) {
    if (signinValidation(req.body).isValid) {
      const password = req.body.password;
      const username = req.body.username;
      const googleId = req.body.googleId || null;
      User
        .findOne({
          where: {
            username
          },
          include: [{
            model: Level,
            as: 'level',
            attributes: ['type', 'maxBooks', 'maxDays'],
          }]
        }).then((foundUser) => {
          if (!foundUser) {
            // signup google user.
            if (googleId) {
              return usersController.signup(req, res);
            }
            return res.status(404)
              .send({ message: 'Username does not exist. Please confirm' });
          }

          // compares password received to stored hash password
          const passkey = bcrypt.compareSync(password, foundUser.password);
          if (passkey) {
            const token = getUserToken(foundUser);
            const user = {
              name: foundUser.name,
              profilePic: foundUser.profilePic,
              email: foundUser.email,
              borrowCount: foundUser.borrowCount,
              admin: foundUser.admin,
              surcharge: foundUser.surcharge,
              outstandingSubscription: foundUser.outstandingSubscription,
              levelId: foundUser.levelId,
              level: foundUser.level.type,
              maxBooks: foundUser.level.maxBooks,
              maxDays: foundUser.level.maxDays
            };
            return res.status(200).send({ message: 'welcome', user, token });
          }
          return res.status(401)
            .send({ message: 'username or password is incorrect' });
        })
        .catch(error =>
          res.status(500).send(error.message));
    } else {
      res.status(400).send({ message: signinValidation(req.body).message });
    }
  },

  /** @description changes user's password
    *
    * @param {object} req HTTP request object
    * @param {object} res HTTP response object
    *
    * @returns {string} Success message
    */
  changePassword(req, res) {
    if (validatePassword(req.body).isValid) {
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      const { userId } = req.decoded;
      User
        .findOne({
          where: {
            id: userId
          }
        }).then((user) => {
          // checks if oldpassword matches old password
          const passkey = bcrypt.compareSync(oldPassword, user.password);
          if (!passkey) {
            return res.status(422)
              .send({ message: 'Please reconfirm password' });
          }

          // checks if new password is the same with received to stored password
          const compareNew = bcrypt.compareSync(newPassword, user.password);
          if (compareNew) {
            return res.status(409)
              .send({ message: 'You cannot use a previous password' });
          }
          const pass = bcrypt.hashSync(newPassword, 10);
          user.update({
            password: pass
          });
          return res.status(200)
            .send({
              message: `hi ${user.username}, your password has been updated`
            });
        })
        .catch(error => res.status(500).send(error.message));
    }
    if (validatePassword(req.body).message) {
      res.status(400).send({ message: validatePassword(req.body).message });
    }
  },

  /** @description Changes a users level/membership type
    *
    * @param {object} req HTTP request object
    * @param {object} res HTTP response object
    *
    * @returns {object} response object with details of the request
    */
  changeLevel(req, res) {
    const userId = req.decoded.userId;
    if (levelChangeValidation(req.body).isValid) {
      const newLevelId = req.body.newLevelId;
      const transactionId = req.body.transactionId;
      const amount = req.body.amount;
      User
        .findById(userId).then((user) => {
          if (newLevelId === user.levelId) {
            return res.status(409)
              .send({ message: 'You are already on this level' });
          }
          Level.findById(newLevelId)
            .then((level) => {
              if (!level) {
                return res.status(404)
                  .send({ message: 'Level does not exist' });
              }
              user.update({
                outstandingSubscription:
                  user.outstandingSubscription + level.subscription
              });
              Subscription.create(
                {
                  newLevelId,
                  transactionId,
                  amount,
                  username: user.username,
                  levelId: newLevelId,
                  transactionType: 'subscription'
                }
              ).then(subscription => res.status(202)
                .send({
                  message: 'Subscription received, level will be changed soon',
                  subscription
                }))
                .catch(error => res.status(500).send(error.message));
            })
            .catch(error => res.status(500).send(error.message));
        })
        .catch(error => res.status(500).send(error.message));
    }
    if (levelChangeValidation(req.body).message) {
      res.status(400)
        .send({ message: levelChangeValidation(req.body).message });
    }
  }
};
export default authController;
