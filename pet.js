"use strict";

const express = require("express");
const app = express();
const PORT = 80;

let pets = require("./petData");

// EJSを使うための設定
app.set("view engine", "ejs");

app.use(express.json());
// 画像や音楽、静的ファイルを読み込めるようにする設定
app.use(express.static(__dirname));

// ペット一覧データ（API）
app.get("/api/pets", (req, res) => {
  res.json(pets);
});

// ペット詳細データ（API）
app.get("/api/pets/:id", (req, res) => {
  const pet = pets.find(p => p.id === Number(req.params.id));
  res.json(pet);
});

// 好きなポイント追加（POST）
app.post("/api/pets/:id/likes", (req, res) => {
  const pet = pets.find(p => p.id === Number(req.params.id));
  pet.likes.push(req.body.text);
  res.json(pet);
});

// 好きなポイント削除（DELETE）
app.delete("/api/pets/:id/likes/:index", (req, res) => {
  const pet = pets.find(p => p.id === Number(req.params.id));
  pet.likes.splice(Number(req.params.index), 1);
  res.json(pet);
});


/* ========================================================
   ここから：EJS（画面表示）用のルーティング設定
   これでキレイなURL（/pet/1 などの形）でアクセスできるようになります
======================================================== */

// ① ペット詳細画面 (例: http://IPアドレス:8081/pet/1)
app.get("/pet/:id", (req, res) => {
  const pet = pets.find(p => p.id === Number(req.params.id));
  if (!pet) return res.status(404).send("ペットが見つかりません");
  // views/detail.ejs を表示、同時にpetデータを渡す
  res.render("detail", { pet: pet });
});

// ② 行方不明画面 (例: http://IPアドレス:8081/missing/1)
app.get("/missing/:id", (req, res) => {
  const pet = pets.find(p => p.id === Number(req.params.id));
  if (!pet) return res.status(404).send("ペットが見つかりません");
  // views/missing.ejs を表示
  res.render("missing", { pet: pet });
});

// ③ 呪い画面 (例: http://IPアドレス:8081/curse/1)
app.get("/curse/:id", (req, res) => {
  const pet = pets.find(p => p.id === Number(req.params.id));
  if (!pet) return res.status(404).send("ペットが見つかりません");
  // views/curse.ejs を表示
  res.render("curse", { pet: pet });
});


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});