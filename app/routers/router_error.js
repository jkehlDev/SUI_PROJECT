/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <jkehl.dev@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Johann KEHL.
 * ----------------------------------------------------------------------------
 */

const express = require('express');
const controller_error = require('../controllers/controller_error');

/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description User router module.
 */
const router_error = express.Router();

router_error.get('/404', controller_error.error_404);
router_error.get('/406', controller_error.error_406);
router_error.get('/503', controller_error.error_503);

module.exports = router_error;