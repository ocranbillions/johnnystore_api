import mysql, { Pool } from 'mysql';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

let connectionPool: Pool;

const getPool = () => {
  if (!connectionPool) {
    if (process.env.NODE_ENV === 'test') {
      connectionPool = mysql.createPool({
        host: process.env.TRAVIS_HOST,
        user: process.env.TRAVIS_USER,
        database: process.env.TRAVIS_DATABASE,
        password: process.env.TRAVIS_PASSWORD,
        connectionLimit: 20,
        multipleStatements: true
      });
    } else {
      connectionPool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        database: process.env.DB_NAME || 'johnny_store',
        password: process.env.DB_PASSWORD || '',
        connectionLimit: 20,
        // dateStrings: 'date',
        multipleStatements: true
      });
    }
  }

  return connectionPool;
};

const pool = getPool();

export const query = (sql: string, values: (string|number)[] | null = null): Promise<any> => {
  return new Promise((resolve, reject) => {

    if(Array.isArray(values)){
      pool.query(sql, values, (err, rows) => {
        if(err) reject(err);
        resolve(rows);
      })
    }else{
      pool.query(sql, (err, rows) => {
        if(err) reject(err);
        resolve(rows);
      })
    }

  })
}


// For DB Migration - npm run prod:migrate
const dataSql = fs.readFileSync(path.join(
  __dirname,
  "johnny.sql"
)).toString();

export const migrate = async() => {
  await pool.query(dataSql, (err, res) => {
    // console.log(err, res)
    connectionPool.end()
  })
}

require("make-runnable")