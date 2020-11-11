/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <jkehl.dev@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Johann KEHL.
 * ----------------------------------------------------------------------------
 */

const express = require('express');
const controller_user = require('../controllers/controller_user');

/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description User router module.
 */
const router_user = express.Router();

router_user.get('/profil', controller_user.getProfil);
router_user.get('/profil/delete', controller_user.getDeleteProfil);
router_user.post('/profil/delete', controller_user.deleteProfil);

router_user.get('/profil/changepassword', controller_user.getChangePassword);
router_user.post('/profil/changepassword', controller_user.changePassword);

router_user.get('/signout/', controller_user.getSignOut);

module.exports = router_user;