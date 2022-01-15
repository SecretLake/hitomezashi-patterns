# Hitomezashi Patterns

Recently I've seen a [video by Numberphile](https://www.youtube.com/watch?v=JbfhzlMk2eY&t=262s) on how hitomezashi patterns: what they are and how to generate them.

I thought the patterns looked amazing and wrote a quick and dirty solution for generating (& coloring) them with Vue.js.

You can generate a new pattern based on a random sequence of 1/0 by simply clicking on "Draw Pattern".

To generate a pattern based on a custom sequence / text -> add them to the respective input fields.

You can either add a custom sequence of 1s and 0s, e.g. 10101010101, or a phrase, e.g. "May the force be with you".

The final app can be tested on GitHub pages: https://secretlake.github.io/hitomezashi-patterns/

Please note: this is a quick playground project, so no tests, optimizations, etc.

## Running locally

To run the app locally:
- clone the repo
- ```cd``` into the folder
- run `````npm install`````
- run ````npm run serve````
- the app will be available in your browser on ````localhost:8080````