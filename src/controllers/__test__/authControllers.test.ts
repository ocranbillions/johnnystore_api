import request from 'supertest';
import app from '../../app';


it('should signup new user with valid input data', async () => {

  const body = {
    name: "Ocrann",
    email: "ocran@gmal.com",
    password: "pass1223"
  }

  const result = await request(app)
    .post('/auth/register')
    .send(body)

  console.log(result.body)
  expect(result.status).toEqual(201)
});

it("sample test", () => {
  expect(200).toEqual(200)
})