// Credit for the algorithm goes to:
// https://stackoverflow.com/questions/2106995/how-can-i-perform-flood-fill-with-html-canvas
export const floodFill = (ctx, x, y, fillColor) => {
    // read the pixels in the canvas
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    const getPixel = (pixelData, x, y) => {
        if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
            return -1;  // impossible color
        } else {
            return pixelData.data[y * pixelData.width + x];
        }
    };

    // make a Uint32Array view on the pixels, so we can manipulate pixels
    // one 32bit value at a time instead of as 4 bytes per pixel
    const pixelData = {
        width: imageData.width,
        height: imageData.height,
        data: new Uint32Array(imageData.data.buffer),
    };

    // get the color we're filling
    const targetColor = getPixel(pixelData, x, y);

    // check we are actually filling a different color
    if (targetColor !== fillColor) {
        const spansToCheck = [];

        const addSpan = (left, right, y, direction) => {
            spansToCheck.push({left, right, y, direction});
        };

        const checkSpan = (left, right, y, direction) => {
            let inSpan = false;
            let start;
            let x;
            for (x = left; x < right; ++x) {
                const color = getPixel(pixelData, x, y);
                if (color === targetColor) {
                    if (!inSpan) {
                        inSpan = true;
                        start = x;
                    }
                } else {
                    if (inSpan) {
                        inSpan = false;
                        addSpan(start, x - 1, y, direction);
                    }
                }
            }
            if (inSpan) {
                inSpan = false;
                addSpan(start, x - 1, y, direction);
            }
        };

        addSpan(x, x, y, 0);

        while (spansToCheck.length > 0) {
            const {left, right, y, direction} = spansToCheck.pop();

            // do left until we hit something, while we do this check above and below and add
            let l = left;
            for (; ;) {
                --l;
                const color = getPixel(pixelData, l, y);
                if (color !== targetColor) {
                    break;
                }
            }
            ++l;

            let r = right;
            for (; ;) {
                ++r;
                const color = getPixel(pixelData, r, y);
                if (color !== targetColor) {
                    break;
                }
            }

            const lineOffset = y * pixelData.width;
            pixelData.data.fill(fillColor, lineOffset + l, lineOffset + r);

            if (direction <= 0) {
                checkSpan(l, r, y - 1, -1);
            } else {
                checkSpan(l, left, y - 1, -1);
                checkSpan(right, r, y - 1, -1);
            }

            if (direction >= 0) {
                checkSpan(l, r, y + 1, +1);
            } else {
                checkSpan(l, left, y + 1, +1);
                checkSpan(right, r, y + 1, +1);
            }
        }
        // put the data back
        ctx.putImageData(imageData, 0, 0);
    }
};


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
// getPixelPos(x, y) {
//   return (y * this.canvas.width + x) * 4;
// },
// matchStartColor(data, pos, startColor) {
//   return (data[pos] === startColor.r &&
//       data[pos + 1] === startColor.g &&
//       data[pos + 2] === startColor.b &&
//       data[pos + 3] === startColor.a);
// },
// colorPixel(data, pos, color) {
//   data[pos] = color.r || 0;
//   data[pos + 1] = color.g || 0;
//   data[pos + 2] = color.b || 0;
//   data[pos + 3] = Object.prototype.hasOwnProperty.call(color, "a") ? color.a : 255;
// },
// hexToRgb(hex) {
//   let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//
//   return result ? {
//     r: parseInt(result[1], 16),
//     g: parseInt(result[2], 16),
//     b: parseInt(result[3], 16)
//   } : null;
// },
// floodFill(startX, startY, fillColor) {
//   let dstImg = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
//   let dstData = dstImg.data;
//   const pixelData = {
//     width: dstImg.width,
//     height: dstImg.height,
//     data: new Uint32Array(dstImg.data.buffer),
//   };
//
//   let startPos = this.getPixelPos(startX, startY);
//   let startColor = {
//     r: dstData[startPos],
//     g: dstData[startPos + 1],
//     b: dstData[startPos + 2],
//     a: dstData[startPos + 3]
//   };
//   let todo = [[startX, startY]];
//
//   while (todo.length) {
//     let pos = todo.pop();
//     let x = pos[0];
//     let y = pos[1];
//     let currentPos = this.getPixelPos(x, y);
//
//     while ((y-- >= 0) && this.matchStartColor(dstData, currentPos, startColor)) {
//       currentPos -= this.canvas.width * 4;
//     }
//
//     currentPos += this.canvas.width * 4;
//     ++y;
//     let reachLeft = false;
//     let reachRight = false;
//
//     while ((y++ < this.canvas.height - 1) && this.matchStartColor(dstData, currentPos, startColor)) {
//
//       this.colorPixel(dstData, currentPos, fillColor);
//
//       if (x > 0) {
//         if (this.matchStartColor(dstData, currentPos - 4, startColor)) {
//           if (!reachLeft) {
//             todo.push([x - 1, y]);
//             reachLeft = true;
//           }
//         } else if (reachLeft) {
//           reachLeft = false;
//         }
//       }
//
//       if (x < this.canvas.width - 1) {
//         if (this.matchStartColor(dstData, currentPos + 4, startColor)) {
//           if (!reachRight) {
//             todo.push([x + 1, y]);
//             reachRight = true;
//           }
//         } else if (reachRight) {
//           reachRight = false;
//         }
//       }
//
//       currentPos += this.canvas.width * 4;
//     }
//   }
//
//   this.ctx.putImageData(dstImg, 0, 0);
// },