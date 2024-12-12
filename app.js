// app.js
const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

// Express 앱 초기화
const app = express();

// 포트 설정
const PORT = process.env.PORT || 3000;

// 뷰 엔진 설정
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));

// Body Parser 미들웨어
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// SQLite 데이터베이스 연결
const db = new sqlite3.Database(path.join(__dirname, "db", "moremikkutu.db"), (err) => {
  if (err) {
    console.error("SQLite 연결 실패:", err.message);
  } else {
    console.log("SQLite 데이터베이스에 성공적으로 연결되었습니다.");
  }
});

// 라우트 설정
app.use("/", require("./routes/main"));
app.use("/admin", require("./routes/admin"));
app.use("/game", require("./routes/game"));

// 에러 처리
app.use((req, res, next) => {
  res.status(404).render("error", { title: "404 Not Found" });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
