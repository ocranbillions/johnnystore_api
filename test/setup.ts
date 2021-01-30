import { migrate } from '../src/db/dbConfig';
// import app from '../src/app';
beforeAll(async () => {
  console.log("before all tests")
  // await migrate();
});

beforeEach(async () => {
  console.log("before each test")
});

afterAll(async () => {
  console.log("afte all tests")
  await migrate();
});
