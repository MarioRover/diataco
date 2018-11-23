const express = require('express');
const router = express.Router();

const ForEveryOne = require('./public');
const ForUser = require('./private');

const authenticateApi = require('app/http/middleware/authenticateApi');

router.use(ForEveryOne);
router.use(authenticateApi.handle , ForUser);

module.exports = router;
