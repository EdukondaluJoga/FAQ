const translate = require('@vitalets/google-translate-api');

async function translateText(text, targetLang) {
  try {
    const res = await translate(text, { to: targetLang });
    return res.text;
  } catch (err) {
    console.error(`Translation error to ${targetLang}:`, err);
    return text; // Fallback to original text on error
  }
}

async function translateFAQ(faqData) {
  const { question, answer } = faqData;
  const translations = {};

  // Translate to Hindi (hi)
  translations.question_hi = await translateText(question, 'hi');
  translations.answer_hi = await translateText(answer, 'hi');

  // Translate to Telugu (te)
  translations.question_te = await translateText(question, 'te');
  translations.answer_te = await translateText(answer, 'te');

  // Translate to Spanish (es)
  translations.question_es = await translateText(question, 'es');
  translations.answer_es = await translateText(answer, 'es');

  // Translate to French (fr)
  translations.question_fr = await translateText(question, 'fr');
  translations.answer_fr = await translateText(answer, 'fr');

  // Translate to Chinese (zh)
  translations.question_zh = await translateText(question, 'zh');
  translations.answer_zh = await translateText(answer, 'zh');

  return translations;
}

module.exports = {
  translateText,
  translateFAQ
};