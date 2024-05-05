const mongoose = require("mongoose");
const mongodb = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Url = require("../../models/url");

describe("Url Model Test", () => {
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

  // Test that a URL can be created and saved successfully
  it("create & save url successfully", async () => {
    const urlData = {
      originalUrl: "http://www.a24group.com",
      shortUrl: "abc123",
    };
    const validUrl = new Url(urlData);
    const savedUrl = await validUrl.save();

    // Check that the saved URL has an _id field and that the originalUrl and shortUrl fields match the input data
    expect(savedUrl._id).toBeDefined();
    expect(savedUrl.originalUrl).toBe(urlData.originalUrl);
    expect(savedUrl.shortUrl).toBe(urlData.shortUrl);
  });

  // Test that an error is thrown when a required field is missing
  it("throws error when required field is missing", async () => {
    const urlWithoutRequiredField = new Url({
      originalUrl: "http://www.a24group.com",
    });
    let err;
    try {
      const savedUrlWithoutRequiredField = await urlWithoutRequiredField.save();
      error = savedUrlWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    // Check that the error is a Mongoose validation error
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  // Test that an error is thrown when the shortUrl is not unique
  it("throws error when shortUrl is not unique", async () => {
    const url1 = new Url({
      originalUrl: "http://www.a24group.com",
      shortUrl: "fWdzcgy",
    });
    await url1.save();

    const url2 = new Url({
      originalUrl: "http://www.offerzen.com",
      shortUrl: "fWdzcgy",
    });
    let err;
    try {
      const savedUrl2 = await url2.save();
      error = savedUrl2;
    } catch (error) {
      err = error;
    }
    // Check that the error is a MongoDB server error related to a duplicate key
    expect(err).toBeInstanceOf(mongodb.MongoServerError);
    expect(err.message).toContain("E11000 duplicate key error");
  });

  // Test that the createdAt field is set by default
  it("sets createdAt field by default", async () => {
    const urlData = {
      originalUrl: "http://www.a24group.com",
      shortUrl: "fWdzcgy",
    };
    const validUrl = new Url(urlData);
    const savedUrl = await validUrl.save();

    // Check that the saved URL has a createdAt field and that this field is a Date instance
    expect(savedUrl.createdAt).toBeDefined();
    expect(savedUrl.createdAt).toBeInstanceOf(Date);
  });
});
