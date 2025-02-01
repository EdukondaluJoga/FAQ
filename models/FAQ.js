const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  // Language-specific
  question_hi: { type: String },
  answer_hi: { type: String },
  question_bn: { type: String },
  answer_bn: { type: String }
}, { timestamps: true });

// Instance method to get translated text dynamically
FAQSchema.methods.getTranslation = function(lang) {
  let translatedQuestion;
  let translatedAnswer;
  switch (lang) {
    case 'hi':
      translatedQuestion = this.question_hi || this.question;
      translatedAnswer = this.answer_hi || this.answer;
      break;
    case 'bn':
      translatedQuestion = this.question_bn || this.question;
      translatedAnswer = this.answer_bn || this.answer;
      break;
    default:
      translatedQuestion = this.question;
      translatedAnswer = this.answer;
  }
  return {
    question: translatedQuestion,
    answer: translatedAnswer
  };
};

const FAQ = mongoose.model('FAQ', FAQSchema);
module.exports = FAQ;