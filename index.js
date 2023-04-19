const autherText = document.getElementById("author");
const quoteText = document.getElementById("quote");
const tweetBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');
const quoteContainer=document.getElementById('quote-container');

let quotes = [];


// show loader
function showLoader(){
    loader.hidden=false;
    quoteContainer.hidden=true
}

//complete loading

function hideLoader(){
    if(!loader.hidden){
        loader.hidden=true;
        quoteContainer.hidden=false;
    }
   
}
// get Quotes from api

async function getQuotes() {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    showLoader()
    const response = await fetch(apiUrl);
    quotes = await response.json();
    hideLoader()
    getQuote();
  } catch (err) {
    console.log(err);
  }
}
//get random quote
function getQuote() {
    showLoader()
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[quoteIndex];
  const {author, text} = randomQuote;
  autherText.innerText = author ?? "Unknown";
  if (text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.innerText = text;
  hideLoader()
}

// tweet quotes

function tweetQuotes() {
  const currentText = quoteText.innerText;
  const currentAuthor = autherText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${currentText}-${currentAuthor}`;
  window.open(twitterUrl, '_blank');
}

tweetBtn.addEventListener('click',tweetQuotes);
newQuoteBtn.addEventListener('click',getQuote)



// on load

getQuotes();

