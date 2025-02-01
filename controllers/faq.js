const FAQ = require('../models/FAQ');
const { translateFAQ, translateText } = require('../services/translation');
const { getCache, setCache } = require('../services/cache');

exports.getAllFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || 'en';
    const redisClient = req.app.locals.redisClient;
    const cacheKey = `faqs:lang:${lang}`;
    const cachedData = await getCache(redisClient, cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    const faqs = await FAQ.find({});
    // Maping FAQs
    const translatedFAQs = faqs.map((faq) => faq.getTranslation(lang));

    // Caching
    await setCache(redisClient, cacheKey, translatedFAQs);

    res.json(translatedFAQs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getFAQById = async (req, res) => {
  try {
    const lang = req.query.lang || 'en';
    const { id } = req.params;
    const redisClient = req.app.locals.redisClient;
    const cacheKey = `faq:${id}:lang:${lang}`;
    const cachedData = await getCache(redisClient, cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    const faq = await FAQ.findById(id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    const translatedFAQ = faq.getTranslation(lang);

    // Cache the result
    await setCache(redisClient, cacheKey, translatedFAQ);

    res.json(translatedFAQ);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and answer are required' });
    }
    // Automatically translate the FAQ into other languages
    const translations = await translateFAQ({ question, answer });

    const newFAQ = new FAQ({
      question,
      answer,
      ...translations
    });
    await newFAQ.save();
    res.status(201).json(newFAQ);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const faq = await FAQ.findById(id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    // Updating question and translations
    if (question) {
      faq.question = question;
      faq.question_hi = await translateText(question, 'hi');
      faq.question_te = await translateText(question, 'te');
      faq.question_es = await translateText(question, 'es');
      faq.question_fr = await translateText(question, 'fr');
      faq.question_zh = await translateText(question, 'zh');
    }
    // Updating answer and translations
    if (answer) {
      faq.answer = answer;
      faq.answer_hi = await translateText(answer, 'hi');
      faq.answer_te = await translateText(answer, 'te');
      faq.answer_es = await translateText(answer, 'es');
      faq.answer_fr = await translateText(answer, 'fr');
      faq.answer_zh = await translateText(answer, 'zh');
    }
    await faq.save();
    res.json(faq);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    res.json({ message: 'FAQ deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};