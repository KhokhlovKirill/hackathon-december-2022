import {Character} from "./Character.js";

/**
 * @author Khokhlov Kirill
 */
export class Treasure {
    constructor() {
        this.isDefined = false;
        this.position = {
            x: undefined,
            y: undefined
        }
    }

    /**
     * @param x {number}
     * @param y {number}
     */
    setCoordinates(x, y) {
        if (!this.isDefined) {
            this.position.x = x;
            this.position.y = y;
            this.isDefined = true;
            return this.position;
        } else {
            return false;
        }
    }

    found(x, y) {
        if (this.position.x == x && this.position.y == y) {
            this.status = 'found';
            return true;
        } else {
            return false;
        }
    }

    getShortestWay() {
        let virtualCharacter = new Character(0, 0, 0);
        let returnObject = {
            moveCount: 0,
            movesList: []
        }

        while (true) {
            let priorityCell = this.#findPriorityCellToMove(virtualCharacter.position.x, virtualCharacter.position.y, this.position.x, this.position.y);

            if (priorityCell.x > virtualCharacter.position.x) {
                returnObject.movesList.push('На восток');
            } else if (priorityCell.x < virtualCharacter.position.x) {
                returnObject.movesList.push('На запад');
            } else if (priorityCell.y > virtualCharacter.position.y) {
                returnObject.movesList.push('На север');
            } else if (priorityCell.y < virtualCharacter.position.y) {
                returnObject.movesList.push('На юг');
            } else {
                throw "Ошибка в определении направления движения и формирования списка действий кратчайшего пути";
            }

            returnObject.moveCount++;

            virtualCharacter.position.x = priorityCell.x;
            virtualCharacter.position.y = priorityCell.y;

            if (virtualCharacter.position.x == this.position.x && virtualCharacter.position.y == this.position.y) {
                return returnObject;
            }
        }
    }

    #findPriorityCellToMove(currentX, currentY, treasureX, treasureY) {
        let longWay = [];
        for (let i = 0; i < 4; i++) {
            let testX, testY;
            switch (i) {
                case 0:
                    testX = currentX;
                    testY = currentY + 1;

                    longWay[i] = Math.abs(testX - treasureX) + Math.abs(testY - treasureY);
                    break;
                case 1:
                    testX = currentX + 1;
                    testY = currentY;

                    longWay[i] = Math.abs(testX - treasureX) + Math.abs(testY - treasureY);
                    break;
                case 2:
                    testX = currentX;
                    testY = currentY - 1;

                    longWay[i] = Math.abs(testX - treasureX) + Math.abs(testY - treasureY);
                    break;
                case 3:
                    testX = currentX - 1;
                    testY = currentY;

                    longWay[i] = Math.abs(testX - treasureX) + Math.abs(testY - treasureY);
                    break;
            }
        }
        let longMinWay = Math.min(...longWay);
        let priorityDirection;
        for (let j = 0; j < longWay.length; j++) {
            if (longWay[j] === longMinWay) {
                priorityDirection = j;
            }
        }

        switch (priorityDirection) {
            case 0:
                return {x: currentX, y: currentY + 1};
            case 1:
                return {x: currentX + 1, y: currentY};
            case 2:
                return {x: currentX, y: currentY - 1};
            case 3:
                return {x: currentX - 1, y: currentY};
            default:
                throw "Выбор приоритетной ячейки завершен с ошибкой!";
        }
    }
}