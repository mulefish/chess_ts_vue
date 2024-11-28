<template>
  <div>
    <table border="1">
      <tbody>
        <tr>
          <td valign="top">
            <div id="board">
              <ChessBoard @pieceClicked="handlePieceClick" />
            </div>
          </td>
          <td valign="top">
            &nbsp;
          </td>
          <td valign="top">
            <div id="activeCell">{{ activeCell }}</div>
            <div id="activePiece">{{ activePiece }}</div>
          </td>
        </tr>
      </tbody>
    </table>
    <hr />
  </div>
</template>

<script>
import ChessBoard from './components/ChessBoard.vue';

export default {
  components: {
    ChessBoard,
  },
  data() {
    return {
      activeCell: null,
      activePiece: null,
    };
  },
  methods: {
    handlePieceClick(piece) {
      this.activePiece = piece;
    },
  },
};
</script>

<style>
/* Add any global styles here */
.white-piece {
  font-size: 60px;
  color: white;
}

.black-piece {
  font-size: 60px;
  color: black;
}

.feltgreen {
  background-color: green;
  height: 80px;
  width: 80px;
}

.offwhite {
  background-color: #909090;
  height: 80px;
  width: 80px;
}

</style>
