const { migrate } = require('../src/database/mysql')

beforeAll(async () => {
  console.log("before all")
  // await migrate();
});

beforeEach(async () => {
  console.log("before each")
});

afterAll(async () => {
  console.log("after all")
  await migrate();
});
