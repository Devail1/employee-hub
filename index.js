const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();

const prisma = new PrismaClient();

app.use(cors({ origin: process.env.DOMAIN_URL }));
app.use(express.json());

require("./routes/employees")(app, prisma);

app.use(express.static("client/dist"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
