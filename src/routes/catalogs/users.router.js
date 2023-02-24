const express = require('express');
const UserService = require('./../../services/catalogs/user.service');
const validatorHandler = require('./../../middlewares/validator.handler');
const {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
} = require('../../schemas/catalogs/user.schema');
const { checkRoles } = require('./../../middlewares/auth.handler');

const router = express.Router();
const service = new UserService();
const passport = require('passport');

// List all User
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3, 4, 5),
  async (req, res, next) => {
    try {
      const users = await service.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

// find by Id
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3, 4, 5),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// Create User
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1,2,3),
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

// update User
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3, 4, 5),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// delete User
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
