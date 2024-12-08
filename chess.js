const PAWN = "pawn"
const ROOK = "rook"
const KNIGHT = "knight"
const BISHOP = "bishop"
const QUEEN = "queen"
const KING = "king"
const WHITE = "white"
const BLACK = "black"
let board = []
let pieces = {} 

function getPossibleMoveArrays(kind, color) {
    switch (kind) {
        case ROOK:
            return [8, -8, 1, -1]
        case KNIGHT:
            return [-17, -15, -6, 10, 17, 15, 6, -10]
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
            return [] // Return an empty array if the piece type is unrecognized
    }
}

class Cell {
    constructor(id) {
        this.id = id
        this.kind = null
        this.color = null
        this.pieceId = null 
    }
    getId() {
        return this.id < 10 ? `0${this.id} ` : `${this.id} `
    }

    setPiece(piece) {
        if ( piece.color == this.color ) {
            return false 
        } else {
            if ( this.pieceId !== null ) {
                // KILL THIS ONE!
            } else {
                this.pieceId = piece.pieceId
                this.kind = piece.kind 
                this.color = piece.color 
            }
            return true 
        }
    }
    getPiece() { 
        return this.pieceId 
    }
}

class Piece {
    constructor(id, color, kind, location, limit) {
        this.id = id
        this.color = color
        this.kind = kind
        this.setLocation(location)
        this.limit = limit
        this.moves = getPossibleMoveArrays(kind, color)
        // console.log( color, kind, location, limit, this.moves )
    }
    setLocation(location) {
        this.location = parseInt(location)
    }
    getDetails() {
        console.log(`My location is ${this.location} and I am a ${this.kind} color is ${this.color}`)
    }
}

function getPossibleMoves(movements, location, loop, limit, possibles) {
    if (loop >= limit) return possibles

    movements.forEach((movement) => {
        let newLocation = location + movement
        if (newLocation >= 0 && newLocation < 64) {
            const currentRow = Math.floor(location / 8)
            const newRow = Math.floor(newLocation / 8)

            if ((movement === 1 || movement === -1) && currentRow !== newRow) return
            if (
                (movement === 9 || movement === -7) && Math.abs(currentRow - newRow) !== 1 ||
                (movement === 7 || movement === -9) && Math.abs(currentRow - newRow) !== 1
            ) return

            possibles.push(newLocation)
            getPossibleMoves([movement], newLocation, loop + 1, limit, possibles)
        }
    })

    return possibles
}

function placePiece(piece, location) {

    piece.setLocation(location)
    let possibles = []
    piece.moves.forEach((move) => {
        getPossibleMoves([move], piece.location, 0, piece.limit, possibles)
    })
    return possibles
}

function setup() { 
    for (let i = 0; i < 64; i++) {
        let c = new Cell(i)
        board.push(c)
    }
    pieces['rb1'] =  new Piece("rb1", BLACK, ROOK, 0, 8)
    pieces['nb1'] =  new Piece("nb1", BLACK, KNIGHT, 1, 1)
    pieces['bb1'] =  new Piece("bb1", BLACK, BISHOP, 2, 8)
    pieces['bq'] =  new Piece("bq", BLACK, QUEEN, 3, 8)
    pieces['bk'] =  new Piece("bq", BLACK, KING, 4, 8)
    pieces['bb2'] =  new Piece("bb2", BLACK, BISHOP, 5, 8)
    pieces['nb2'] =  new Piece("nb2", BLACK, KNIGHT, 6, 1)
    pieces['rb2'] =  new Piece("rb2", BLACK, ROOK, 7, 8)
    pieces['pb1'] =  new Piece("pb1", BLACK, ROOK, 8, 8)
    pieces['pb2'] =  new Piece("pb2", BLACK, ROOK, 9, 8)
    pieces['pb3'] =  new Piece("pb3", BLACK, ROOK, 10, 8)
    pieces['pb4'] =  new Piece("pb4", BLACK, ROOK, 11, 8)
    pieces['pb5'] =  new Piece("pb5", BLACK, ROOK, 12, 8)
    pieces['pb6'] =  new Piece("pb6", BLACK, ROOK, 13, 8)
    pieces['pb7'] =  new Piece("pb7", BLACK, ROOK, 14, 8)
    pieces['pb8'] =  new Piece("pb8", BLACK, ROOK, 15, 8)
    //
    pieces['rw1'] =  new Piece("rw1", WHITE, ROOK, 56, 8)
    pieces['nw1'] =  new Piece("nw1", WHITE, KNIGHT, 57, 1)
    pieces['bw1'] =  new Piece("bw1", WHITE, BISHOP, 58, 8)
    pieces['wq'] =  new Piece("wq", WHITE, QUEEN, 59, 8)
    pieces['wk'] =  new Piece("wq", WHITE, KING, 60, 8)
    pieces['bw2'] =  new Piece("bw2", WHITE, BISHOP, 61, 8)
    pieces['nw2'] =  new Piece("nw2", WHITE, KNIGHT, 62, 1)
    pieces['rw2'] =  new Piece("rw2", WHITE, ROOK, 63, 8)
    pieces['pw1'] =  new Piece("pw1", WHITE, ROOK, 48, 8)
    pieces['pw2'] =  new Piece("pw2", WHITE, ROOK, 49, 8)
    pieces['pw3'] =  new Piece("pw3", WHITE, ROOK, 50, 8)
    pieces['pw4'] =  new Piece("pw4", WHITE, ROOK, 51, 8)
    pieces['pw5'] =  new Piece("pw5", WHITE, ROOK, 52, 8)
    pieces['pw6'] =  new Piece("pw6", WHITE, ROOK, 53, 8)
    pieces['pw7'] =  new Piece("pw7", WHITE, ROOK, 54, 8)
    pieces['pw8'] =  new Piece("pw8", WHITE, ROOK, 55, 8)


}

function getBoard() { 
    return board 
}
function getPieces() {
    return pieces
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
    getPossibleMoveArrays,
    setup, 
    getBoard,
    pieces,
    getPieces
}
