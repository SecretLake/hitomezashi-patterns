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