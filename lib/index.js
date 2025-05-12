"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("./routes/index");
const app_1 = require("firebase-admin/app");
(0, app_1.initializeApp)();
const app = express();
(0, index_1.routes)(app);
app.use((error, req, response, next) => {
    response.status(500).send({
        message: "Erro Interno do Servidor"
    });
});
app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});
//# sourceMappingURL=index.js.map