const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const text = "I love this course!";
const result = sentiment.analyze(text);
console.log(result);
