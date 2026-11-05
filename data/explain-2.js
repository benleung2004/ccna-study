// Module 6-7 詳解
E(38, [
  ["定義", "為了冗餘而接多條線，會在 L2 形成環路。由於 Ethernet Frame 沒有 TTL，Frame 會無限循環。"],
  ["三大問題", "1 廣播風暴：廣播不斷被複製，佔滿帶寬及 CPU\n2 MAC 表不穩定：同一 MAC 不斷在不同 Port 出現（MAC flapping）\n3 重複 Frame：主機收到同一 Frame 多次"],
  ["例子", "SW1 ═══ SW2\n  \\     /\n    SW3\nPC 發一個 ARP 廣播 → 三部 Switch 互相泛洪 → 數秒內網路癱瘓", 1]
]);
E(39, [
  ["定義", "STP（802.1D）的目標：保留實體冗餘，但邏輯上只留一條無環路徑；主路徑斷了，自動啟用備用路徑。"],
  ["做法概要", "1 選一個 Root Bridge\n2 每部非 Root Switch 選一個 Root Port\n3 每條網段選一個 Designated Port\n4 其餘接口封鎖", 1]
]);
E(40, [
  ["定義", "Root Bridge 是生成樹的中心，所有 Switch 都計算到 Root 的最佳路徑。Bridge ID 最小者勝出。"],
  ["Bridge ID 結構", "| Priority 4 bits | Extended System ID 12 bits（= VLAN） | MAC 48 bits |\n預設 Priority 32768 + VLAN 1 = 32769", 1],
  ["例子", "SW1: 32769 / 0000.1111.1111\nSW2: 32769 / 0000.2222.2222\nSW3:  4097 / 0000.3333.3333\n→ 先比 Priority：SW3 的 4097 最小 → SW3 是 Root\n若三部 Priority 相同 → 比 MAC，SW1 最小 → SW1 是 Root", 1],
  ["考試陷阱", "Priority 只能是 4096 的倍數（0、4096、8192...61440）。舊 Switch（MAC 較小）常意外成為 Root，所以應手動設定。"]
]);
E(41, [
  ["定義", "BPDU 是 Switch 之間交換 STP 資訊的訊息，Root 每 2 秒發送一次（Hello）。"],
  ["關鍵欄位", "Root Bridge ID     ← 我認為 Root 是誰\nRoot Path Cost     ← 我到 Root 的成本\nSender Bridge ID   ← 我自己是誰\nSender Port ID     ← 從我哪個 Port 發出\nTimers: Hello 2s / Max Age 20s / Forward Delay 15s", 1],
  ["比較規則", "收到 BPDU 時，由上而下逐欄比較，數值較小的 BPDU 較好（superior）。"]
]);
E(42, [
  ["Root Port（RP）", "每部非 Root Switch 選一個：到 Root 總成本最低的接口。"],
  ["Designated Port（DP）", "每條網段選一個：該網段上通往 Root 成本最低一方的接口。Root Bridge 的所有接口都是 DP。"],
  ["Cost 表", "10 Mbps → 100\n100 Mbps → 19\n1 Gbps → 4\n10 Gbps → 2", 1],
  ["完整推演", "        SW3（Root）\n     G1 /      \\ G2\n   G1  /        \\ G1\n   SW1 ─G2────G2─ SW2\n全部 1G（cost 4）；BID：SW1 < SW2\n1 SW3 是 Root → G1、G2 都是 DP\n2 SW1：經 G1 到 Root = 4；經 SW2 = 8 → G1 是 RP\n3 SW2：同理 G1 是 RP\n4 SW1–SW2 段：兩邊到 Root 都是 4 → 比 BID，SW1 小 → SW1 G2 是 DP\n5 SW2 G2 → 封鎖（Alternate）", 1],
  ["考試陷阱", "Root Cost 是「接收」BPDU 的接口累加成本：入口接口的成本才計算在內。"]
]);
E(43, [
  ["定義", "不是 RP 也不是 DP 的接口就被封鎖：802.1D 稱為 Non-designated / Blocking，RSTP 稱為 Alternate（備用 RP）或 Backup（備用 DP）。"],
  ["作用", "封鎖口不轉發用戶資料、不學 MAC，但持續接收 BPDU。主路徑失效時，它可以接手轉發。"],
  ["例子", "上題的 SW2 G2：平時封鎖；SW2 G1 斷線後，G2 成為新 RP，經 SW1 到 Root。"]
]);
E(44, [
  ["完整比較順序", "選 Root：最小 Bridge ID\n選 RP（每部 Switch 內比較自己各接口）：\n  1 最小 Root Path Cost\n  2 最小對端（上游）Sender Bridge ID\n  3 最小對端 Sender Port ID\n  4 最小本地 Port ID\n選 DP（每條網段比較兩端）：\n  1 最小 Root Path Cost\n  2 最小 Bridge ID\n  3 最小 Port ID", 1],
  ["Port ID 例子", "Port ID = Priority（預設 128）+ Port 號，例如 128.1、128.2。\nSW1 兩條線連到 SW2（Root），成本相同、對端 BID 相同 →\n比 SW2 那邊的 Port ID：接 SW2 128.1 的那條成為 RP", 1],
  ["考試陷阱", "第 3 步比的是「對端」的 Port ID，不是自己的。要影響下游的 RP 選擇，應在上游 Switch 修改 port-priority。"]
]);
E(45, [
  ["角色 vs 狀態", "角色（Role）：這個接口在拓撲中是甚麼 → Root、Designated、Alternate、Backup\n狀態（State）：這個接口現在做甚麼 → 轉發？學 MAC？", 1],
  ["802.1D 狀態", "狀態        收BPDU  發BPDU  學MAC  轉發資料\nBlocking      ✅      ❌      ❌      ❌\nListening     ✅      ✅      ❌      ❌\nLearning      ✅      ✅      ✅      ❌\nForwarding    ✅      ✅      ✅      ✅\nDisabled      ❌      ❌      ❌      ❌", 1],
  ["RSTP 狀態", "只有三個：Discarding（合併 Disabled、Blocking、Listening）、Learning、Forwarding。"]
]);
E(46, [
  ["正常啟用接口", "Blocking → Listening（15s）→ Learning（15s）→ Forwarding\n→ 約 30 秒，這是 PC 接上後要等的原因", 1],
  ["間接故障", "上游遠處故障，本機要等 Max Age（20s）收不到 BPDU 才知道：\n20 + 15 + 15 = 最多 50 秒", 1],
  ["RSTP 為甚麼快", "直接故障時，Alternate 立即轉為 RP；DP 之間用 Proposal / Agreement 握手，幾秒甚至一秒內完成。"]
]);
E(47, [
  ["定義", "Edge Port（Cisco 稱 PortFast）用於接終端，接上後立即進入 Forwarding，不用等 30 秒。"],
  ["配置", "SW(config-if)# spanning-tree portfast\nSW(config)# spanning-tree portfast default   ← 所有 Access Port", 1],
  ["為甚麼重要", "PC 開機後 DHCP 很快就發出請求；如果接口還在 Listening，DHCP 會超時，PC 拿到 169.254 地址。"],
  ["考試陷阱", "PortFast 接口收到 BPDU 會失去 PortFast 身份，但不會關閉，要配 BPDU Guard 才會關閉。"]
]);
E(48, [
  ["定義", "BPDU Guard：PortFast 接口一收到 BPDU，就立即進入 err-disabled（關閉）。"],
  ["例子", "用戶在辦公桌私接一部小 Switch → 發出 BPDU → 接口立即關閉 → 防止環路或該 Switch 搶奪 Root"],
  ["恢復", "SW(config-if)# shutdown\nSW(config-if)# no shutdown\n或自動：errdisable recovery cause bpduguard", 1],
  ["比較", "BPDU Guard：收到就關口\nBPDU Filter：不發也不處理 BPDU（危險）\nRoot Guard：收到更好的 BPDU 就封鎖，保護 Root 位置", 1]
]);
E(49, [
  ["版本比較", "標準          名稱             樹的數量    收斂\n802.1D       STP              1 棵        慢\nCisco        PVST+            每 VLAN 1棵  慢\n802.1w       RSTP             1 棵        快\nCisco        Rapid PVST+      每 VLAN 1棵  快\n802.1s       MST              多 VLAN 歸組 快", 1],
  ["PVST 負載分擔", "VLAN 10：SW1 做 Root\nVLAN 20：SW2 做 Root\n→ 兩條上行線各自為不同 VLAN 轉發，兩條都有用", 1],
  ["配置", "SW(config)# spanning-tree mode rapid-pvst\nSW(config)# spanning-tree vlan 10 priority 4096\nSW# show spanning-tree vlan 10", 1]
]);
E(50, [
  ["兩種方法", "方法 1：spanning-tree vlan 10 priority 4096（直接指定數值）\n方法 2：spanning-tree vlan 10 root primary（巨集，自動計算）", 1],
  ["root primary 規則", "現任 Root Priority > 24576 → 設為 24576\n否則 → 設為比現任 Root 低 4096\nroot secondary → 設為 28672", 1],
  ["考試陷阱", "巨集只在輸入當刻計算一次；running-config 顯示的是計算後的 priority 數值。"]
]);
E(53, [
  ["定義", "IPv4 地址 32 bits，分四組 8 bits，以點分十進制表示，分網路部分和主機部分。"],
  ["特殊地址", "10.0.0.0/8、172.16.0.0/12、192.168.0.0/16 → 私有（RFC 1918）\n127.0.0.0/8 → Loopback\n169.254.0.0/16 → APIPA（DHCP 失敗）\n0.0.0.0 → 未指定 / 預設路由\n255.255.255.255 → 本地廣播", 1],
  ["考試陷阱", "172.16.0.0/12 = 172.16.0.0 至 172.31.255.255，不是整個 172.x。"]
]);
E(54, [
  ["權值表", "128  64  32  16   8   4   2   1", 1],
  ["十進制轉二進制", "172：\n172 ≥ 128 ✓ 剩 44\n44 < 64 ✗\n44 ≥ 32 ✓ 剩 12\n12 < 16 ✗\n12 ≥ 8 ✓ 剩 4\n4 ≥ 4 ✓ 剩 0\n→ 1 0 1 0 1 1 0 0", 1],
  ["必背 Mask 值", "10000000 = 128\n11000000 = 192\n11100000 = 224\n11110000 = 240\n11111000 = 248\n11111100 = 252\n11111110 = 254\n11111111 = 255", 1]
]);
E(55, [
  ["定義", "Subnet Mask 的 1 標示網路位，0 標示主機位；/n 代表前 n 位是 1。"],
  ["例子", "/27 = 11111111.11111111.11111111.11100000\n     = 255.255.255.224\n主機位 5 個 → 2^5 = 32 個地址，可用 30", 1],
  ["Wildcard", "Wildcard = 255.255.255.255 − Mask\n/27 → 0.0.0.31\n/24 → 0.0.0.255\nhost 10.1.1.1 = 10.1.1.1 0.0.0.0\nany = 0.0.0.0 255.255.255.255", 1]
]);
E(56, [
  ["最快方法：Block Size", "1 找出「有趣的那一組」：Mask 不是 255 也不是 0 的那組\n2 Block = 256 − 該組 Mask 值\n3 網路地址 = 該組 IP 值向下取到 Block 的倍數\n4 廣播 = 下一個網路地址 − 1", 1],
  ["例子 1（第四組）", "192.168.1.130/26\nMask 255.255.255.192 → Block = 64\n倍數：0, 64, 128, 192 → 130 落在 128\n網路 192.168.1.128\n廣播 192.168.1.191\n可用 .129 – .190（62 台）", 1],
  ["例子 2（第三組）", "10.20.37.99/21\nMask 255.255.248.0 → 第三組 Block = 8\n倍數：...24, 32, 40 → 37 落在 32\n網路 10.20.32.0\n廣播 10.20.39.255\n可用 10.20.32.1 – 10.20.39.254（2^11 − 2 = 2046 台）", 1],
  ["考試陷阱", "Mask 在第三組時，第四組的網路值是 0、廣播值是 255。"]
]);
E(57, [
  ["分類表", "Class  第一組     預設 Mask   用途\nA      1-126      /8          大型網路\nB      128-191    /16         中型網路\nC      192-223    /24         小型網路\nD      224-239    —           組播\nE      240-255    —           實驗", 1],
  ["記憶法", "看第一組的二進制開頭：A = 0...、B = 10...、C = 110...、D = 1110...、E = 1111..."],
  ["考試陷阱", "127 不屬於可分配的 A 類地址，它保留給 Loopback。"]
]);
E(58, [
  ["定義", "子網劃分是從主機位「借位」作網路位，把一個大網段切成多個小網段。"],
  ["為甚麼", "一個 /16 有 65534 個主機地址，全部放在同一廣播域，廣播太多也浪費地址。切成 /24 就有 256 個網段，每個 254 台。"],
  ["公式", "借 s 位 → 2^s 個子網\n剩 h 位主機位 → 每網 2^h − 2 台主機", 1],
  ["VLSM", "Variable Length Subnet Mask：同一大網段內，按需要使用不同長度的 Mask，例如 LAN 用 /26、點對點線用 /30。"]
]);
E(59, [
  ["定義", "組播是一對多：源頭只發一份，網路只把它複製到有加入該組別的接收者。"],
  ["比較", "單播：送 100 人要發 100 份\n廣播：所有人都收到，包括不想要的人\n組播：發一份，只有加入組別的 100 人收到", 1],
  ["常見組播地址", "224.0.0.1  所有主機\n224.0.0.2  所有 Router\n224.0.0.5  所有 OSPF Router\n224.0.0.6  OSPF DR / BDR\n224.0.0.9  RIPv2\n224.0.0.10 EIGRP", 1]
]);
E(60, [
  ["VLSM 完整例子", "要求：192.168.10.0/24，需要 A 部門 100 台、B 50 台、C 20 台、一條點對點線 2 台\n步驟：由大到小分配\nA 100 台 → 2^7 − 2 = 126 → /25 → 192.168.10.0   – .127\nB  50 台 → 2^6 − 2 = 62  → /26 → 192.168.10.128 – .191\nC  20 台 → 2^5 − 2 = 30  → /27 → 192.168.10.192 – .223\nP2P 2 台 → 2^2 − 2 = 2   → /30 → 192.168.10.224 – .227\n剩餘 192.168.10.228 – .255 可日後使用", 1],
  ["考試陷阱", "必須由最大需求開始分配，否則會出現重疊或空間碎片。"]
]);
E(61, [
  ["三類題型", "1 給 IP/前綴 → 求網路、廣播、範圍\n2 給主機數 → 求最小 Mask\n3 給子網數 → 求借位", 1],
  ["速查表（背熟）", "前綴  Mask   Block  可用主機\n/24   .0     256    254\n/25   .128   128    126\n/26   .192   64     62\n/27   .224   32     30\n/28   .240   16     14\n/29   .248   8      6\n/30   .252   4      2", 1],
  ["題型 2 例子", "需要 500 台主機：\n2^9 − 2 = 510 ≥ 500 → 主機位 9 → /23（255.255.254.0）", 1],
  ["秒答訓練", "目標：每題 15 秒內。到 Subnet 計時器練習，平均時間降到 15 秒以下才算過關。"]
]);
