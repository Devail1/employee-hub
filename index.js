const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = process.env.PORT || 5000;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Allow CORS (adjust origins if needed)
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

// Implement additional API routes for CRUD operations (Create, Read, Update, Delete) on employees

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

require("./routes/employees")(app, supabase);
