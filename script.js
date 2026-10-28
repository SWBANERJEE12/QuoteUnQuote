// ==========================================
// QUOTE CLUB — CATEGORY QUOTE GENERATOR 🍰
// ==========================================

// HTML elements
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const quoteContent = document.getElementById("quoteContent");
const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const errorMessage = document.getElementById("errorMessage");
const newQuoteButton = document.getElementById("newQuoteButton");
const retryButton = document.getElementById("retryButton");
const copyButton = document.getElementById("copyButton");
const quoteNumber = document.getElementById("quoteNumber");
const toast = document.getElementById("toast");
const categoryButtons = document.querySelectorAll(".category-button");

// ❤️ Favourites system
const favouriteButton = document.getElementById("favouriteButton");

const FAVOURITES_KEY = "quoteUnquoteFavourites";

let favourites = [];

try {
    const savedFavourites = JSON.parse(
        localStorage.getItem(FAVOURITES_KEY) || "[]"
    );

    if (Array.isArray(savedFavourites)) {
        favourites = savedFavourites.filter(
            quote =>
                quote &&
                typeof quote.text === "string" &&
                typeof quote.author === "string"
        );
    }
} catch (error) {
    console.error("Could not load favourites:", error);
}

// Check whether the current quote is already saved.
function isFavourite(quote) {
    if (!quote) return false;

    return favourites.some(
        saved =>
            saved.text === quote.text &&
            saved.author === quote.author
    );
}

// Update the heart's appearance.
function updateFavouriteButton() {
    if (!favouriteButton) return;

    const saved = isFavourite(lastQuote);

    favouriteButton.classList.toggle("is-favourite", saved);

    favouriteButton.setAttribute(
        "aria-label",
        saved ? "Remove quote from favourites" : "Add quote to favourites"
    );

    favouriteButton.title = saved
        ? "Remove from favourites"
        : "Add to favourites";
}

// Save favourites in the browser.
function saveFavourites() {
    try {
        localStorage.setItem(
            FAVOURITES_KEY,
            JSON.stringify(favourites)
        );

        return true;
    } catch (error) {
        console.error("Could not save favourites:", error);
        showToast("Couldn't save favourites in this browser.");
        return false;
    }
}

// Add or remove the current quote.
function toggleFavourite() {
    if (!lastQuote) {
        showToast("There's no quote to save yet!");
        return;
    }

    const existingIndex = favourites.findIndex(
        quote =>
            quote.text === lastQuote.text &&
            quote.author === lastQuote.author
    );

    if (existingIndex !== -1) {
        const removedQuote = favourites[existingIndex];

        favourites.splice(existingIndex, 1);

        if (!saveFavourites()) {
            favourites.splice(existingIndex, 0, removedQuote);
            return;
        }

        showToast("Removed from favourites 💔");
    } else {
        favourites.push({
            text: lastQuote.text,
            author: lastQuote.author,
            category: lastQuote.category || "General"
        });

        if (!saveFavourites()) {
            favourites.pop();
            return;
        }

        favouriteButton.classList.remove("is-favourite");
        void favouriteButton.offsetWidth;
        showToast("Added to favourites ❤️");
    }

    updateFavouriteButton();
}

// Connect the heart to the favourites system.
let heartWasDragged = false;

if (favouriteButton) {
    favouriteButton.addEventListener("click", () => {
        if (heartWasDragged) {
            heartWasDragged = false;
            return;
        }

        toggleFavourite();
    });
}

// State
let quoteCount = 1;
let toastTimer;
let currentCategory = "All";
let lastQuote = null;

// ==========================================
// YOUR QUOTE COLLECTION
// Add more quotes to these categories anytime!
// ==========================================

const quoteCollection = [
    // 📺 TV SHOWS
    {
        text: "Winter is coming.",
        author: "Game of Thrones",
        category: "TV Shows"
    },
    {
        text: "I am the one who knocks!",
        author: "Breaking Bad",
        category: "TV Shows"
    },
    {
        text: "Live long and prosper.",
        author: "Star Trek",
        category: "TV Shows"
    },
    {
        text: "The truth is out there.",
        author: "The X-Files",
        category: "TV Shows"
    },
    //All
    {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: "All"
    },
{
    text: "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
    author: "Marilyn Monroe",
    category: "All"
},
{
    text: "So many books, so little time.",
    author: "Frank Zappa",
    category: "All"
},
{
    text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    author: "Albert Einstein",
    category: "All"
},
{
    text: "A room without books is like a body without a soul.",
    author: "Marcus Tullius Cicero",
    category: "All"
},

    // 🍥 ANIME
    {
        text: "Plus Ultra!",
        author: "My Hero Academia",
        category: "Anime"
    },
    {
        text: "Believe it!",
        author: "Naruto",
        category: "Anime"
    },
    {
        text: "I'm gonna be King of the Pirates!",
        author: "One Piece",
        category: "Anime"
    },
    {
        text: "Tatakae.",
        author: "Attack on Titan",
        category: "Anime"
    },
    {
        text: "The world is not perfect.",
        author: "Fullmetal Alchemist: Brotherhood",
        category: "Anime"
    },
    {
    text: "I don't know how I'll feel when I'm dead, but I don't want to regret the way I lived.",
    author: "Yuji Itadori",
    category: "Anime"
},
{
    text: "It's ironic, isn't it? When granted everything, you can't do anything.",
    author: "Gojo Satoru",
    category: "Anime"
},
{
    text: "There are only so many seats open in my life, and I don't want to let my heart be swayed by anyone who's not sitting in one of them. Of course, there are also people like you who bring their own seat and sit down.",
    author: "Nobara Kugisaki",
    category: "Anime"
},
{
    text: "The only thing granted equally to all is unfair reality.",
    author: "Megumi Fushiguro",
    category: "Anime"
},
{
    text: "I mustn't run away.",
    author: "Shinji Ikari",
    category: "Anime"
},
{
    text: "Those who hate themselves cannot love or trust others.",
    author: "Rei Ayanami",
    category: "Anime"
},
{
    text: "I'll leave tomorrow's problems to tomorrow's me.",
    author: "Saitama",
    category: "Anime"
},
{
    text: "We can't waste time worrying about the what if's.",
    author: "Ichigo Kurosaki",
    category: "Anime"
},
{
    text: "I hate perfection. To be perfect is to be unable to improve any further.",
    author: "Kurotsuchi Mayuri",
    category: "Anime"
},
{
    text: "To know sorrow is not terrifying. What is terrifying is to know you can't go back to happiness you could have.",
    author: "Matsumoto Rangiku",
    category: "Anime"
},
{
    text: "The brighter they shine, the darker the shadow grows.",
    author: "Makino Fumito",
    category: "Anime"
},

    // 🎨 CARTOONS
    {
        text: "What's up, Doc?",
        author: "Looney Tunes",
        category: "Cartoons"
    },
    {
        text: "Scooby-Dooby-Doo!",
        author: "Scooby-Doo",
        category: "Cartoons"
    },
    {
        text: "I'm ready!",
        author: "SpongeBob SquarePants",
        category: "Cartoons"
    },
    {
        text: "That's all, folks!",
        author: "Looney Tunes",
        category: "Cartoons"
    },

    // 🎮 VIDEO GAMES
    {
        text: "War. War never changes.",
        author: "Fallout",
        category: "Games"
    },
    {
        text: "Stay awhile and listen.",
        author: "Diablo",
        category: "Games"
    },
    {
        text: "Finish him!",
        author: "Mortal Kombat",
        category: "Games"
    },
    {
        text: "A man chooses. A slave obeys.",
        author: "BioShock",
        category: "Games"
    },
    {
        text: "Had to be me. Someone else might have gotten it wrong.",
        author: "Mass Effect 3",
        category: "Games"
    },
    {
        text: "It's dangerous to go alone!",
        author: "The Legend of Zelda",
        category: "Games"
    },

    // 🎬 MOVIES
    {
        text: "May the Force be with you.",
        author: "Star Wars",
        category: "Movies"
    },
    {
        text: "Why so serious?",
        author: "The Dark Knight",
        category: "Movies"
    },
    {
        text: "I'll be back.",
        author: "The Terminator",
        category: "Movies"
    },
    {
        text: "To infinity and beyond!",
        author: "Toy Story",
        category: "Movies"
    },
    {
        text: "With great power comes great responsibility.",
        author: "Spider-Man",
        category: "Movies"
    },
    {
    text: "The first rule of Fight Club is: you do not talk about Fight Club.",
    author: "Fight Club (1999)",
    category: "Movies"
},
{
    text: "Wax on, wax off.",
    author: "The Karate Kid (1984)",
    category: "Movies"
},
{
    text: "That'll do, pig.",
    author: "Babe (1995)",
    category: "Movies"
},
{
    text: "Carpe diem. Seize the day, boys.",
    author: "Dead Poets Society (1989)",
    category: "Movies"
}
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function setLoading(isLoading) {
    newQuoteButton.disabled = isLoading;

    newQuoteButton.querySelector(".button-spark").textContent =
        isLoading ? "…" : "✳";

    quoteContent.hidden = isLoading;
    errorState.hidden = true;
    loadingState.hidden = !isLoading;
}

function showError(message) {
    loadingState.hidden = true;
    quoteContent.hidden = true;
    errorState.hidden = false;

    errorMessage.textContent = message;
    newQuoteButton.disabled = false;

    newQuoteButton.querySelector(".button-spark").textContent = "✳";
}

function displayQuote(quote) {
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = quote.author;

    quoteCount += 1;

    quoteNumber.textContent =
        `QUOTE / ${String(quoteCount).padStart(3, "0")}`;

    lastQuote = quote;
    updateFavouriteButton();

    loadingState.hidden = true;
    errorState.hidden = true;
    quoteContent.hidden = false;

    newQuoteButton.disabled = false;
    newQuoteButton.querySelector(".button-spark").textContent = "✳";
}

// Choose a random quote without immediately repeating the previous one.
function getRandomQuote(quotes) {
    if (quotes.length === 0) {
        return null;
    }

    if (quotes.length === 1) {
        return quotes[0];
    }

    let availableQuotes = quotes.filter(quote =>
        quote.text !== lastQuote?.text ||
        quote.author !== lastQuote?.author
    );

    if (availableQuotes.length === 0) {
        availableQuotes = quotes;
    }

    return availableQuotes[
        Math.floor(Math.random() * availableQuotes.length)
    ];
}

// ==========================================
// GET A QUOTE
// ==========================================

async function fetchQuote() {
    const categoryQuotes = currentCategory === "All"
        ? quoteCollection
        : quoteCollection.filter(
            quote => quote.category === currentCategory
        );

    // Category-specific quotes come from our own collection.
    if (currentCategory !== "All") {
        const quote = getRandomQuote(categoryQuotes);

        if (quote) {
            displayQuote(quote);
        } else {
            showError(
                `No quotes found for ${currentCategory} yet. Add some in script.js!`
            );
        }

        return;
    }

    // In All mode, mix curated quotes with general API quotes.
    // Use our collection 70% of the time.
    const useLocalQuote = Math.random() < 0.7;

    if (useLocalQuote) {
        const quote = getRandomQuote(categoryQuotes);

        if (quote) {
            displayQuote(quote);
            return;
        }
    }

    // Fetch a general quote from DummyJSON.
    setLoading(true);

    try {
        const response = await fetch(
            "https://dummyjson.com/quotes/random",
            {
                headers: {
                    Accept: "application/json"
                },
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error(
                `Quote service returned status ${response.status}.`
            );
        }

        const data = await response.json();

        if (
            !data ||
            typeof data.quote !== "string" ||
            typeof data.author !== "string"
        ) {
            throw new Error("Unexpected response from quote service.");
        }

        displayQuote({
            text: data.quote,
            author: data.author,
            category: "General"
        });

    } catch (error) {
        console.error("Could not fetch a quote:", error);

        // If the API fails, fall back to a local quote.
        const fallbackQuote = getRandomQuote(categoryQuotes);

        if (fallbackQuote) {
            displayQuote(fallbackQuote);
            showToast("Showing a saved quote instead!");
        } else {
            showError(
                "Couldn't load a quote. Check your internet connection and try again."
            );
        }
    }
}

// ==========================================
// CATEGORY FILTERS
// ==========================================

function selectCategory(category) {
    currentCategory = category;

    // Highlight the currently selected category.
    categoryButtons.forEach(button => {
        const isActive = button.dataset.category === category;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    // Update the card label if the element exists.
    const cardLabel = document.querySelector(".card-label");

    if (cardLabel) {
        const label = category === "All"
            ? "TODAY'S RANDOM THOUGHT"
            : `${category.toUpperCase()} QUOTES`;

        cardLabel.innerHTML =
            `<span class="mini-square"></span> ${label}`;
    }

    // Load a quote from the selected category.
    fetchQuote();
}

// Connect all category buttons.
categoryButtons.forEach(button => {
    button.setAttribute(
        "aria-pressed",
        String(button.dataset.category === "All")
    );

    button.addEventListener("click", () => {
        const category = button.dataset.category;

        if (!category) {
            return;
        }

        selectCategory(category);
    });
});

// ==========================================
// COPY QUOTE
// ==========================================

async function copyQuote() {
    if (!quoteText.textContent.trim()) {
        showToast("There's no quote to copy yet!");
        return;
    }

    const text =
        `“${quoteText.textContent}” — ${quoteAuthor.textContent}`;

    try {
        await navigator.clipboard.writeText(text);

        showToast("Quote copied to clipboard!");

    } catch {
        // Fallback for browsers where Clipboard API is unavailable.
        const textarea = document.createElement("textarea");

        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.select();

        const copied = document.execCommand("copy");

        textarea.remove();

        showToast(
            copied
                ? "Quote copied to clipboard!"
                : "Copy isn't available in this browser."
        );
    }
}

// ==========================================
// EVENT LISTENERS
// ==========================================

newQuoteButton.addEventListener("click", fetchQuote);
retryButton.addEventListener("click", fetchQuote);
copyButton.addEventListener("click", copyQuote);

// Start the website with All selected.
selectCategory("All");
// Typewriter animation for the hero heading
const titleLine1 = document.getElementById("titleLine1");
const titleLine2 = document.getElementById("titleLine2");
const typingCursor = document.getElementById("typingCursor");

async function typeText(element, text, speed = 85) {
  for (const character of text) {
    element.textContent += character;

    await new Promise(resolve => {
      setTimeout(resolve, speed);
    });
  }
}

async function animateHeading() {
  // Prevent the heading from being animated more than once
  if (!titleLine1 || !titleLine2 || !typingCursor) return;

  typingCursor.style.visibility = "visible";

  await typeText(titleLine1, "A thought worth", 90);
  await new Promise(resolve => setTimeout(resolve, 250));
  await typeText(titleLine2, "keeping.", 110);

  // Hide the cursor when the typing is finished
  typingCursor.classList.add("finished");
}

animateHeading();
// ==========================================
// SLINGSHOT HEART ANIMATION ❤️
// ==========================================

const slingshotHeart = favouriteButton?.querySelector(".slingshot-heart");
const slingshotBand = favouriteButton?.querySelector(".slingshot-band");

let isPullingHeart = false;
let heartStartX = 0;
let heartStartY = 0;
let heartPullX = 0;
let heartPullY = 0;

const maxHeartPull = 65;
// Create the stretchy shadow
const slingshotShadow = document.createElement("div");
slingshotShadow.className = "slingshot-shadow";
document.body.appendChild(slingshotShadow);
const heartLaunchThreshold = 25;

if (favouriteButton && slingshotHeart && slingshotBand) {
    favouriteButton.addEventListener("pointerdown", startHeartPull);
    window.addEventListener("pointermove", moveHeartPull);
    window.addEventListener("pointerup", releaseHeartPull);
    window.addEventListener("pointercancel", cancelHeartPull);
}

function startHeartPull(event) {
    if (event.button !== 0 && event.pointerType === "mouse") return;

    isPullingHeart = true;
    heartStartX = event.clientX;
    heartStartY = event.clientY;
    // Remember the circle's original position
    const rect = favouriteButton.getBoundingClientRect();

    slingshotShadow.style.left = `${rect.left}px`;
    slingshotShadow.style.top = `${rect.top}px`;
    slingshotShadow.style.width = `${rect.width}px`;
    slingshotShadow.style.height = `${rect.height}px`;
    slingshotShadow.style.opacity = "1";
    heartPullX = 0;
    heartPullY = 0;

    favouriteButton.classList.add("is-pulling");
    favouriteButton.setPointerCapture?.(event.pointerId);

    event.preventDefault();
}

function moveHeartPull(event) {
    if (!isPullingHeart) return;

    let dx = event.clientX - heartStartX;
    let dy = event.clientY - heartStartY;

    const distance = Math.hypot(dx, dy);

    if (distance > maxHeartPull) {
        const scale = maxHeartPull / distance;
        dx *= scale;
        dy *= scale;
    }

    heartPullX = dx;
    heartPullY = dy;


    // Move the entire circle instead of just the heart
    // Slight resistance makes the drag feel elastic.
            // Slight resistance makes the drag feel elastic.
    const resistance = 0.82;
    const pullX = dx * resistance;
    const pullY = dy * resistance;

    const stretchDistance = Math.hypot(pullX, pullY);
    const stretch = Math.min(stretchDistance / 500, 0.08);
    // Make the slingshot shadow deepen as the pull increases
    const pullStrength = Math.min(stretchDistance / maxHeartPull, 1);

    favouriteButton.style.setProperty(
    "--pull-shadow-opacity",
    0.15 + pullStrength * 0.4
    );
    const angle = Math.atan2(pullY, pullX) * (180 / Math.PI);

    favouriteButton.style.transform = `
        translate(${pullX}px, ${pullY}px)
        rotate(${angle * 0.08}deg)
        scale(${1 - stretch}, ${1 + stretch})
    `;
    // Stretch the shadow towards the dragged circle
    // Keep the shadow behind the circle and taper its shape.
    // Keep the teardrop anchored behind the original heart position.
    const shadowDistance = Math.hypot(pullX, pullY);
const shadowAngle = Math.atan2(pullY, pullX) * (180 / Math.PI);

// Keep the round base centred on the heart's original position.
slingshotShadow.style.left = `${heartStartX - 24}px`;
slingshotShadow.style.top = `${heartStartY - 29}px`;

// Stretch the teardrop along the direction of the drag.
slingshotShadow.style.transform = `
    rotate(${shadowAngle}deg)
    scale(${1 + Math.min(shadowDistance / 100, 0.5)}, 0.85)
`;
}

function releaseHeartPull() {
    if (!isPullingHeart) return;

    isPullingHeart = false;
    slingshotShadow.style.opacity = "0";

    const distance = Math.hypot(heartPullX, heartPullY);

    favouriteButton.classList.remove("is-pulling");

    if (distance >= heartLaunchThreshold) {
      heartWasDragged = true;

      favouriteButton.classList.remove("is-pulling");
      favouriteButton.classList.add("is-returning");

      favouriteButton.style.transform = "translate(0, 0) rotate(0deg) scale(1)";

      toggleFavourite();

      setTimeout(() => {
      favouriteButton.classList.remove("is-returning");
      favouriteButton.style.transform = "";
      }, 450);
    } 
    else {
        // A short tap still works like a normal heart button click.
        slingshotHeart.style.transform = "";
        slingshotBand.style.opacity = "";
        slingshotBand.style.transform = "";
    }
}

function cancelHeartPull() {
    if (!isPullingHeart) return;

    isPullingHeart = false;
    slingshotShadow.style.opacity = "0";
    favouriteButton.classList.remove("is-pulling");

    slingshotHeart.style.transform = "";
    slingshotBand.style.opacity = "";
    slingshotBand.style.transform = "";
}
