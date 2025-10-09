import express = require("express");
import { initializeApp as initializeAdminApp} from "firebase-admin/app";
import { initializeApp as initializeFirebaseApp} from "firebase/app";
import { routes } from "./routes/index.js";
import { errorHandle } from "./middlewares/error-handler.middleware.js"
import { pageNotFoundHandler } from "./middlewares/page-no-found;.middleware.js";
import { auth } from "./middlewares/auth.middleware.js";

initializeAdminApp();
initializeFirebaseApp({
    apiKey: process.env.FIRE_API_KEY,
});

const app = express();

auth(app);
routes(app);
pageNotFoundHandler(app);
errorHandle(app);

app.listen(3000, () =>  {
    console.log("Servidor ativo na porta 3000");
});
