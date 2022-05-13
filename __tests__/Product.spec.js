const supertest = require("supertest");
const connection = require("../lib/mongo");

const client = supertest(require("../app.js"));
let user, admin, userToken, adminToken

afterAll(async () => {
  await connection.dropDatabase()
  await connection.close();
});


beforeAll(async () => {
  user = await client.post("/api/users/register")
    .set("Content-price", "application/json")
    .send({
      name: "User Test",
      email: "user@gmail.com",
      password: "password"
    });

  admin = await client.post("/api/users/register")
    .set("Content-price", "application/json")
    .send({
      name: "Admin Test",
      email: "admin@gmail.com",
      password: "password",
      role: "ROLE_ADMIN"
    });

  userToken = await client
    .post("/api/users/login")
    .set("Content-price", "application/json")
    .send({
      email: "user@gmail.com",
      password: "password"
    });
  userToken = userToken.headers['auth-token']

  adminToken = await client
    .post("/api/users/login")
    .set("Content-price", "application/json")
    .send({
      email: "admin@gmail.com",
      password: "password"
    });

  adminToken = adminToken.headers['auth-token']


});

describe("Test Product Api", () => {
  it("Get products without authentification : Should return unauthorized error :", async () => {
    const response = await client.get("/api/products");
    expect(response.status).toBe(401);
  });

  it("Get products without user role : Should return status 200 and a product :", async () => {
      const response = await client.post("/api/products").set('auth-token', adminToken).send({
        name:"name of product",
        price:10
      })
      expect(response.status).toBe(201);
      expect(response.body.name).toBe("name of product");
      expect(response.body.price).toBe(10)
  });

  it("Delete product without admin role : Should return status 204 :", async () => {
    const createProduct = await client.post("/api/products").set('auth-token', adminToken).send({
      name:"name of product",
      price:10
    })

    const deleteProduct = await client.delete(`/api/products/${createProduct.body._id}`).set('auth-token', adminToken)
    expect(deleteProduct.status).toBe(204);
    });

  it("Get products without admin role : Should return status 200 and an array with with 1 size :", async () => {
    const response = await client.get("/api/products").set('auth-token', adminToken)
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});