import { createProxyMiddleware } from "http-proxy-middleware";

//TODO: determine what any type is for app parameter

module.exports = function (app: any) {
  app.use(
    ["/api", "/auth"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
