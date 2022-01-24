const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const todoRouter = require("./routes/todosRouter");

app.use(express.static('./server/public/'));
app.use(express.urlencoded({extended: true}));

app.use('/todos', todoRouter);

app.listen(PORT, () => {
    console.log("Server up on port", PORT);
})