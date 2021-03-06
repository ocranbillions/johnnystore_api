import request from 'supertest';
import app from '../../app';

const login = async (email: string, password: string) => {
  const res = await request(app)
    .post('/auth/login')
    .send({
      email,
      password
    })
    
  const { token } = res.body;
  return token;
};

/* ================ AUTH ================ */
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


/* ================ PRODUCTS ================ */

describe("PRODUCTS", () => {
  it('fetches products successfully', async () => {
    const res = await request(app).get('/products');
    
    const { products } = res.body;
    const totalProducts = products.length
    expect(res.status).toEqual(200)
    expect(products).toBeTruthy()
    expect(products[totalProducts - 1]).toEqual({
      "id": 60,
      "name": "Pop Corn",
      "price": 100,
      "stock": 30
    });
  });

  it('fetches top selling products by specified dates', async () => {
    const from = "2019-01-01";
    const to = "2019-12-31";

    const res = await request(app).get(`/products?topselling=true&from=${from}&to=${to}`);
    
    const { products } = res.body;
    expect(res.status).toEqual(200)
    expect(products).toBeTruthy()
    expect(products[0]).toEqual({
      "id": 17,
      "name": "Chips",
      "price": 50,
      "qtySold": 41
    })
  });
});


/* ================ ORDERS ================ */
describe("ORDERS", () => {
  it('Require\'s employees to be logged in before placing order', async () => {
    const res = await request(app).post('/orders');
    const { message } = res.body;
    expect(res.status).toEqual(401)
    expect(message).toEqual('Your session expired. Please sign in!')
  })

  it('Validates skuId, quantity, and paidInBox on req.body', async () => {
    const token = await login("samuel@gmail.com", "pass123")

    const res = await request(app)
      .post('/orders')
      .set('Authorization', token)
      .send({
        // skuId: 10,
        // quantity: 4,
        // paidInBox: false
      })
    const { message, errorList } = res.body;
    expect(res.status).toEqual(400)
    expect(message).toEqual('Invalid Inputs!')
    expect(errorList[0].skuId).toEqual('Please provide an skuId (item id)')
    expect(errorList[1].quantity).toEqual('Please provide the quantity')
    expect(errorList[2].paidInBox).toEqual('Please specify if you\'re paying in box. (true | false)')
  })

  it('Checks that item exist before placing order', async () => {
    const token = await login("samuel@gmail.com", "pass123")

    const res = await request(app)
      .post('/orders')
      .set('Authorization', token)
      .send({
        skuId: 88001, // doesnt exist
        quantity: 1,
        paidInBox: false
      })
    const { message } = res.body;
    expect(res.status).toEqual(404)
    expect(message).toEqual('The item with the id 88001 cannot be found')
  })

  it('Checks that item is in stock before placing order', async () => {
    const token = await login("samuel@gmail.com", "pass123")

    const res = await request(app)
      .post('/orders')
      .set('Authorization', token)
      .send({
        skuId: 59,
        quantity: 2,
        paidInBox: true
      })
    const { message } = res.body;
    expect(res.status).toEqual(400)
    expect(message).toEqual('Sorry we\'re out of stock')
  })

  it('Checks that quantity to purchase is not more than current quantity in stock', async () => {
    const token = await login("samuel@gmail.com", "pass123")

    const res = await request(app)
      .post('/orders')
      .set('Authorization', token)
      .send({
        skuId: 1,
        quantity: 50000,
        paidInBox: true
      })
    const { message } = res.body;
    expect(res.status).toEqual(400)
    expect(message).toEqual('Available qty is 30')
  })

  it('Places order successfully and respond\s with employee\'s current debt/bill status', async () => {
    const token = await login("samuel@gmail.com", "pass123")

    const res = await request(app)
      .post('/orders')
      .set('Authorization', token)
      .send({
        skuId: 1,
        quantity: 1,
        paidInBox: true
      })
    const { message } = res.body;
    expect(res.status).toEqual(201)
    expect(message).toEqual('Transaction completed - You do not have any unpaid bills for this month')
  })

  it('Records/Updates employee debt if item was purchased on credit i.e. !paidInBox', async () => {
    const token = await login("samuel@gmail.com", "pass123")

    const res = await request(app)
      .post('/orders')
      .set('Authorization', token)
      .send({
        skuId: 1, // price of item Id 1 = $50
        quantity: 3, // purchased 3 units of Fromage (skuId 1)
        paidInBox: false // purchased on credit
      })
    
    const { message } = res.body;
    expect(res.status).toEqual(201)
    expect(message).toEqual('Transaction completed - Your total bill for the current month is $150')
  })

  it('Does not record the purchase as debt if employee made payment i.e. paidInBox', async () => {
    const token = await login("samuel@gmail.com", "pass123")

    const res = await request(app)
      .post('/orders')
      .set('Authorization', token)
      .send({
        skuId: 1, // price of item Id 1 = $50
        quantity: 2, // purchases two more
        paidInBox: true // payment made this time
      })
    
    const { message } = res.body;
    expect(res.status).toEqual(201)
    expect(message).toEqual('Transaction completed - Your total bill for the current month remains $150')
  })
});



/* ================ BILLS ================ */
describe("BILLS", () => {
  it('Returns the logged in employee\'s bill for the current month', async () => {
    const token = await login("samuel@gmail.com", "pass123")

    const res = await request(app)
    .get('/bills')
    .set('Authorization', token)
    
    const { message } = res.body;
    expect(res.status).toEqual(200)
    expect(message).toEqual('Your total bill for the current month is $150')
  });

  it('Returns employee\'s bill for JohnnyStore Admin using the employee\'s email', async () => {
    const adminToken = await login("admin@gmail.com", "pass123")

    const res = await request(app)
    .post('/bills')
    .set('Authorization', adminToken)
    .send({
      employeeEmail: "samuel@gmail.com"
    })
    
    const { message } = res.body;
    expect(res.status).toEqual(200)
    expect(message).toEqual('Samuel\'s total bill for the current month is $150')
  });

  it('Returns a 404 to Admin if the given employee isnt found when checking employee bill', async () => {
    const adminToken = await login("admin@gmail.com", "pass123")

    const res = await request(app)
    .post('/bills')
    .set('Authorization', adminToken)
    .send({
      employeeEmail: "random@gmail.com" // non existing employee
    })
    
    const { message } = res.body;
    expect(res.status).toEqual(404)
    expect(message).toEqual('Employee not found!')
  });
});