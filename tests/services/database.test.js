const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Url = require("../../models/url");
const { findUrl, createAndSaveUrl } = require("../../services/database");

describe("Database Functions", () => {
  const mongod = new MongoMemoryServer();

  // Before all tests, start the MongoDB server and connect Mongoose to it
  beforeAll(async () => {
    await mongod.start();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
  });

  // Before each test, delete all Url documents from the database
  beforeEach(async () => {
    await Url.deleteMany({});
  });

  // After all tests, close the Mongoose connection and stop the MongoDB server
  afterAll(async () => {
    await mongoose.connection.close();
    await mongod.stop();
  });

  // Test that findUrl returns null when the URL does not exist in the database
  it("findUrl returns null when url does not exist", async () => {
    const url = await findUrl("http://nonexistent.com");
    expect(url).toBeNull();
  });

  // Test that findUrl returns the URL when it exists in the database
  it("findUrl returns url when it exists", async () => {
    const originalUrl = "http://www.a24group.com";
    const shortUrl = "abc123";
    const url = new Url({ originalUrl, shortUrl });
    await url.save();

    const foundUrl = await findUrl(originalUrl);
    expect(foundUrl).toBeDefined();
    expect(foundUrl.originalUrl).toBe(originalUrl);
    expect(foundUrl.shortUrl).toBe(shortUrl);
  });

  // Test that createAndSaveUrl creates and saves a URL to the database
  it("createAndSaveUrl creates and saves a url", async () => {
    const originalUrl = "http://www.offerzen.com";
    const url = await createAndSaveUrl(originalUrl);

    expect(url).toBeDefined();
    expect(url.originalUrl).toBe(originalUrl);
    expect(url.shortUrl).toBeDefined();

    const foundUrl = await Url.findOne({ originalUrl });
    expect(foundUrl).toBeDefined();
    expect(foundUrl.originalUrl).toBe(originalUrl);
    expect(foundUrl.shortUrl).toBe(url.shortUrl);
  });
});
