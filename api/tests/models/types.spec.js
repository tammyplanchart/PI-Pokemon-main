const { Type, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Type model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Type.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', () =>
        Type.create({}).catch(err =>
          expect(err.message).to.equal('notNull Violation: type.name cannot be null')
        )
      );
      it('should work when its a valid name', () =>
        Type.create({ name: 'sleepy' }).then(type => {
          expect(type.name).to.equal('sleepy');
        })
      );
    });
  });
});
