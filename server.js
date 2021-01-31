const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Dao = require('./dao');
const EmployeeRepository = require('./employee_repository');
const Employee = require('./employee');

const objConverter = require('./converter');

var app = express();
app.use('/api', router);

const jsonParser = bodyParser.json();

const HTTP_PORT = 8080;

// init the database

const dao = new Dao();
const empRepo = new EmployeeRepository(dao);

empRepo.createTable()
    .then(() => {
        const employees = [
            new Employee('San', 'Zhang', 'Principal', 15, '+86 13000000000'),
            new Employee('Si', 'Li', 'SSE', 6, '+86 13011111111'),
            new Employee('Wu', 'Wang', 'SE', 4, '+86 13022222222')
        ];
        employees.map((emp) => {
            return empRepo.create(emp);
        })
    })

// get all employees
router.get('/employees', (req, res, next) => {
    empRepo.getAll().then((rows) => {
        console.log(rows);
        console.log(objConverter.jsonToHump(rows));
        res.status(200).json( objConverter.jsonToHump(rows) );
    }).catch((err) => {
        res.status(400).json({ "error": err.message });
    })
});

// get employee by id
router.get('/employees/:id', (req, res, next) => {
    // const id = req.params.id;
    const id = 2;
    empRepo.getById(id).then((row) => {
        res.status(200).json(objConverter.jsonToHump(row));
    }).catch((err) => {
        res.status(400).json({ "error": err.message });
    })
})

// create an employee
router.post('/employees', jsonParser, (req, res, next) => {
    const emp = req.body;
    empRepo.create(emp).then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        res.status(400).json({ "error": err.message })
    })
})

// update employee
router.put('/employees/:id', jsonParser, (req, res, next) => {
    const emp = req.body;
    emp.id = req.params.id;
    empRepo.update(emp).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(400).json({ "error": err.message })
    })
})

// delete employee
router.delete('/employees/:id', (req, res, next) => {
    const id = req.params.id;
    empRepo.delete(id).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(400).json({ "error": err.message })
    })
})

app.listen(HTTP_PORT, () => {
    console.log(`Server is listening on port ${HTTP_PORT}`);
});