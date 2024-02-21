import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import multer from "multer";
import dot from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dot.config();

const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("src"));
const upload = multer({ dest: "uploads/" });

const POSTGRES_URL =
  "postgres://user1:y3rdTbimHp7ifQiceEAx50SaT7r4vN6P@a.oregon-postgres.render.com:5432/food_1w32";

// Create a new PostgreSQL client instance
const db = new pg.Client({
  connectionString: POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // Required for connecting to Render.com PostgreSQL instances
  },
});
db.connect()
  .then(() => console.log("connected to database"))
  .catch((err) => console.error(err));

let loginId;
let logFalseOrTrue;
let isPassSame = true;
let isItLogin = false;
let loggedIn = false;

let exitClicked = false;

let tempCategory;
let userName;

app.post("/api/set-user-info", async (req, res) => {
  isPassSame = true;
  const { username, email, password, rePassword } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING *",
      [username, email, password]
    );

    const lastUserID = result.rows[0].id;
    try {
      await db.query("INSERT INTO categories (type,user_id) VALUES ($1,$2)", [
        "All",
        parseInt(lastUserID),
      ]);
    } catch (err) {
      console.log(err);
    }

    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.post("/api/get-user-info", async (req, res) => {
  isItLogin = true;
  const { email, password } = req.body;
  isPassSame = true;
  try {
    const result = await db.query("SELECT * FROM users");
    const data = result.rows;

    const findItemEmail = data.find((item) => item.email === email);
    const findItemPassword = data.find((item) => item.password === password);

    if (
      typeof findItemEmail === "undefined" ||
      typeof findItemPassword === "undefined"
    ) {
      res.redirect("/login");
      logFalseOrTrue = true;
    } else {
      loginId = findItemEmail.id;

      userName = findItemEmail.username;
      exitClicked = true;
      res.redirect("/https://post-app-roan.vercel.app");

      logFalseOrTrue = false;
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/get-username", (req, res) => {
  res.json(userName);
});

app.post("/register", (req, res) => {
  res.redirect("/register");
});

app.get("/api/get-isItLogin-value", (req, res) => {
  res.json(isItLogin);
});

app.get("/api/get-login-id", (req, res) => {
  res.json(loginId);
});

app.get("/api/false-or-true", (req, res) => {
  res.json(logFalseOrTrue);
});

app.get("/api/get-categories", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM categories WHERE user_id=($1) ORDER BY type ASC",
      [loginId]
    );
    const data = result.rows;
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/hey", (req, res) => {
  res.json("ergweg");
});

app.get("/api/get-single-category", async (req, res) => {
  res.json(tempCategory);
});

app.post("/api/add-product", upload.single("file"), async (req, res) => {
  const { name, url, price, type } = req.body;

  try {
    await db.query(
      "INSERT INTO products(name,url,price,type,user_id) VALUES ($1,$2,$3,$4,$5)",
      [name, url, price, type, loginId]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/add-to-cart", async (req, res) => {
  const { id, name, url, price, type } = req.body;

  try {
    const result = await db.query("SELECT * FROM carts");
    const data = result.rows;
    const findItem = data.find((item) => item.name === name);
    if (typeof findItem === "undefined") {
      let count = 1;
      try {
        await db.query(
          "INSERT INTO carts(name,url,price,type,count,user_id) VALUES ($1,$2,$3,$4,$5,$6)",
          [name, url, price, type, count, loginId]
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await db.query("UPDATE carts SET count=($1)  WHERE id=($2)", [
          findItem.count + 1,
          findItem.id,
        ]);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
  res.redirect("/");
});

app.get("/api/get-all-carts", async (req, res) => {
  try {
    const result2 = await db.query(
      "SELECT * FROM carts WHERE user_id=($1) ORDER BY id DESC",
      [loginId]
    );
    const data2 = result2.rows;
    res.json(data2);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/clear-carts", async (req, res) => {
  try {
    await db.query("DELETE FROM carts WHERE user_id=($1)", [loginId]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/edit-little-cart", async (req, res) => {
  let count = parseInt(req.body.count);
  const button = req.body.button;
  const id = req.body.id;
  const page = req.body.page;
  if (button === "increase") {
    count += 1;

    try {
      await db.query("UPDATE carts SET count=($1) WHERE id=($2)", [count, id]);
    } catch (err) {
      console.log(err);
    }
  } else if (button === "decrease") {
    if (count === 1) {
      await db.query("DELETE FROM carts WHERE id=($1)", [id]);
    } else {
      count -= 1;
      try {
        await db.query("UPDATE carts SET count=($1) WHERE id=($2)", [
          count,
          id,
        ]);
      } catch (err) {
        console.log(err);
      }
    }
  }
  res.redirect(`${page}`);
});

app.post("/api/edit-product", async (req, res) => {
  const { id, name, url, price, type, category } = req.body;

  try {
    await db.query(
      "UPDATE products SET name=($1),url=($2),price=($3),type=($4) WHERE id=($5)",
      [name, url, price, type, id]
    );

    res.redirect(`/products/${category}`);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/get-products", async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM products WHERE user_id=($1)", [
      loginId,
    ]);
    const data3 = r.rows;

    res.json(data3);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/delete-product", async (req, res) => {
  const id = req.body.id;
  const category = req.body.category;
  tempCategory = category;
  try {
    await db.query("DELETE FROM products WHERE id=($1)", [id]);
    res.redirect(`/products/${category}`);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/add-categorie", async (req, res) => {
  let categorie = req.body.categorie;

  try {
    await db.query("INSERT INTO categories(type,user_id) VALUES ($1,$2)", [
      categorie,
      loginId,
    ]);
  } catch (err) {
    console.log(err);
  }
  res.redirect("/");
});

app.post("/api/delete-categorie", async (req, res) => {
  const id = req.body.id;
  try {
    await db.query("DELETE FROM categories WHERE id=($1)", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/edit-category", async (req, res) => {
  const { id, changedText } = req.body;
  try {
    await db.query("UPDATE categories SET type=($1) WHERE id=($2)", [
      changedText,
      id,
    ]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/delete-cart", async (req, res) => {
  const id = req.body.id;
  try {
    await db.query("DELETE FROM carts WHERE id=($1)", [id]);
    res.redirect("/cart");
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/get-customer-info", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM customers WHERE user_id=($1)",
      [loginId]
    );
    const data = result.rows;
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/get-customer-info", async (req, res) => {
  const { name, phone, choice, date, total } = req.body;
  console.log(req.body);
  try {
    await db.query(
      "INSERT INTO customers(name,phone,payment,user_id,order_date,total) VALUES ($1,$2,$3,$4,$5,$6)",
      [name, phone, choice, loginId, date, total]
    );
  } catch (err) {
    console.log(err);
  }
  res.redirect("/taxs");
});

app.get("/api/exit-clicked", (req, res) => {
  res.json(exitClicked);
});
app.get("/api/products1", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});
app.get("/api/users1", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});
app.get("/api/categories1", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM categories");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});
app.get("/api/customers1", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM customers");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});
app.get("/api/carts1", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM carts");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
