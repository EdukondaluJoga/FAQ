// tests/api.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const FAQ = require('../models/FAQ');

const expect = chai.expect;
chai.use(chaiHttp);

describe('FAQ API Endpoints Tests', () => {
  let faqId;

  // delete history before and after
  before(async function() {
    this.timeout(5000); // Increase timeout to 5000ms (5 seconds)
    await FAQ.deleteMany({});
  });
  after(async () => {
    await FAQ.deleteMany({});
  });

  it('should create a new FAQ', (done) => {
    chai.request(app)
      .post('/api/faqs')
      .send({
        question: 'Testing FAQ?',
        answer: '<p>yes its working.</p>'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        faqId = res.body._id;
        expect(res.body.question).to.equal('Testing FAQ?');
        done();
      });
  });

  it('should get all FAQs', (done) => {
    chai.request(app)
      .get('/api/faqs')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1);
        done();
      });
  });

  it('should get a FAQ by ID', (done) => {
    chai.request(app)
      .get(`/api/faqs/${faqId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.question).to.equal('Testing FAQ?');
        done();
      });
  });

  it('should update a FAQ', (done) => {
    chai.request(app)
      .put(`/api/faqs/${faqId}`)
      .send({
        question: 'Is this updated FAQ?',
        answer: '<p>yes its an updated answer.</p>'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.question).to.equal('Is this updated FAQ?');
        done();
      });
  });

  it('should delete a FAQ', (done) => {
    chai.request(app)
      .delete(`/api/faqs/${faqId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
  });
});