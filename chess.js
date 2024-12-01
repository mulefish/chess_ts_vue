
const PAWN = "pawn"
const ROOK = "rook"
const KNIGHT = "knight"
const BISHOP = "bishop"
const QUEEN = "queen"
const KING = "king"
const WHITE = "white"
const BLACK = "black"

function getMovement(color, kind) {
    let updown = 1
    let leftRight = 1
    if (color === BLACK) {
        updown = -1
        leftRight = -1
    }
    let depth = 8
    if (kind === PAWN || kind === KING || kind === KNIGHT) {
        depth = 1
    }


}

class Cell {
    constructor(id) {
        this.id = id
    }
    getId() {
        if (this.id < 10) {
            return `0${this.id} `
        }
        return `${this.id} `
    }
}
class Piece {
    constructor(color, kind, location, limit, moves, attacks) {
        this.color = color // white or black  
        this.kind = kind // pawn? bishop? etc 
        // this.location = location // cell id 
        this.setLocation(location)
        this.limit = limit // recurse depth limit ( need a better term here )
        this.moves = moves // array of potential moves
        this.attacks = attacks // array of attacks is, for pawns, different from moves 
        if (this.attacks == null) {
            this.attacks = moves
        }
    }
    setLocation(location) {
        // the id of the cell 
        this.location = parseInt(location)
    }
    getDetails() {
        console.log("my location is " + this.location + " and I am a " + this.kind + " color is " + this.color)
    }
}





let board = []
for (let i = 0; i < 64; i++) {
    let c = new Cell(i)
    board.push(c)
}


let accum = ""
board.forEach((cell, i) => {
    if (i % 8 == 0) {
        accum += "\n"
    }
    accum += cell.getId()
})
console.log(accum)




let pieces = []
pieces.push(new Piece(BLACK, ROOK, 0, 8, [8, -8, 1, -1])) // 
pieces.push(new Piece(BLACK, KNIGHT, 1, 1, [-17, -15, -6, 10, 17, 15, 16, -10]))
pieces.push(new Piece(BLACK, BISHOP, 2, 8, [-9, -7, 9, 7]))
pieces.push(new Piece(BLACK, QUEEN, 3, 8, [-9, -7, 9, 7, 8, -8, 1, -1]))
pieces.push(new Piece(BLACK, KING, 4, 1, [-9, -7, 9, 7, 8, -8, 1, -1]))
pieces.push(new Piece(BLACK, BISHOP, 5, 8, [-9, -7, 9, 7]))
pieces.push(new Piece(BLACK, KNIGHT, 6, 1, [-17, -15, -6, 10, 17, 15, 16, -10]))
pieces.push(new Piece(BLACK, ROOK, 7, 8, [8, -8, 1, -1]))
pieces.push(new Piece(BLACK, PAWN, 8, 1, [8, 16]))
pieces.push(new Piece(BLACK, PAWN, 9, 1, [8, 16]))
pieces.push(new Piece(BLACK, PAWN, 10, 1, [8, 16]))
pieces.push(new Piece(BLACK, PAWN, 11, 1, [8, 16]))
pieces.push(new Piece(BLACK, PAWN, 12, 1, [8, 16]))
pieces.push(new Piece(BLACK, PAWN, 13, 1, [8, 16]))
pieces.push(new Piece(BLACK, PAWN, 14, 1, [8, 16]))
pieces.push(new Piece(BLACK, PAWN, 15, 1, [8, 16]))


function getPossibleMoves(movements, location, loop, limit, possibles) {
    if (loop >= limit) {
        return possibles; // Stop recursion if the depth limit is reached
    }

    movements.forEach((movement) => {
        let newLocation = location + movement;

        // Check board boundaries
        if (newLocation >= 0 && newLocation < 64) {
            const currentRow = Math.floor(location / 8);
            const newRow = Math.floor(newLocation / 8);

            // Handle horizontal moves: Ensure moves stay in the same row
            if (movement === 1 || movement === -1) {
                if (currentRow !== newRow) {
                    return; // Skip if the move crosses to a different row
                }
            }

            // Handle diagonal moves: Ensure proper row-to-row continuity
            if (
                (movement === 9 || movement === -7) && Math.abs(currentRow - newRow) !== 1 ||
                (movement === 7 || movement === -9) && Math.abs(currentRow - newRow) !== 1
            ) {
                return; // Skip if the move crosses to an invalid diagonal
            }

            // Add the valid move
            possibles.push(newLocation);

            // Recurse for multi-step moves (e.g., rooks, bishops, queens)
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

    return possibles; // Return possible moves
}

function testRook() {
    const testRook = new Piece(BLACK, ROOK, 0, 8, [8, -8, 1, -1]);
    const actual = placePiece(testRook, 20);
    const expected = [28, 36, 44, 52, 60, 12, 4, 21, 22, 23, 19, 18, 17, 16
    ]

    expected.sort((a, b) => b - a);
    actual.sort((a, b) => b - a);
    const allTrue = JSON.stringify(actual) == JSON.stringify(expected)
    const verdict = allTrue ? "PASS" : "FAIL";
    console.log(verdict + " testRook")
    if (allTrue == false) {
        console.log("NO!")
        console.log(actual)
        console.log(expected)
    }
}


function testBishop() {
    const testRook = new Piece(BLACK, BISHOP, 0, 8, [-9, -7, 9, 7]);
    const actual = placePiece(testRook, 20);
    const expected = [2, 11, 29, 38, 47, 6, 13, 27, 34, 41, 48]
    expected.sort((a, b) => b - a);
    actual.sort((a, b) => b - a);
    const allTrue = JSON.stringify(actual) == JSON.stringify(expected)
    const verdict = allTrue ? "PASS" : "FAIL";
    console.log(verdict + " testBishop");
    if (allTrue == false) {
        console.log("NO!")
        console.log(actual)
        console.log(expected)
    }
}


function testQueen() {
    const testRook = new Piece(BLACK, QUEEN, 0, 8, [-9, -7, 9, 7, 8, -8, 1, -1]);
    const actual = placePiece(testRook, 20);
    const expected = [2, 11, 29, 38, 47, 6, 13, 27, 34, 41, 48, 28, 36, 44, 52, 60, 12, 4, 21, 22, 23, 19, 18, 17, 16]
    expected.sort((a, b) => b - a);
    actual.sort((a, b) => b - a);
    const allTrue = JSON.stringify(actual) == JSON.stringify(expected)
    const verdict = allTrue ? "PASS" : "FAIL";
    console.log(verdict + " testQueen");
    if (allTrue == false) {
        console.log("NO!")
        console.log(actual)
        console.log(expected)
    }
}


function testKing() {
    const testRook = new Piece(BLACK, KING, 0, 1, [-9, -7, 9, 7, 8, -8, 1, -1]);
    const actual = placePiece(testRook, 63);
    const expected = [62, 54, 55]
    expected.sort((a, b) => b - a);
    actual.sort((a, b) => b - a);
    const allTrue = JSON.stringify(actual) == JSON.stringify(expected)
    const verdict = allTrue ? "PASS" : "FAIL";
    console.log(verdict + " testKing");
    if (allTrue == false) {
        console.log("NO!")
        console.log(actual)
        console.log(expected)
    }
}

function testKnight() {
    const testRook = new Piece(BLACK, KNIGHT, 0, 1, [-17, -15, -6, 10, 17, 6, 15, -10]);
    const actual = placePiece(testRook, 20);
    const expected = [37, 35, 30, 26, 14, 10, 5, 3]
    expected.sort((a, b) => b - a);
    actual.sort((a, b) => b - a);
    const allTrue = JSON.stringify(actual) == JSON.stringify(expected)
    const verdict = allTrue ? "PASS" : "FAIL";
    console.log(verdict + " testKnight");
    if (allTrue == false) {
        console.log("NO!")
        console.log(actual)
        console.log( expected )
    }
}

function testPawn() {
    const testRook = new Piece(BLACK, PAWN, 0, 1,[8, 16]);
    const actual = placePiece(testRook, 20);
    const expected = [28,36]
    expected.sort((a, b) => b - a);
    actual.sort((a, b) => b - a);
    const allTrue = JSON.stringify(actual) == JSON.stringify(expected)
    const verdict = allTrue ? "PASS" : "FAIL";
    console.log(verdict + " testPawn");
    if (allTrue == false) {
        console.log("NO!")
        console.log(actual)
        console.log( expected )
    }
}


testRook() 
testBishop() 
testQueen() 
testKing()
testKnight()
testPawn() 