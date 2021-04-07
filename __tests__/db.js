// Here we will be unit testing the main database functions from server/models/sickBayModels.js
const fs = require('fs');
const path = require('path');
const db = require('../models/sickBayModels.js');

const testJsonFile = path.resolve(__dirname, '../models/sickBayModels.test.json');


/**
 * Using Jest -- "describe" to test sections separately and to have readable outputs
 */

xdescribe('db unit tests', () => {
    /**
     * Jest runs the "beforeAll" function once, before any tests are executed.
     * The tests won't start until the "database" has been reset to an empty Array!
     */
    beforeAll((done) => {
      fs.writeFile(testJsonFile, JSON.stringify([]), () => {
        db.reset();
        done();
      });
    });
  
    afterAll((done) => {
      fs.writeFile(testJsonFile, JSON.stringify([]), done);
    });

    // 1. Testing Schema
    it('returns an error when Title is not provided'), () => {
    
    }

    it('returns an error when Title is not a string'), () => {

    }

    it('returns an error when Description is not a string'), () => {

    }

    it('returns an error when Category is not a string'), () => {

    }

    it('returns an error when ImageURL is not a string'), () => {

    }
}

