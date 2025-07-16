import express = require("express");
import { routes } from "./routes/index";
import { initializeApp } from 'firebase-admin/app';
import { errorHandle } from "./middlewares/error-handler.middleware"
import { pageNotFoundHandler } from "./middlewares/page-no-found;.middleware";

initializeApp()

const app = express();

routes(app);
pageNotFoundHandler(app);
errorHandle(app);

app.listen(3000, () =>  {
    console.log("Servidor ativo na porta 3000");
});
