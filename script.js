"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show new Quote
function newQuote() {
  loading();
  //Pick a random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // console.log(quote);
  quoteAuthor.textContent = quote.author;
  quoteText.textContent = quote.text;
  //Check if Author: Firstname Lastname is blank and replace it with 'unknown'
  if (!quote.author) {
    quote.author = "Unknown";
  }
  //Check Quote Length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = quote.author;
  complete();
}

//Get Quote From API
async function getQuote() {
  loading();
  //   const proxyUrl = "http://cors-anywhere.herokuapp.com/";
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //catch error
  }
}
// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);

//On Load; can't be invoked/called before function declaration due to hoisting.
getQuote();

// Sample Requests,There is an alternative option for this project that does not require an API key - https://zenquotes.io/
// https://zenquotes.io/api/quotes - Generate a JSON array of 50 random quotes on each request

// https://zenquotes.io/api/today - Generate the quote of the day on each request

// https://zenquotes.io/api/random - Generate a random quote on each request
