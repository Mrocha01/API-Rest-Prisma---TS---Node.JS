import Express from "express";

const app = Express();

app.use(Express.json());

const PORT = 8000;

app.get("/", (req, res) => {
  return res.send({ message: "Welcome" });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
