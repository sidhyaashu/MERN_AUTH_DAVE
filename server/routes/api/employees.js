const express = require('express');
const router = express.Router();

const employControllers = require('../../controllers/employeeControllers.js')
const ROLES_LIST = require('../../configOptions/roles_list.js')
const veryfiRoles = require('../../middleware/veryFyRoles.js')

router.route('/')
    .get(employControllers.getAllemployee)
    .post(veryfiRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), employControllers.createNewEmployee)
    .put(veryfiRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), employControllers.updateEmployee)
    .delete(veryfiRoles(ROLES_LIST.Admin), employControllers.deleteEmployee);

router.route('/:id')
    .get(employControllers.getEmployee)

module.exports = router;