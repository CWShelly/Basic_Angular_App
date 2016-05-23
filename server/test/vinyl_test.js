const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = 1238;
const Vinyl = require(__dirname + '/../models/vinyls');

const app = require(__dirname + '/../_server');


describe('the requests', () => {
  before((done) => {
    this.server = app(port, 'mongodb://localhost/testmv_db', console.log('server up on' + port));

    var newVinyl = new Vinyl({
      album: 'testAlbum', artist: 'testArtist', purchasedAt: 'testStore' });
    newVinyl.save((err, data) => {
      if (err) console.log(err);
      this.vinyl = data;
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

  it('should get all the vinyls', (done) => {
    request('localhost:' + port)
.get('/api/vinyl')
.end((err, res) => {
  console.log(err);

  expect(err).to.eql(null);
  expect(res.status).to.eql(200);
  done();
});
  });

  it('should add on post', (done) => {
    request('localhost:' + port)
    .post('/api/vinyl')
    .send({ album: 'testAlbum2', artist: 'testArtist2', purchasedAt: 'testStore2' } )
    .end((err, res) => {
      console.log(err);
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });

  it('should update on put', (done) => {
    request('localhost:' + port)
    .put('/api/vinyl/' + this.vinyl._id)
    .send({ album: 'testAlbum3', artist: 'testArtist3', purchasedAt: 'testStore3' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.msg).to.eql('Vinyl updated');
      done();
    });
  });

  it('should remove a record on delete', (done) => {
    request('localhost:' + port)
    .delete('/api/vinyl/' + this.vinyl._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.msg).to.eql('Vinyl record deleted');
      done();
    });
  });
});
