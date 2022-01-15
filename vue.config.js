module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/hitomezashi-patterns/" : "/",
  transpileDependencies: [
    'vuetify'
  ]
}
