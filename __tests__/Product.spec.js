const supertest = require("supertest");
const connection = require("../lib/mongo");

const client = supertest(require("../app.js"));
let user, admin, userToken, adminToken 

afterAll(async () => {
 /* await client.delete("/api/users/"+user._id)
  await client.delete("/api/users/"+admin._id) */
  await connection.dropDatabase()
  await connection.close();
});


beforeAll(async () => {
   user = await client.post("/api/users/register")
  .set("Content-Type", "application/json")
  .send({
    name: "User Test",
    email:"user@gmail.com",
    password:"password"
  });

  admin = await client.post("/api/users/register")
  .set("Content-Type", "application/json")
  .send({
    name: "Admin Test",
    email:"admin@gmail.com",
    password:"password",
    role : "ROLE_ADMIN"
  });

  userToken = await client
  .post("/api/users/login")
  .set("Content-Type", "application/json")
  .send({
    email:"user@gmail.com",
    password:"password"
  });

  adminToken = await client
  .post("/api/users/login")
  .set("Content-Type", "application/json")
  .send({
    email:"admin@gmail.com",
    password:"password"
  });
  
});

describe("Test Product Api", () => {
  it("Should return unauthorized error :", async () => {
    const response = await client.get("/api/products");
    expect(response.status).toBe(401);
 //   expect(response.body.length).toBe(0);
  });
});