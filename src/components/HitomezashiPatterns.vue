<template>
  <canvas id="canvas"></canvas>
</template>

<script>
export default {
  name: "HitomezashiPatterns",
  mounted() {
    this.setUpCanvas()
  },
  props: {
    triggerDrawPattern: {
      type: Number,
      required: true
    },
    lineWidth: {
      type: Number,
      required: true,
      default: 1
    },
    lineColor: {
      type: String,
      required: true
    },
    patternLength: {
      type: Number,
      required: true
    },
    verticalNums: {
      type: Array,
      required: true
    },
    horizontalNums: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      height: 800,
      width: 800,
      vowels: "aeoui",
      canvas: null,
      ctx: null,
    }
  },
  watch: {
    numbersProvided: function () {
      this.clearCanvasForReDraw()
      this.drawPattern()
    },
    lineWidth: function () {
      this.ctx.lineWidth = this.lineWidth;
    },
    lineColor: function () {
      this.ctx.strokeStyle = this.lineColor;
    }
  },
  computed: {
    numbersProvided() {
      const {verticalNums, horizontalNums} = this;

      return {
        verticalNums,
        horizontalNums
      }
    }
  },
  methods: {
    clearCanvasForReDraw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    setUpCanvas() {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.ctx.lineWidth = this.lineWidth;

      this.canvas.height = this.height;
      this.canvas.width = this.width;
      this.ctx.strokeStyle = this.lineColor;
    },
    drawLine(startX, startY, endX, endY) {
      this.ctx.beginPath();
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();
    },
    drawHorizontalStitches(horIdx, vertIdx, len) {
      let x = (2 * vertIdx) + this.horizontalNums[horIdx];
      let y = horIdx * len;

      this.drawLine(x * len, y, (x + 1) * len, y);
    },
    drawVerticalStitches(horIdx, vertIdx, len) {
      let x = horIdx * len;
      let y = (2 * vertIdx) + this.verticalNums[horIdx];

      this.drawLine(x, y * len, x, (y + 1) * len);
    },
    drawPattern() {
      for (let x = 0; x < this.horizontalNums.length; x++) {
        for (let y = 0; y < this.verticalNums.length / 2; y++) {
          this.drawHorizontalStitches(x, y, this.patternLength)
          this.drawVerticalStitches(x, y, this.patternLength)
        }
      }
    }
  },
}
</script>

<style scoped>
canvas {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>