import request from 'supertest';
import app from '../../app';


describe("AUTH/REGISTER", () => {
  it('should validate user registeration data', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: "",
        email: "user@email",
        password: "pas3"
      })
      
    expect(res.status).toEqual(400)
    expect(res.body.message).toEqual("Invalid Inputs!")
    expect(res.body.errorList[0].name).toEqual("Name cannot be empty")
    expect(res.body.errorList[1].email).toEqual("Email is invalid")
    expect(res.body.errorList[2].password).toEqual("Password must be at least 6 characters")
  });

  it('should reject registeration if email was previously used', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: "Prof Xavier",
        email: "xavier@gmail.com",
        password: "pass123"
      })
      
    expect(res.status).toEqual(409)
    expect(res.body.message).toEqual("Email in use!!")
  });

  it('should register a new employee on johnnystore', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: "Ocran",
        email: "ocran@gmail.com",
        password: "pass123"
      })
      
    expect(res.status).toEqual(201)
    expect(res.body.token).toBeTruthy()
  });
});

describe("AUTH/LOGIN", () => {
  it('should login an existing employee', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: "xavier@gmail.com",
        password: "pass123"
      })
    
    expect(res.status).toEqual(200)
    expect(res.body.token).toBeTruthy()
  });

  it('should return 401 if login details are incorrect', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: "xavier@gmail.com",
        password: "wrongpassword"
      })
    
    expect(res.status).toEqual(401)
    expect(res.body.message).toEqual("Incorrect login credentials")
  });
});