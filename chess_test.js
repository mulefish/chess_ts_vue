const {
    PAWN, ROOK, KNIGHT, BISHOP, QUEEN, KING, BLACK,WHITE, 
    Cell, Piece, placePiece, setup, getBoard, getPieces
} = require('./chess.js')

function testRook() {
    const testRook = new Piece("r1", BLACK, ROOK, 0, 8)
    const actual = placePiece(testRook, 20)
    const expected = [28, 36, 44, 52, 60, 12, 4, 21, 22, 23, 19, 18, 17, 16
    ]

    expected.sort((a, b) => b - a)
    actual.sort((a, b) => b - a)
    const allTrue = JSON.stringify(actual) == JSON.stringify(expected)
    const verdict = allTrue ? "PASS" : "FAIL"
    console.log(verdict + " testRook")
    if (allTrue == false) {
        console.log("NO!")
        console.log(actual)
        console.log(expected)
    }
}


function testBishop() {
    const testBishop = new Piece("bi1", BLACK, BISHOP, 0, 8)
    const actual = placePiece(testBishop, 20)
    const expected = [2, 11, 29, 38, 47, 6, 13, 27, 34, 41, 48]
    expected.sort((a, b) => b - a)
    actual.sort((a, b) => b - a)
    const allTrue = JSON.stringify(actual) == JSON.stringify(expected)
    const verdict = allTrue ? "PASS" : "FAIL"
    console.log(verdict + " testBishop")
    if (allTrue == false) {
        console.log("NO!")
        console.log(actual)
        console.log(expected)
    }
}


function testQueen() {
    const testQueen = new Piece("qu1", BLACK, QUEEN, 0, 8)
    const actual = placePiece(testQueen, 20)
    const expected = [2, 11, 29, 38, 47, 6, 13, 27, 34, 41, 48, 28, 36, 44, 52, 60, 12, 4, 21, 22, 23, 19, 18, 17, 16]
    expected.sort((a, b) => b - a)
    actual.sort((a, b) => b - a)
    const allTrue = JSON.stringify(actual) == JSON.stringify(expected)
    const verdict = allTrue ? "PASS" : "FAIL"
    console.log(verdict + " testQueen")
    if (allTrue == false) {
        console.log("NO!")
        console.log(actual)
        console.log(expected)
    }
}


function testKing() {
    const testKing = new Piece("king", BLACK, KING, 0, 1)
    const actual = placePiece(testKing, 63)
    const expected = [62, 54, 55]
    expected.sort((a, b) => b - a)
    actual.sort((a, b) => b - a)
    const allTrue = JSON.stringify(actual) == JSON.stringify(expected)
    const verdict = allTrue ? "PASS" : "FAIL"
    console.log(verdict + " testKing")
    if (allTrue == false) {
        console.log("NO!")
        console.log(actual)
        console.log(expected)
    }
}

function testKnight() {
    const testKnight = new Piece("kn1", BLACK, KNIGHT, 0, 1)
    const actual = placePiece(testKnight, 20)
    const expected = [37, 35, 30, 26, 14, 10, 5, 3]
    expected.sort((a, b) => b - a)
    actual.sort((a, b) => b - a)
    const allTrue = JSON.stringify(actual) == JSON.stringify(expected)
    const verdict = allTrue ? "PASS" : "FAIL"
    console.log(verdict + " testKnight")
    if (allTrue == false) {
        console.log("NO!")
        console.log(actual)
        console.log(expected)
    }
}


function testPawn() {
    const testPawn = new Piece("pawn1", BLACK, PAWN, 0, 1)
    const expected = [-8, -16]
    testPawn.moves.sort((a, b) => b - a)
    const allTrue = JSON.stringify(testPawn.moves) == JSON.stringify(expected)
    const verdict = allTrue ? "PASS" : "FAIL"
    console.log(verdict + " testPawn")
    if (allTrue == false) {
        console.log("NO!")
        console.log(actual)
        console.log(expected)
    }
}


function testGetPossibleMoveArrays() { 


    const myExpectations = {
        ro: [8, -8, 1, -1],
        kn:[-17, -15, -6, 10, 17, 15, 6, -10],
        bi: [-9, -7, 9, 7],
        qu:[-9, -7, 9, 7, 8, -8, 1, -1],
        ki:[-9, -7, 9, 7, 8, -8, 1, -1],
        whitePawn:[8, 16],
        blackPawn:[-8, -16]
    }
    const myPieces = { 
        ro: new Piece("one", BLACK, ROOK, 0, 8),
        kn: new Piece("two", BLACK, KNIGHT, 0, 1),
        bi: new Piece("three", BLACK, BISHOP, 0, 8),
        qu: new Piece("four", BLACK, QUEEN, 0, 8),
        ki: new Piece("five", BLACK, KING, 0, 1),
        whitePawn:new Piece("six", WHITE, PAWN, 0, 1),
        blackPawn:new Piece("seven", BLACK, PAWN, 0, 1)
    }
    let boolArray = []
    for ( let k in myPieces ) {
        const p = myPieces[k] 
        p.moves.sort((a, b) => b - a)
        const e = myExpectations[k]
        e.sort((a, b) => b - a)
        boolArray.push(JSON.stringify(p.moves) == JSON.stringify(e))
    }    
    const isOk = boolArray.every(value => value === true)
    const verdict = isOk ? "PASS" : "FAIL"
    console.log(verdict + " testGetPossibleMoveArrays")
    if (isOk == false) {
        console.log("NO!")
        console.log( boolArray)
    }
}
function testSetup() { 
    setup() 
    const board = getBoard() 
    const isOk = board.length == 64 
    const verdict = isOk ? "PASS" : "FAIL"
    console.log(verdict + " testSetup")


 
}


function testBoardHasPieces() {
    setup() 
    const pieces = getPieces() 
    const n = Object.keys( pieces ).length
    const isOk = n === 32 
    const verdict = isOk ? "PASS" : "FAIL"
    console.log(verdict + " testPawn")

    
}
testGetPossibleMoveArrays()
testRook()
testBishop()
testQueen()
testKing()
testKnight()
testPawn() 
testSetup() 
testBoardHasPieces()
