const celebrationElement = document.getElementById('celebration');
let matchedCards = [];
let selectedCards = [];
const numPairs = 4; // Kart çifti sayısı

function hideCelebration() {
    celebrationElement.classList.add('hidden');
}

function showCelebration() {
    celebrationElement.classList.remove('hidden');
}

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createGameBoard() {
    const board = document.getElementById('game-board');
    const cardImg = ["i/blue.jpg", "i/pink.jpg", "i/green.jpg", "i/blue.jpg", "i/pink.jpg", "i/green.jpg", "i/blue.jpg", "i/pink.jpg"];
    const shuffledCards = shuffle(cardImg.slice(0, numPairs).concat(cardImg.slice(0, numPairs)));
    
    shuffledCards.forEach(img => {
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'card-wrapper';

        const card = document.createElement('div');
        card.className = 'card';
        cardWrapper.appendChild(card);

        const cardBack = document.createElement("div");
        cardBack.className = 'card-back';
        const backImg = document.createElement('img');
        backImg.src = img;
        cardBack.appendChild(backImg);

        const cardFront = document.createElement("div");
        cardFront.className = 'card-front';
        const frontImg = document.createElement("img");
        frontImg.src = 'i/100x100-placeholder.png';
        cardFront.appendChild(frontImg);

        card.appendChild(cardBack);
        card.appendChild(cardFront);
        board.appendChild(cardWrapper);
    });
}

function checkIfMatched(cards) {
    const cardValue = cards[0].querySelector('.card-back img').src;
    return cards.every(card => card.querySelector('.card-back img').src === cardValue);
}

createGameBoard();

const cardWrappersUpdated = document.querySelectorAll('.card-wrapper');

cardWrappersUpdated.forEach(cardWrapper => {
    cardWrapper.addEventListener('click', () => {
        const card = cardWrapper.querySelector('.card');
        card.classList.add('selected');
        selectedCards.push(cardWrapper);

        if (selectedCards.length === 2) {
            if (checkIfMatched(selectedCards)) {
                matchedCards = matchedCards.concat(selectedCards);
                selectedCards = [];

                if (matchedCards.length === numPairs * 2) {
                    showCelebration();
                    setTimeout(hideCelebration, 5000);
                }
            } else {
                setTimeout(() => {
                    selectedCards.forEach(card => card.querySelector('.card').classList.remove('selected'));
                    selectedCards = [];
                }, 2000);
                console.log("10paun");
            }
        }
    });
});
