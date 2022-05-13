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
  user = user.body

  admin = await client.post("/api/users/register")
    .set("Content-price", "application/json")
    .send({
      name: "Admin Test",
      email: "admin@gmail.com",
      password: "password",
      role: "ROLE_ADMIN"
    });
  admin = admin.body

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
  it("Get products without authentification", async () => {
    const response = await client.get("/api/products");
    expect(response.status).toBe(401);
  });

  it("Get products with admin role", async () => {
    const response = await client.get("/api/products").set('auth-token', adminToken)
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it("Get products with user role", async () => {
    const response = await client.get("/api/products").set('auth-token', userToken)
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it("Create product without authentification", async () => {
    const response = await client.post("/api/products").send({
      name: "name of product",
      price: 10
    })
    expect(response.status).toBe(401);
  });

  it("Create product with admin role", async () => {
    const response = await client.post("/api/products").set('auth-token', adminToken).send({
      name: "name of product",
      price: 10
    })
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("name of product");
    expect(response.body.price).toBe(10)
  });

  it("Create product with user role", async () => {
    const response = await client.post("/api/products").set('auth-token', userToken).send({
      name: "name of product",
      price: 10
    })
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("name of product");
    expect(response.body.price).toBe(10)
    expect(response.body.user).toBe(user._id)
  });

  it("Create product with user role and user attribute", async () => {
    const response = await client.post("/api/products").set('auth-token', userToken).send({
      name: "name of product",
      price: 10,
      user: user._id
    })
    expect(response.status).toBe(403);
  });

  it("Delete product without authentification", async () => {
    const createProduct = await client.post("/api/products").set('auth-token', adminToken).send({
      name: "name of product",
      price: 10
    })

    const deleteProduct = await client.delete(`/api/products/${createProduct.body._id}`)
    expect(deleteProduct.status).toBe(401);
  });

  it("Delete product with admin role", async () => {
    const createProduct = await client.post("/api/products").set('auth-token', adminToken).send({
      name: "name of product",
      price: 10
    })

    const deleteProduct = await client.delete(`/api/products/${createProduct.body._id}`).set('auth-token', adminToken)
    expect(deleteProduct.status).toBe(204);
  });

  it("Delete own product with user role", async () => {
    const createProduct = await client.post("/api/products").set('auth-token', adminToken).send({
      name: "name of product",
      price: 10,
      user: user._id
    })

    const deleteProduct = await client.delete(`/api/products/${createProduct.body._id}`).set('auth-token', adminToken)
    expect(deleteProduct.status).toBe(204);
  });

  it("Delete product of other user with user role", async () => {
    const createProduct = await client.post("/api/products").set('auth-token', adminToken).send({
      name: "name of product",
      price: 10,
      user: admin._id
    })

    const deleteProduct = await client.delete(`/api/products/${createProduct.body._id}`).set('auth-token', userToken)
    expect(deleteProduct.status).toBe(403);
  });

  it("Patch product without authentification", async () => {
    const createProduct = await client.post("/api/products").set('auth-token', adminToken).send({
      name: "name of product",
      price: 10,
      user: user._id
    })

    const editedProduct = await client.patch(`/api/products/${createProduct.body._id}`)
      .send({ name: "edited name" })
    expect(editedProduct.status).toBe(401);

  });


  it("Patch own product with user role", async () => {
    const createProduct = await client.post("/api/products").set('auth-token', adminToken).send({
      name: "name of product",
      price: 10,
      user: user._id
    })

    const editedProduct = await client.patch(`/api/products/${createProduct.body._id}`).set('auth-token', userToken)
      .send({ name: "edited name" })
    expect(editedProduct.status).toBe(200);
    expect(editedProduct.body.nModified).toBe(1);

  });

  it("Patch other user product with user role", async () => {
    const createProduct = await client.post("/api/products").set('auth-token', adminToken).send({
      name: "name of product",
      price: 10,
      user: admin._id
    })

    const editedProduct = await client.patch(`/api/products/${createProduct.body._id}`).set('auth-token', userToken)
      .send({ name: "edited name" })
    expect(editedProduct.status).toBe(403);
  });

  it("Patch product with admin role", async () => {
    const createProduct = await client.post("/api/products").set('auth-token', adminToken).send({
      name: "name of product",
      price: 10,
      user: user._id
    })

    const editedProduct = await client.patch(`/api/products/${createProduct.body._id}`).set('auth-token', userToken)
      .send({ name: "edited name" })
    expect(editedProduct.status).toBe(200);
    expect(editedProduct.body.nModified).toBe(1);
  });


  it("Update product without authentification", async () => {
    const createProduct = await client.post("/api/products").set('auth-token', adminToken).send({
      name: "name of product",
      price: 10,
      user: user._id
    })

    const editedProduct = await client.put(`/api/products/${createProduct.body._id}`)
      .send({
        name: "edited name",
        price: 10,
        user: user._id
      })
    expect(editedProduct.status).toBe(401);

  });

  it("Update own product with user role", async () => {
    const createProduct = await client.post("/api/products").set('auth-token', adminToken).send({
      name: "name of product",
      price: 10,
      user: user._id
    })

    const editedProduct = await client.put(`/api/products/${createProduct.body._id}`).set('auth-token', userToken)
      .send({
        name: "edited name",
        price: 10,
        user: user._id
      })
    expect(editedProduct.status).toBe(200);
    expect(editedProduct.body.nModified).toBe(1);

  });

  it("Update other user product with user role", async () => {
    const createProduct = await client.post("/api/products").set('auth-token', adminToken).send({
      name: "name of product",
      price: 10,
      user: admin._id
    })

    const editedProduct = await client.put(`/api/products/${createProduct.body._id}`).set('auth-token', userToken)
      .send({
        name: "edited name",
        price: 10,
        user: user._id
      })
    expect(editedProduct.status).toBe(403);
  });

  it("Update product with admin role", async () => {
    const createProduct = await client.post("/api/products").set('auth-token', adminToken).send({
      name: "name of product",
      price: 10,
      user: user._id
    })

    const editedProduct = await client.put(`/api/products/${createProduct.body._id}`).set('auth-token', userToken)
      .send({
        name: "edited name",
        price: 10,
        user: user._id
      })
    expect(editedProduct.status).toBe(200);
    expect(editedProduct.body.nModified).toBe(1);
  });

  it("Get products with admin role after insertions", async () => {
    const response = await client.get("/api/products").set('auth-token', adminToken)
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(12);
  });

  it("Get products with user role after insertions", async () => {
    const response = await client.get("/api/products").set('auth-token', userToken)
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(12);
  });
});