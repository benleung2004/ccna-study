// Module 7-9
C(53, ["IPv4 為 32 bits，分四組十進制", "IP 分網路部分與主機部分", "私有網段：10.0.0.0/8、172.16.0.0/12、192.168.0.0/16"], ["172.32.0.1 不是私有地址；172 的私有範圍只到 172.31"], [], [
  ["Which address is private?", ["172.20.1.1", "172.32.1.1", "8.8.8.8", "192.169.1.1"], "172.16–172.31 才屬私有。"],
  ["IPv4 地址長度是？", ["32 bits", "48 bits", "64 bits", "128 bits"], "IPv4 32 bits。"],
  ["169.254.x.x 通常代表？", ["APIPA，未取得 DHCP", "公有 DNS", "組播", "OSPF DR"], "Windows 拿不到 DHCP 時常見。"]
]);
C(54, ["八位權值：128 64 32 16 8 4 2 1", "十進制轉二進制：由大到小嘗試減去", "二進制轉十進制：把 1 對應的權值相加"], ["每組 8 bits，最大 255"], [], [
  ["11000000 in decimal is:", ["192", "128", "224", "240"], "128 + 64 = 192。"],
  ["200 的二進制是？", ["11001000", "11000100", "10101000", "11100000"], "128 + 64 + 8 = 200。"],
  ["10101000 的十進制是？", ["168", "172", "160", "192"], "128 + 32 + 8 = 168。"]
]);
C(55, ["Mask 的 1 代表網路位，0 代表主機位", "/24 = 255.255.255.0；/26 = 255.255.255.192；/30 = 255.255.255.252", "Wildcard = 255.255.255.255 減去 Mask"], ["Wildcard 常用於 ACL 及 OSPF，不等於 Subnet Mask"], [], [
  ["/26 的子網掩碼是？", ["255.255.255.192", "255.255.255.128", "255.255.255.224", "255.255.255.240"], "/26 最後一組 192。"],
  ["What is the wildcard mask for /26?", ["0.0.0.63", "0.0.0.255", "0.0.0.31", "255.255.255.192"], "256 − 192 − 1 = 63。"],
  ["255.255.255.240 是多少前綴？", ["/28", "/27", "/29", "/30"], "240 = 11110000，24 + 4 = /28。"]
]);
C(56, ["塊大小 Block = 256 − 該組 Mask 值", "網路地址：主機位全 0；廣播地址：主機位全 1", "可用範圍：網路地址 + 1 至 廣播地址 − 1；主機數 2^h − 2"], ["/31 為點對點特例；一般題目使用 2^h − 2"], [], [
  ["What is the network address of 192.168.1.130/26?", ["192.168.1.128", "192.168.1.64", "192.168.1.130", "192.168.1.192"], "塊 64，130 落在 128–191。"],
  ["192.168.1.130/26 的廣播地址是？", ["192.168.1.191", "192.168.1.255", "192.168.1.127", "192.168.1.190"], "下一網段 192 減 1。"],
  ["/27 每個子網可用主機數？", ["30", "32", "62", "14"], "2^5 − 2 = 30。"]
]);
C(57, ["A 1–126（127 留作 Loopback）", "B 128–191；C 192–223", "D 224–239（組播）；E 240–255（實驗）"], ["現代網路主要用 CIDR，但考題仍會問分類"], [], [
  ["172.16.1.1 is which class?", ["Class B", "Class A", "Class C", "Class D"], "第一組 128–191 為 B。"],
  ["Class D 用作？", ["組播", "單播", "私有地址", "廣播地址"], "224–239 用於組播。"],
  ["127.0.0.1 is used for:", ["Loopback testing", "Multicast", "DHCP relay", "Public DNS"], "127/8 保留作 Loopback。"]
]);
C(58, ["子網劃分把大網段分成小網段", "向主機位借位，得到更多子網", "優點：減少浪費、控制廣播、便於管理", "VLSM 可按需要使用不同長度 Mask"], ["借越多位 → 子網越多，但每網主機越少"], [], [
  ["Borrowing more host bits results in:", ["More subnets, fewer hosts per subnet", "Fewer subnets, more hosts", "Same hosts", "No change"], "網路位增加，主機位減少。"],
  ["VLSM 的作用是？", ["同一網段內按需要用不同長度 Mask", "所有子網必須相同大小", "自動做 NAT", "取代 OSPF"], "按主機數分配更省地址。"],
  ["一個 /24 借 2 位，可得多少個子網？", ["4", "2", "8", "6"], "2^2 = 4。"]
]);
C(59, ["組播一對多，只傳給已加入組別的接收者", "應用：IPTV、視像會議、路由協議", "OSPF 使用 224.0.0.5（所有 OSPF Router）及 224.0.0.6（DR/BDR）"], ["廣播傳給全部；組播只傳給有興趣的成員"], [], [
  ["Which IP is an OSPF multicast address for all OSPF routers?", ["224.0.0.5", "224.0.0.6", "255.255.255.255", "127.0.0.1"], "224.0.0.6 給 DR / BDR。"],
  ["組播相比重複單播的好處？", ["源頭只送一份，節省帶寬", "必定最安全", "不需路由", "沒有 IP 地址"], "多個接收者共用同一流量。"],
  ["Which application commonly uses multicast?", ["IPTV", "SSH 單一登入", "ARP Reply", "DHCP Ack"], "IPTV 是典型組播應用。"]
]);
C(60, ["例：192.168.1.0/24 分四個 → /26", "網段：.0、.64、.128、.192", "每網可用 62 個主機", "步驟：先定借位 → 求 Block → 列網段"], ["子網總數看借位；主機數看剩餘主機位"], [], [
  ["192.168.1.0/24 分成 4 個子網，新前綴是？", ["/26", "/25", "/27", "/28"], "借 2 位。"],
  ["The third subnet of 192.168.1.0/24 divided into /26 starts at:", ["192.168.1.128", "192.168.1.64", "192.168.1.192", "192.168.1.32"], "0、64、128、192。"],
  ["10.0.0.0/8 分成 /16，有多少個子網？", ["256", "16", "8", "65536"], "借 8 位，2^8 = 256。"]
]);
C(61, ["需要 N 個主機：找 2^h − 2 ≥ N", "需要 N 個子網：找 2^s ≥ N", "判斷 IP 所屬網段：把該組值除以 Block 再向下取整", "快速表：/25=128、/26=64、/27=32、/28=16、/29=8、/30=4"], ["Mask 不在第四組時，Block 在第三或第二組計算"], [], [
  ["最少可容納 50 主機的前綴？", ["/26", "/27", "/28", "/25"], "/26 有 62 台；/27 只有 30 台。"],
  ["172.16.5.20/20 的網路地址？", ["172.16.0.0", "172.16.5.0", "172.16.4.0", "172.16.16.0"], "/20 第三組塊 16，5 落於 0–15。"],
  ["172.16.5.20/20 的廣播地址？", ["172.16.15.255", "172.16.5.255", "172.16.31.255", "172.16.16.255"], "第三組範圍 0–15。"]
]);
C(63, ["以太網 IP MTU 預設 1500 bytes", "IPv4 封包太大時，路由器可分片；由目的主機重組", "DF=1 且太大時丟棄，並回 ICMP Fragmentation Needed"], ["IPv6 路由器不分片，只由來源處理"], ["ip mtu 1400"], [
  ["Default Ethernet IP MTU?", ["1500 bytes", "1518 bytes", "64 bytes", "9000 bytes"], "1518 是標準 Frame 長度，不是 IP MTU。"],
  ["IP 分片後通常在何處重組？", ["最終目的主機", "每個路由器", "第一部 Switch", "DNS 伺服器"], "中途路由器一般不重組。"],
  ["DF=1 且封包大於 MTU，路由器會？", ["丟棄並回 ICMP", "強制分片", "改 TTL 再傳", "轉成 UDP"], "DF 代表不可分片。"]
]);
C(64, ["IPv4 Header 最少 20 bytes", "重要欄位：Version、IHL、DSCP、Total Length、ID、Flags、Fragment Offset、TTL、Protocol、Checksum、Source、Destination", "Protocol：ICMP 1、TCP 6、UDP 17、OSPF 89"], ["TTL 每過一部路由器減 1，到 0 就丟棄"], [], [
  ["Minimum IPv4 header size?", ["20 bytes", "8 bytes", "40 bytes", "60 bytes"], "沒有 Options 時 20 bytes。"],
  ["IP Protocol 欄位值 6 代表？", ["TCP", "UDP", "ICMP", "OSPF"], "1 ICMP、6 TCP、17 UDP、89 OSPF。"],
  ["每經過一部路由器，哪欄位會減 1？", ["TTL", "Identification", "Version", "Destination IP"], "防止封包無限循環。"]
]);
C(65, ["Identification：同一原始封包的分片共用同一值", "Flags：DF 不要分片；MF 後面還有分片", "Fragment Offset 以 8 bytes 為單位", "例：4000 bytes（資料 3980），MTU 1500 → 每片資料 1480；Offset 0、185、370"], ["最後一片 MF=0，但 Offset 仍可不為 0"], [], [
  ["Fragment Offset 的單位？", ["8 bytes", "1 byte", "4 bytes", "20 bytes"], "1480 ÷ 8 = 185。"],
  ["同一原始封包的分片用哪欄位識別？", ["Identification", "TTL", "Protocol", "DSCP"], "ID 相同才可重組。"],
  ["The last fragment normally has:", ["MF = 0 and a non-zero offset", "MF = 1 and offset 0", "DF = 1 always", "TTL = 0"], "MF=0 表示沒有更多分片。"]
]);
C(66, ["Router 連接不同網路，分隔廣播域", "流程：解封 Frame → 查路由表 → TTL 減 1 → 重新封裝", "選最佳路徑並轉發"], ["Router 預設不轉發廣播"], [], [
  ["Router 收到封包後要做甚麼？", ["查路由表並重新封裝新 Frame", "把 MAC 寫入 VLAN", "永遠泛洪", "修改來源 IP（必定）"], "L2 頭每跳更換。"],
  ["Routers separate:", ["Broadcast domains", "Only cables", "DNS names", "Ports on a hub"], "每個路由接口是獨立廣播域。"],
  ["沒有匹配路由亦沒有預設路由，封包會？", ["丟棄並可回 ICMP Unreachable", "全部泛洪", "送回 ARP 表", "轉為廣播"], "路由器不會盲目泛洪。"]
]);
C(67, ["路由表列出目的網段、下一跳或出接口、AD 及 Metric", "代碼：C 直連、L 本機 /32、S 靜態、O OSPF", "`S*` 是預設路由，顯示為 Gateway of last resort"], ["L 是接口本身的 /32 路由，不是整個網段"], ["show ip route"], [
  ["查看路由表：", "show ip route", "基礎路由檢查指令。"],
  ["路由表中代碼 O 代表？", ["OSPF", "Static", "Connected", "EIGRP"], "D 才是 EIGRP。"],
  ["Which code marks a local /32 route for an interface IP?", ["L", "C", "S", "O"], "L = Local。"]
]);
C(68, ["接口配置 IP 且狀態 up/up，就會生成 C 與 L 路由", "直連路由 AD = 0", "不需路由協議"], ["接口 down 時，對應直連路由會消失"], ["interface g0/0", "ip address 10.0.0.1 255.255.255.0", "no shutdown"], [
  ["Connected route AD?", ["0", "1", "110", "120"], "直連最可信。"],
  ["生成直連路由的條件？", ["接口有 IP 且 up/up", "必須啟用 OSPF", "必須有 DNS", "必須設定 ACL"], "接口正常並配置 IP。"],
  ["開啟 Router 接口的指令：", "no shutdown|no shut", "Router 接口預設常為 shutdown。"]
]);
C(69, ["靜態路由手動設定，AD 預設 1", "預設路由：0.0.0.0 0.0.0.0", "浮動靜態路由把 AD 設高，主路由失效時才啟用"], ["回程路由也要有，否則單向可達仍然 ping 不通"], ["ip route 10.0.0.0 255.0.0.0 192.168.1.2", "ip route 0.0.0.0 0.0.0.0 192.168.1.2", "ip route 10.0.0.0 255.0.0.0 192.168.2.2 130"], [
  ["以 192.168.1.2 為下一跳，建立預設路由：", "ip route 0.0.0.0 0.0.0.0 192.168.1.2", "0.0.0.0 0.0.0.0 匹配所有目的地。"],
  ["Default AD of a static route?", ["1", "0", "90", "110"], "靜態路由 AD 1。"],
  ["以 AD 130 作為 OSPF 備份的路由叫？", ["浮動靜態路由", "直連路由", "EIGRP 路由", "本機路由"], "AD 高於 OSPF 的 110，平時不會入表。"]
]);
C(71, ["OSPF：Link-state IGP，用 Dijkstra SPF", "IP 協議號 89；AD 110；Metric = Cost", "Hello 10 秒、Dead 40 秒（Broadcast/P2P 預設）", "鄰居建立要符合：Area、Hello/Dead、子網、驗證、MTU 等；鄰居狀態 Down→Init→2-Way→ExStart→Exchange→Loading→Full"], ["DROTHER 之間停在 2-Way 是正常"], [], [
  ["OSPF default AD?", ["110", "90", "120", "1"], "EIGRP 內部 90，RIP 120。"],
  ["Broadcast 網路 OSPF 預設 Dead 間隔？", ["40 秒", "10 秒", "120 秒", "4 秒"], "Hello 10，Dead 40。"],
  ["OSPF 使用哪種演算法？", ["Dijkstra SPF", "Bellman-Ford", "DUAL", "Spanning Tree"], "Link-state 使用 SPF。"]
]);
C(72, ["傳統配置：`network` + Wildcard + `area`", "也可在接口用 `ip ospf 1 area 0`", "RID 次序：router-id → 最高 Loopback → 最高 up 物理接口 IP", "DR 選舉：Priority 高者，再比 RID；Priority 0 不參選；不會搶佔"], ["network 用 Wildcard 比對啟用接口；不是宣告一條路由而已"], ["router ospf 1", "router-id 1.1.1.1", "network 10.0.0.0 0.0.0.255 area 0", "passive-interface g0/1", "show ip ospf neighbor"], [
  ["啟用 OSPF Process 1（Global Config）：", "router ospf 1", "Process ID 只具本地意義。"],
  ["10.1.1.0/24 加入 area 0 的 network 指令：", "network 10.1.1.0 0.0.0.255 area 0", "Wildcard 0.0.0.255 對應 /24。"],
  ["Which is checked first for OSPF Router ID?", ["The router-id command", "Highest physical IP", "Lowest loopback IP", "MAC address"], "手動 router-id 優先。"]
]);
C(73, ["故障時，LSA 洪泛通知拓撲變化", "各路由器更新 LSDB，重新跑 SPF", "鄰居失效：Dead 計時器超時；實體斷線可更快偵測"], ["被動接口不發 Hello，因此不會形成鄰居"], ["show ip ospf neighbor", "show ip route ospf", "show ip ospf interface brief"], [
  ["查看 OSPF 鄰居：", "show ip ospf neighbor", "狀態 Full 或 2-Way 視乎角色。"],
  ["Routers exchange topology information in OSPF using:", ["LSAs", "BPDUs", "CDP frames", "ARP Replies"], "LSA 組成 LSDB。"],
  ["OSPF 收斂較快的原因？", ["拓撲變更後透過 LSA 快速通告並重算", "只有 30 秒週期全表廣播", "使用 Hop Count", "沒有鄰居關係"], "Link-state 採事件驅動。"]
]);
C(74, ["AD 比較不同來源的可信度，小者優先", "AD：直連 0、靜態 1、eBGP 20、EIGRP 90、OSPF 110、RIP 120、iBGP 200", "Metric 比較同一協議的路徑：OSPF 用 Cost，RIP 用 Hop Count"], ["先比 AD 再比 Metric；不同協議的 Metric 不直接比較"], ["auto-cost reference-bandwidth 10000"], [
  ["Route via OSPF and RIP to the same prefix: which enters the table?", ["OSPF (AD 110)", "RIP (AD 120)", "Both always", "Neither"], "AD 小者勝。"],
  ["OSPF 預設 Reference Bandwidth？", ["100 Mbps", "1 Gbps", "10 Gbps", "10 Mbps"], "所以 FE 及 GE 預設 Cost 都是 1。"],
  ["Which metric does RIP use?", ["Hop count", "Cost", "Bandwidth + delay", "AD"], "RIP 用跳數，上限 15。"]
]);
C(75, ["路由決策先看最長前綴匹配", "例：/24 比 /16 更具體，優先", "前綴長度相同才比較 AD，再比較 Metric"], ["最長匹配優先於 AD：/24 的 OSPF 仍勝過 /16 的靜態路由"], [], [
  ["Packet to 10.1.1.5. Routes: 10.0.0.0/8 and 10.1.1.0/24. Which is used?", ["10.1.1.0/24", "10.0.0.0/8", "Both load balance", "Default route"], "最長前綴優先。"],
  ["10.1.1.0/24（OSPF）與 10.1.0.0/16（Static），到 10.1.1.9 走哪條？", ["/24 OSPF 路由", "/16 Static 路由", "丟棄", "比較 Hostname"], "先比前綴長度。"],
  ["預設路由 /0 在甚麼時候使用？", ["沒有更具體路由時", "永遠優先", "只用於 VLAN", "只用於 ARP"], "/0 最不具體。"]
]);

window.CCNA.labs[76] = ["拓撲：3 部 Router 串連 R1–R2–R3，各有 Loopback。", "配置接口 IP，用 show ip interface brief 確認 up/up。", "每部 Router：router ospf 1、router-id、network ... area 0。", "用 show ip ospf neighbor 確認狀態到達 Full。", "用 show ip route ospf 確認學到路由（代碼 O）。", "把 LAN 接口設 passive-interface，再確認鄰居仍正常。", "故障練習：把一邊 Hello 改為 5 秒，觀察鄰居失效及如何修復。"];
