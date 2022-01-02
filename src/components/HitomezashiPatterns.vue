<template>
  <canvas id="canvas" @mousedown="handleMouseDown"></canvas>
</template>

<script>
export default {
  name: "HitomezashiPatterns",
  mounted() {
    this.setUpCanvas()
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
    }
  },
  data() {
    return {
      height: 800,
      width: 800,
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
      this.clearCanvasForReDraw()
      this.ctx.lineWidth = this.lineWidth;
      this.drawPattern()
    },
    lineColor: function () {
      this.ctx.strokeStyle = this.lineColor;
      this.drawPattern()
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
    },
    // getPixel(pixelData, x, y) {
    //   if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
    //     return -1;  // impossible color
    //   } else {
    //     return pixelData.data[y * pixelData.width + x];
    //   }
    // },
    // // Credit for the algorithm goes to:
    // // https://stackoverflow.com/questions/53077955/how-do-i-do-flood-fill-on-the-html-canvas-in-javascript
    // floodFill(ctx, x, y, fillColor) {
    //   // read the pixels in the canvas
    //   const imageData = this.ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    //
    //   // make a Uint32Array view on the pixels, so we can manipulate pixels
    //   // one 32bit value at a time instead of as 4 bytes per pixel
    //   const pixelData = {
    //     width: imageData.width,
    //     height: imageData.height,
    //     data: new Uint32Array(imageData.data.buffer),
    //   };
    //
    //   // get the color we're filling
    //   const targetColor = this.getPixel(pixelData, x, y);
    //
    //   // check we are actually filling a different color
    //   if (targetColor !== fillColor) {
    //
    //     const pixelsToCheck = [x, y];
    //     while (pixelsToCheck.length > 0) {
    //       const y = pixelsToCheck.pop();
    //       const x = pixelsToCheck.pop();
    //
    //       const currentColor = this.getPixel(pixelData, x, y);
    //       if (currentColor === targetColor) {
    //         pixelData.data[y * pixelData.width + x] = fillColor;
    //         pixelsToCheck.push(x + 1, y);
    //         pixelsToCheck.push(x - 1, y);
    //         pixelsToCheck.push(x, y + 1);
    //         pixelsToCheck.push(x, y - 1);
    //       }
    //     }
    //
    //     // put the data back
    //     ctx.putImageData(imageData, 0, 0);
    //   }
    // },
    getPixelPos(x, y) {
      return (y * this.canvas.width + x) * 4;
    },
    matchStartColor(data, pos, startColor) {
      return (data[pos] === startColor.r &&
          data[pos + 1] === startColor.g &&
          data[pos + 2] === startColor.b &&
          data[pos + 3] === startColor.a);
    },
    colorPixel(data, pos, color) {
      data[pos] = color.r || 0;
      data[pos + 1] = color.g || 0;
      data[pos + 2] = color.b || 0;
      data[pos + 3] = Object.prototype.hasOwnProperty.call(color, "a") ? color.a : 255;
    },
    hexToRgb(hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    },
    floodFill(startX, startY, fillColor) {
      let dstImg = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      let dstData = dstImg.data;

      let startPos = this.getPixelPos(startX, startY);
      let startColor = {
        r: dstData[startPos],
        g: dstData[startPos + 1],
        b: dstData[startPos + 2],
        a: dstData[startPos + 3]
      };
      let todo = [[startX, startY]];

      while (todo.length) {
        let pos = todo.pop();
        let x = pos[0];
        let y = pos[1];
        let currentPos = this.getPixelPos(x, y);

        while ((y-- >= 0) && this.matchStartColor(dstData, currentPos, startColor)) {
          currentPos -= this.canvas.width * 4;
        }

        currentPos += this.canvas.width * 4;
        ++y;
        let reachLeft = false;
        let reachRight = false;

        while ((y++ < this.canvas.height - 1) && this.matchStartColor(dstData, currentPos, startColor)) {

          this.colorPixel(dstData, currentPos, fillColor);

          if (x > 0) {
            if (this.matchStartColor(dstData, currentPos - 4, startColor)) {
              if (!reachLeft) {
                todo.push([x - 1, y]);
                reachLeft = true;
              }
            } else if (reachLeft) {
              reachLeft = false;
            }
          }

          if (x < this.canvas.width - 1) {
            if (this.matchStartColor(dstData, currentPos + 4, startColor)) {
              if (!reachRight) {
                todo.push([x + 1, y]);
                reachRight = true;
              }
            } else if (reachRight) {
              reachRight = false;
            }
          }

          currentPos += this.canvas.width * 4;
        }
      }

      this.ctx.putImageData(dstImg, 0, 0);
    },
    handleMouseDown(e) {
      let x = e.offsetX;
      let y = e.offsetY;

      this.floodFill(x, y, this.hexToRgb(this.regionFillColor));
      // this.floodFill(this.ctx, x, y, "FF0000FF");
    }
  }
}
</script>

<style scoped>
canvas {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>