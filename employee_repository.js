class EmployeeRepository {

    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = 'CREATE TABLE employees( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            first_name NVARCHAR(20)  NOT NULL,\
            last_name NVARCHAR(20)  NOT NULL,\
                title NVARCHAR(20),\
                years_of_exp INTEGER(100),\
                telephone NVARCHAR(20)\
            )';
        return this.dao.run(sql);
    }

    create(employee) {
        const sql = 'INSERT INTO employees (first_name, last_name, title, years_of_exp, telephone) values (?, ?, ?, ?, ?)';
        return this.dao.run(sql, [employee.firstName, employee.lastName, employee.title, employee.yearsOfExp, employee.telephone]);
    }

    update(employee) {
        const sql = 'UPDATE employees SET first_name = ?, last_name = ?, title = ?, years_of_exp = ?, telephone = ? WHERE id = ?';
        return this.dao.run(sql, [employee.firstName, employee.lastName, employee.title, employee.yearsOfExp, employee.telephone, employee.id]);
    }

    delete(id) {
        const sql = 'DELETE FROM employees WHERE id = ?';
        return this.dao.run(sql, [id]);
    }

    getById(id) {
        const sql = 'SELECT * FROM employees WHERE id = ?';
        return this.dao.get(sql, [id]);
    }

    getAll() {
        const sql = 'SELECT * FROM employees';
        return this.dao.all(sql);
    }
}

module.exports = EmployeeRepository;