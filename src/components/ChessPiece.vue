<!-- <template>
  <i
    :class="['fas', `fa-chess-${piece.kind}`, piece.color === 'white' ? 'white-piece' : 'black-piece']"
    @click="clickPiece"
  ></i>
</template> -->


<template>
  <i
    :class="['fas', `fa-chess-${piece.kind}`, piece.color === 'white' ? 'white-piece' : 'black-piece']"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
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
    onDragStart(event) {
      event.dataTransfer.setData('text/plain', JSON.stringify(this.piece));
      this.$emit('drag-start', this.piece);
    },
    onDragEnd() {
      this.$emit('drag-end');
    },
  },
};
</script>

<style scoped>
.white-piece {
  font-size: 60px;
  color: white;
  cursor: grab;
}

.black-piece {
  font-size: 60px;
  color: black;
  cursor: grab;
}
</style>



<!-- <script>
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
</script> -->

<!-- <style scoped>
.white-piece {
  font-size: 60px;
  color: white;
}

.black-piece {
  font-size: 60px;
  color: black;
}
</style> -->
