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
    }
  },
  data() {
    return {
      height: 800,
      width: 800,
      patternLength: 30,
      painting: false,
      canvas: null,
      ctx: null,
      horizontalLength: 30,
      verticalLength: 30,
      horizontalNums: [],
      verticalNums: [],
      strokeStyle: "black",
    }
  },
  watch: {
    triggerDrawPattern: function() {
      this.clearCanvasForReDraw()
      this.generateNumbers(this.verticalLength, this.verticalNums)
      this.generateNumbers(this.horizontalLength, this.horizontalNums)
      this.drawPattern()
    },
    lineWidth: function() {
      console.log(this.lineWidth)
      this.ctx.lineWidth = this.lineWidth;
    }
  },
  methods: {
    clearCanvasForReDraw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.verticalNums = []
      this.horizontalNums = []
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    generateNumbers(range, saveNums) {
      for (let i = 0; i < range; i++) {
        saveNums.push(this.getRandomInt(2))
      }
    },
    setUpCanvas() {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.ctx.lineWidth = this.lineWidth;

      this.canvas.height = this.height;
      this.canvas.width = this.width;
      this.ctx.strokeStyle = this.strokeStyle;
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
      for (let i = 0; i < this.horizontalNums.length; i++) {
        for (let j = 0; j < this.verticalNums.length / 2; j++) {
          this.drawHorizontalStitches(i, j, this.patternLength)
          this.drawVerticalStitches(i, j, this.patternLength)
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