const { migrate } = require('../src/database/mysql')

beforeAll(async () => {
  console.log("before all")
  // await migrate();
});
