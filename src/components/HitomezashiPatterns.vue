<template>
  <canvas id="canvas" @mousedown="handleMouseDown"></canvas>
</template>

<script>
import {floodFill} from "@/utils/floodFill";

export default {
  name: "HitomezashiPatterns",
  mounted() {
    this.setUpCanvas();
  },
  props: {
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
    },
    regionFillColor: {
      type: String,
      required: true
    },
    colorRandomSegment: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      height: 800,
      width: 800,
      canvas: null,
      ctx: null,
    };
  },
  watch: {
    numbersProvided: function () {
      this.clearCanvasForReDraw();
      this.drawPattern();
    },
    lineWidth: function () {
      this.clearCanvasForReDraw();
      this.ctx.lineWidth = this.lineWidth;
      this.drawPattern();
    },
    lineColor: function () {
      this.ctx.strokeStyle = this.lineColor;
      this.drawPattern();
    },
    colorRandomSegment: function () {
      this.applyColorToRandomSegment()
    }
  },
  computed: {
    numbersProvided() {
      const {verticalNums, horizontalNums} = this;

      return {
        verticalNums,
        horizontalNums
      };
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
          this.drawHorizontalStitches(x, y, this.patternLength);
          this.drawVerticalStitches(x, y, this.patternLength);
        }
      }
    },
    hexToRgb(hex) {
      return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
          , (m, r, g, b) => "#" + r + r + g + g + b + b)
          .substring(1).match(/.{2}/g)
          .map(x => parseInt(x, 16));
    },
    getFillColor(color) {
      let rgbColor = this.hexToRgb(color);
      let reversed = rgbColor.reverse();
      let hex = 0xff000000 | (reversed[0] << 16) | (reversed[1] << 8) | reversed[2];

      return parseInt(`0x${(hex >>> 0).toString(16)}`);
    },
    handleMouseDown(e) {
      let x = e.offsetX;
      let y = e.offsetY;
      let fillColor = this.getFillColor(this.regionFillColor);

      floodFill(this.ctx, x, y, fillColor);
    },
    randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    applyColorToRandomSegment() {
      let x = this.randomInt(0, this.canvas.width);
      let y = this.randomInt(0, this.canvas.height);
      let fillColor = this.getFillColor(this.regionFillColor);

      floodFill(this.ctx, x, y, fillColor);
    },
  }
};
</script>

<style scoped>
canvas {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>