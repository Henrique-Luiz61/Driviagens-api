import express from "express";
import "express-async-errors";
import cors from "cors";
import indexRouter from "./routes/index.routes.js";
import errorsMiddleware from "./middlewares/errors.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(indexRouter);
app.use(errorsMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
