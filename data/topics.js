// 主題清單：序號、Module、片名、Category、Action、搜題關鍵字來自你的 Excel。
(function () {
  var V = "睇1.5x", P = "做題", L = "動手做", N = "睇bykat.me筆記", S = "睇系統筆記";
  var modules = [
    { name: "Module 1: 網路基礎+CLI", kw: "OSI / TCP IP / IOS / CLI mode / hostname / banner", items: [
      ["OSI網路參考模型", "Network Core", V], ["網路參考模型的意義", "Network Core", V], ["TCPIP模型簡介", "Network Core", V],
      ["Cisco IOS的3種模式", "Cisco CLI", V], ["IOS基本操作", "Cisco CLI", V], ["【做題】OSI/TCPIP模型對應題", "PRACTICE", P]] },
    { name: "Module 2: Layer2+ARP", kw: "MAC address / ARP / gratuitous ARP / frame / encapsulation", items: [
      ["數據鏈路層-以太網", "Layer 2 Core", V], ["MAC地址構成", "Layer 2 Core", V], ["MAC地址分類", "Layer 2 Core", V], ["IP與MAC的區別", "Layer 2 Core", V],
      ["數據通信封裝4個關鍵元素", "Network Core", V], ["ARP請求-廣播", "ARP Protocol", V], ["ARP回復-單播", "ARP Protocol", V], ["ARP表項的來源", "ARP Protocol", V],
      ["ARP協議工作流程", "ARP Protocol", V], ["免費ARP報文的作用", "ARP Protocol", V], ["【做題】ARP流程+MAC地址判斷題", "PRACTICE", P]] },
    { name: "Module 3: Switching Core", kw: "switch / MAC table / forward / flood / aging", items: [
      ["以太網交換機簡介", "Switching Core", V], ["園網區三層組網架構", "Architecture", V], ["交換機MAC地址表生成", "Switching Core", V],
      ["交換機轉發數據帧的3種行為", "Switching Core", V], ["MAC地址表老化問題", "Switching Core", V], ["以太網帧頭字段", "Layer 2 Core", V], ["【做題】Switch轉發行為判斷題", "PRACTICE", P]] },
    { name: "Module 4: VLAN & Trunk", kw: "VLAN / trunk / native vlan / access port / dot1q", items: [
      ["VLAN簡介", "VLAN & Trunk", V], ["VLAN創建與刪除", "VLAN & Trunk", V], ["Access與Trunk實驗", "VLAN & Trunk", "睇1.5x(概念)"], ["Trunk上的VLAN列表", "VLAN & Trunk", V], ["本征VLAN原理", "VLAN & Trunk", V],
      ["【Lab】Packet Tracer實際做VLAN+Trunk配置", "LAB", L], ["【做題】VLAN/Trunk配置題", "PRACTICE", P]] },
    { name: "Module 5: EtherChannel+LLDP", kw: "EtherChannel / port-channel / LACP / PAgP / CDP / LLDP", items: [
      ["以太通道背景", "EtherChannel", V], ["靜態模式以太通道配置", "EtherChannel", V], ["以太通道配置分類", "EtherChannel", V], ["動態模式以太通道配置", "EtherChannel", V], ["鏈路層發現協議", "LLDP/CDP", V], ["【做題】EtherChannel配置模式判斷題", "PRACTICE", P]] },
    { name: "Module 6: STP", kw: "spanning-tree / STP / BPDU / root bridge / root port / designated port / PVST / portfast / bpduguard", items: [
      ["STP生成樹背景", "STP Protocol", V], ["STP的目標", "STP Protocol", V], ["Root根選舉", "STP Protocol", V], ["BPDU中的字段", "STP Protocol", V], ["RP根端口與DP指定端口選舉", "STP Protocol", V], ["剩餘端口的作用", "STP Protocol", V], ["STP選舉規則進階", "STP Protocol", V],
      ["STP中的角色和狀態", "STP Protocol", V], ["STP角色和狀態的轉變", "STP Protocol", V], ["STP的邊緣端口", "STP Protocol", V], ["STP的BPDU防護", "STP Protocol", V], ["STP各版本與PVST配置", "STP Protocol", V], ["另一種修改根橋的方法", "STP Protocol", V],
      ["【Lab】Packet Tracer做STP Root選舉實驗", "LAB", L], ["【做題】STP選舉+端口角色判斷題", "PRACTICE", P]] },
    { name: "Module 7: IP & Subnetting", kw: "subnet / subnetting / VLSM / network address / broadcast address / wildcard / CIDR", items: [
      ["IP地址簡介", "IP & Subnetting", V], ["二進制與十進制的轉換", "IP & Subnetting", V], ["IP地址與子網掩碼", "IP & Subnetting", V], ["計算網路地址廣播地址與可用IP地址", "IP & Subnetting", V], ["IP地址的5種分類", "IP & Subnetting", V],
      ["子網劃分背景", "IP & Subnetting", V], ["組播的應用場景", "IP & Subnetting", V], ["子網劃分演示", "IP & Subnetting", V], ["子網劃分計算", "IP & Subnetting", V], ["【做題】Subnetting計算題(必須練到秒答)", "PRACTICE", P]] },
    { name: "Module 8: IP Header+Routing", kw: "route / routing table / static route / administrative distance / MTU / fragmentation", items: [
      ["MTU與IP分片", "IP Header", V], ["IP頭部字段解析", "IP Header", V], ["關於分片的3個字段", "IP Header", V], ["路由器的作用", "Routing Core", V], ["路由表的作用", "Routing Core", V], ["直連路由", "Routing Core", V], ["靜態路由", "Routing Core", V], ["【做題】靜態路由配置題", "PRACTICE", P]] },
    { name: "Module 9: OSPF", kw: "OSPF / area / hello / dead timer / LSA / DR / BDR / neighbor", items: [
      ["OSPF簡介", "OSPF Routing", V], ["OSPF配置", "OSPF Routing", V], ["OSPF收斂切換", "OSPF Routing", V], ["AD管理距離與Metric度量", "Routing Core", V], ["最長匹配原則", "Routing Core", V],
      ["【Lab】Packet Tracer做基本OSPF單區域配置", "LAB", L], ["【做題】OSPF配置+故障排除題", "PRACTICE", P]] },
    { name: "Module 10: IP Services(補)", kw: "DHCP / NAT / PAT / NTP / dhcp snooping", items: [
      ["DHCP原理與配置", "IP Services", N], ["NAT/PAT原理與配置", "IP Services", N], ["NTP", "IP Services", N], ["【做題】DHCP/NAT配置判斷題", "PRACTICE", P]] },
    { name: "Module 11: Security(補)", kw: "access-list / ACL / port security / SSH / telnet / AAA", items: [
      ["ACL(Standard/Extended)", "Security", N], ["Port Security", "Security", N], ["SSH設定+裝置強化", "Security", N], ["【做題】ACL撰寫+Port Security配置題", "PRACTICE", P]] },
    { name: "Module 12: Automation(補)", kw: "REST API / JSON / XML / DNA Center / Meraki / WLC / wireless / SSID", items: [
      ["REST API基本概念", "Automation", N], ["JSON/XML資料格式", "Automation", N], ["Meraki/Cisco DNA Center雲端管理概念", "Automation", N], ["基礎Wireless(WLC/APs)", "Automation", N], ["【做題】JSON格式判斷+API概念題", "PRACTICE", P]] },
    { name: "Module 13: 補漏(完成90項後解鎖)", kw: "IPv6 / TCP UDP / DNS / HSRP FHRP / syslog / SNMP / QoS / SDN", bonus: true, items: [
      ["IPv6地址與類型", "IPv6", S], ["IPv6配置與路由", "IPv6", S], ["TCP與UDP", "Transport", S], ["DNS", "IP Services", S], ["FHRP/HSRP", "Redundancy", S], ["Syslog", "IP Services", S], ["SNMP", "IP Services", S], ["QoS基本概念", "IP Services", S], ["SDN基本概念", "Automation", S]] }
  ];

  // 難度 1-10（按序號），7 或以上為必看
  var LEVELS = [
    3, 2, 2, 2, 3, 3,
    3, 2, 4, 4, 5, 3, 3, 3, 4, 4, 4,
    3, 3, 4, 5, 3, 4, 5,
    3, 4, 6, 6, 6, 6, 6,
    3, 5, 5, 7, 4, 6,
    4, 3, 7, 6, 8, 6, 9, 7, 7, 5, 5, 7, 5, 8, 8,
    3, 4, 5, 7, 3, 5, 3, 8, 9, 9,
    4, 5, 7, 3, 5, 3, 6, 6,
    7, 8, 6, 5, 6, 8, 8,
    6, 7, 4, 6,
    8, 6, 6, 8,
    4, 4, 5, 6, 5,
    7, 7, 4, 3, 6, 4, 4, 6, 5
  ];

  var topics = [];
  modules.forEach(function (m, mi) {
    m.index = mi;
    m.ids = [];
    m.items.forEach(function (it) {
      var id = topics.length + 1;
      m.ids.push(id);
      topics.push({ id: id, module: mi, title: it[0], category: it[1], action: it[2], keywords: m.kw, bonus: !!m.bonus, level: LEVELS[id - 1] });
    });
  });

  window.CCNA = { modules: modules, topics: topics, content: {}, labs: {}, explain: {} };
  // 詳解格式：[標題, 內容, 1=等寬圖解]
  window.E = function (id, sections) {
    window.CCNA.explain[id] = sections;
  };
  // 內容格式：n=重點 c=易混淆 k=指令 q=題目
  // 選擇題 [題目, [正確答案, 錯誤...], 解釋]（顯示時會打亂）；填充題 [題目, "答案|其他寫法", 解釋]
  window.C = function (id, n, c, k, q) {
    window.CCNA.content[id] = { n: n, c: c, k: k, q: q };
  };
})();
