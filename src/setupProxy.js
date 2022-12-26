const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/search",
    createProxyMiddleware({
      target: "https://youtube.googleapis.com/youtube/v3",
      secure: false,
      changeOrigin: true,
    })
  );
};
