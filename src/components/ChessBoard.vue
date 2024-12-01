<template>
  <table>
    <tbody>
      <tr v-for="row in rows" :key="row">
        <td
          v-for="col in cols"
          :key="col"
          :class="getCellCss(row, col)"
          :id="getCellId(row, col)"
          @dragover.prevent="onDragOver"
          @drop="onDrop(row, col)"
        >
          <ChessPiece
            v-if="getPieceAt(row, col)"
            :piece="getPieceAt(row, col)"
            @drag-start="onDragStart"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import ChessPiece from './ChessPiece.vue';

export default {
  name: 'ChessBoard',
  components: {
    ChessPiece,
  },
  data() {
    return {
      rows: 8,
      cols: 8,
      pieces: [
        // White pieces
        { id: 1, row: 2, col: 1, color: 'white', kind: 'pawn' },
        { id: 2, row: 2, col: 2, color: 'white', kind: 'pawn' },
        { id: 3, row: 2, col: 3, color: 'white', kind: 'pawn' },
        { id: 4, row: 2, col: 4, color: 'white', kind: 'pawn' },
        { id: 5, row: 2, col: 5, color: 'white', kind: 'pawn' },
        { id: 6, row: 2, col: 6, color: 'white', kind: 'pawn' },
        { id: 7, row: 2, col: 7, color: 'white', kind: 'pawn' },
        { id: 8, row: 2, col: 8, color: 'white', kind: 'pawn' },
        { id: 9, row: 1, col: 1, color: 'white', kind: 'rook' },
        { id: 10, row: 1, col: 2, color: 'white', kind: 'knight' },
        { id: 11, row: 1, col: 3, color: 'white', kind: 'bishop' },
        { id: 12, row: 1, col: 4, color: 'white', kind: 'queen' },
        { id: 13, row: 1, col: 5, color: 'white', kind: 'king' },
        { id: 14, row: 1, col: 6, color: 'white', kind: 'bishop' },
        { id: 15, row: 1, col: 7, color: 'white', kind: 'knight' },
        { id: 16, row: 1, col: 8, color: 'white', kind: 'rook' },
        // Black pieces
        { id: 17, row: 7, col: 1, color: 'black', kind: 'pawn' },
        { id: 18, row: 7, col: 2, color: 'black', kind: 'pawn' },
        { id: 19, row: 7, col: 3, color: 'black', kind: 'pawn' },
        { id: 20, row: 7, col: 4, color: 'black', kind: 'pawn' },
        { id: 21, row: 7, col: 5, color: 'black', kind: 'pawn' },
        { id: 22, row: 7, col: 6, color: 'black', kind: 'pawn' },
        { id: 23, row: 7, col: 7, color: 'black', kind: 'pawn' },
        { id: 24, row: 7, col: 8, color: 'black', kind: 'pawn' },
        { id: 25, row: 8, col: 1, color: 'black', kind: 'rook' },
        { id: 26, row: 8, col: 2, color: 'black', kind: 'knight' },
        { id: 27, row: 8, col: 3, color: 'black', kind: 'bishop' },
        { id: 28, row: 8, col: 4, color: 'black', kind: 'queen' },
        { id: 29, row: 8, col: 5, color: 'black', kind: 'king' },
        { id: 30, row: 8, col: 6, color: 'black', kind: 'bishop' },
        { id: 31, row: 8, col: 7, color: 'black', kind: 'knight' },
        { id: 32, row: 8, col: 8, color: 'black', kind: 'rook' },
      ],
      draggingPiece: null,
    };
  },
  methods: {
    getCellId(row, col) {
      return `${row}|${col}`;
    },
    getCellCss(row, col) {
      const isEven = (row + col) % 2 === 0;
      return isEven ? 'feltgreen' : 'offwhite';
    },
    getPieceAt(row, col) {
      return this.pieces.find((piece) => piece.row === row && piece.col === col);
    },
    onDragStart(piece) {
      this.draggingPiece = piece;
    },
    onDragOver(event) {
      event.preventDefault(); // Allow the drop
    },
    onDrop(row, col) {
      return () => {
        if (this.draggingPiece) {
          // Update the dragging piece's position
          this.draggingPiece.row = row;
          this.draggingPiece.col = col;
          this.draggingPiece = null; // Reset the dragging state
        }
      };
    },
  },
};
</script>

<style scoped>
.feltgreen {
  background-color: green;
  height: 80px;
  width: 80px;
  text-align: center;
}

.offwhite {
  background-color: #909090;
  height: 80px;
  width: 80px;
  text-align: center;
}

td {
  position: relative;
}
</style>
