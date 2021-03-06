const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = 1237;
const Mug = require(__dirname + '/../models/mug');
var server;

const app = require(__dirname + '/../_server');

describe('the requests', () => {
  before((done) => {
    this.server = app(port, 'mongodb://localhost/testmv_db', console.log('server up on' + port));

    var newMug = new Mug({ place: 'testPlace', city: 'testCity', drinkPref: 'testDrink' });
    newMug.save((err, data) => {
      if (err) console.log(err);
      this.mug = data;
      done();
    });
  });

  after((done) => {

    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        this.server.close(() => {
          done();
        });
      });
    });
  });

  it('should get all the mugs', (done) => {
    request('localhost:' + port)
.get('/api/mugs')
.end((err, res) => {
  console.log(err);

  expect(err).to.eql(null);
  expect(res.status).to.eql(200);
  done();
});
  });

  it('should add on post', (done) => {
    request('localhost:' + port)
    .post('/api/mugs')
    .send({ place: 'testPlace2', city: 'testCity2', drinkPref: 'testDrink2' } )
    .end((err, res) => {
      console.log(err);
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });

  it('should update on put', (done) => {
    request('localhost:' + port)
    .put('/api/mugs/' + this.mug._id)
    .send({ place: 'testPlace3', city: 'testCity3', drinkPref: 'testDrink3' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.msg).to.eql('Mugs updated');
      done();
    });
  });

  it('should remove a record on delete', (done) => {
    request('localhost:' + port)
    .delete('/api/mugs/' + this.mug._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.msg).to.eql('Mugs record deleted');
      done();
    });
  });
});
