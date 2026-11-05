// Subnetting 題目產生器：答案由程式計算。
(function (root) {
  function toInt(ip) {
    return ip.split(".").reduce(function (n, p) { return n * 256 + Number(p); }, 0);
  }
  function toIp(n) {
    return [Math.floor(n / 16777216) % 256, Math.floor(n / 65536) % 256, Math.floor(n / 256) % 256, n % 256].join(".");
  }
  function calc(ip, prefix) {
    var size = Math.pow(2, 32 - prefix);
    var network = Math.floor(toInt(ip) / size) * size;
    var broadcast = network + size - 1;
    return {
      network: toIp(network), broadcast: toIp(broadcast), first: toIp(network + 1), last: toIp(broadcast - 1),
      hosts: size - 2, mask: toIp(Math.pow(2, 32) - size), wildcard: toIp(size - 1)
    };
  }
  var TYPES = [
    ["network", "網路地址"], ["broadcast", "廣播地址"], ["first", "第一個可用 IP"],
    ["last", "最後一個可用 IP"], ["hosts", "可用主機數"], ["mask", "子網掩碼"], ["wildcard", "Wildcard Mask"]
  ];
  function make(rand) {
    rand = rand || Math.random;
    function r(n) { return Math.floor(rand() * n); }
    var base = r(3);
    var ip = base === 0 ? "10." + r(256) + "." + r(256) + "." + r(256)
      : base === 1 ? "172." + (16 + r(16)) + "." + r(256) + "." + r(256)
      : "192.168." + r(256) + "." + r(256);
    var prefix = base === 2 ? 24 + r(7) : 16 + r(15);
    var type = TYPES[r(TYPES.length)];
    var c = calc(ip, prefix);
    return {
      text: ip + "/" + prefix + " 的" + type[1] + "是？",
      answer: String(c[type[0]]),
      detail: "網路 " + c.network + "｜廣播 " + c.broadcast + "｜可用 " + c.first + " – " + c.last + "（" + c.hosts + " 台）｜Mask " + c.mask
    };
  }
  root.CCNASubnet = { calc: calc, make: make };
})(typeof window !== "undefined" ? window : globalThis);
