const { migrate } = require('../src/database/mysql')

beforeAll(async () => {
  console.log("before all")
  // await migrate();
});

afterAll(async () => {
  console.log("after all")
  await migrate();
});
