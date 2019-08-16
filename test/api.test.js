const MockAdapter = require('axios-mock-adapter')
const axios = require('axios')
const Api = require('../lib/api')

let mock
let api

beforeEach(() => {
  mock = new MockAdapter(axios)
  api = new Api({ gitlabUrl: '' }, axios)
})

test('', () => {})
