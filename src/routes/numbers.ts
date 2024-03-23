const express = require("express");
const router = express.Router();
//controllers
import getAllNumbers from "../controllers/numbers/getAllNumbers";
import reserveNumber from "../controllers/numbers/reserveNumber";
import getMyNumber from "../controllers/numbers/getMyNumbers";
import scrapeWebsite from "../controllers/scrapping/getResultWinner";
import checkout from "../controllers/numbers/checkout";
import manageRejectedNumbers from "../controllers/numbers/manageRejectedNumbers";

//middleware
import reservedNumberMidleware from "../middlewares/reservedNumber";
import validatePhoneMidleware from "../middlewares/validatePhone";

router.route('/').get(getAllNumbers)
router.route('/').post(validatePhoneMidleware, getMyNumber)
router.route('/').patch(reservedNumberMidleware, reserveNumber)
router.route('/winner').get(scrapeWebsite)
router.route('/checkout').post(checkout)
router.route('/verify/numbers').get(manageRejectedNumbers)


module.exports = router;
