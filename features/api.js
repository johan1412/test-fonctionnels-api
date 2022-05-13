const { Given, When, Then, AfterAll,BeforeAll } = require("@cucumber/cucumber");
const { expect } = require("expect");
const supertest = require("supertest");
const connection = require("../lib/mongo");
const ReferenceManager = require("../fixtures/ReferenceManager");
const client = supertest(require("../app.js"));
let user, admin, userToken, adminToken

function interpolateString(str) {
    return str.replace(/\{\{\s*([^}]+)\s*\}\}/g, (match, name) => {
      return ReferenceManager.getValue(name);
    });
}
function interpolate(obj) {
    for (let key in obj) {
        if (typeof obj[key] === "string") {
        obj[key] = interpolateString(obj[key]);
        }
        if (typeof obj[key] === "object") {
        obj[key] = interpolate(obj[key]);
        }
    }
    return obj;
}


BeforeAll(async () => {
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


AfterAll(async () => {
  connection.dropDatabase();
  await connection.close();
});

Given("I have a payload", function (dataTable) {
    this.payload = interpolate(dataTable.rowsHash());
});
  
Given("I am authenticated as {string}", function (string) {
    const user = ReferenceManager.getReference(string);
    this.token = adminToken
});

When("I request {string} {string}", async function (method, path) {
  this.request = client[method.toLowerCase()](path);
  this.response = await this.request.send();
  // Write code here that turns the phrase above into concrete actions
});

When("I request {string} {string} with payload", async function (method, path) {
  this.request = client[method.toLowerCase()](path).set(
    "Content-Type",
    "application/json"
  );
  this.response = await this.request.send(this.payload);
});

Then("the response code should be {int}", function (int) {
  // Write code here that turns the phrase above into concrete actions
  expect(this.response.status).toBe(int);
});

Then("I should receive an empty array", function () {
  // Write code here that turns the phrase above into concrete actions
  expect(this.response.body.length).toBe(0);
});

Then("I should receive an array with {int} elements", function (int) {
  // Write code here that turns the phrase above into concrete actions
  expect(this.response.body.length).toBe(int);
});

Then("I should have a property {string}", function (string) {
  // Write code here that turns the phrase above into concrete actions
  expect(this.response.body).toHaveProperty(string);
});

Then(
  "I should receive a element with the following attributes",
  function (dataTable) {
    const expected = dataTable.rowsHash();
    const actual = this.response.body;
    expect(typeof actual).toBe("object");
    Object.keys(expected).forEach((key) => {
      expect(actual).toHaveProperty(key, expected[key]);
    });
  }
);