const express = require('express');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const port = 3000;
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

app.engine("html", ejs.__express);
app.use(express.static(path.join(__dirname, "../views")));
app.set("view engine", "html");

// Middleware to parse JSON and URL encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('blog/html-tp2');
});

app.get('/api/articles', (req, res) => {
  const articles = JSON.parse(fs.readFileSync(path.join(__dirname, '../views/blog/articles.json')));
  res.json(articles);
});

// API endpoint to handle sentiment analysis
app.post('/api/sentiment', (req, res) => {
  const result = sentiment.analyze(req.body.text);
  res.json(result);  // Sends sentiment analysis result back to the client
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
