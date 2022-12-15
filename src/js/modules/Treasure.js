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
}