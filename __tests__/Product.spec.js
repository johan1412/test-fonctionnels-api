const supertest = require("supertest");
const connection = require("../lib/mongo");

const client = supertest(require("../app.js"));

afterAll(async () => {
  await connection.close();
});



beforeAll(async () => {
  const user = await client.post("/api/users/register")
  .set("Content-Type", "application/json")
  .send({
    name: "Latif Test",
    email:"test17@gmail.com",
    password:"password"
  });
  
});

describe("test Product Api", () => {
  it("Should return unauthorized error :", async () => {
    const response = await client.get("/api/products");
    expect(response.status).toBe(401);
 //   expect(response.body.length).toBe(0);
  });

  it("get token of user", async () => {
    const response = await client
      .post("/api/users/login")
      .set("Content-Type", "application/json")
      .send({
        email:"test17@gmail.com",
        password:"password"
      });
    expect(response.status).toBe(200);
  });
});