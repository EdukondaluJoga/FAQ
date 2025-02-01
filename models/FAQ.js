const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  // Language-specific 
  question_hi: { type: String },
  answer_hi: { type: String },
  question_te: { type: String },
  answer_te: { type: String },
  question_es: { type: String },
  answer_es: { type: String },
  question_fr: { type: String },
  answer_fr: { type: String },
  question_zh: { type: String },
  answer_zh: { type: String }
}, { timestamps: true });

// Instance method for translated text dynamically
FAQSchema.methods.getTranslation = function(lang) {
  let translatedQuestion;
  let translatedAnswer;
  switch (lang) {
    case 'hi':
      translatedQuestion = this.question_hi || this.question;
      translatedAnswer = this.answer_hi || this.answer;
      break;
    case 'te':
      translatedQuestion = this.question_te || this.question;
      translatedAnswer = this.answer_te || this.answer;
      break;
    case 'es':
      translatedQuestion = this.question_es || this.question;
      translatedAnswer = this.answer_es || this.answer;
      break;
    case 'fr':
      translatedQuestion = this.question_fr || this.question;
      translatedAnswer = this.answer_fr || this.answer;
      break;
    case 'zh':
      translatedQuestion = this.question_zh || this.question;
      translatedAnswer = this.answer_zh || this.answer;
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