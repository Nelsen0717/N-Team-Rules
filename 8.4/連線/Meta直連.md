# Meta 直連：Threads、IG 自己的發文小程式（進階版／工作坊）

第三條路。Buffer 是預設，瀏覽器是備用；想要不經過第三方、或 Buffer 免費三個頻道不夠的老闆，在工作坊或進階版做這條。

## 長什麼樣
- 老闆在 developers.facebook.com 開一個自己的 app，加 Threads API（threads_basic、threads_content_publish）和／或 Instagram API（instagram_business_basic、instagram_business_content_publish）。IG 要專業帳號。
- 拿到的長期 token 放在一個雲端小程式的環境變數裡（例：Cloudflare Workers；Vercel 免費版限非商業用途，商用要付費方案），包成 Grok Bot 能用的連線。**token 永遠不貼進對話**，員工看不到。
- 員工透過這個連線：讀自己的貼文和成效、查 24 小時還能發幾則、發文字貼文；要回留言得加權限。
- Threads 文字貼文 24 小時上限 250 則（呼叫「還能發幾則」查得到）。回留言、讀留言要另外的權限，做之前先確認 app 有開。

## 限制
- 要會一點開發，或請人架；學員自己做不來，所以不放線上課主線。
- 長期 token 大約 60 天要換一次，小程式要會自己更新，不然會突然發不出去。
- IG 發文一樣要公開的圖片網址。
- 讀別人的貼文、關鍵字搜尋要另外申請 App 審查。
- 每一則照〈送出前把關〉B 級：老闆說「好」才呼叫發布；發布是馬上上線、刪掉救不回。

## 費用
Meta API 本身免費；小程式的主機費看用哪家（小量通常在免費額度內，以各家為準）。
