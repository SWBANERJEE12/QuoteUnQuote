# Quote Club — Random Quote Generator

A responsive random quote generator built for the IEEE-VIT Web Development recruitment task using HTML, CSS, and vanilla JavaScript.

## Features
- Fetches a random quote and author on page load.
- **New Quote** button fetches another quote using the Fetch API.
- Loading state while the request is in progress.
- Friendly error state with a retry action if the API/network fails.
- Responsive layout for mobile and desktop.
- Copy-to-clipboard button.
- Keyboard-accessible controls and reduced-motion support.

## Tech stack
- HTML5
- CSS3
- Vanilla JavaScript (Fetch API, async/await, DOM updates)
- Public API: [DummyJSON Random Quote](https://dummyjson.com/quotes/random)

## Run locally
1. Download or clone this repository.
2. Open `index.html` in a browser.
3. If the browser blocks network requests from a local file, run a local server. For example, with Python installed:
   ```bash
   python -m http.server 8000
   ```
4. Visit `http://localhost:8000`.

## Deploy
### GitHub Pages
1. Push the files to a public GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to publish the website.

Alternatively, import the repository into Netlify or Vercel and deploy it as a static site. No build command is required.

## API and error handling
The site requests `https://dummyjson.com/quotes/random`. It checks `response.ok` before parsing JSON and validates that the response contains both a quote and an author. A loading state is shown while waiting. Network errors, non-success HTTP statuses, and unexpected response shapes produce a visible error state and retry option.

## Before submission
- Test the page on desktop and a phone-sized viewport.
- Click **New Quote** several times.
- Test the error state by temporarily disabling the internet or changing the API URL, then restore it.
- Add screenshots and your deployed website URL to your submission notes.
