// Module 1-3
C(1, ["OSI 七層由上至下：Application、Presentation、Session、Transport、Network、Data Link、Physical", "PDU：Transport = Segment；Network = Packet；Data Link = Frame；Physical = Bits", "代表：L2 Switch / MAC，L3 Router / IP，L4 TCP / UDP"], ["L2 看 MAC，L3 看 IP，L4 看 Port，不要混淆"], [], [
  ["Which OSI layer is responsible for logical addressing and routing?", ["Network layer", "Data Link layer", "Transport layer", "Session layer"], "L3 Network 負責 IP 地址及路由。"],
  ["Data Link 層的 PDU 叫甚麼？", ["Frame", "Packet", "Segment", "Bit"], "L2 = Frame，L3 = Packet，L4 = Segment。"],
  ["TCP 和 UDP 屬於 OSI 哪一層？", ["Transport", "Network", "Session", "Application"], "TCP / UDP 在 L4，用 Port 區分應用。"]
]);
C(2, ["分層令每層只處理自己的工作，修改一層不必重寫全部", "不同廠商只要遵守標準就能互通", "排錯可逐層檢查：線路 → MAC → IP → Port → 應用"], ["OSI 主要是參考模型；實際網路主要跑 TCP/IP"], [], [
  ["使用分層模型的主要好處是？", ["標準化令不同廠商設備可互通", "令封包傳得更快", "取代所有路由協議", "不再需要 IP 地址"], "分層的核心是標準化、模組化及方便排錯。"],
  ["網線鬆脫應先歸類為哪一層的問題？", ["Physical", "Network", "Transport", "Application"], "線路、接口及訊號都屬 L1。"],
  ["ping 目的 IP 失敗，但同網段 Switch 的 MAC 表正常，下一步最應檢查哪一層？", ["Layer 3 的 IP 及路由", "Layer 7 的網頁內容", "Layer 1 的電源標準", "Layer 6 的加密"], "L2 正常後，往上查 L3 的 IP、Mask、Gateway 及路由。"]
]);
C(3, ["TCP/IP 四層：Application、Transport、Internet、Network Access", "常見五層版把 Network Access 拆成 Data Link 及 Physical", "OSI 的 Application、Presentation、Session 對應 TCP/IP 的 Application"], ["OSI L3 Network 對應 TCP/IP 的 Internet 層"], [], [
  ["OSI Network layer maps to which layer of the TCP/IP model?", ["Internet", "Transport", "Application", "Network Access"], "L3 Network 對應 TCP/IP Internet 層。"],
  ["OSI 的 Session、Presentation 在 TCP/IP 四層模型中屬於？", ["Application", "Transport", "Internet", "Network Access"], "OSI L5–L7 都併入 TCP/IP Application。"],
  ["HTTP 在 TCP/IP 模型的哪一層？", ["Application", "Internet", "Transport", "Network Access"], "HTTP 是應用層協議，下層用 TCP。"]
]);
C(4, ["User EXEC 提示符 `>`：權限最低，只能看少量資訊", "Privileged EXEC 提示符 `#`：可用 show、copy、reload", "Global Config 提示符 `(config)#`：修改整部設備的設定"], ["`enable` 是進入特權模式；`configure terminal` 才是進入配置模式"], ["enable", "configure terminal", "exit / end"], [
  ["提示符 `Switch#` 代表甚麼模式？", ["Privileged EXEC", "User EXEC", "Global Configuration", "Interface Configuration"], "`#` 且沒有 (config) 就是特權模式。"],
  ["由 User EXEC 進入 Privileged EXEC，要輸入完整指令：", "enable", "enable 進入特權模式。"],
  ["由 Privileged EXEC 進入 Global Config，要輸入完整指令：", "configure terminal|conf t", "configure terminal 進入全局配置模式。"]
]);
C(5, ["`?` 查指令，Tab 補完，`no` 取消設定", "`hostname` 改名，`banner motd` 設登入提示", "running-config 在 RAM（現行），startup-config 在 NVRAM（開機）"], ["不執行 `copy running-config startup-config`，重開機後新設定會消失"], ["hostname SW1", "banner motd #Authorized only#", "show running-config", "copy running-config startup-config"], [
  ["Where is the startup-config stored on a Cisco device?", ["NVRAM", "RAM", "Flash only as IOS image", "ROM"], "startup 在 NVRAM，running 在 RAM。"],
  ["把現行設定存成開機設定的完整指令：", "copy running-config startup-config|copy run start", "也可寫 copy run start。"],
  ["將設備命名為 R1 的指令（Global Config）：", "hostname R1", "hostname 在全局配置模式設定。"]
]);
C(7, ["以太網在 L2 用 MAC 地址在同一網段內傳送 Frame", "Frame 包含目的 MAC、來源 MAC、Type、Data、FCS", "全雙工可同時收發，沒有碰撞；半雙工才要 CSMA/CD"], ["FCS 只用於偵測錯誤，錯誤 Frame 會丟棄，不負責修正"], [], [
  ["以太網 Frame 的 FCS 用途是？", ["偵測傳輸錯誤", "加密資料", "選擇路由", "修正錯誤資料"], "FCS 是錯誤檢查；校驗失敗就丟棄。"],
  ["CSMA/CD is used mainly on which kind of link?", ["Half-duplex Ethernet", "Full-duplex Ethernet", "Serial PPP only", "Fibre trunk only"], "全雙工沒有碰撞，不需 CSMA/CD。"],
  ["L2 Frame 主要用哪種地址在同一網段傳送？", ["MAC 地址", "IP 地址", "Port 號", "VLAN 名稱"], "L2 以 MAC 為依據。"]
]);
C(8, ["MAC 地址長 48 bits（6 bytes），以 12 個十六進制表示", "前 24 bits 是 OUI（廠商），後 24 bits 由廠商分配", "一般燒錄在網卡上，同一區網內應保持唯一"], ["IPv4 是 32 bits；MAC 是 48 bits"], [], [
  ["How long is a MAC address?", ["48 bits", "32 bits", "64 bits", "128 bits"], "MAC 地址 48 bits。"],
  ["MAC 地址前 24 bits 叫甚麼？", ["OUI", "VLAN ID", "FCS", "Subnet ID"], "OUI 代表製造商。"],
  ["一個 MAC 地址用多少個十六進制字元表示？", ["12", "8", "16", "32"], "每 4 bits 一個 hex，48 ÷ 4 = 12。"]
]);
C(9, ["單播：第一個 byte 最低位 = 0，指向單一設備", "組播：第一個 byte 最低位 = 1，例如 IPv4 組播對應 01:00:5E", "廣播：全 1，即 FF:FF:FF:FF:FF:FF"], ["廣播也是一種 first-byte 最低位 = 1 的地址，但它是全 F"], [], [
  ["Which MAC address is a broadcast address?", ["FF:FF:FF:FF:FF:FF", "00:00:00:00:00:00", "01:00:5E:00:00:01", "00:1A:2B:3C:4D:5E"], "全 F 是廣播。"],
  ["01:00:5E:00:00:05 屬於哪類地址？", ["組播", "單播", "廣播", "未指定地址"], "01:00:5E 開頭用於 IPv4 組播。"],
  ["Switch 收到目的 MAC 是全 F 的 Frame，會怎樣？", ["從同 VLAN 所有其他接口泛洪", "只從來源接口送回", "直接丟棄", "交給路由器再轉發"], "廣播在同一 VLAN 內泛洪，來源口除外。"]
]);
C(10, ["IP 是邏輯地址（L3），跨網段找到目的網路", "MAC 是物理地址（L2），負責當前一跳的傳送", "經過路由器時 MAC 會換，來源及目的 IP 通常不變（沒有 NAT 時）"], ["最終目的 IP 不變，但目的 MAC 會指向下一跳"], [], [
  ["封包穿過一部路由器時，一般哪項會改變？", ["來源及目的 MAC", "來源及目的 IP", "TCP Port", "應用資料"], "每一跳重新封裝 L2；沒有 NAT 時 IP 不變。"],
  ["PC 傳資料去另一網段，Frame 的目的 MAC 應是？", ["預設閘道的 MAC", "遠端主機的 MAC", "全 F", "來源主機的 MAC"], "跨網段時先交給 Gateway。"],
  ["Which address is used for end-to-end logical delivery across networks?", ["IP address", "MAC address", "OUI", "FCS"], "IP 用於跨網段的端到端邏輯定址。"]
]);
C(11, ["通信封裝四要素：來源 IP、目的 IP、來源 MAC、目的 MAC", "目的 IP 在同網段：目的 MAC 用對方 MAC", "目的 IP 在其他網段：目的 MAC 用 Gateway MAC", "封裝順序：Data → Segment → Packet → Frame → Bits"], ["IP 由 DNS 或用戶提供；MAC 由 ARP 查出"], [], [
  ["PC 已知目的 IP，但未知同網段對方 MAC，會用甚麼協議？", ["ARP", "DNS", "DHCP", "ICMP"], "ARP 由 IP 查 MAC。"],
  ["The correct encapsulation order is:", ["Data, Segment, Packet, Frame, Bits", "Data, Packet, Segment, Frame, Bits", "Bits, Frame, Packet, Segment, Data", "Data, Frame, Packet, Segment, Bits"], "由上而下逐層封裝。"],
  ["PC 判斷目的地是否同網段，靠甚麼比較？", ["自己的 IP + Mask 與目的 IP", "MAC 表", "DNS 記錄", "Port 號"], "先用 Mask 計算網段，再決定直接送或交 Gateway。"]
]);
C(12, ["ARP Request 問：「某 IP 是誰？」", "目的 MAC 是 FF:FF:FF:FF:FF:FF，同一廣播域都會收到", "ARP 的 EtherType 是 0x0806"], ["ARP 不會穿越路由器；跨網段時是問 Gateway 的 MAC"], [], [
  ["An ARP Request is sent to which destination MAC?", ["FF:FF:FF:FF:FF:FF", "00:00:00:00:00:00", "Gateway MAC only", "01:00:5E:00:00:01"], "ARP Request 是廣播。"],
  ["ARP Frame 的 EtherType 是？", ["0x0806", "0x0800", "0x86DD", "0x8100"], "0x0800 是 IPv4，0x86DD 是 IPv6，0x8100 是 802.1Q。"],
  ["PC 要連另一網段主機，ARP 請求問的是誰？", ["預設閘道 IP", "遠端主機 IP", "DNS 伺服器的 MAC 表", "Switch 的 VLAN"], "跨網段要先取得 Gateway MAC。"]
]);
C(13, ["只有擁有被查詢 IP 的設備才會回覆", "ARP Reply 是單播，直接回給請求者", "回覆內容提供 IP 與 MAC 的對應"], ["請求是廣播，回覆是單播"], [], [
  ["ARP Reply 通常是哪類傳送？", ["單播", "廣播", "組播", "任播"], "回覆者已由 Request 得知請求者 MAC，所以單播。"],
  ["Which device replies to a normal ARP Request?", ["The device owning the requested IP", "Every switch on the VLAN", "The DNS server", "All routers on the Internet"], "只有目標 IP 的擁有者回覆。"],
  ["收到 ARP Reply 後，請求者會做甚麼？", ["把 IP-MAC 寫入 ARP 表並傳資料", "立即再發 DHCP Discover", "重設網卡", "更新路由表的 AD"], "學到對應關係後便可封裝 Frame。"]
]);
C(14, ["動態項：由 ARP 交換學到，閒置後老化", "靜態項：人手設定，不會自動老化", "Cisco 路由器可用 `show ip arp`；Windows 用 `arp -a`"], ["ARP 表記錄 IP↔MAC；Switch 的 MAC 表記錄 MAC↔Port"], ["show ip arp", "arp 10.0.0.5 0011.2233.4455 ARPA"], [
  ["Cisco 路由器查看 ARP 表的指令：", "show ip arp|show arp", "show ip arp 或 show arp 都可。"],
  ["ARP 表記錄的是？", ["IP 與 MAC 的對應", "MAC 與 Port 的對應", "網段與 Next Hop", "VLAN 與 Port"], "MAC↔Port 是 Switch 的 MAC 表。"],
  ["手動設定的 ARP 項稱為？", ["靜態 ARP", "免費 ARP", "代理 ARP", "廣播 ARP"], "靜態項由人手維護。"]
]);
C(15, ["1 先查本機 ARP 表", "2 無記錄就廣播 ARP Request", "3 目標單播 ARP Reply", "4 請求者更新 ARP 表後傳送資料"], ["Switch 只轉發 ARP，自身不是因此才產生 IP 對應"], [], [
  ["PC 傳資料前，ARP 的第一步是？", ["查本機 ARP 表", "立即發 DNS 查詢", "發送 Reply", "清除 MAC 表"], "有快取就不用廣播。"],
  ["PC1 ARP 廣播經 Switch 時，Switch 能學到甚麼？", ["PC1 MAC 與入口 Port", "PC1 的 Hostname", "PC2 的路由表", "遠端網段的 AD"], "Switch 由來源 MAC 學習。"],
  ["Which is true after a host receives an ARP Request addressed to its IP?", ["It may learn the sender's IP-MAC mapping and unicasts a reply", "It floods a reply to all ports", "It sends DHCP Offer", "It ignores it"], "目標主機可學請求者對應，並單播回覆。"]
]);
C(16, ["Gratuitous ARP：主動宣告自己的 IP-MAC", "用途：偵測 IP 衝突，以及更新其他設備的 ARP 表", "常見於開機、IP 變更、HSRP 主備切換"], ["免費 ARP 不是問別人的地址，而是講自己的地址"], [], [
  ["Gratuitous ARP 的典型用途是？", ["偵測 IP 衝突及更新鄰居 ARP 快取", "加密 ARP 表", "取得 DHCP 地址", "建立 OSPF 鄰居"], "主動公布自己的對應。"],
  ["In a gratuitous ARP, the target IP is usually:", ["The sender's own IP", "The default gateway only", "The DNS server", "0.0.0.0 only"], "免費 ARP 問的是自己的 IP。"],
  ["HSRP 切換後發免費 ARP，主要是為了？", ["更新 Switch 及主機對虛擬 MAC 的位置", "刪除 VLAN", "關閉 STP", "重新分配 IP"], "令流量快速改走新 Active。"]
]);
C(18, ["Switch 工作在 L2，依 MAC 表轉發", "每個接口是一個碰撞域", "預設同 VLAN 是同一廣播域"], ["Switch 分割碰撞域；Router 或 VLAN 才分割廣播域"], [], [
  ["A switch with 24 ports in one VLAN has how many broadcast domains by default?", ["1", "24", "2", "0"], "同一 VLAN 是一個廣播域。"],
  ["Switch 每個接口形成？", ["一個碰撞域", "一個 AS", "一個 OSPF Area", "一個子網"], "每口獨立碰撞域。"],
  ["L2 Switch 轉發 Frame 時主要依據？", ["目的 MAC", "目的 IP", "來源 Port 號", "TTL"], "L2 Switch 查 MAC 表。"]
]);
C(19, ["三層架構：Core、Distribution、Access", "Access 接用戶；Distribution 匯聚及策略；Core 高速骨幹", "小型網路可用 Collapsed Core，把 Core 和 Distribution 合併"], ["Core 應快且簡單，不適宜放大量策略"], [], [
  ["Which layer connects end devices?", ["Access", "Core", "Distribution", "WAN"], "用戶、AP、電話接 Access。"],
  ["ACL、路由策略較常放在哪層？", ["Distribution", "Core", "Physical", "Access 的網線上"], "Distribution 負責匯聚及策略控制。"],
  ["Collapsed Core 指？", ["Core 與 Distribution 合併", "Access 與 WAN 合併", "去除所有 Switch", "只用無線"], "適合中小型環境。"]
]);
C(20, ["Switch 由 Frame 的來源 MAC 學習位置", "記錄 MAC、入口 Port、VLAN", "目的 MAC 用來決定如何轉發"], ["學習看來源，轉發看目的"], ["show mac address-table"], [
  ["Switch 如何建立 MAC 表？", ["記錄入站 Frame 的來源 MAC", "記錄入站 Frame 的目的 MAC", "向 DNS 查詢", "向 Router 下載"], "學來源，查目的。"],
  ["查看 MAC 表的完整指令：", "show mac address-table|show mac-address-table", "現行 IOS 常用 show mac address-table。"],
  ["同一 MAC 由另一 Port 進入，Switch 會？", ["更新 MAC 表項到新 Port", "關閉 VLAN", "永久丟棄該 MAC", "發 ARP Reply"], "設備移動時會更新位置。"]
]);
C(21, ["Flood：未知單播、廣播、組播（一般情況）", "Forward：目的 MAC 在表內，從對應 Port 送出", "Filter：目的 Port 與入口相同就丟棄"], ["未知單播會泛洪，不是丟棄"], [], [
  ["Switch receives a unicast frame whose destination MAC is unknown. What does it do?", ["Floods out all ports in the VLAN except the incoming port", "Drops it", "Sends it to the default gateway", "Sends an ARP request"], "這就是 Unknown Unicast Flooding。"],
  ["目的 MAC 在表內且 Port 與入口相同，Switch 會？", ["過濾丟棄", "泛洪", "送回來源", "轉為廣播"], "這是 Filter。"],
  ["Which traffic is normally flooded?", ["Broadcast frames", "Known unicast", "Routed packets on another VLAN", "Frames with bad FCS"], "廣播在同 VLAN 泛洪。"]
]);
C(22, ["動態 MAC 表項預設約 300 秒老化", "收到同一來源 MAC 會刷新計時", "老化令表項不會長期指向錯誤位置，並釋放資源"], ["表項老化後，流量可能先被泛洪，直至重新學到"], ["show mac address-table aging-time", "mac address-table aging-time 300"], [
  ["Default dynamic MAC aging time on many Cisco switches?", ["300 seconds", "30 seconds", "4 hours", "60 minutes"], "常見預設為 300 秒。"],
  ["MAC 表項老化後，再有流量去該 MAC，Switch 會？", ["先泛洪，收到回覆後再學習", "發 Syslog 並關 Port", "轉交 Router", "永久丟棄"], "變成未知單播。"],
  ["甚麼會刷新動態 MAC 的老化計時？", ["收到以該 MAC 為來源的 Frame", "收到 DNS 回覆", "enable 指令", "修改 Hostname"], "持續收到來源 MAC 即刷新。"]
]);
C(23, ["欄位：Preamble 7、SFD 1、Dest 6、Source 6、Type 2、Data 46–1500、FCS 4 bytes", "Type 常見值：0x0800 IPv4、0x0806 ARP、0x86DD IPv6", "標準 Frame 長度 64–1518 bytes（不含 Preamble/SFD）"], ["目的 MAC 排在來源 MAC 之前"], [], [
  ["Which field comes first in the MAC header (after preamble/SFD)?", ["Destination MAC", "Source MAC", "Type", "FCS"], "目的 MAC 先出現，有利快速判斷。"],
  ["Ethernet Payload 最小多少 bytes？", ["46", "64", "20", "1500"], "46–1500；整個 Frame 最小 64。"],
  ["EtherType 0x0800 代表？", ["IPv4", "ARP", "IPv6", "802.1Q"], "0x0800 = IPv4。"]
]);
