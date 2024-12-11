const express = require("express");
const path = require("path");
const db = require("./db/database");
const ssl = require("./ssl/ssl");
const { discordLogin } = require("./auth/setting/discord-auth");

const app = express();

// SSL Setup
ssl.setup(app);

// Set Pug as the view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "메인 페이지" });
});

app.get("/game", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

app.get("/admin", (req, res) => {
  const adminPassword = "test";
  if (req.query.password === adminPassword) {
    res.render("admin", { title: "어드민 페이지" });
  } else {
    res.status(403).send("비밀번호가 틀렸습니다.");
  }
});

app.post("/admin/search", async (req, res) => {
    const { user_id } = req.body;
    const user = await db.getUser(user_id); // DB에서 사용자 데이터 가져오기
  
    res.render("admin", { title: "어드민 페이지", user });
  });
  
  app.post("/admin/update", async (req, res) => {
    const { user_id, nickname, mileage, experience } = req.body;
  
    // 사용자 정보 업데이트
    await db.updateUser(user_id, { nickname, mileage, experience });
  
    res.redirect("/admin"); // 수정 후 어드민 페이지로 이동
  });
  

// Discord Login
app.get("/login", discordLogin);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
