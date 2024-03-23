const express = require("express");
const router = express.Router();

import createAdmin from "../controllers/auth/createAdmin";
import loginWithCredentials from "../controllers/auth/loginWithCredentials";

router.route('/create').post(createAdmin)
router.route('/login').post(loginWithCredentials)


module.exports = router;

