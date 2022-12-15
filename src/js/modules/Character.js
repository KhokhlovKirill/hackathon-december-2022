/**
 * @author Khokhlov Kirill
 */
export class Character {
    /**
     * @param x Координата X стартовой позиции
     * @param y Координата Y стартовой позиции
     * @param direction Направление движения на старте
     */
    constructor(x = 0, y = 0, direction = 0) {
        this.position = {
            x: x,
            y: y,
            /**
             * Представлен целочисленным значеием (порядок сторон света с севера по часовой стрелке):
             * 0 - Север
             * 1 - Восток
             * 2 - Юг
             * 3 - Запад
             */
            direction: direction
        };
    }

    moveStraight() {
        switch (this.position.direction) {
            case 0:
                this.position.x++;
                break;
            case 1:
                this.position.y++;
                break;
            case 2:
                this.position.x--;
                break;
            case 3:
                this.position.y--;
                break;
        }
        return this.position;
    }

    turnRight() {
        if (this.position.direction === 3) {
            this.position.direction = 0;
        } else {
            this.position.direction++;
        }
        return this.position;
    }

    turnLeft() {
        if (this.position.direction === 0) {
            this.position.direction = 3;
        } else {
            this.position.direction--;
        }
        return this.position;
    }

    turnAround() {
        let direction = this.position.direction + 2;
        switch (direction) {
            case 4:
                direction = 0;
                break;
            case 5:
                direction = 1;
                break;
        }
        this.position.direction = direction;
        return this.position;
    }
}