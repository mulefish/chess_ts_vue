<template>
    <table>
      <tr v-for="row in rows" :key="row">
        <td
          v-for="col in cols"
          :key="col"
          :class="getCellCss(row, col)"
          :id="getCellId(row, col)"
        >
          <ChessPiece
            v-if="getPieceAt(row, col)"
            :piece="getPieceAt(row, col)"
            @click="handlePieceClick(getPieceAt(row, col))"
          />
        </td>
      </tr>
    </table>
  </template>
  
  <script>
  import ChessPiece from './ChessPiece.vue';
  
  export default {
    name: 'ChessBoard',
    data() {
      return {
        rows: 8,
        cols: 8,
        pieces: [],
      };
    },
    components: {
      ChessPiece,
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
      handlePieceClick(piece) {
        this.$emit('pieceClicked', piece);
      },
    },
  };
  </script>
  