<template>
  <i
    :class="['fas', `fa-chess-${piece.kind}`, piece.color === 'white' ? 'white-piece' : 'black-piece']"
    @click="clickPiece"
  ></i>
</template>

<script>
export default {
  name: 'ChessPiece',
  props: {
    piece: {
      type: Object,
      required: true,
    },
  },
  methods: {
    clickPiece() {
      this.$emit('click', this.piece);
    },
  },
};
</script>

<style scoped>
.white-piece {
  font-size: 60px;
  color: white;
}

.black-piece {
  font-size: 60px;
  color: black;
}
</style>
