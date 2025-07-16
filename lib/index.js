"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("./routes/index");
const app_1 = require("firebase-admin/app");
const error_handler_middleware_1 = require("./middlewares/error-handler.middleware");
const page_no_found__middleware_1 = require("./middlewares/page-no-found;.middleware");
(0, app_1.initializeApp)();
const app = express();
(0, index_1.routes)(app);
(0, page_no_found__middleware_1.pageNotFoundHandler)(app);
(0, error_handler_middleware_1.errorHandle)(app);
app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});
//# sourceMappingURL=index.js.map