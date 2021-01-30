import {query} from '../db/dbConfig';

interface UserI {
  name: string
  email: string
  password: string
}

export class Employee {
  name: string;
  email: string;
  password: string;
  constructor(user: UserI) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password // hash
  }

  create = async () => {
    const sql = `INSERT INTO JohnnyEmployee (name, email, password) VALUES (?, ?, ?)`;
    const result = await query(sql, [this.name, this.email, this.password]);
    return result;
  }
  
}
