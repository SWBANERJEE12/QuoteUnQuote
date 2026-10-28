const FAVOURITES_KEY = "quoteUnquoteFavourites";

const favouritesGrid = document.getElementById("favouritesGrid");
const emptyFavourites = document.getElementById("emptyFavourites");
const favouriteCount = document.getElementById("favouriteCount");
const toast = document.getElementById("toast");

let toastTimer;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function getFavourites() {
    try {
        const saved = JSON.parse(
            localStorage.getItem(FAVOURITES_KEY) || "[]"
        );

        return Array.isArray(saved)
            ? saved.filter(
                quote =>
                    quote &&
                    typeof quote.text === "string" &&
                    typeof quote.author === "string"
            )
            : [];
    } catch (error) {
        console.error("Could not read favourites:", error);
        return [];
    }
}

function saveFavourites(favourites) {
    try {
        localStorage.setItem(
            FAVOURITES_KEY,
            JSON.stringify(favourites)
        );

        return true;
    } catch (error) {
        console.error("Could not save favourites:", error);
        showToast("Couldn't update favourites in this browser.");
        return false;
    }
}

function createFavouriteCard(quote, index) {
    const card = document.createElement("article");
    card.className = "favourite-card";

    const number = document.createElement("span");
    number.className = "favourite-card-number";
    number.textContent = `KEEPER / ${String(index + 1).padStart(3, "0")}`;

    const heart = document.createElement("span");
    heart.className = "favourite-card-heart";
    heart.textContent = "♥";
    heart.setAttribute("aria-hidden", "true");

    const text = document.createElement("p");
    text.className = "favourite-card-quote";
    text.textContent = `“${quote.text}”`;

    const authorRow = document.createElement("div");
    authorRow.className = "favourite-card-author-row";

    const rule = document.createElement("span");
    rule.className = "author-rule";

    const author = document.createElement("p");
    author.className = "favourite-card-author";
    author.textContent = quote.author;

    authorRow.append(rule, author);

    const category = document.createElement("span");
    category.className = "favourite-card-category";
    category.textContent = quote.category || "General";

    const actions = document.createElement("div");
    actions.className = "favourite-card-actions";

    const copyButton = document.createElement("button");
    copyButton.className = "favourite-action-button";
    copyButton.type = "button";
    copyButton.textContent = "COPY ↗";
    copyButton.addEventListener("click", () => copyQuote(quote));

    const removeButton = document.createElement("button");
    removeButton.className = "favourite-action-button remove-favourite-button";
    removeButton.type = "button";
    removeButton.textContent = "REMOVE ♥";
    removeButton.addEventListener("click", () => removeFavourite(quote));

    actions.append(copyButton, removeButton);

    card.append(number, heart, text, authorRow, category, actions);

    return card;
}

function renderFavourites() {
    const favourites = getFavourites();

    favouritesGrid.replaceChildren();

    favouriteCount.textContent =
        `${favourites.length} SAVED`;

    emptyFavourites.hidden = favourites.length !== 0;
    favouritesGrid.hidden = favourites.length === 0;

    favourites.forEach((quote, index) => {
        favouritesGrid.appendChild(
            createFavouriteCard(quote, index)
        );
    });
}

async function copyQuote(quote) {
    const text = `“${quote.text}” — ${quote.author}`;

    try {
        await navigator.clipboard.writeText(text);
        showToast("Quote copied! 📋");
    } catch {
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
                ? "Quote copied! 📋"
                : "Copy isn't available in this browser."
        );
    }
}

function removeFavourite(quoteToRemove) {
    const favourites = getFavourites();

    const updatedFavourites = favourites.filter(
        quote =>
            quote.text !== quoteToRemove.text ||
            quote.author !== quoteToRemove.author
    );

    if (!saveFavourites(updatedFavourites)) {
        return;
    }

    showToast("Quote removed 💔");
    renderFavourites();
}

renderFavourites();