# Quote Club — Project Explanation

## 1. What it does
Quote Club is a responsive random quote generator. When the page opens, it requests a quote and its author from a public API. Users can request another quote with the New Quote button or copy the current quote.

## 2. Technologies used
- HTML structures the page and its content.
- CSS controls the layout, typography, colours, responsive behaviour, and loading/error states.
- JavaScript uses `fetch()` and `async/await` to request quote data, validate the response, and update the page.
- DummyJSON provides the random quote endpoint: https://dummyjson.com/quotes/random

## 3. How the main code works
1. The script selects the quote, author, button, loading, and error elements using `getElementById`.
2. `fetchQuote()` displays the loading state and disables the New Quote button to prevent duplicate requests.
3. It sends a GET request to the API using `fetch()`.
4. It checks `response.ok`. If the request failed, it throws an error rather than trying to use an invalid response.
5. It parses the response as JSON and checks that both `quote` and `author` are strings.
6. When valid data arrives, it updates the text using `textContent`, increments the quote counter, and shows the quote card.
7. If the request fails, the catch block logs the technical error and displays a helpful message with a retry button.
8. The copy button uses the Clipboard API and includes a fallback for browsers where that API is unavailable.

## 4. Problems faced and how they are handled
- **API/network failure:** A try/catch block displays a friendly error and allows the user to retry.
- **Slow response:** A loading indicator and disabled button make the request state clear.
- **Unexpected API response:** The code checks the response fields before displaying them.
- **Different screen sizes:** CSS Grid, flexible sizing, and media queries adapt the interface to desktop and mobile.
- **Clipboard restrictions:** A fallback copy method is included for browsers that do not allow the Clipboard API.

## 5. What I learned
This project helped me practise asynchronous JavaScript, working with a public API, handling failed requests, updating the DOM, and building a responsive interface. It also reinforced the importance of designing for failure states instead of only building the happy path.

## 6. Screenshots to add
Add screenshots of:
- The quote card after a successful API response.
- The loading state (capture immediately after clicking New Quote, if visible).
- The error state (temporarily disconnect from the internet or change the API URL, then restore it).
- The mobile layout.

## 7. Links
- GitHub repository: ADD YOUR PUBLIC REPOSITORY LINK
- Live website: ADD YOUR DEPLOYED WEBSITE LINK
