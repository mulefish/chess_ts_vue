const PAWN = "pawn";
const ROOK = "rook";
const KNIGHT = "knight";
const BISHOP = "bishop";
const QUEEN = "queen";
const KING = "king";
const WHITE = "white";
const BLACK = "black";


function getPossibleMoveArrays(kind, color) {
    switch (kind) {
        case ROOK:
            return [8, -8, 1, -1];
        case KNIGHT:
            return [-17, -15, -6, 10, 17, 15, 6, -10];
        case BISHOP:
            return [-9, -7, 9, 7]
        case QUEEN:
            return [-9, -7, 9, 7, 8, -8, 1, -1]
        case KING:
            return [-9, -7, 9, 7, 8, -8, 1, -1]
        case PAWN: {
            if (color === BLACK) {
                return [-8, -16]
            } else {
                return [8, 16]
            }
        }
        default:
            return []; // Return an empty array if the piece type is unrecognized
    }
}

class Cell {
    constructor(id) {
        this.id = id;
    }
    getId() {
        return this.id < 10 ? `0${this.id} ` : `${this.id} `;
    }
}

class Piece {
    constructor(color, kind, location, limit) {
        this.color = color;
        this.kind = kind;
        this.setLocation(location);
        this.limit = limit;
        this.moves = getPossibleMoveArrays(kind, color)
        // console.log( color, kind, location, limit, this.moves )
    }
    setLocation(location) {
        this.location = parseInt(location);
    }
    getDetails() {
        console.log(`My location is ${this.location} and I am a ${this.kind} color is ${this.color}`);
    }
}

function getPossibleMoves(movements, location, loop, limit, possibles) {
    if (loop >= limit) return possibles;

    movements.forEach((movement) => {
        let newLocation = location + movement;
        if (newLocation >= 0 && newLocation < 64) {
            const currentRow = Math.floor(location / 8);
            const newRow = Math.floor(newLocation / 8);

            if ((movement === 1 || movement === -1) && currentRow !== newRow) return;
            if (
                (movement === 9 || movement === -7) && Math.abs(currentRow - newRow) !== 1 ||
                (movement === 7 || movement === -9) && Math.abs(currentRow - newRow) !== 1
            ) return;

            possibles.push(newLocation);
            getPossibleMoves([movement], newLocation, loop + 1, limit, possibles);
        }
    });

    return possibles;
}

function placePiece(piece, location) {
    
    piece.setLocation(location);
    let possibles = [];
    piece.moves.forEach((move) => {
        getPossibleMoves([move], piece.location, 0, piece.limit, possibles);
    });
    return possibles;
}

module.exports = {
    PAWN,
    ROOK,
    KNIGHT,
    BISHOP,
    QUEEN,
    KING,
    WHITE,
    BLACK,
    Cell,
    Piece,
    placePiece,
    getPossibleMoveArrays
};
