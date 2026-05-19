# 質數矩陣 PWA — GitHub Pages 部署指南

## 📁 檔案結構

```
primematrix/          ← 你的專案資料夾
├── index.html        ← 主程式（完整 PWA）
├── sw.js             ← Service Worker（快取 + 離線）
└── manifest.json     ← PWA 安裝設定
```

---

## 🚀 部署步驟（GitHub Pages）

### 第一步：建立 GitHub Repository

1. 登入 [github.com](https://github.com)
2. 點右上角 **＋ → New repository**
3. 填入設定：
   - **Repository name**：`primematrix`（或任何名稱）
   - **Visibility**：✅ Public（免費帳號只有 Public 才能用 Pages）
   - 其他保持預設
4. 按 **Create repository**

---

### 第二步：上傳檔案

**方法 A：網頁直接上傳（最簡單）**

1. 在新建的 repository 頁面，點 **uploading an existing file**
2. 把三個檔案（`index.html`、`sw.js`、`manifest.json`）拖進去
3. 拉到底部，點 **Commit changes**

**方法 B：用 Git 指令（適合之後更新）**

```bash
# 在放檔案的資料夾裡執行
git init
git add .
git commit -m "init: prime matrix pwa"
git branch -M main
git remote add origin https://github.com/你的帳號/primematrix.git
git push -u origin main
```

---

### 第三步：開啟 GitHub Pages

1. 進入你的 repository → 上方點 **Settings**
2. 左側選單找 **Pages**
3. 在 **Branch** 下選 `main`，資料夾選 `/ (root)`
4. 按 **Save**

等約 30 秒～1 分鐘，頁面會出現：

```
Your site is live at https://你的帳號.github.io/primematrix/
```

---

### 第四步：確認 manifest.json 路徑

打開後，按 F12 → Application → Manifest，確認沒有錯誤。

若 `start_url` 或 `scope` 路徑不對，把 `manifest.json` 改成：

```json
{
  "start_url": "/primematrix/index.html",
  "scope": "/primematrix/"
}
```

---

## 🔄 日後更新程式

每次更新只需：

1. **修改檔案**（記得同時改 `sw.js` 和 `index.html` 裡的 `VERSION`）
2. GitHub 網頁上傳新版 / 或 `git push`
3. 使用者開啟 App 時會自動看到「新版本可用」提示

更新版本號：
```js
// sw.js 第 1 行
const VERSION = '2026.05.14-v1.1';   // ← 改這裡

// index.html 裡的 CONSTANTS 也同步改
const VERSION = '2026.05.14-v1.1';
```

---

## 🌐 讓其他人安裝 PWA

分享網址後：

| 裝置 | 方式 |
|------|------|
| **Android Chrome** | 網頁底部自動出現「安裝」橫幅，或三點選單 → 加到主畫面 |
| **iPhone Safari** | 底部分享鍵 ⬆ → 加入主畫面 |
| **電腦 Chrome/Edge** | 網址列右側出現安裝圖示 |

---

## ✅ 檢查清單

- [ ] 三個檔案都在 repository 根目錄
- [ ] GitHub Pages 已啟用（Settings → Pages）
- [ ] 用 HTTPS 網址開啟（Pages 預設就是 HTTPS）
- [ ] 開發者工具 Application → Service Workers 顯示 Activated
- [ ] Manifest 無錯誤
- [ ] 離線時仍能開啟（Service Worker 快取成功）
