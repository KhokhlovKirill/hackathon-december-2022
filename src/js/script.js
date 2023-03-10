import {Character} from "./modules/Character.js";
import {Treasure} from "./modules/Treasure.js";

let character = new Character(0, 0, 0);
let treasure = new Treasure();

let coordinatesSettings = document.querySelector('#coordinatesSettings');
let xCoordinatesInput = document.querySelector('#xCoordinates');
let yCoordinatesInput = document.querySelector('#yCoordinates');
let submitTreasureButton = document.querySelector('#submitTreasureButton');
let commandsBlock = document.querySelector('#commandsBlock');
let treasureOutput = {
    x: document.querySelector('#treasureX'),
    y: document.querySelector('#treasureY')
};
let characterOutput = {
    x: document.querySelector('#characterX'),
    y: document.querySelector('#characterY'),
    direction: document.querySelector('#characterDirection')
}
let controlButtons = {
    straight: document.querySelector('#straightButton'),
    right: document.querySelector('#rightButton'),
    left: document.querySelector('#leftButton'),
    turnAround: document.querySelector('#turnAroundButton'),
    stop: document.querySelector('#stopButton')
};
let totalBlock = document.querySelector('#totalBlock');
let countMoves = document.querySelector('#countMoves');
let minimalMoveCount = document.querySelector('#minimalMoveCount');
let movesList = document.querySelector('#movesList');
let startAgainButton = document.querySelector('#startAgain');


submitTreasureButton.addEventListener('click', setTreasure);


controlButtons.straight.addEventListener('click', () => {
    character.moveStraight();
    displayCoordinates();
});

controlButtons.right.addEventListener('click', () => {
    character.turnRight();
    displayCoordinates();
});

controlButtons.left.addEventListener('click', () => {
    character.turnLeft();
    displayCoordinates();
});

controlButtons.turnAround.addEventListener('click', () => {
    character.turnAround();
    displayCoordinates();
});

controlButtons.stop.addEventListener('click', () => {
    checkTreasure();
});

startAgainButton.addEventListener('click', () => {
    document.location.reload();
});

function main() {
    displayCoordinates();
}

function setTreasure() {
    let coordinateX = xCoordinatesInput.value;
    let coordinateY = yCoordinatesInput.value;
    let isTreasureSuccessSet = treasure.setCoordinates(coordinateX, coordinateY);
    if (isTreasureSuccessSet) {
        coordinatesSettings.style.display = 'none';
        commandsBlock.style.display = 'flex';
        displayCoordinates();
        return true;
    } else return false;
}

function displayCoordinates() {
    treasureOutput.x.innerHTML = `X: ${treasure.position.x}`;
    treasureOutput.y.innerHTML = `Y: ${treasure.position.y}`;

    characterOutput.x.innerHTML = `X: ${character.position.x}`;
    characterOutput.y.innerHTML = `Y: ${character.position.y}`;
    let direction = "";
    switch (character.position.direction) {
        case 0:
            direction = "??????????";
            break;
        case 1:
            direction = "????????????";
            break;
        case 2:
            direction = "????";
            break;
        case 3:
            direction = "??????????";
            break;
    }
    characterOutput.direction.innerHTML = `??????????????????????: ${direction}`;
}

function checkTreasure() {
    let isTreasureFound = treasure.found(character.position.x, character.position.y);
    if (isTreasureFound) {
     treasureFound();
    } else {
        alert('???????? ?????????????????? ?? ???????????? ??????????.');
    }
}

function treasureFound() {
    commandsBlock.style.display = 'none';
    totalBlock.style.display = 'flex';
    let shortestWay = treasure.getShortestWay();

    countMoves.innerHTML = `???? ?????????? ????????! ??????-???? ??????????: ${character.countMoves}`;
    minimalMoveCount.innerHTML = `???????????????????? ?????????????????? ??????-???? ??????????: ${shortestWay.moveCount}`;
    for (let action of shortestWay.movesList) {
        let listItem = document.createElement('li');
        movesList.appendChild(listItem);
        listItem.classList.add('total-min-way-list-item');
        listItem.innerHTML = action;
    }
}

main();