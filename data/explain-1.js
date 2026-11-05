// Module 1-5 詳解
E(1, [
  ["定義", "OSI 把網路通信分成七層，每層只負責一件事，並為上一層提供服務。"],
  ["記憶法", "由下而上：Please Do Not Throw Sausage Pizza Away\n= Physical, Data Link, Network, Transport, Session, Presentation, Application"],
  ["對應表", "L7-L5  Application / Presentation / Session  → Data     → HTTP, DNS\nL4     Transport  → Segment  → TCP, UDP, Port\nL3     Network    → Packet   → IP, Router\nL2     Data Link  → Frame    → MAC, Switch\nL1     Physical   → Bits     → 線、光纖、Hub", 1],
  ["考試陷阱", "題目會用設備或地址問層數：看到 MAC / Switch 選 L2，IP / Router 選 L3，Port 號 / TCP 選 L4。"]
]);
E(2, [
  ["定義", "參考模型令各廠商有共同語言：只要每層遵守標準，Cisco Router 就能和其他品牌 Switch 互通。"],
  ["例子", "改用 Wi-Fi 取代網線，只換了 L1 / L2；上層的 IP、TCP、網頁完全不用改。這就是分層的好處。"],
  ["排錯思路", "由下而上：燈號及線路（L1）→ MAC 表及 VLAN（L2）→ IP、Gateway、路由（L3）→ Port、防火牆（L4）→ 應用。"]
]);
E(3, [
  ["定義", "TCP/IP 是互聯網實際使用的協議族。考試常見四層版（Application、Transport、Internet、Network Access），Cisco 教材亦常用五層版。"],
  ["對應", "OSI 7/6/5 → Application\nOSI 4     → Transport\nOSI 3     → Internet\nOSI 2/1   → Network Access（五層版：Data Link + Physical）", 1],
  ["考試陷阱", "TCP/IP 的「Internet 層」= OSI 的 Network 層，不是「上網」的意思。"]
]);
E(4, [
  ["定義", "Cisco IOS 用不同模式控制權限，提示符告訴你身處哪個模式。"],
  ["模式路徑", "Switch>              User EXEC\n  enable\nSwitch#              Privileged EXEC\n  configure terminal\nSwitch(config)#      Global Config\n  interface g0/1\nSwitch(config-if)#   Interface Config\n  end  → 直接回到 #", 1],
  ["考試陷阱", "在 config 模式不能直接 show，要加 do：`do show ip interface brief`。"]
]);
E(5, [
  ["定義", "running-config 是現在運行中的設定（RAM，斷電消失）；startup-config 是開機讀取的設定（NVRAM）。"],
  ["例子", "改了 hostname 後沒存檔，reload 後 hostname 會變回舊名，因為開機讀的是 startup-config。"],
  ["常用技巧", "`?` 列出可用指令；指令可縮寫，例如 `sh run`；`no` 取消設定，例如 `no shutdown`；Tab 補完。"],
  ["考試陷阱", "`copy startup-config running-config` 是合併，不是完全取代。"]
]);
E(7, [
  ["定義", "以太網是現今最常見的 L2 技術，規定 Frame 格式及如何用 MAC 傳送。"],
  ["全雙工 vs 半雙工", "全雙工：同時收發，沒有碰撞（Switch 連接的標準情況）。\n半雙工：同一時間只能一方傳送，需要 CSMA/CD 偵測碰撞（Hub 時代）。"],
  ["考試陷阱", "Duplex 不一致（一邊 full、一邊 half）會導致 late collision 及效能差，是常考排錯點。"]
]);
E(8, [
  ["定義", "MAC 地址是網卡的 48-bit 物理地址，寫成 12 個十六進制字元。"],
  ["結構", "00:1A:2B : 3C:4D:5E\n└ OUI ┘   └ 廠商分配 ┘\n（廠商）   （序號）", 1],
  ["寫法", "同一地址可寫成 00-1A-2B-3C-4D-5E、00:1A:2B:3C:4D:5E，Cisco 寫成 001a.2b3c.4d5e。"]
]);
E(9, [
  ["定義", "MAC 分三類：單播（一對一）、組播（一對一組）、廣播（一對全部）。"],
  ["判斷方法", "看第一個 byte 的最低位：\n00:1A:... → 0x00 = 0000 0000 → 最低位 0 → 單播\n01:00:5E:... → 0x01 = 0000 0001 → 最低位 1 → 組播\nFF:FF:FF:FF:FF:FF → 廣播", 1],
  ["考試陷阱", "第一個 byte 是奇數（01、03、33...）就是組播或廣播；IPv6 組播 MAC 以 33:33 開頭。"]
]);
E(10, [
  ["定義", "IP 回答「最終去哪個網路的哪部主機」；MAC 回答「這一跳交給誰」。"],
  ["例子", "PC（192.168.1.10）上網去 8.8.8.8：\n第 1 跳：目的 IP 8.8.8.8，目的 MAC = 家中 Router\n第 2 跳：目的 IP 仍是 8.8.8.8，目的 MAC = ISP Router\n→ IP 全程不變，MAC 每跳都換", 1],
  ["比喻", "IP 像收件地址，MAC 像每段路的派件員。"]
]);
E(11, [
  ["定義", "發送資料前，主機要決定四個值：來源 IP、目的 IP、來源 MAC、目的 MAC。"],
  ["決策流程", "1 用自己 IP + Mask 判斷目的 IP 是否同網段\n2 同網段 → ARP 查目的主機 MAC\n3 不同網段 → ARP 查 Gateway MAC\n4 填好四個地址，封裝 Frame 送出", 1],
  ["例子", "PC 192.168.1.10/24 → 192.168.2.20：不同網段，所以目的 MAC = Gateway 192.168.1.1 的 MAC，目的 IP 仍是 192.168.2.20。"]
]);
E(12, [
  ["定義", "ARP（Address Resolution Protocol）由已知 IP 查出 MAC。Request 用廣播，讓同一網段所有設備都收到。"],
  ["Request 內容", "Sender: 192.168.1.10 / AAAA.AAAA.AAAA\nTarget: 192.168.1.20 / 0000.0000.0000（未知）\nFrame 目的 MAC: FFFF.FFFF.FFFF", 1],
  ["考試陷阱", "廣播不過 Router，所以 ARP 只在同一廣播域（VLAN）內有效。"]
]);
E(13, [
  ["定義", "只有擁有該 IP 的設備會回 ARP Reply，而且是單播回給請求者。"],
  ["為甚麼單播", "Request 已帶有請求者的 MAC，回覆者知道要送給誰，不用再廣播。"],
  ["例子", "PC2 回覆：「192.168.1.20 是我，我的 MAC 是 BBBB.BBBB.BBBB」，只送去 PC1。"]
]);
E(14, [
  ["定義", "ARP 表項有兩種來源：動態學習（ARP 交換）及靜態設定（人手輸入）。"],
  ["動態學習的細節", "收到 ARP Request 的目標主機，也會順便記下請求者的 IP-MAC，這樣回覆時不用再問。"],
  ["比較", "ARP 表：IP ↔ MAC（主機、Router 用）\nMAC 表：MAC ↔ Port（Switch 用）\n路由表：網段 ↔ 下一跳（Router 用）", 1]
]);
E(15, [
  ["完整流程", "1 PC1 查 ARP 表 → 沒有 PC2\n2 廣播 Request（Switch 學到 PC1 MAC 在 Port 1，並泛洪）\n3 PC2 記下 PC1，單播 Reply（Switch 學到 PC2 在 Port 2）\n4 PC1 寫入 ARP 表，開始傳資料", 1],
  ["重點", "一次 ARP 交換後，主機的 ARP 表及 Switch 的 MAC 表都更新了。"]
]);
E(16, [
  ["定義", "Gratuitous ARP（免費 ARP）是主機主動宣布自己的 IP-MAC，Target IP 就是自己的 IP。"],
  ["三個用途", "1 偵測 IP 衝突：有人回覆，代表 IP 被佔用\n2 更新別人的 ARP 表：例如換了網卡\n3 冗餘切換：HSRP 新 Active 發出，令 Switch 更新虛擬 MAC 位置"],
  ["考試陷阱", "免費 ARP 不需要對方回覆，它是一則「通知」。"]
]);
E(18, [
  ["定義", "Switch 是 L2 設備，依 MAC 表轉發 Frame，取代了會造成大量碰撞的 Hub。"],
  ["比較", "Hub：1 個碰撞域、1 個廣播域（全部共享）\nSwitch：每 Port 1 個碰撞域、每 VLAN 1 個廣播域\nRouter：每接口 1 個廣播域", 1],
  ["考試陷阱", "常考數碰撞域及廣播域：數 Switch Port 得碰撞域，數 Router 接口或 VLAN 得廣播域。"]
]);
E(19, [
  ["定義", "企業園區網的三層架構：Access 接用戶、Distribution 匯聚及策略、Core 高速骨幹。"],
  ["圖解", "        [Core]  ← 快、簡單、冗餘\n        /     \\\n  [Distribution] ← ACL、路由、VLAN 間路由\n     /      \\\n [Access] [Access] ← PC、AP、IP Phone", 1],
  ["相關", "Spine-Leaf 是數據中心架構：每部 Leaf 都連接每部 Spine。Collapsed Core 是把 Core 及 Distribution 合併。"]
]);
E(20, [
  ["定義", "Switch 自動學習：Frame 進入時，記錄「來源 MAC 在哪個 Port、哪個 VLAN」。"],
  ["例子", "PC1（AAAA）在 Fa0/1 發 Frame 給 PC2：\nSwitch 寫入 → AAAA  Fa0/1  VLAN 1\n此時還不知道 PC2 在哪，所以泛洪\nPC2 回覆時 → 寫入 BBBB  Fa0/2", 1],
  ["口訣", "學來源，查目的。"]
]);
E(21, [
  ["三種行為", "Flood：目的 MAC 不在表內 / 廣播 / 組播 → 送往同 VLAN 所有其他 Port\nForward：目的 MAC 在表內 → 只送往該 Port\nFilter：目的 MAC 的 Port = 入口 Port → 丟棄", 1],
  ["例子", "Hub 接在 Fa0/1，下面有 PC1 及 PC2。PC1 傳給 PC2，Switch 查到 PC2 也在 Fa0/1，就丟棄（Filter），因為 PC2 已經從 Hub 收到。"],
  ["考試陷阱", "未知單播是泛洪，不是丟棄，也不是送 Router。"]
]);
E(22, [
  ["定義", "動態 MAC 表項有老化時間（預設 300 秒），期間沒收到該來源 MAC 的 Frame 就刪除。"],
  ["為甚麼需要", "設備可能拔走或搬去別的 Port；老化避免表內保留過期資料，也釋放記憶體空間。"],
  ["例子", "PC 關機 5 分鐘後，表項消失；再有流量傳給它，Switch 會先泛洪。"]
]);
E(23, [
  ["Frame 結構", "| Preamble 7 | SFD 1 | Dest MAC 6 | Src MAC 6 | Type 2 | Data 46-1500 | FCS 4 |\n                     └────────── 14 bytes header ──────────┘", 1],
  ["Type 欄位", "告訴接收者 Data 內是甚麼：0x0800 IPv4、0x0806 ARP、0x86DD IPv6；加了 802.1Q Tag 時是 0x8100。"],
  ["考試陷阱", "64 bytes 最小 Frame 不包括 Preamble 及 SFD；小於 64 bytes 叫 runt。"]
]);
E(25, [
  ["定義", "VLAN 把一部實體 Switch 邏輯分成多個獨立 L2 網路，每個 VLAN 是一個廣播域。"],
  ["例子", "財務部（VLAN 10）及工程部（VLAN 20）接在同一部 Switch，財務部的廣播不會傳到工程部，兩部門也不能直接互通。"],
  ["好處", "減少廣播、提升安全、按職能分組，不受實體位置限制。"]
]);
E(26, [
  ["範圍", "VLAN 1：預設 VLAN，不可刪除\n2-1001：normal，可用\n1002-1005：保留給舊技術，不可刪除\n1006-4094：extended", 1],
  ["例子", "SW(config)# vlan 10\nSW(config-vlan)# name HR\nSW(config)# no vlan 10   ← 刪除\n→ 原屬 VLAN 10 的接口會失效，直至重新分配", 1],
  ["考試陷阱", "VLAN 資料存於 Flash 的 vlan.dat，不在 running-config 內（VTP transparent 模式除外）。"]
]);
E(27, [
  ["定義", "Access Port 只屬於一個 VLAN，用於接終端；Trunk 一條線傳多個 VLAN，用 802.1Q Tag 區分。"],
  ["流程", "PC1（VLAN 10）─Access─ SW1 ══Trunk══ SW2 ─Access─ PC2（VLAN 10）\n1 PC1 發出無 Tag 的 Frame\n2 SW1 從 Trunk 送出時加 Tag：VLAN 10\n3 SW2 看到 Tag，移除後送去 VLAN 10 的 Access Port", 1],
  ["802.1Q Tag", "插在來源 MAC 之後，共 4 bytes：TPID 0x8100（2 bytes）+ PCP 3 bits + DEI 1 bit + VLAN ID 12 bits（因此最多 4094 個可用 VLAN）。"],
  ["考試陷阱", "DTP 會自動協商 Trunk：dynamic desirable + dynamic auto → Trunk；auto + auto → Access。實務上應手動設 trunk 並用 `switchport nonegotiate` 關閉 DTP。"]
]);
E(28, [
  ["定義", "Allowed VLAN 列表決定哪些 VLAN 可以經過該 Trunk。"],
  ["例子", "SW(config-if)# switchport trunk allowed vlan 10,20\n→ 只有 10, 20\nSW(config-if)# switchport trunk allowed vlan add 30\n→ 10, 20, 30\nSW(config-if)# switchport trunk allowed vlan 40\n→ 只剩 40（覆蓋了）！\nSW(config-if)# switchport trunk allowed vlan remove 20", 1],
  ["排錯", "同 VLAN 跨 Switch 不通時，`show interfaces trunk` 看該 VLAN 是否在「allowed and active」列表內。"]
]);
E(29, [
  ["定義", "Native VLAN 是 Trunk 上唯一不加 Tag 的 VLAN。Switch 收到沒有 Tag 的 Frame，就當作 Native VLAN。"],
  ["不一致的後果", "SW1 Native = 10，SW2 Native = 20\nSW1 把 VLAN 10 的流量不加 Tag 送出\nSW2 收到沒有 Tag 的 Frame → 當作 VLAN 20\n→ VLAN 10 的流量漏進 VLAN 20！", 1],
  ["安全建議", "把 Native VLAN 改為一個不使用的 VLAN（例如 999），可防 VLAN Hopping（Double Tagging 攻擊）。"]
]);
E(32, [
  ["定義", "兩部 Switch 之間接多條線想增加帶寬，但 STP 會封鎖多餘的線。EtherChannel 把它們綁成一條邏輯鏈路。"],
  ["例子", "4 條 1G 線：\n沒有 EtherChannel → STP 封鎖 3 條，只有 1G\n有 EtherChannel → 視為一條 4G 邏輯鏈路，一條斷了仍有 3G", 1],
  ["考試陷阱", "負載分擔按 Hash（例如來源/目的 MAC 或 IP），單一連線最多只用一條成員鏈路的速度。"]
]);
E(33, [
  ["定義", "靜態模式 `mode on` 強制成組，不發送任何協商封包。"],
  ["配置", "SW1(config)# interface range g0/1 - 2\nSW1(config-if-range)# channel-group 1 mode on\n→ 自動建立 interface port-channel 1\n（SW2 也要同樣設定 mode on）", 1],
  ["風險", "on 不會檢查對端設定，接錯線或對端未設定時可能形成環路，所以實務上較少用。"],
  ["成組條件", "成員接口的速度、雙工、Access VLAN 或 Trunk 設定（allowed、native）必須一致。"]
]);
E(34, [
  ["分類", "按協商方式：\n  on（不協商）\n  LACP：active / passive（IEEE 802.3ad，業界標準）\n  PAgP：desirable / auto（Cisco 私有）\n按層級：\n  L2 EtherChannel：Port-channel 作 Access 或 Trunk\n  L3 EtherChannel：Port-channel 配 IP（要先 no switchport）", 1],
  ["記憶法", "LACP 的 A 字頭 → Active；PAgP 的 P → 不是 passive！PAgP 是 desirable / auto。"]
]);
E(35, [
  ["定義", "動態模式用協議協商，會檢查兩端設定一致才成組，比 on 安全。"],
  ["配對結果表", "LACP:   active  + active   → ✅\n        active  + passive  → ✅\n        passive + passive  → ❌（無人先開口）\nPAgP:   desirable + desirable → ✅\n        desirable + auto      → ✅\n        auto      + auto      → ❌\n跨協議：LACP + PAgP → ❌，on + 任何協商模式 → ❌", 1],
  ["配置", "SW(config-if-range)# channel-group 1 mode active\nSW# show etherchannel summary\n  Po1(SU)  LACP  Gi0/1(P) Gi0/2(P)\n  S=L2  U=in use  P=bundled", 1],
  ["考試陷阱", "題目給一邊 passive，問另一邊要設甚麼：答 active（不可以是 passive 或 on）。"]
]);
E(36, [
  ["定義", "CDP / LLDP 讓設備告訴直連鄰居：我是誰、甚麼型號、哪個接口、IP 是甚麼。"],
  ["比較", "        CDP            LLDP\n標準    Cisco 私有     IEEE 802.1AB\n預設    開啟           IOS 上通常關閉\n間隔    60 秒          30 秒\nHold    180 秒         120 秒", 1],
  ["安全", "對外接口應關閉：`no cdp enable` 或 `no lldp transmit` / `no lldp receive`，避免洩露設備資訊。"]
]);
