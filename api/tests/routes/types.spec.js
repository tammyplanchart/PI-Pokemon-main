/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { conn, llenarTypes, Type } = require('../../src/db.js');

const agent = session(app);


describe('Types routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Type.sync({ force: true }).then(() => llenarTypes()));
  describe('GET /types', () => {
    it('should get 200', () =>
      agent.get('/types').expect(200)
    );
    it('should get 20 types', () =>
      agent.get('/types').then(res =>
        expect(res.body.length).to.equal(20)
      )
    );
  });
});
