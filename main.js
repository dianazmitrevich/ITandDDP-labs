const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const searchInput = document.querySelector("#search");
    const searchText = searchInput.value;
    searchInput.value = "";
    getBookInfo(searchText);
}

async function getBookInfo(searchText) {
    const bookUrl = `https://gutendex.com/books/?search=${searchText}`;
    const response = await fetch(bookUrl);
    const data = await response.json();
    const bookId = data.results[0].id;
    const bookInfoUrl = `https://gutendex.com/books/${bookId}`;
    const bookInfoResponse = await fetch(bookInfoUrl);
    const bookInfoData = await bookInfoResponse.json();
    displayBookInfo(bookInfoData);
    displayBookText(bookId);
}

function displayBookInfo(bookInfo) {
    console.log(bookInfo);

    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const cover = document.querySelector("#cover");
    const description = document.querySelector("#description");
    title.textContent = bookInfo.title;
    author.textContent = bookInfo.authors[0].name;
    cover.src = bookInfo.formats["image/jpeg"];
    description.textContent = bookInfo.formats["text/plain"].charset;
}

async function displayBookText(bookId) {
    const bookUrl = `http://localhost:3000/https:/www.gutenberg.org/cache/epub/${bookId}/pg${bookId}.txt`;

    const response = await fetch(bookUrl);
    const text = await response.text();

    // const formattedText = text.replace(/\n/g, "<br>");
    // console.log(formattedText);

    const bookText = document.querySelector("#text");
    bookText.innerHTML = text;
}
