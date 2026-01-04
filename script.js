"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");

let apiQuotes = [];

//Show new Quote
function newQuote() {
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
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = quote.author;
}

//Get Quote From API
async function getQuote() {
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

//On Load; can't be invoked/called before function declaration due to hoisting.
getQuote();

// Sample Requests,There is an alternative option for this project that does not require an API key - https://zenquotes.io/
// https://zenquotes.io/api/quotes - Generate a JSON array of 50 random quotes on each request

// https://zenquotes.io/api/today - Generate the quote of the day on each request

// https://zenquotes.io/api/random - Generate a random quote on each request
