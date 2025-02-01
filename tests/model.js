const chai = require('chai');
const FAQ = require('../models/FAQ');

const expect = chai.expect;

describe('FAQ Model Tests', () => {
  describe('Model method: getTranslation', () => {
    it('should return English text if translation is missing', () => {
      const faq = new FAQ({
        question: 'how was your day?',
        answer: 'My day was great.'
      });
      const translation = faq.getTranslation('hi');
      expect(translation.question).to.equal('how was your day?');
      expect(translation.answer).to.equal('My day was great.');
    });
  });
});