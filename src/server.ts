import Express from "express";
import userRouter from "../src/routes/users";
import postRouter from "../src/routes/posts";

const app = Express();

app.use(Express.json());

const PORT = 8000;

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
