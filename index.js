const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const port = process.env.PORT || 5000;

const prisma = new PrismaClient();

app.use(cors({ origin: process.env.DOMAIN_URL }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

require("./routes/employees")(app, prisma);
