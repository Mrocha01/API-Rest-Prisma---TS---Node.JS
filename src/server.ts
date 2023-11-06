import Express from "express";
import userRouter from "../src/routes/users";

const app = Express();

app.use(Express.json());

const PORT = 8000;

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
