
const { Given, When, Then, And } = require('@cucumber/cucumber');
const { assert, expect, should } = require('chai');

const axios = require('axios');

/** API tests */
const endpoint = "https://api.punkapi.com/v2/beers/"
let get_response;

Given('I call the punk api with beer id {int}', async function (beerID) {
  get_response = await axios.get(endpoint + beerID)
    .then(function (response) {
      return response
    })
});

Then('I expect a {int} status response', function (exceptedResponseCode) {
  console.log("1 Status: ", get_response.status);
  expect(get_response.status).equal(exceptedResponseCode)
});

Then('The malt is {string}', function (string) {
  expect(get_response.data[0].ingredients.malt[0].name).equal(string)
});


Then('The malt value is {float} and the unit is {string}', function (float, string) {
  expect(get_response.data[0].ingredients.malt[0].amount.value).equal(float)
  expect(get_response.data[0].ingredients.malt[0].amount.unit).equal(string)
});