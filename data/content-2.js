// Module 4-6
C(25, ["VLAN 在 L2 分割廣播域", "可提升安全、減少廣播、按部門分組", "不同 VLAN 通信要靠 L3（Router 或 L3 Switch）"], ["同一 Switch 上不同 VLAN 預設也不能直接通信"], [], [
  ["Each VLAN represents a separate:", ["Broadcast domain", "Routing protocol", "Collision-free WAN", "Autonomous system"], "一個 VLAN = 一個廣播域。"],
  ["不同 VLAN 的 PC 要通信，需要？", ["L3 路由", "更多 Hub", "更長的網線", "只改 Hostname"], "跨 VLAN 必須路由。"],
  ["劃分 VLAN 不直接帶來哪項效果？", ["增加 Internet 帶寬", "縮小廣播範圍", "隔離部門", "簡化邏輯分組"], "VLAN 不會增加對外帶寬。"]
]);
C(26, ["VLAN ID 範圍 1–4094；1–1005 為 normal，1006–4094 為 extended", "VLAN 1 預設存在且不可刪除；1002–1005 也不可刪除", "刪除 VLAN 後，原接口仍屬該 VLAN 但會失效，應改派"], ["`no vlan 10` 會刪除 VLAN，但不會自動把接口改回 VLAN 1"], ["vlan 10", "name SALES", "no vlan 10", "show vlan brief"], [
  ["建立 VLAN 10 的指令（Global Config）：", "vlan 10", "進入 VLAN 配置模式；不存在就建立。"],
  ["查看 VLAN 及其接口的簡表：", "show vlan brief", "快速確認 VLAN 與 Access 接口。"],
  ["Which VLAN cannot be deleted?", ["VLAN 1", "VLAN 10", "VLAN 20", "VLAN 4094"], "VLAN 1 及 1002–1005 不可刪除。"]
]);
C(27, ["Access Port：只屬一個 Data VLAN，接 PC", "Trunk：用 802.1Q 傳多個 VLAN，常用於 Switch 之間", "802.1Q 在 Frame 加 4 bytes Tag，VLAN ID 佔 12 bits"], ["Access 流量一般不帶 Tag；Trunk 除 Native VLAN 外帶 Tag"], ["switchport mode access", "switchport access vlan 10", "switchport mode trunk"], [
  ["把接口放入 VLAN 10（接口模式）：", "switchport access vlan 10", "配合 switchport mode access 使用。"],
  ["把接口設為 Trunk（接口模式）：", "switchport mode trunk", "部分型號需先設 switchport trunk encapsulation dot1q。"],
  ["How large is the 802.1Q tag?", ["4 bytes", "2 bytes", "12 bytes", "20 bytes"], "4 bytes，其中 VID 佔 12 bits。"]
]);
C(28, ["Trunk 預設允許全部 VLAN", "用 allowed vlan 限制通過的 VLAN，減少不必要流量", "新增時要用 `add`，否則會覆蓋舊列表"], ["`allowed vlan 30` 會把列表改成只有 30；要追加應用 `add 30`"], ["switchport trunk allowed vlan 10,20", "switchport trunk allowed vlan add 30", "show interfaces trunk"], [
  ["在現有 Trunk 列表追加 VLAN 30，不影響其他 VLAN：", "switchport trunk allowed vlan add 30", "不寫 add 會覆蓋整個列表。"],
  ["查看 Trunk 狀態及允許 VLAN：", "show interfaces trunk|show interface trunk", "可看 Native VLAN 及 allowed VLAN。"],
  ["By default a trunk allows:", ["All VLANs (1-4094)", "VLAN 1 only", "No VLANs", "Only the native VLAN"], "預設全部允許。"]
]);
C(29, ["Native VLAN 的流量在 802.1Q Trunk 上不加 Tag", "預設 Native VLAN = VLAN 1", "兩端應一致；不一致可能跨 VLAN 串流，CDP 會警告"], ["Native VLAN 不代表不傳資料，只是不打 Tag"], ["switchport trunk native vlan 99"], [
  ["把 Native VLAN 改為 99（接口模式）：", "switchport trunk native vlan 99", "兩端都應使用相同 Native VLAN。"],
  ["802.1Q trunk: how is native VLAN traffic sent?", ["Untagged", "Double-tagged", "Encrypted", "Dropped"], "Native VLAN 不打 Tag。"],
  ["兩端 Native VLAN 不一致，常見後果是？", ["流量落入錯誤 VLAN 及 CDP 警告", "OSPF AD 改變", "IP 地址自動改變", "所有接口自動關閉"], "未打 Tag 的 Frame 會被對方歸入其 Native VLAN。"]
]);
C(32, ["多條鏈路並行時，STP 通常只留一條轉發", "EtherChannel 把多條實體鏈路綁成一條邏輯鏈路", "好處：加帶寬、有冗餘、避免 STP 封鎖成員鏈路"], ["單一數據流不一定能用到總帶寬，因為是按 Hash 分流"], [], [
  ["How does STP view an EtherChannel?", ["As one logical link", "As separate blocked links", "As a router", "As a VLAN"], "整組視為一條邏輯鏈路。"],
  ["EtherChannel 的主要好處是？", ["增加可用帶寬及提供鏈路冗餘", "取代 VLAN", "取消 IP", "自動做 NAT"], "成員鏈路同時使用，其一故障仍可運作。"],
  ["同一流量是否一定分攤到所有成員？", ["不一定，按 Hash 選成員", "一定平均", "只走第一條永不切換", "每個 Frame 隨機亂序"], "負載平衡基於 Hash，同一流量通常走同一鏈路。"]
]);
C(33, ["靜態模式 `mode on`：不發協商封包", "兩端都要設 on 才能成組", "成員接口要速度、雙工、VLAN 或 Trunk 設定一致"], ["on 不能與 LACP 或 PAgP 組隊"], ["interface range g0/1-2", "channel-group 1 mode on", "show etherchannel summary"], [
  ["把接口以靜態模式加入 group 1：", "channel-group 1 mode on", "靜態模式不使用協商協議。"],
  ["One side uses mode on, the other uses mode active. Result?", ["No EtherChannel forms properly", "LACP forms", "PAgP forms", "Trunk gets faster"], "on 不與協商協議配對。"],
  ["檢視 EtherChannel 摘要：", "show etherchannel summary", "狀態 P 表示成員已綁定。"]
]);
C(34, ["靜態：on", "動態 LACP（IEEE 802.3ad）：active / passive", "動態 PAgP（Cisco 私有）：desirable / auto"], ["L2 Port-channel 與 L3 Port-channel 是另一種分類：後者要配 IP"], [], [
  ["Which is an open standard?", ["LACP", "PAgP", "CDP", "HSRP"], "LACP 是 IEEE 標準；PAgP 是 Cisco 私有。"],
  ["PAgP 的模式是？", ["desirable / auto", "active / passive", "on / off", "root / designated"], "desirable 主動，auto 被動。"],
  ["L3 EtherChannel 通常要做哪項？", ["在 Port-channel 接口配置 IP", "把接口放入 Access VLAN", "關閉所有路由", "使用 FF:FF MAC"], "L3 Port-channel 視為路由接口。"]
]);
C(35, ["LACP 組合：active+active、active+passive 可成功；passive+passive 失敗", "PAgP 組合：desirable+desirable、desirable+auto 可成功；auto+auto 失敗", "LACP 可設最多 8 條 active 成員（另可有 standby）"], ["至少一方要主動協商"], ["channel-group 1 mode active", "channel-group 1 mode desirable", "interface port-channel 1"], [
  ["Which LACP combination fails?", ["passive + passive", "active + active", "active + passive", "passive + active"], "兩邊都被動就不會開始協商。"],
  ["Which PAgP combination forms a channel?", ["desirable + auto", "auto + auto", "active + auto", "on + desirable"], "desirable 主動，auto 回應。"],
  ["以 LACP 主動模式加入 group 2：", "channel-group 2 mode active", "active 主動發 LACPDU。"]
]);
C(36, ["CDP：Cisco 私有，預設開啟；預設每 60 秒，holdtime 180 秒", "LLDP：IEEE 802.1AB；預設每 30 秒，holdtime 120 秒", "用途：看直連鄰居、型號、接口，方便排錯"], ["兩者只看直連鄰居，不是路由協議"], ["cdp run", "lldp run", "show cdp neighbors", "show lldp neighbors"], [
  ["全局開啟 LLDP：", "lldp run", "LLDP 在部分 IOS 預設關閉。"],
  ["查看 CDP 鄰居：", "show cdp neighbors|show cdp neighbor", "加 detail 可看更多，例如 IP。"],
  ["Which is the open standard discovery protocol?", ["LLDP", "CDP", "PAgP", "HSRP"], "LLDP 是 IEEE 802.1AB。"]
]);
C(38, ["冗餘鏈路會形成 L2 環路", "問題：廣播風暴、MAC 表不穩定、重複 Frame", "Ethernet Frame 沒有 TTL，環路中可一直循環"], ["IP 有 TTL，但 L2 Frame 沒有"], [], [
  ["Why are L2 loops dangerous?", ["Frames have no TTL and can loop forever", "IP addresses change", "OSPF runs faster", "Switches stop learning all traffic instantly"], "L2 無 TTL，會引發廣播風暴。"],
  ["L2 環路不會直接造成？", ["路由 AD 自動變 0", "廣播風暴", "MAC 表抖動", "重複 Frame"], "AD 是 L3 路由的概念。"],
  ["STP 解決的是？", ["L2 環路", "IP 地址耗盡", "加密", "DNS 解析"], "邏輯封鎖冗餘路徑以防環。"]
]);
C(39, ["目標：冗餘存在但邏輯上無環路", "選一個 Root Bridge，形成生成樹", "主鏈路故障時，被封鎖鏈路可恢復轉發"], ["STP 是邏輯封鎖接口，不是拔掉實體線"], [], [
  ["STP 的核心做法是？", ["封鎖部分接口形成無環路拓撲", "把所有接口改成 L3", "增加 VLAN", "關閉 MAC 學習"], "只留一條有效路徑。"],
  ["鏈路故障後被封鎖的接口會？", ["重新計算後可轉為轉發", "永久關閉", "變成 Router", "刪除 VLAN"], "這就是 STP 的冗餘。"],
  ["The reference point of the spanning tree is the:", ["Root Bridge", "Default Gateway", "DHCP Server", "Native VLAN"], "所有路徑以 Root Bridge 為基準。"]
]);
C(40, ["Bridge ID = Priority + Extended System ID（VLAN）+ MAC", "BID 最小者成為 Root：先比 Priority，再比 MAC", "預設 Priority 32768；可設值是 4096 的倍數"], ["數值越小優先；不是越大越好"], [], [
  ["Two switches have equal priority. Which becomes root?", ["The lower MAC address", "The higher MAC address", "The one with more ports", "The first powered on"], "Priority 相同比 MAC，小者勝。"],
  ["VLAN 10 預設 Bridge Priority 顯示通常是？", ["32778", "32768", "4096", "10"], "32768 + VLAN 10 = 32778。"],
  ["Which priority value is valid?", ["8192", "1000", "33000", "5000"], "必須是 4096 的倍數。"]
]);
C(41, ["BPDU 內含 Root BID、Root Path Cost、Sender BID、Sender Port ID 及計時器", "802.1D 預設：Hello 2 秒、Forward Delay 15 秒、Max Age 20 秒", "比較原則是逐項取較小值"], ["Sender BID 是發送者，不一定是 Root"], [], [
  ["Default STP Hello time?", ["2 seconds", "10 seconds", "15 seconds", "20 seconds"], "Hello 2、FD 15、Max Age 20。"],
  ["BPDU 不包含？", ["OSPF Router ID", "Root Bridge ID", "Root Path Cost", "Sender Bridge ID"], "OSPF RID 與 BPDU 無關。"],
  ["Max Age 的預設值是？", ["20 秒", "2 秒", "15 秒", "50 秒"], "802.1D 預設 20 秒。"]
]);
C(42, ["Non-root Switch 各選一個 Root Port：通往 Root 成本最低", "每條 Segment 選一個 Designated Port", "Root Bridge 的接口一般都是 DP", "常見 Cost：10M=100、100M=19、1G=4、10G=2"], ["Root Bridge 沒有 Root Port"], [], [
  ["How many root ports does the root bridge have?", ["0", "1", "2", "One per VLAN port"], "Root Port 是非 Root 通往 Root 的接口。"],
  ["每條網段有多少個 Designated Port？", ["1", "0", "2", "視乎 MAC 表"], "每段一個 DP。"],
  ["Default STP cost of a 1 Gbps link (short method)?", ["4", "19", "100", "2"], "1G = 4。"]
]);
C(43, ["不是 RP 或 DP 的接口進入封鎖（802.1D 稱 Non-designated）", "RSTP 稱 Alternate 或 Backup", "該接口仍會收 BPDU，以便拓撲變更後接手"], ["Blocking 不學 MAC、不轉發，但會收 BPDU"], [], [
  ["A blocking port still:", ["Receives BPDUs", "Forwards user traffic", "Learns MAC addresses", "Sends OSPF hello"], "封鎖口仍監聽 BPDU。"],
  ["RSTP 中，通往 Root 的備用路徑接口角色是？", ["Alternate", "Designated", "Root", "Edge"], "Alternate 備援 Root Port。"],
  ["接口不是 RP 也不是 DP，會進入？", ["封鎖（Discarding）", "Forwarding", "Trunk", "Err-disabled"], "非指定接口防環。"]
]);
C(44, ["選 RP 比較順序：最低 Root Cost → 最低對端 BID → 最低對端 Port ID", "Port ID = Port Priority（預設 128）+ Port 號", "選 DP 同樣按路徑及發送者屬性比較"], ["Port Priority 在上游（發送方）的數值才影響下游 RP 比較"], ["spanning-tree vlan 10 cost 10", "spanning-tree vlan 10 port-priority 64"], [
  ["Root Cost 相同時，下一個 RP 比較項？", ["對端 Bridge ID", "接口速度名稱", "Hostname", "IP 地址"], "接著比對端 BID，再比對端 Port ID。"],
  ["Default port priority?", ["128", "32768", "4", "64"], "Port Priority 預設 128。"],
  ["同一鄰居兩條等成本鏈路，通常比？", ["對端 Port ID", "本機 Hostname", "目的 IP", "ARP 表"], "同一鄰居時 BID 相同，再比 Port ID。"]
]);
C(45, ["傳統角色：Root、Designated、Non-designated", "802.1D 狀態：Blocking、Listening、Learning、Forwarding（及 Disabled）", "Learning 會學 MAC 但不轉用戶資料；Forwarding 兩者都做"], ["角色是位置與功能；狀態是當下行為"], [], [
  ["Which state learns MAC addresses but does not forward user data?", ["Learning", "Listening", "Blocking", "Forwarding"], "Learning 為轉發前做準備。"],
  ["Listening 狀態是否學 MAC？", ["否", "是", "只學組播", "只學 Trunk"], "Listening 只處理 BPDU。"],
  ["Which port role forwards toward the root bridge from a non-root switch?", ["Root Port", "Designated Port", "Alternate Port", "Backup Port"], "RP 是往 Root 的最佳路徑。"]
]);
C(46, ["典型過程：Blocking → Listening 15s → Learning 15s → Forwarding", "鏈路故障間接感知時，可能 Max Age 20s + 15s + 15s = 50 秒", "RSTP 用 Proposal/Agreement，可遠比傳統 STP 快"], ["連接新裝置常見 30 秒等待，就是 Listening + Learning"], [], [
  ["傳統 STP 由 Blocking 轉 Forwarding 最壞常見時間？", ["50 秒", "2 秒", "10 秒", "5 分鐘"], "20 + 15 + 15。"],
  ["Listening + Learning total default?", ["30 seconds", "15 seconds", "20 seconds", "60 seconds"], "各 15 秒。"],
  ["RSTP 的狀態不包括？", ["Blocking（以 Discarding 代替）", "Discarding", "Learning", "Forwarding"], "RSTP 三狀態：Discarding、Learning、Forwarding。"]
]);
C(47, ["接 PC 或伺服器的接口可設 Edge Port（PortFast）", "直接進入 Forwarding，跳過 Listening 及 Learning", "不可接 Switch，否則可能形成環路"], ["PortFast 只應用於終端接口"], ["spanning-tree portfast", "spanning-tree portfast default"], [
  ["在接口啟用 PortFast：", "spanning-tree portfast", "可加快終端接入。"],
  ["PortFast should be enabled on:", ["Access ports connected to end hosts", "Links between core switches", "All trunks by default", "Router WAN serial links only"], "避免在 Switch 互連口使用。"],
  ["PortFast 令接口跳過哪些狀態？", ["Listening 及 Learning", "Forwarding", "Blocking 及 Forwarding", "全部包括 Forwarding"], "直接進入 Forwarding。"]
]);
C(48, ["BPDU Guard：Edge Port 收到 BPDU 就 err-disabled", "防止用戶私接 Switch 導致環路或影響 Root", "恢復：`shutdown` + `no shutdown` 或設定 errdisable recovery"], ["BPDU Guard 是關閉接口；BPDU Filter 是過濾 BPDU"], ["spanning-tree bpduguard enable", "spanning-tree portfast bpduguard default"], [
  ["在接口啟用 BPDU Guard：", "spanning-tree bpduguard enable", "常配 PortFast 使用。"],
  ["A BPDU Guard port receives a BPDU. What state results?", ["err-disabled", "forwarding", "listening", "trunking"], "接口被錯誤關閉。"],
  ["手動恢復 err-disabled 接口的方法？", ["先 shutdown 再 no shutdown", "reload VLAN", "clear arp", "no vlan 1"], "問題先解決，再重啟接口。"]
]);
C(49, ["版本：802.1D、PVST+、802.1w RSTP、Rapid PVST+、802.1s MST", "PVST+ 每 VLAN 一棵樹，可做 VLAN 負載分擔", "Rapid PVST+ 是 RSTP 的 Cisco 每 VLAN 版本"], ["RSTP 收斂快，但 PVST 系列每 VLAN 運算較耗資源"], ["spanning-tree mode rapid-pvst", "spanning-tree vlan 10 priority 4096", "show spanning-tree vlan 10"], [
  ["切換為 Rapid PVST+：", "spanning-tree mode rapid-pvst", "全局配置模式。"],
  ["Which standard is RSTP?", ["802.1w", "802.1D", "802.1Q", "802.3ad"], "802.1w = RSTP；802.1s = MST。"],
  ["PVST+ 的特點是？", ["每個 VLAN 有獨立 STP 實例", "所有 VLAN 只能一棵樹", "不使用 BPDU", "只適用於 Router"], "可為不同 VLAN 選不同 Root。"]
]);
C(50, ["`root primary` 令該 Switch 成為 Root：一般設 24576，或比現任 Root 低 4096", "`root secondary` 通常設 28672，作備用 Root", "相比直接改 priority，它是巨集式設定"], ["它只在下指令當刻計算；之後別的 Switch 再調低仍可搶 Root"], ["spanning-tree vlan 10 root primary", "spanning-tree vlan 10 root secondary"], [
  ["令本機成為 VLAN 10 Root 的巨集指令：", "spanning-tree vlan 10 root primary", "會自動調低 Priority。"],
  ["root secondary typically sets priority to:", ["28672", "24576", "32768", "4096"], "作為備用 Root。"],
  ["另一種做法是直接設定？", ["spanning-tree vlan 10 priority 4096", "router ospf 10", "vlan 4096", "ip route 0.0.0.0"], "把 Priority 設成較小值。"]
]);

window.CCNA.labs[30] = ["拓撲：2 部 2960 Switch 以 G0/1 互連，SW1、SW2 各接 VLAN 10 及 20 的 PC。", "在兩部 Switch 建立 VLAN：vlan 10 / name SALES、vlan 20 / name IT。", "把 PC 接口設為 switchport mode access 及 switchport access vlan X。", "互連口設 switchport mode trunk；Native VLAN 改為 99，並只允許 10,20,99。", "用 show vlan brief、show interfaces trunk 核對。", "驗證：同 VLAN 可 ping，不同 VLAN 不可 ping。"];
window.CCNA.labs[51] = ["拓撲：3 部 Switch 成三角形互連，每條鏈路都設為 Trunk。", "先用 show spanning-tree 找出預設 Root，並根據 Priority 與 MAC 說明原因。", "在你想要的 Switch 輸入 spanning-tree vlan 1 root primary。", "再檢查所有接口角色，找出 Root、Designated、被封鎖的接口。", "拔走一條轉發鏈路，觀察被封鎖接口如何恢復。", "把一個 PC 接口設 PortFast 及 BPDU Guard，接入另一部 Switch，觀察 err-disabled。"];
