// Here we will be unit testing the main database functions from server/models/sickBayModels.js
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const SickBay = require('../server/models/sickBayModels');

const dbName = 'sickBay';

/**
 * Using Jest -- "describe" to test sections separately and to have readable outputs
 */

describe('db unit tests', () => {
  /**
   * Jest runs the "beforeAll" function once, before any tests are executed.
   * The tests won't start until the "database" has been reset to an empty Array!
   */
  beforeAll(async () => {
    await mongoose.connect(`mongodb://localhost:3000/${dbName}`, {
      useNewUrlParser: true,
    });
  });

  // 1. Testing Schema
  it('returns an error when Title is not provided', async (done) => {
    const user = await SickBay.findOne({ username: 'Goobly5' });
    expect(user.username).toBeTruthy();
    done();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // it('returns an error when Title is not a string'), () => {

  // }

  // it('returns an error when Description is not a string'), () => {

  // }

  // it('returns an error when Category is not a string'), () => {

  // }

  // it('returns an error when ImageURL is not a string'), () => {

  // }
});
