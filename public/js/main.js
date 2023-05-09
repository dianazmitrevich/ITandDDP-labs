const searchText = "Technology";

window.addEventListener('DOMContentLoaded', init);

function init() {
    getBookInfo(searchText);
}

async function getBookInfo(searchText) {
    const bookUrl = `https://gutendex.com/books/?search=${searchText}`;

    const response = await fetch(bookUrl);
    const data = await response.json();

    for (i = 0; i < 5; i++) {
        const bookId = data.results[i].id;

        const bookInfoUrl = `https://gutendex.com/books/${bookId}`;
        const bookInfoData = getBookInfoObj(bookInfoUrl);

        bookInfoData.then(function (value) {
            displayBookInfo(value);
        });
    }
}

async function getBookInfoObj(bookInfoUrl) {
    const bookInfoResponse = await fetch(bookInfoUrl);
    const bookInfoData = await bookInfoResponse.json();

    return bookInfoData;
}

function displayBookInfo(bookInfo) {
    const section = document.createElement('section');
    section.classList.add('books__card', 'card');

    const div1 = document.createElement('div');
    div1.classList.add('card__row');

    const div2 = document.createElement('div');
    div2.classList.add('card__col');

    const div3 = document.createElement('div');
    div3.classList.add('card__image');

    const img = document.createElement('img');
    img.src = bookInfo.formats["image/jpeg"];
    img.alt = 'Book preview';

    div3.appendChild(img);
    div2.appendChild(div3);

    const div4 = document.createElement('div');
    div4.classList.add('card__col');

    const textWrap = document.createElement('div');
    textWrap.classList.add('text-wrap');

    const title = document.createElement('div');
    title.classList.add('card__title');
    title.textContent = bookInfo.title;

    const author = document.createElement('div');
    author.classList.add('card__author');
    author.innerHTML = bookInfo.authors[0].name;

    const article = document.createElement('article');
    article.classList.add('card__description');


    bookInfo.subjects.forEach(element => {
        let author = document.createElement("div");
        author.textContent = element;

        article.append(author);
    });

    textWrap.appendChild(title);
    textWrap.appendChild(author);
    textWrap.appendChild(article);
    div4.appendChild(textWrap);

    const buttonsWrap = document.createElement('div');
    buttonsWrap.classList.add('buttons-wrap');

    const button1 = document.createElement('button');
    button1.classList.add('card__favourite');

    const img2 = document.createElement('img');
    img2.src = 'images/star-tr-icon.svg';
    img2.alt = 'Like';

    button1.appendChild(img2);

    const button2 = document.createElement('button');
    button2.classList.add('card__read');
    button2.textContent = 'Read';

    buttonsWrap.appendChild(button1);
    buttonsWrap.appendChild(button2);
    div4.appendChild(buttonsWrap);

    div1.appendChild(div2);
    div1.appendChild(div4);
    section.appendChild(div1);

    document.querySelector(".books__cards").append(section);
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
