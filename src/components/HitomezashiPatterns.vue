<template>
  <canvas id="canvas"></canvas>
</template>

<script>
export default {
  name: "HitomezashiPatterns",
  mounted() {
    this.setUpCanvas()
    this.generateNumbers(this.verticalLength, this.verticalNums)
    this.generateNumbers(this.horizontalLength, this.horizontalNums)
    this.drawPattern()
  },
  data() {
    return {
      height: 800,
      width: 600,
      patternLength: 30,
      painting: false,
      canvas: null,
      ctx: null,
      lineWidth: 3,
      horizontalLength: 30,
      verticalLength: 30,
      horizontalNums: [],
      verticalNums: [],
      strokeStyle: "black",
    }
  },
  methods: {
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

      this.canvas.height = window.innerHeight;
      this.canvas.width = window.innerWidth;
      this.ctx.lineWidth = this.lineWidth;
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

</style>