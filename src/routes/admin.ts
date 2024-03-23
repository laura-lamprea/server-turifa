const express = require("express");
const router = express.Router();

import changeStatus from "../controllers/admin/changeStatus";
import getTotal from "../controllers/admin/getTotal";
import getRejectedNumber from "../controllers/admin/getRejectedNumber";
import getApprovedAndPending from "../controllers/admin/getApprovedAndPending";
import changeToRejected from "../controllers/admin/changeToRejected";
import sendqr from "../controllers/admin/sendqr";

router.route('/admin/status/change').patch(changeStatus)
router.route('/admin/status/reject').patch(changeToRejected)
router.route('/admin/collected').get(getTotal)
router.route('/admin/all').get(getApprovedAndPending)
router.route('/admin/allrejected').get(getRejectedNumber)
router.route('/admin/qr').post(sendqr)

module.exports = router;

