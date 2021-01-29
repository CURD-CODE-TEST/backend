const sqlite3 = require('sqlite3');
const Promise = require('bluebird');
const { resolve, reject } = require('bluebird');

class Dao {

    // setup the connection
    constructor() {
        this.db = new sqlite3.Database(':memory:', (err) => {
            if (err) {
                console.log(`Error opening database ${err.message}`);
            } else {
                console.log('Connected to in-memory database');
            }
        })
    }

    // insert, update, delete
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) {
                    console.log(`Error at running sql ${sql}`);
                    console.log(err);
                    reject(err);
                } else {
                    resolve({id: this.lastID});
                }
            })
        })
    }

    // get
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) {
                    console.log(`Error at running sql ${sql}`);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(row);
                }
            })
        })
    }

    // all
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log(`Error at running sql ${sql}`);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

}

module.exports = Dao;