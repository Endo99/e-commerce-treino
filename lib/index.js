"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app_1 = require("firebase-admin/app");
const app_2 = require("firebase/app");
const index_1 = require("./routes/index");
const error_handler_middleware_1 = require("./middlewares/error-handler.middleware");
const page_no_found__middleware_1 = require("./middlewares/page-no-found;.middleware");
const auth_middleware_1 = require("./middlewares/auth.middleware");
(0, app_1.initializeApp)();
(0, app_2.initializeApp)({
    apiKey: process.env.FIRE_API_KEY,
});
const app = express();
(0, auth_middleware_1.auth)(app);
(0, index_1.routes)(app);
(0, page_no_found__middleware_1.pageNotFoundHandler)(app);
(0, error_handler_middleware_1.errorHandle)(app);
app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});
//# sourceMappingURL=index.js.map