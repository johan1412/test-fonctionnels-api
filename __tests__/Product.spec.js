const supertest = require("supertest");
const connection = require("../lib/mongo");

const client = supertest(require("../app.js"));

afterAll(async () => {
  await connection.close();
});

describe("test Product Api", () => {
  it("Should return unauthorized error :", async () => {
    const response = await client.get("/api/products");
    expect(response.status).toBe(401);
 //   expect(response.body.length).toBe(0);
  });

  /*it("should create a new product", async () => {
    const response = await client
      .post("/products")
      .set("Content-Type", "application/json")
      .send({
        name: "Test Product",
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Test Product");
  });*/
});