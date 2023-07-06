class Word {
    constructor(title, translation, example) {
        this.title = title;
        this.translation = translation;
        this.example = example
    }
}

const word1 = new Word('young', 'молодой', 'forever young');
const word2 = new Word('never', 'никогда', 'now or never');
const word3 = new Word('moon', 'луна', 'to the moon and back');
const word4 = new Word('blind', 'слепой', 'love is blind');
const word5 = new Word('alive', 'живой', 'only my dream keeps me alive');
const word6 = new Word('silly', 'глупый', 'don’t be silly');
const word7 = new Word('regrets', 'сожаления', 'live without regrets;');
const word8 = new Word('enjoy', 'наслаждайся', 'enjoy every moment');
const word9 = new Word('inspire', 'вдохновляй', 'aspire to inspire');
const word10 = new Word('journey', 'путешествие', 'life is a journey');

const arrayWords = [word1, word2, word3, word4, word5, word6, word7, word8, word9, word10];

const currentWord = document.querySelector('#current-word');
const totalWord = document.querySelector('#total-word');
const shuffleWords = document.querySelector('#shuffle-words');
const flipCard = document.querySelector('.flip-card');
const cardFront = document.querySelector('#card-front');
const cardFrontElem = document.querySelector('#card-front h1');
const cardBack = document.querySelector('#card-back');
const cardBackElem = document.querySelector('#card-back h1');
const cardBackExample = document.querySelector('#card-back span');
const btnNext = document.querySelector('#next');
const btnBack = document.querySelector('#back');
const btnExam = document.querySelector('#exam');

let currentIndex = 0;

flipCard.addEventListener("click", function() {
    flipCard.classList.toggle('active');
})

function createCard(info) {
    currentWord.textContent = currentIndex + 1;
    cardFrontElem.textContent = info.title;
    cardBackElem.textContent = info.translation;
    cardBackExample.textContent = info.example;
}

createCard(arrayWords[currentIndex]);

shuffleWords.addEventListener('click', function() {
    arrayWords.sort(() => Math.random() - 0.5);
    prepareCard(arrayWords[currentIndex]);

})

btnNext.addEventListener('click', function() {
    currentIndex++;
    prepareCard(arrayWords[currentIndex]);
})

btnBack.addEventListener('click', function() {
    currentIndex--;
    prepareCard(arrayWords[currentIndex]);
})

totalWord.textContent = arrayWords.length;

const studyCards = document.querySelector('.study-cards');
const examCards = document.querySelector('#exam-cards');

// Полина, я застопорилась на кнопках не могу понять почему они не работают должным образом
// И дальше, что касается режима тестирования - пазл не складывается от слова совсем. Т.е я понимаю, 
// что нужно: создать и вставить тестовые карточки, перемешать их, дальше при выборе карточек их нужно сравнить и вот тут сново беда.