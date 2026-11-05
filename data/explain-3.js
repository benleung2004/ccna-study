// Module 8-13 詳解
E(63, [
  ["定義", "MTU 是接口可承載的最大 IP 封包大小（以太網 1500 bytes）。IPv4 封包超過下一條線的 MTU 時，Router 會分片。"],
  ["例子", "封包 4000 bytes 要經 MTU 1500 的線：\nDF = 0 → 分成 3 片，由目的主機重組\nDF = 1 → 丟棄，回 ICMP Type 3 Code 4（Fragmentation Needed）", 1],
  ["考試陷阱", "IPv6 Router 不分片，只由來源主機透過 Path MTU Discovery 處理。"]
]);
E(64, [
  ["IPv4 Header（20 bytes）", "Version(4) | IHL | DSCP/ECN | Total Length\nIdentification | Flags | Fragment Offset\nTTL | Protocol | Header Checksum\nSource IP Address\nDestination IP Address", 1],
  ["必背欄位", "TTL：每過一部 Router 減 1，到 0 就丟棄並回 ICMP Time Exceeded（traceroute 就是利用這點）\nProtocol：1 ICMP、6 TCP、17 UDP、89 OSPF\nDSCP：QoS 標記"],
  ["考試陷阱", "IHL 以 4 bytes 為單位，最小值 5（= 20 bytes）。"]
]);
E(65, [
  ["三個欄位", "Identification：同一原始封包的所有分片共用同一 ID\nFlags：DF（Don't Fragment）、MF（More Fragments）\nFragment Offset：此片資料在原封包的位置，以 8 bytes 為單位", 1],
  ["完整計算", "原封包 4000 bytes = 20 header + 3980 data，MTU 1500\n每片最多資料：1500 − 20 = 1480（是 8 的倍數 ✓）\n片 1：data 1480，Offset 0，      MF = 1\n片 2：data 1480，Offset 185，    MF = 1（1480 ÷ 8）\n片 3：data 1020，Offset 370，    MF = 0（2960 ÷ 8）\n檢查：1480 + 1480 + 1020 = 3980 ✓", 1],
  ["考試陷阱", "Offset 是資料位置除以 8，不是片的序號。"]
]);
E(66, [
  ["定義", "Router 連接不同網段，依路由表轉發封包，並分隔廣播域。"],
  ["每一跳的工作", "1 收到 Frame，檢查目的 MAC 是自己 → 解封\n2 查路由表，找最佳匹配\n3 TTL − 1，重算 Checksum\n4 ARP 查下一跳 MAC\n5 重新封裝新 Frame 送出", 1],
  ["考試陷阱", "Router 預設不轉發廣播；DHCP 跨網段要靠 ip helper-address。"]
]);
E(67, [
  ["讀路由表", "R1# show ip route\nGateway of last resort is 10.0.12.2 to network 0.0.0.0\nS*    0.0.0.0/0 [1/0] via 10.0.12.2\nC     192.168.1.0/24 is directly connected, G0/0\nL     192.168.1.1/32 is directly connected, G0/0\nO     192.168.2.0/24 [110/2] via 10.0.12.2, G0/1\n                     └ AD/Metric", 1],
  ["欄位", "[110/2]：AD 110（OSPF），Metric 2（Cost）；via：下一跳；最後是出接口。"]
]);
E(68, [
  ["定義", "接口配置 IP 並 up/up 後，Router 自動加入兩條路由：C（整個網段）及 L（接口本身 /32）。"],
  ["例子", "R1(config)# interface g0/0\nR1(config-if)# ip address 192.168.1.1 255.255.255.0\nR1(config-if)# no shutdown\n→ C 192.168.1.0/24\n→ L 192.168.1.1/32", 1],
  ["排錯", "`show ip interface brief` 看 Status / Protocol；administratively down 代表未 no shutdown。"]
]);
E(69, [
  ["定義", "靜態路由由管理員手動設定，AD 1，不會自動適應拓撲變化。"],
  ["完整例子", "192.168.1.0/24 ─ R1 G0/1(10.0.12.1) ─── (10.0.12.2)G0/1 R2 ─ 192.168.2.0/24\nR1(config)# ip route 192.168.2.0 255.255.255.0 10.0.12.2\nR2(config)# ip route 192.168.1.0 255.255.255.0 10.0.12.1\n← 兩邊都要設定，否則回程不通", 1],
  ["種類", "下一跳：ip route ... 10.0.12.2\n出接口：ip route ... g0/1（只建議用於點對點線）\n預設：ip route 0.0.0.0 0.0.0.0 10.0.12.2\n浮動：ip route ... 10.0.13.3 130（AD 高過主路由，作備份）\n主機路由：ip route 10.1.1.1 255.255.255.255 ...（/32）", 1]
]);
E(71, [
  ["定義", "OSPF 是 Link-State IGP：每部 Router 收集整個區域的拓撲（LSDB），再用 SPF 計算最短路徑。"],
  ["建立鄰居流程", "Down → Init（收到對方 Hello）→ 2-Way（Hello 中看到自己）\n→ ExStart（選主從）→ Exchange（交換 DBD）\n→ Loading（請求 LSA）→ Full（LSDB 同步完成）", 1],
  ["鄰居必須相符", "Area ID、Hello / Dead 計時器、子網及 Mask、驗證、Stub 設定、MTU（否則卡在 ExStart / Exchange）\nRouter ID 則必須不同", 1],
  ["DR / BDR", "在 Ethernet（多路訪問網路）選出 DR 及 BDR，減少 LSA 交換。其他 Router（DROTHER）只與 DR / BDR 達到 Full，彼此停在 2-Way。"]
]);
E(72, [
  ["配置例子", "R1(config)# router ospf 1\nR1(config-router)# router-id 1.1.1.1\nR1(config-router)# network 192.168.1.0 0.0.0.255 area 0\nR1(config-router)# network 10.0.12.0 0.0.0.3 area 0\nR1(config-router)# passive-interface g0/0   ← LAN 口不發 Hello\nR1(config-router)# default-information originate  ← 宣告預設路由\n或接口方式：R1(config-if)# ip ospf 1 area 0", 1],
  ["Router ID 選擇", "1 router-id 指令\n2 最高的 Loopback IP\n3 最高的 up 物理接口 IP\n改了 RID 要 clear ip ospf process 才生效", 1],
  ["DR 選舉推演", "R1: priority 1, RID 1.1.1.1\nR2: priority 1, RID 2.2.2.2\nR3: priority 0, RID 3.3.3.3\n→ R3 priority 0 不參選\n→ R1、R2 priority 相同，比 RID：R2 較大 → DR，R1 → BDR\n之後加入 priority 255 的 R4 → 不搶佔，R2 仍是 DR", 1],
  ["Cost", "Cost = Reference BW（100 Mbps）÷ 接口 BW\nFE = 1、GE = 1（因為最小是 1）→ 用 auto-cost reference-bandwidth 10000 改善"]
]);
E(73, [
  ["定義", "收斂是所有 Router 對拓撲達成一致的過程。"],
  ["故障流程", "1 鏈路斷開，或 Dead 計時器（40 秒）超時\n2 Router 產生新 LSA，洪泛給鄰居\n3 所有 Router 更新 LSDB\n4 重新跑 SPF，更新路由表", 1],
  ["排錯指令", "show ip ospf neighbor        ← 鄰居狀態\nshow ip ospf interface brief ← Area、Cost、角色\nshow ip protocols            ← RID、network 設定\nshow ip route ospf           ← 學到的路由", 1]
]);
E(74, [
  ["AD vs Metric", "AD：比較不同來源的可信度（不同協議之間）\nMetric：比較同一協議內不同路徑的好壞", 1],
  ["AD 表（必背）", "Connected        0\nStatic           1\neBGP            20\nEIGRP 內部      90\nOSPF           110\nIS-IS          115\nRIP            120\nEIGRP 外部     170\niBGP           200\n不可用         255", 1],
  ["例子", "到 10.0.0.0/8 有 OSPF 路由（AD 110, cost 50）及 RIP 路由（AD 120, 2 hops）\n→ 只比 AD：OSPF 入表；RIP 的 Metric 不會拿來和 OSPF 比", 1]
]);
E(75, [
  ["決策順序", "1 最長前綴匹配（最具體）\n2 前綴相同 → 最低 AD\n3 AD 相同 → 最低 Metric\n4 Metric 相同 → 等價負載分擔（ECMP）", 1],
  ["例子", "路由表：\nS  10.0.0.0/8     via A\nO  10.1.0.0/16    via B\nD  10.1.1.0/24    via C\nS* 0.0.0.0/0      via D\n去 10.1.1.5 → C（/24 最長）\n去 10.1.2.5 → B（/16）\n去 10.2.0.1 → A（/8）\n去 8.8.8.8  → D（預設）", 1],
  ["考試陷阱", "前綴長度優先於 AD。最常見陷阱：題目刻意令 /24 的路由 AD 較高，仍然是 /24 勝。"]
]);
E(78, [
  ["DORA 流程", "Client                         Server\n  Discover  (src 0.0.0.0 → 255.255.255.255) →\n            ← Offer（提供 IP）\n  Request   （廣播：我要這個 IP）→\n            ← Ack（確認，附 Gateway、DNS、租期）", 1],
  ["配置", "R1(config)# ip dhcp excluded-address 192.168.1.1 192.168.1.10\nR1(config)# ip dhcp pool LAN\nR1(dhcp-config)# network 192.168.1.0 255.255.255.0\nR1(dhcp-config)# default-router 192.168.1.1\nR1(dhcp-config)# dns-server 8.8.8.8\nServer 在別的網段 → Client 網段的 Gateway 接口：\nR1(config-if)# ip helper-address 10.1.1.5", 1],
  ["DHCP Snooping", "防止有人私接 DHCP Server 派錯 Gateway。所有接口預設 untrusted：untrusted 口收到 Offer / Ack 會丟棄。通往合法 Server 的上行口要設 `ip dhcp snooping trust`。"]
]);
E(79, [
  ["四個術語", "Inside Local：內部主機的私有 IP（192.168.1.10）\nInside Global：內部主機在外面看到的 IP（203.0.113.5）\nOutside Global：外部主機的真實 IP（8.8.8.8）\nOutside Local：內部看到的外部主機 IP（通常同 Outside Global）", 1],
  ["PAT 例子", "192.168.1.10:51000 → 203.0.113.5:51000 → 8.8.8.8:53\n192.168.1.11:51000 → 203.0.113.5:51001 → 8.8.8.8:53\n← 同一公網 IP，用 Port 區分（Port 相同衝突時會改 Port）", 1],
  ["PAT 配置", "R1(config)# access-list 1 permit 192.168.1.0 0.0.0.255\nR1(config)# ip nat inside source list 1 interface g0/1 overload\nR1(config)# interface g0/0\nR1(config-if)# ip nat inside\nR1(config)# interface g0/1\nR1(config-if)# ip nat outside", 1],
  ["Static NAT", "ip nat inside source static 192.168.1.100 203.0.113.10\n← 一對一，用於讓外部訪問內部伺服器"]
]);
E(80, [
  ["定義", "NTP 令所有設備時間一致；時間不準，日誌難以對照，證書驗證也會失敗。"],
  ["Stratum", "Stratum 0：原子鐘、GPS（參考時鐘）\nStratum 1：直接接 Stratum 0 的伺服器\n每多一層 + 1；Stratum 16 = 未同步", 1],
  ["配置", "R1(config)# ntp server 10.0.0.1   ← 客戶端\nR2(config)# ntp master 3          ← 作為 Stratum 3 時間源\nR1# show ntp status", 1]
]);
E(82, [
  ["比較", "            標準 ACL               擴展 ACL\n編號        1-99, 1300-1999        100-199, 2000-2699\n比對        只有來源 IP            來源、目的、協議、Port\n位置        靠近目的地             靠近來源", 1],
  ["三條規則", "1 由上而下，第一條匹配即執行，之後不再檢查\n2 最後有隱藏的 deny any\n3 每個接口、每個方向、每種協議只可套用一個 ACL"],
  ["完整例子", "要求：禁止 192.168.1.0/24 訪問伺服器 10.1.1.10 的 HTTPS，其他全部放行\nR1(config)# access-list 110 deny tcp 192.168.1.0 0.0.0.255 host 10.1.1.10 eq 443\nR1(config)# access-list 110 permit ip any any   ← 沒有這行，所有流量都被隱藏 deny\nR1(config)# interface g0/0   ← 靠近 192.168.1.0 的接口\nR1(config-if)# ip access-group 110 in", 1],
  ["Named ACL", "ip access-list extended BLOCK-WEB\n 10 deny tcp 192.168.1.0 0.0.0.255 host 10.1.1.10 eq 443\n 20 permit ip any any\n← 可用序號插入或刪除個別行", 1],
  ["考試陷阱", "只寫 deny 的 ACL 等於全部封鎖；`in` 是進入 Router 的方向，`out` 是離開 Router 的方向。"]
]);
E(83, [
  ["定義", "Port Security 限制 Access Port 可使用的 MAC 數量或指定 MAC，防止私接設備及 MAC 泛洪攻擊。"],
  ["違規模式", "模式       丟棄違規流量  Syslog/計數  關閉接口\nprotect        ✅           ❌          ❌\nrestrict       ✅           ✅          ❌\nshutdown       ✅           ✅          ✅（預設）", 1],
  ["配置", "SW(config-if)# switchport mode access   ← 必須先設，dynamic 模式不能啟用\nSW(config-if)# switchport port-security\nSW(config-if)# switchport port-security maximum 2\nSW(config-if)# switchport port-security mac-address sticky\nSW(config-if)# switchport port-security violation restrict", 1],
  ["考試陷阱", "只打 `switchport port-security` 才真正啟用；只設 maximum 而沒有啟用指令，功能不會生效。"]
]);
E(84, [
  ["SSH 配置步驟", "R1(config)# hostname R1\nR1(config)# ip domain-name lab.local\nR1(config)# crypto key generate rsa modulus 2048\nR1(config)# ip ssh version 2\nR1(config)# username admin secret <強密碼>\nR1(config)# line vty 0 15\nR1(config-line)# login local\nR1(config-line)# transport input ssh", 1],
  ["裝置強化", "enable secret（不是 enable password）\nservice password-encryption（只是 Type 7 弱加密）\nexec-timeout 5 0（閒置登出）\nACL 限制 VTY 來源：access-class 10 in\n關閉未用接口並放入未用 VLAN"],
  ["考試陷阱", "RSA Key 至少 768 bits 才支援 SSHv2；沒有 hostname 及 domain name，就無法產生 Key。"]
]);
E(86, [
  ["定義", "REST API 讓程式透過 HTTP(S) 讀取或修改網路設備或控制器的資料。"],
  ["CRUD 對應", "Create → POST\nRead   → GET\nUpdate → PUT（整個取代）/ PATCH（部分修改）\nDelete → DELETE", 1],
  ["狀態碼", "2xx 成功：200 OK、201 Created、204 No Content\n4xx 客戶端錯誤：400 Bad Request、401 未認證、403 無權限、404 Not Found\n5xx 伺服器錯誤：500", 1],
  ["認證", "常見方式：Basic Auth、API Key、Token（例如 Bearer Token）。"]
]);
E(87, [
  ["JSON 例子", "{\n  \"hostname\": \"SW1\",\n  \"vlans\": [10, 20, 30],\n  \"enabled\": true,\n  \"location\": null,\n  \"uplink\": { \"port\": \"G0/1\", \"speed\": 1000 }\n}", 1],
  ["常見錯誤", "鍵用單引號 → 錯\n鍵沒有引號 → 錯\n最後一項後有逗號 → 錯\n有註解 → 錯（標準 JSON 不支援）", 1],
  ["XML / YAML", "XML：<hostname>SW1</hostname>，用標籤\nYAML：hostname: SW1，用縮排（Ansible 使用）", 1]
]);
E(88, [
  ["傳統 vs 控制器", "傳統：每部設備逐部 SSH 配置，難以一致\n控制器：集中定義政策，自動推送到所有設備", 1],
  ["API 方向", "        [ 應用 / Python 腳本 ]\n              ↕ Northbound API（REST）\n        [ Controller：DNA Center / Catalyst Center ]\n              ↕ Southbound API（NETCONF、RESTCONF、SSH、OpenFlow）\n        [ Switch / Router / AP ]", 1],
  ["Meraki", "雲端管理：設備連上 Internet 後，在網頁 Dashboard 集中配置，適合多分店環境。"]
]);
E(89, [
  ["頻段", "2.4 GHz：距離較遠，非重疊頻道只有 1、6、11，干擾多\n5 GHz：頻道多，干擾少，但穿牆較弱\n6 GHz：Wi-Fi 6E 新增", 1],
  ["AP 類型", "Autonomous AP：每部獨立配置\nLightweight AP：由 WLC 集中管理，用 CAPWAP 隧道（UDP 5246 控制、5247 數據）\nCloud AP：Meraki 雲端管理", 1],
  ["AP 模式", "Local（預設，流量經隧道回 WLC）、FlexConnect（分店本地轉發）、Monitor、Sniffer、Bridge。"],
  ["安全", "WPA2：AES / CCMP；WPA3：SAE 取代 PSK，更安全。Enterprise 模式使用 802.1X + RADIUS。"]
]);
E(91, [
  ["定義", "IPv6 地址 128 bits，寫成 8 組四位十六進制，以冒號分隔。"],
  ["縮寫規則", "2001:0DB8:0000:0000:0008:0800:200C:417A\n1 去掉每組前導 0 → 2001:DB8:0:0:8:800:200C:417A\n2 一段連續全 0 改為 :: → 2001:DB8::8:800:200C:417A\n（:: 只可用一次）", 1],
  ["地址類型", "2000::/3    Global Unicast（公網）\nFE80::/10   Link-local（每個接口自動產生，不跨 Router）\nFC00::/7    Unique Local（類似私有，實際用 FD00::/8）\nFF00::/8    Multicast\n::1/128     Loopback\n::/128      未指定\n沒有廣播！", 1],
  ["EUI-64 例子", "MAC 00:1A:2B:3C:4D:5E\n1 中間切開：001A2B | 3C4D5E\n2 插入 FFFE：001A:2BFF:FE3C:4D5E\n3 第一個 byte 第 7 bit 反轉：00 → 02\n→ Interface ID = 021A:2BFF:FE3C:4D5E", 1]
]);
E(92, [
  ["配置", "R1(config)# ipv6 unicast-routing\nR1(config)# interface g0/0\nR1(config-if)# ipv6 address 2001:db8:1::1/64\nR1(config-if)# ipv6 address 2001:db8:1::/64 eui-64   ← 或用 EUI-64\nR1(config)# ipv6 route ::/0 2001:db8:12::2\nR1# show ipv6 route", 1],
  ["NDP（取代 ARP）", "RS（Router Solicitation）：主機問「有 Router 嗎？」\nRA（Router Advertisement）：Router 公布前綴及 Gateway\nNS（Neighbor Solicitation）：問「這個 IPv6 地址的 MAC 是甚麼？」\nNA（Neighbor Advertisement）：回答", 1],
  ["取得地址方式", "SLAAC：由 RA 取得前綴，自己產生 Interface ID\nStateless DHCPv6：SLAAC 取得地址 + DHCPv6 提供 DNS\nStateful DHCPv6：完全由 DHCPv6 分配"],
  ["考試陷阱", "IPv6 靜態路由若用 Link-local 作下一跳，必須同時指定出接口。"]
]);
E(93, [
  ["比較", "               TCP                    UDP\n連接          三次握手               無連接\n可靠          確認、重傳、排序       不保證\n流量控制      Window                 無\nHeader        20 bytes 起            8 bytes\n用途          網頁、SSH、Email       語音、視像、DNS 查詢、DHCP", 1],
  ["三次握手", "Client → SYN\n       ← SYN-ACK\nClient → ACK\n結束用 FIN（四次揮手）", 1],
  ["Port 表（必背）", "20/21 FTP    22 SSH    23 Telnet   25 SMTP\n53 DNS       67/68 DHCP  69 TFTP   80 HTTP\n110 POP3     123 NTP   143 IMAP    161/162 SNMP\n443 HTTPS    514 Syslog", 1]
]);
E(94, [
  ["定義", "DNS 把網域名稱（www.cisco.com）解析成 IP 地址。"],
  ["流程", "PC → 本地 DNS Server：www.cisco.com 是甚麼 IP？\n本地 DNS 查快取；沒有 → 問 Root → .com → cisco.com 權威伺服器\n→ 回覆 IP，並快取一段時間（TTL）", 1],
  ["記錄類型", "A：名稱 → IPv4\nAAAA：名稱 → IPv6\nCNAME：別名\nMX：郵件伺服器\nPTR：IP → 名稱（反向）", 1]
]);
E(95, [
  ["問題", "PC 只能設一個 Default Gateway；那部 Router 壞了，整個網段就斷網。"],
  ["HSRP 做法", "R1（Active, priority 110）  192.168.1.2\nR2（Standby, priority 100） 192.168.1.3\n虛擬 IP：192.168.1.1  ← PC 的 Gateway 設這個\n虛擬 MAC：0000.0C07.ACxx（v1, xx = group）\nR1 壞了 → R2 接手虛擬 IP 及 MAC → 發 Gratuitous ARP", 1],
  ["配置", "R1(config-if)# standby 1 ip 192.168.1.1\nR1(config-if)# standby 1 priority 110\nR1(config-if)# standby 1 preempt\nR1# show standby brief", 1],
  ["比較", "HSRP：Cisco 私有，Active / Standby\nVRRP：開放標準，Master / Backup\nGLBP：Cisco 私有，可多部 Router 同時分擔流量", 1]
]);
E(96, [
  ["嚴重度（必背）", "0 Emergency   系統不可用\n1 Alert       需立即處理\n2 Critical\n3 Error\n4 Warning\n5 Notification\n6 Informational\n7 Debugging\n記憶法：Every Awesome Cisco Engineer Will Need Ice cream Daily", 1],
  ["配置", "R1(config)# logging host 10.0.0.5\nR1(config)# logging trap warnings   ← 送 0–4 級\nR1(config)# service timestamps log datetime msec", 1],
  ["Log 格式", "*Mar 1 00:01:02: %LINK-3-UPDOWN: Interface G0/1, changed state to down\n                  └設施┘└嚴重度 3┘└助記碼┘", 1]
]);
E(97, [
  ["組成", "NMS（管理站）→ 向 Agent 發 Get / Set（UDP 161）\nAgent（設備）→ 主動發 Trap / Inform（UDP 162）\nMIB：設備資料的樹狀資料庫，以 OID 識別", 1],
  ["版本", "v1 / v2c：Community String 明文\nv3：支援認證（auth）及加密（priv），最安全", 1],
  ["考試陷阱", "Trap 不需確認；Inform 需要確認（v2c 起才有）。"]
]);
E(98, [
  ["定義", "QoS 在帶寬不足時，決定先送誰、延遲誰、丟棄誰。"],
  ["四大指標", "帶寬、延遲（Delay）、抖動（Jitter）、丟包（Loss）\n語音建議：單向延遲 < 150 ms、Jitter < 30 ms、丟包 < 1%", 1],
  ["工具流程", "分類及標記（Classification / Marking）：DSCP、CoS\n→ 排隊（Queuing）：LLQ 給語音優先隊列，CBWFQ 按類別分配帶寬\n→ 擠塞避免：WRED 提早隨機丟棄 TCP\n→ Policing（丟棄或重標記）/ Shaping（緩存延遲）", 1],
  ["常見 DSCP", "EF（46）：語音\nAF41：視像\nCS0 / BE（0）：一般流量\nAF 格式：AFxy，x = 類別，y = 丟棄優先級（越大越先丟）", 1]
]);
E(99, [
  ["三個 Plane", "Management Plane：管理設備（SSH、SNMP、Syslog）\nControl Plane：決定怎樣轉發（OSPF、STP、ARP）\nData Plane：實際轉發用戶封包（查表、轉發）", 1],
  ["SDN", "傳統：每部設備有自己的 Control Plane\nSDN：Control Plane 集中於 Controller，設備只負責 Data Plane\n好處：集中管理、可編程、自動化", 1],
  ["SD-Access 術語", "Underlay：實體 IP 網路（Switch、Router、路由協議）\nOverlay：建於 Underlay 之上的虛擬網路（VXLAN 隧道）\nFabric：Underlay + Overlay 整體", 1],
  ["考試陷阱", "Intent-Based Networking（IBN）：管理員講「目的」，例如「訪客不能訪問財務」，由控制器轉化為設定。"]
]);
