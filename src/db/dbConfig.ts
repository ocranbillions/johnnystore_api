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
        multipleStatements: true
      });
    } else {
      connectionPool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        database: process.env.DB_NAME || 'johnny_store',
        password: process.env.DB_PASSWORD || '',
        // dateStrings: 'date',
        multipleStatements: true
      });
    }
  }

  return connectionPool;
};

export const pool = getPool();

export const query = (sql: string, values: (string|number)[] | null = null): Promise<any> => {
  return new Promise((resolve, reject) => {

    if(Array.isArray(values)){
      pool.query(sql, values, (err, rows) => {
        if(err) reject(err);
        resolve(rows);
      })
    }

    // consider taking this out
    else{
      pool.query(sql, (err, rows) => {
        if(err) reject(err);
        resolve(rows);
      })
    }

  })
}

export const mysqlConnection = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);

      console.log("MySQL pool connected: threadId " + connection.threadId);

      const query = (sql: string, values: []) => {
        return new Promise((resolve, reject) => {
          connection.query(sql, values, (err, result) => {
            if (err) reject(err);
            resolve(result);
          });
        });
      };
        
      const release = () => {
        return new Promise((resolve, reject) => {
          if (err) reject(err);

          console.log("MySQL pool released: threadId " + connection.threadId);
          resolve(connection.release());
        });
      };
        resolve({ query, release });
    });
   });
};



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