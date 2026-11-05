// Module 10-13
C(78, ["DHCP 流程 DORA：Discover、Offer、Request、Ack", "Server 用 UDP 67，Client 用 UDP 68", "跨網段時在 Client 網段的 Gateway 接口設 `ip helper-address`", "DHCP Snooping 防假 DHCP：接口預設 untrusted，上行口設 trust"], ["excluded-address 在全局配置，不在 pool 內"], ["ip dhcp excluded-address 10.0.0.1 10.0.0.10", "ip dhcp pool LAN", "network 10.0.0.0 255.255.255.0", "default-router 10.0.0.1", "dns-server 8.8.8.8", "ip helper-address 10.1.1.5", "ip dhcp snooping"], [
  ["DHCP DORA 的第三步？", ["Request", "Offer", "Ack", "Discover"], "D → O → R → A。"],
  ["在 Client 網段的 Router 接口設定中繼至 10.1.1.5：", "ip helper-address 10.1.1.5", "把廣播 DHCP 轉成單播到 Server。"],
  ["With DHCP snooping enabled, ports are by default:", ["Untrusted", "Trusted", "Shutdown", "Trunk"], "只有通往合法 Server 的口設 trust。"]
]);
C(79, ["Inside Local：內部主機真實地址；Inside Global：對外代表地址", "Static NAT 一對一；Dynamic NAT 用 Pool；PAT 多對一，靠 Port 區分", "要標記 `ip nat inside` 及 `ip nat outside` 接口"], ["PAT 關鍵字是 overload"], ["ip nat inside", "ip nat outside", "access-list 1 permit 10.0.0.0 0.0.0.255", "ip nat inside source list 1 interface g0/1 overload", "show ip nat translations"], [
  ["PAT uses what to distinguish hosts sharing one public IP?", ["Port numbers", "MAC addresses", "TTL", "VLAN IDs"], "所以可多對一。"],
  ["內部主機的私有 IP 是 NAT 術語中的？", ["Inside Local", "Inside Global", "Outside Local", "Outside Global"], "轉換後地址是 Inside Global。"],
  ["查看 NAT 轉換表：", "show ip nat translations|show ip nat translation", "用於驗證及排錯。"]
]);
C(80, ["NTP 同步設備時間，令日誌及證書時間可靠", "使用 UDP 123", "Stratum 越小越接近時間源；Stratum 16 表示未同步"], ["NTP master 代表本機作時間來源，不是向別人同步"], ["ntp server 10.0.0.1", "ntp master 3", "show ntp status", "show ntp associations"], [
  ["NTP uses which transport port?", ["UDP 123", "TCP 123", "UDP 69", "TCP 22"], "UDP 123。"],
  ["設 10.0.0.1 為 NTP 伺服器：", "ntp server 10.0.0.1", "全局配置模式。"],
  ["Stratum 的數值越小代表？", ["越接近參考時間源", "越遠離時間源", "AD 越大", "延遲一定越高"], "1 最接近；16 是未同步。"]
]);
C(82, ["標準 ACL：1–99、1300–1999，只比對來源 IP", "擴展 ACL：100–199、2000–2699，可比對來源、目的、協議、Port", "由上而下首次匹配即停止；最後有隱藏 deny any", "放置原則：標準近目的，擴展近來源"], ["每接口每方向每協議只可套一個 ACL"], ["access-list 10 permit 192.168.1.0 0.0.0.255", "access-list 100 permit tcp 10.0.0.0 0.0.0.255 any eq 443", "ip access-group 100 in", "show access-lists"], [
  ["A standard ACL matches only:", ["Source IP", "Destination IP", "Port", "Protocol"], "這就是它應靠近目的地的原因。"],
  ["ACL 沒匹配任何條目時？", ["被隱藏的 deny any 丟棄", "一律放行", "轉交 DNS", "跳到下個接口"], "每個 ACL 尾部都有 implicit deny。"],
  ["在接口入向套用 ACL 100：", "ip access-group 100 in", "方向 in 或 out 要看流量。"]
]);
C(83, ["限制接口可用的 MAC 數量及地址", "預設：Maximum 1、Violation shutdown", "違規動作：protect（只丟棄）、restrict（丟棄 + 計數/日誌）、shutdown（err-disabled）", "Sticky 會動態學習並寫入 running-config"], ["protect 不發告警；restrict 才計數及發日誌"], ["switchport mode access", "switchport port-security", "switchport port-security maximum 2", "switchport port-security violation restrict", "switchport port-security mac-address sticky", "show port-security interface f0/1"], [
  ["Default port security violation mode?", ["shutdown", "protect", "restrict", "forward"], "預設令接口 err-disabled。"],
  ["哪種模式會丟棄並計數，但不關閉接口？", ["restrict", "protect", "shutdown", "sticky"], "protect 不計數；shutdown 會關 Port。"],
  ["開啟動態記憶 MAC 的指令：", "switchport port-security mac-address sticky", "學到的地址寫進 running-config。"]
]);
C(84, ["SSH TCP 22 有加密；Telnet TCP 23 為明文", "SSH 前置：Hostname、Domain name、RSA Key、本地用戶", "強化：enable secret、停用未用接口、限 VTY 來源、登入提示"], ["`service password-encryption` 只是弱加密；敏感密碼應用 secret"], ["ip domain-name lab.local", "crypto key generate rsa modulus 2048", "username admin secret <密碼>", "ip ssh version 2", "line vty 0 4", "login local", "transport input ssh"], [
  ["SSH uses:", ["TCP 22", "TCP 23", "UDP 22", "UDP 161"], "Telnet 是 TCP 23。"],
  ["VTY 只允許 SSH 的指令：", "transport input ssh", "在 line vty 模式配置。"],
  ["產生 RSA Key 前，通常要先設定？", ["Hostname 及 domain name", "OSPF", "VLAN 4094", "DHCP Pool"], "Key 名稱使用這些資料。"]
]);
C(86, ["REST 用 HTTP(S)，無狀態", "方法對應 CRUD：POST 建立、GET 讀取、PUT/PATCH 更新、DELETE 刪除", "狀態碼：200 成功、201 已建立、401 未認證、403 無權限、404 找不到、500 伺服器錯誤"], ["401 是未通過認證；403 是已認證但無權限"], [], [
  ["Which HTTP method reads data?", ["GET", "POST", "DELETE", "PATCH"], "GET 對應 Read。"],
  ["API 回應 404 代表？", ["找不到資源", "已建立", "成功", "伺服器內部錯誤"], "404 Not Found。"],
  ["REST 中 stateless 指？", ["每個請求自帶所需資訊，伺服器不保存會話狀態", "不用 HTTP", "只支援 XML", "不能認證"], "請求彼此獨立。"]
]);
C(87, ["JSON：Object 用 {}，Array 用 []，鍵必須用雙引號", "值可為字串、數字、布林、null、物件、陣列", "最後一項後不可有逗號；標準 JSON 不支援註解", "XML 用開始及結束標籤"], ["true 不加引號才是布林；\"true\" 是字串"], [], [
  ["哪項是有效 JSON？", ["{\"vlan\": 10, \"name\": \"SALES\"}", "{vlan: 10}", "{\"vlan\": 10,}", "{'vlan': 10}"], "鍵及字串要用雙引號，且不可尾逗號。"],
  ["In JSON, square brackets represent:", ["An array", "An object", "A comment", "An attribute"], "[] 是陣列；{} 是物件。"],
  ["JSON 布林值應如何寫？", ["true", "\"true\"", "True", "TRUE"], "JSON 布林全小寫且不加引號。"]
]);
C(88, ["Controller-based：集中管理及自動化，透過 API 操作", "Meraki 是雲端管理；DNA Center（現稱 Catalyst Center）是 Cisco 企業網路控制器", "Northbound API 接應用；Southbound 接設備"], ["Northbound 向上接應用；Southbound 向下接設備"], [], [
  ["A controller's northbound API communicates with:", ["Applications", "Physical cables", "Only switches", "ARP tables"], "向上提供給應用及腳本。"],
  ["Meraki 的主要管理方式？", ["雲端 Dashboard", "每部只可 Console", "只用 Telnet", "不可集中管理"], "Meraki 以雲端集中管理著稱。"],
  ["傳統逐部 CLI 相比控制器管理的弱點？", ["大規模變更較慢且易不一致", "完全不能配置", "不能用 SSH", "不支援 VLAN"], "控制器可集中及自動化。"]
]);
C(89, ["2.4 GHz 非重疊頻道 1、6、11；5 GHz 頻道更多、干擾較少", "SSID 是網路名稱；BSSID 是 AP 無線接口的 MAC", "Lightweight AP + WLC 用 CAPWAP：UDP 5246 控制、5247 數據", "AP 接 Access Port（FlexConnect 視設計）；WLC 上行常用 Trunk/LAG"], ["Autonomous AP 獨立配置；Lightweight AP 由 WLC 管理"], [], [
  ["Which channels are non-overlapping in 2.4 GHz?", ["1, 6, 11", "1, 2, 3", "2, 7, 12", "36, 40, 44"], "36、40、44 屬 5 GHz。"],
  ["Lightweight AP 與 WLC 間使用？", ["CAPWAP", "OSPF", "PAgP", "ARP"], "CAPWAP 隧道。"],
  ["CAPWAP control traffic uses which port?", ["UDP 5246", "UDP 5247", "TCP 22", "UDP 161"], "5247 用於數據。"]
]);

C(91, ["IPv6 128 bits，以 8 組 Hex 表示", "可省前導 0；連續全 0 可用 :: 省略一次", "Global Unicast 2000::/3；Link-local FE80::/10；ULA FC00::/7；Multicast FF00::/8", "IPv6 沒有廣播；EUI-64 用 MAC 中間加 FFFE 並反轉第 7 bit"], ["同一地址只可用一次 ::"], [], [
  ["How long is an IPv6 address?", ["128 bits", "32 bits", "48 bits", "64 bits"], "IPv6 128 bits。"],
  ["FE80::1 屬於哪類？", ["Link-local", "Global Unicast", "Multicast", "Loopback"], "FE80::/10 是 Link-local。"],
  ["2001:0DB8:0000:0000:0000:0000:0000:0001 的正確縮寫？", ["2001:DB8::1", "2001:DB8:1", "2001::DB8::1", "21:DB8::1"], "去前導 0，並用一次 ::。"]
]);
C(92, ["`ipv6 unicast-routing` 才會轉發 IPv6", "NDP 用 ICMPv6：NS / NA 取代 ARP", "SLAAC 由 RS / RA 取得前綴，自動產生地址"], ["接口有 IPv6 地址不等於路由器會轉發，要開 unicast-routing"], ["ipv6 unicast-routing", "ipv6 address 2001:db8:1::1/64", "ipv6 route ::/0 2001:db8:2::2", "show ipv6 route"], [
  ["啟用 IPv6 路由轉發：", "ipv6 unicast-routing", "全局配置模式。"],
  ["Which replaces ARP in IPv6?", ["NDP", "DHCPv4", "CDP", "STP"], "使用 ICMPv6 訊息。"],
  ["IPv6 預設路由前綴寫法？", ["::/0", "FE80::/10", "FF00::/8", "::1/128"], "::/0 是所有地址。"]
]);
C(93, ["TCP：連接導向、可靠、排序、流量控制；三次握手 SYN、SYN-ACK、ACK", "UDP：無連接、低開銷、不重傳", "常見：HTTP 80、HTTPS 443、SSH 22、Telnet 23、DNS 53、DHCP 67/68、SNMP 161/162、TFTP 69"], ["DNS 主要用 UDP 53，區域傳送等情況用 TCP 53"], [], [
  ["Which protocol uses a three-way handshake?", ["TCP", "UDP", "ICMP", "ARP"], "SYN、SYN-ACK、ACK。"],
  ["實時語音較常用？", ["UDP", "TCP", "OSPF", "ARP"], "延遲比重傳更重要。"],
  ["HTTPS 預設 Port？", ["443", "80", "22", "161"], "HTTP 是 80。"]
]);
C(94, ["DNS 把名稱解析成 IP", "主要 Port 53（常用 UDP，也可用 TCP）", "A 記錄 IPv4；AAAA 記錄 IPv6；CNAME 別名；MX 郵件"], ["DNS 查 IP；ARP 查同網段 MAC"], ["ip name-server 8.8.8.8", "ip domain-lookup"], [
  ["Which DNS record maps a name to an IPv6 address?", ["AAAA", "A", "MX", "PTR"], "A 對應 IPv4。"],
  ["DNS 預設 Port？", ["53", "67", "80", "123"], "常用 UDP 53。"],
  ["Router 設定 DNS 伺服器 8.8.8.8：", "ip name-server 8.8.8.8", "全局配置模式。"]
]);
C(95, ["FHRP 令預設閘道有冗餘", "HSRP 是 Cisco 私有：Active / Standby，共享虛擬 IP 及虛擬 MAC", "HSRP 預設 Priority 100；較大者優先，要 preempt 才能搶回", "其他：VRRP 為開放標準，GLBP 可負載平衡"], ["主機的 Gateway 應設 Virtual IP，不是實體 IP"], ["standby 1 ip 10.0.0.254", "standby 1 priority 110", "standby 1 preempt", "show standby"], [
  ["Hosts should use which IP as default gateway with HSRP?", ["Virtual IP", "Active router physical IP", "Standby router physical IP", "Loopback IP"], "切換時不用改主機。"],
  ["HSRP 預設 Priority？", ["100", "1", "32768", "110"], "可改大值使其優先。"],
  ["令高優先級 Router 可搶回 Active：", "standby 1 preempt", "預設不會自動搶佔。"]
]);
C(96, ["Syslog 把事件送到日誌伺服器，常用 UDP 514", "嚴重度 0–7：Emergency、Alert、Critical、Error、Warning、Notification、Informational、Debugging", "數字越小越嚴重"], ["`logging trap 4` 會送 0–4 級"], ["logging host 10.0.0.5", "logging trap warnings", "show logging"], [
  ["Syslog severity 0 is:", ["Emergency", "Debugging", "Warning", "Notification"], "0 最嚴重。"],
  ["Debugging 級別是？", ["7", "0", "4", "5"], "7 最詳細。"],
  ["送日誌到 10.0.0.5：", "logging host 10.0.0.5", "也可寫 logging 10.0.0.5。"]
]);
C(97, ["SNMP 用於監控及管理設備", "NMS 向 Agent 查詢 MIB；Agent 可主動發 Trap", "Polling UDP 161；Trap UDP 162", "SNMPv3 支援認證及加密"], ["v2c Community 為明文，安全性低"], ["snmp-server community READONLY ro", "snmp-server host 10.0.0.5 version 2c READONLY"], [
  ["SNMP traps use which UDP port?", ["162", "161", "514", "123"], "Polling 用 161。"],
  ["Which SNMP version supports encryption?", ["SNMPv3", "SNMPv1", "SNMPv2c", "All"], "v3 支援認證及加密。"],
  ["SNMP 的資料庫結構叫？", ["MIB", "LSDB", "RIB only", "ARP table"], "以 OID 組織的 MIB。"]
]);
C(98, ["QoS 管理擠塞時的流量優先次序", "流程：分類 / 標記 → 排隊 / 調度 → 整形 / 監管", "DSCP EF 常用於語音；語音要求低延遲、低 Jitter、低丟包", "Policing 丟棄或重標記；Shaping 緩存延遲發送"], ["Shaping 一般用於出向緩衝；Policing 可直接丟棄超額"], [], [
  ["Which DSCP marking is commonly used for voice?", ["EF", "CS0", "AF11", "BE"], "EF = Expedited Forwarding。"],
  ["語音最敏感的是？", ["延遲與 Jitter", "Hostname", "ARP 表大小", "Duplex 名稱"], "語音需穩定低延遲。"],
  ["Shaping 與 Policing 的差別？", ["Shaping 緩存超額流量；Policing 通常丟棄或重標記", "兩者完全相同", "Shaping 只會丟棄", "Policing 只用於 VLAN"], "這是常考比較。"]
]);
C(99, ["SDN 把 Control Plane 與 Data Plane 分開", "Controller 集中決策，設備負責轉發", "Management Plane 負責管理，如 SSH、SNMP", "Overlay 是虛擬網路；Underlay 是實體 IP 網路；Fabric 是整體架構"], ["轉發封包是 Data Plane；建立路由是 Control Plane"], [], [
  ["Which plane forwards user traffic?", ["Data plane", "Control plane", "Management plane", "Application plane"], "Control Plane 決定路徑。"],
  ["OSPF 運作屬於哪個 Plane？", ["Control", "Data", "Management", "Physical"], "路由協議計算屬 Control Plane。"],
  ["SD-Access 中，Underlay 指？", ["實體 IP 網路", "VPN 用戶", "應用程式", "DNS 名稱"], "Overlay 建於 Underlay 之上。"]
]);
