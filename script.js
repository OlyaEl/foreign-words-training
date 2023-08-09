'use strict'

class Word {
    constructor(title, translation, example) {
        this.title = title;
        this.translation = translation;
        this.example = example
    }
}

const word1 = new Word('enjoy', 'наслаждайся', 'enjoy every moment');
const word2 = new Word('inspire', 'вдохновляй', 'aspire to inspire');
const word3 = new Word('moon', 'луна', 'to the moon and back');
const word4 = new Word('blind', 'слепой', 'love is blind');
const word5 = new Word('alive', 'живой', 'only my dream keeps me alive');
const word6 = new Word('regrets', 'сожаления', 'live without regrets;');

const arrayWords = [word1, word2, word3, word4, word5, word6];

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
    btnBack.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === arrayWords.length - 1;
}

createCard(arrayWords[currentIndex]);

shuffleWords.addEventListener('click', function() {
    arrayWords.sort(() => Math.random() - 0.5);
    createCard(arrayWords[currentIndex]);

})

btnNext.addEventListener('click', function() {
    if (currentIndex < arrayWords.length - 1) {
        currentIndex++;
        createCard(arrayWords[currentIndex]);
    }
})

btnBack.addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
        createCard(arrayWords[currentIndex]);
    }
})

totalWord.textContent = arrayWords.length;

const studyCards = document.querySelector('.study-cards');
const examCards = document.querySelector('#exam-cards');

const sliderCard = document.querySelector('.slider');

btnExam.addEventListener('click', startTest);

function addFragment() {
    const fragment = new DocumentFragment();
    const randomCards = [];

    arrayWords.forEach((card) => {
        randomCards.push(createTestCard(card.translation, card.title));
        randomCards.push(createTestCard(card.title, card.translation));
    });
    fragment.append(...randomCards.sort(() => Math.random() - 0.5));
    examCards.innerHTML = "";
    examCards.append(fragment);
}

function startTest() {
    const studyMode = document.querySelector('#study-mode');
    const examMode = document.querySelector('#exam-mode');
    const examCards = document.querySelector('#exam-cards');

    studyMode.classList.add('hidden');
    examMode.classList.remove('hidden');
    btnBack.classList.add('hidden');
    btnNext.classList.add('hidden');
    btnExam.classList.add('hidden');
    sliderCard.classList.add('hidden');

    addFragment()
}

let selectedCard;
let correctAnswers = 0;

function createTestCard(title, translation) {
    const testCard = document.createElement('div');
    testCard.classList.add('card');

    const testCardWord = document.createElement('div');
    testCardWord.classList.add('card-word');
    testCardWord.textContent = title;

    const testCardTranslation = document.createElement('div');
    testCardTranslation.classList.add('card-translation');
    testCardTranslation.textContent = translation;

    testCard.append(testCardWord);
    testCard.append(testCardTranslation);
    testCardTranslation.classList.add('hidden');

    testCard.addEventListener('click', () => {
        if (selectedCard === undefined) {
            selectedCard = testCard;
            selectedCard.classList.add('correct');
        } else {
            const firstSelectedWord = selectedCard.querySelector('.card-word').textContent;
            const secondSelectedWord = testCard.querySelector('.card-word').textContent;
            const firstSelectedTranslation = selectedCard.querySelector('.card-translation').textContent;
            const secondSelectedTranslation = testCard.querySelector('.card-translation').textContent;

            if (
                (firstSelectedWord === secondSelectedTranslation && firstSelectedTranslation === secondSelectedWord) ||
                (firstSelectedTranslation === secondSelectedWord && firstSelectedWord === secondSelectedTranslation)
            ) {
                testCard.classList.add('correct');
                selectedCard.classList.add('fade-out');
                testCard.classList.add('fade-out');
                selectedCard = undefined;
                correctAnswers++;
                if (correctAnswers === arrayWords.length) {
                    setTimeout(() => { alert("Ты умница! Тест пройден."); }, 500);
                }

            } else {
                testCard.classList.add('wrong');

                setTimeout(() => {
                    testCard.classList.remove('wrong');
                    selectedCard.classList.remove('correct');
                    selectedCard = undefined;
                }, 500);
            }
        }
    });

    return testCard;
}