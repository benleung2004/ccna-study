(function () {
  var D = window.CCNA, KEY = "ccna-study-v1", INTERVALS = [1, 3, 7, 14];
  var app = document.getElementById("app");
  var storageOk = true;
  var S = load();
  var timerId = null;

  function blank() { return { v: 1, done: {}, srs: {}, scores: {}, flags: {}, labs: {}, subnet: { n: 0, right: 0, ms: 0 }, pre: {}, skip: {} }; }
  // 舊版備份沒有 pre / skip
  function norm(o) {
    ["pre", "skip"].forEach(function (k) { if (!o[k] || typeof o[k] !== "object" || Array.isArray(o[k])) o[k] = {}; });
    return o;
  }
  function valid(o) {
    return o && typeof o === "object" && !Array.isArray(o) && ["done", "srs", "scores", "flags", "labs", "subnet"].every(function (k) {
      return o[k] && typeof o[k] === "object" && !Array.isArray(o[k]);
    });
  }
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return blank();
      var o = JSON.parse(raw);
      return valid(o) ? norm(o) : blank();
    } catch (e) { storageOk = false; return blank(); }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); storageOk = true; } catch (e) { storageOk = false; }
  }

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function code(s) { return esc(s).replace(/`([^`]+)`/g, "<code>$1</code>"); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function dateStr(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function today() { return dateStr(new Date()); }
  function addDays(n) { var d = new Date(); d.setDate(d.getDate() + n); return dateStr(d); }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function topic(id) { return D.topics[id - 1]; }
  function isPractice(t) { return t.category === "PRACTICE"; }
  function isLab(t) { return t.category === "LAB"; }
  function mainTopics() { return D.topics.filter(function (t) { return !t.bonus; }); }
  function bonusUnlocked() { return mainTopics().every(function (t) { return S.done[t.id]; }); }
  function locked(t) { return t.bonus && !bonusUnlocked(); }
  function nextTopic() {
    return D.topics.filter(function (t) { return !S.done[t.id] && !locked(t); })[0];
  }
  function questions(id) {
    var c = D.content[id];
    if (!c) return [];
    return c.q.map(function (q, i) { return { id: id + "-" + i, topic: id, text: q[0], answer: q[1], exp: q[2], fill: typeof q[1] === "string" }; });
  }
  function allDoneQuestions() {
    var out = [];
    D.topics.forEach(function (t) { if (S.done[t.id]) out = out.concat(questions(t.id)); });
    return out.filter(function (q) { return !S.flags[q.id]; });
  }
  // 到期題目（包括未完成主題的先測題）及已完成主題未答過的題目都會進入複習
  function dueQuestions() {
    var now = today(), out = [];
    D.topics.forEach(function (t) {
      if (locked(t)) return;
      questions(t.id).forEach(function (q) {
        if (S.flags[q.id]) return;
        var r = S.srs[q.id];
        if (r ? r.due && r.due <= now : S.done[t.id]) out.push(q);
      });
    });
    return out;
  }
  function mustWatch(t) { return t.level >= 7; }
  function levelTag(t) {
    return '<span class="lv' + (mustWatch(t) ? " hard" : "") + '">難度 ' + t.level + (mustWatch(t) ? " · 必看" : "") + "</span>";
  }
  function record(qid, right) {
    var r = S.srs[qid] || { box: 0, due: null, right: 0, wrong: 0 };
    if (right) {
      r.right++;
      if (r.box >= 3) { r.due = null; r.box = 4; }
      else { r.box++; r.due = addDays(INTERVALS[r.box]); }
    } else {
      r.wrong++;
      r.box = 0;
      r.due = addDays(INTERVALS[0]);
    }
    S.srs[qid] = r;
    save();
  }
  function normalize(s) { return String(s).trim().toLowerCase().replace(/\s+/g, " "); }
  function checkFill(input, answer) {
    return answer.split("|").some(function (a) { return normalize(a) === normalize(input); });
  }
  function toggleDone(id, on) {
    if (on) S.done[id] = today(); else { delete S.done[id]; delete S.skip[id]; }
    save();
  }

  // ---------- 答題元件 ----------
  function quiz(list, opts) {
    var i = 0, right = 0;
    function show() {
      if (i >= list.length) return opts.finish(right, list.length);
      var q = list[i];
      var box = opts.mount;
      var html = '<div class="card"><div class="muted">第 ' + (i + 1) + " / " + list.length + " 題 · #" + q.topic + " " + esc(topic(q.topic).title) + "</div><p><b>" + code(q.text) + "</b></p>";
      if (q.fill) {
        html += '<form id="qf"><input type="text" id="qi" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="輸入完整指令或答案"><div class="row"><button class="primary">提交</button></div></form>';
      } else {
        var options = shuffle(q.answer.map(function (text, idx) { return { text: text, right: idx === 0 }; }));
        html += options.map(function (o, idx) { return '<button class="opt" data-i="' + idx + '">' + code(o.text) + "</button>"; }).join("");
      }
      html += '<div id="qr"></div></div>';
      box.innerHTML = html;
      if (q.fill) {
        var inp = document.getElementById("qi");
        inp.focus();
        document.getElementById("qf").onsubmit = function (e) {
          e.preventDefault();
          if (!inp.value.trim()) return;
          inp.disabled = true;
          e.target.querySelector("button").disabled = true;
          answered(q, checkFill(inp.value, q.answer), q.answer.split("|")[0]);
        };
      } else {
        box.querySelectorAll(".opt").forEach(function (b) {
          b.onclick = function () {
            var chosen = options[Number(b.dataset.i)];
            box.querySelectorAll(".opt").forEach(function (x) {
              x.disabled = true;
              if (options[Number(x.dataset.i)].right) x.classList.add("right");
            });
            if (!chosen.right) b.classList.add("wrong");
            answered(q, chosen.right, q.answer[0]);
          };
        });
      }
    }
    function answered(q, ok, answer) {
      if (ok) right++;
      if (opts.record !== false) record(q.id, ok);
      var res = document.getElementById("qr");
      res.innerHTML = '<div class="result ' + (ok ? "right" : "wrong") + '"><b>' + (ok ? "答對" : "答錯") + "</b>" + (ok ? "" : "，答案：<code>" + esc(answer) + "</code>") + "<br>" + code(q.exp) + "</div>" +
        '<div class="row"><button class="primary" id="qn">' + (i + 1 < list.length ? "下一題" : "完成") + '</button><button class="link" id="qflag">這題有問題</button></div>';
      document.getElementById("qn").onclick = function () { i++; show(); };
      document.getElementById("qn").focus();
      document.getElementById("qflag").onclick = function (e) {
        S.flags[q.id] = today();
        save();
        e.target.textContent = "已回報，複習時會暫時略過";
        e.target.disabled = true;
      };
    }
    show();
  }

  // ---------- 頁面 ----------
  function home() {
    var main = mainTopics(), done = main.filter(function (t) { return S.done[t.id]; }).length;
    var due = dueQuestions().length, next = nextTopic();
    var nextHtml = next
      ? '<div class="muted">' + esc(D.modules[next.module].name) + "</div><h1>#" + next.id + " " + esc(next.title) + "</h1>" + levelTag(next) + ' <span class="muted">' + esc(next.action) + '</span><div class="row"><a class="btn primary" href="#topic/' + next.id + '">開始</a></div>'
      : "<h1>全部項目已完成</h1><p>繼續複習到期題目，或用 Subnet 和 CLI 訓練。</p>";
    var modules = D.modules.map(function (m) {
      var n = m.ids.filter(function (id) { return S.done[id]; }).length;
      return '<div class="muted">' + esc(m.name) + " · " + n + "/" + m.ids.length + '</div><div class="bar"><i style="width:' + Math.round(n / m.ids.length * 100) + '%"></i></div>';
    }).join("");
    var attempts = Object.keys(S.srs).reduce(function (s, k) { return s + S.srs[k].right + S.srs[k].wrong; }, 0);
    var rights = Object.keys(S.srs).reduce(function (s, k) { return s + S.srs[k].right; }, 0);
    app.innerHTML = storageNotice() +
      '<div class="stats"><div class="stat"><b>' + done + "/" + main.length + '</b><span class="muted">主線進度</span></div><div class="stat"><b>' + due + '</b><span class="muted">待複習</span></div><div class="stat"><b>' + (attempts ? Math.round(rights / attempts * 100) + "%" : "—") + '</b><span class="muted">答對率</span></div></div>' +
      (due ? '<div class="notice">有 ' + due + ' 題待複習。<a href="#review">先複習</a>，效果比直接看新片好。</div>' : "") +
      '<div class="card">' + nextHtml + '</div><div class="card"><h2 style="margin-top:0">各 Module 進度</h2>' + modules + "</div>";
  }
  function storageNotice() {
    return storageOk ? "" : '<div class="notice">瀏覽器無法儲存資料，進度可能會消失。請換一個瀏覽器或關閉私密瀏覽。</div>';
  }

  function list() {
    app.innerHTML = "<h1>學習清單</h1>" + D.modules.map(function (m) {
      var isLocked = m.bonus && !bonusUnlocked();
      var rows = m.ids.map(function (id) {
        var t = topic(id), done = S.done[id];
        return '<div class="item ' + (done ? "done" : "") + '"><input type="checkbox" aria-label="完成 ' + esc(t.title) + '" data-id="' + id + '"' + (done ? " checked" : "") + (isLocked ? " disabled" : "") + '><a href="#topic/' + id + '">' + id + ". " + esc(t.title) + '</a><span class="tag">' + levelTag(t) + (S.skip[id] ? " 略過影片" : "") + "</span></div>";
      }).join("");
      var n = m.ids.filter(function (id) { return S.done[id]; }).length;
      return '<details class="card"' + (n < m.ids.length && !isLocked ? " open" : "") + "><summary>" + esc(m.name) + " · " + n + "/" + m.ids.length + "</summary>" + rows + "</details>";
    }).join("");
    app.querySelectorAll("input[type=checkbox]").forEach(function (c) {
      c.onchange = function () {
        var id = Number(c.dataset.id);
        toggleDone(id, c.checked);
        if (c.checked) location.hash = "#topic/" + id; else list();
      };
    });
  }

  function practiceBlock(t) {
    var hist = S.scores[t.id] || [];
    var extra = t.id === 62 ? '<a class="btn" href="#subnet">開 Subnet 計時器</a>' : "";
    return '<div class="card"><h2 style="margin-top:0">考試寶任務</h2><p>到考試寶搜尋以下關鍵字做題，完成後輸入分數。</p><pre>' + esc(t.keywords) + '</pre><div class="row"><input type="number" id="sc" min="0" placeholder="答對"><span>/</span><input type="number" id="st" min="1" placeholder="總題數"><button class="primary" id="sv">儲存並完成</button>' + extra + '</div><div id="sm" class="muted"></div>' +
      (hist.length ? "<h2>紀錄</h2><ul>" + hist.map(function (h) { return "<li>" + esc(h.d) + "：" + h.c + "/" + h.t + "（" + Math.round(h.c / h.t * 100) + "%）</li>"; }).join("") + "</ul>" : "") + "</div>";
  }
  function bindPractice(t) {
    document.getElementById("sv").onclick = function () {
      var c = Number(document.getElementById("sc").value), n = Number(document.getElementById("st").value);
      if (!Number.isInteger(c) || !Number.isInteger(n) || n < 1 || c < 0 || c > n) {
        document.getElementById("sm").textContent = "請輸入有效分數：答對數不可大於總題數。";
        return;
      }
      (S.scores[t.id] = S.scores[t.id] || []).push({ c: c, t: n, d: today() });
      S.done[t.id] = S.done[t.id] || today();
      save();
      topicPage(t.id);
    };
  }
  function labBlock(t) {
    var steps = D.labs[t.id] || [], ticks = S.labs[t.id] || {};
    return '<div class="card"><h2 style="margin-top:0">Packet Tracer 步驟</h2>' + steps.map(function (s, i) {
      return '<label class="item"><input type="checkbox" data-step="' + i + '"' + (ticks[i] ? " checked" : "") + "><span>" + esc(s) + "</span></label>";
    }).join("") + "</div>";
  }
  function bindLab(t) {
    app.querySelectorAll("[data-step]").forEach(function (c) {
      c.onchange = function () {
        var ticks = S.labs[t.id] = S.labs[t.id] || {};
        ticks[c.dataset.step] = c.checked;
        var steps = D.labs[t.id] || [];
        if (steps.every(function (_, i) { return ticks[i]; })) S.done[t.id] = S.done[t.id] || today();
        save();
        topicPage(t.id);
      };
    });
  }
  function notes(c) {
    return '<div class="card"><h2 style="margin-top:0">速記筆記</h2><ul>' + c.n.map(function (x) { return "<li>" + code(x) + "</li>"; }).join("") + "</ul>" +
      (c.c.length ? "<h2>易混淆</h2><ul>" + c.c.map(function (x) { return "<li>" + code(x) + "</li>"; }).join("") + "</ul>" : "") +
      (c.k.length ? "<h2>指令</h2><pre>" + esc(c.k.join("\n")) + "</pre>" : "") + "</div>";
  }
  function explain(id) {
    var ex = D.explain[id];
    if (!ex) return "";
    return '<div class="card exp"><h2 style="margin-top:0">詳解</h2>' + ex.map(function (s) {
      return "<h3>" + esc(s[0]) + "</h3>" + (s[2] ? "<pre>" + esc(s[1]) + "</pre>" : "<p>" + code(s[1]) + "</p>");
    }).join("") + "</div>";
  }
  // 以每題最近一次作答計：box > 0 代表最近答對
  function latestRight(qs) {
    return qs.filter(function (q) { var r = S.srs[q.id]; return r && r.box > 0; }).length;
  }
  function neighbours(t) {
    var next = D.topics[t.id];
    return '<div class="row">' + (next && !locked(next) ? '<a class="btn primary" href="#topic/' + next.id + '">下一項 #' + next.id + "</a>" : "") + '<a class="btn" href="#home">回今日</a></div>';
  }
  function topicPage(id) {
    var t = topic(id);
    if (!t) return notFound();
    var head = '<div class="muted">' + esc(D.modules[t.module].name) + " · " + esc(t.category) + "</div><h1>#" + t.id + " " + esc(t.title) + "</h1><p>" + levelTag(t) + "</p>";
    if (locked(t)) {
      app.innerHTML = head + '<div class="notice">先完成主線 90 項，這部分才會解鎖。</div><a class="btn" href="#home">回今日</a>';
      return;
    }
    if (isPractice(t) || isLab(t)) {
      app.innerHTML = head + (isLab(t) ? labBlock(t) : practiceBlock(t)) + (S.done[t.id] ? neighbours(t) : "");
      if (isLab(t)) bindLab(t); else bindPractice(t);
      return;
    }
    var c = D.content[id], qs = questions(id).filter(function (q) { return !S.flags[q.id]; });
    var pending = qs.filter(function (q) { return !S.srs[q.id]; });
    var study = notes(c) + explain(id);
    var bind = function (btn, fn) { var el = document.getElementById(btn); if (el) el.onclick = fn; };
    function runQuiz(list, scored) {
      app.innerHTML = head + '<div id="qz"></div>';
      quiz(list, {
        mount: document.getElementById("qz"), record: scored,
        finish: function () {
          if (scored) {
            var r = latestRight(qs);
            S.pre[id] = { r: r, n: qs.length, d: today() };
            if (r === qs.length && !mustWatch(t) && !S.done[id]) { S.done[id] = today(); S.skip[id] = true; }
            save();
          }
          topicPage(id);
        }
      });
    }
    function markDone(skipped) {
      S.done[id] = S.done[id] || today();
      if (skipped) S.skip[id] = true; else delete S.skip[id];
      save();
      topicPage(id);
    }

    // 1 未做先測：先讀筆記及詳解，再做題
    if (!S.done[id] && (pending.length || !S.pre[id])) {
      app.innerHTML = head + '<div class="card"><p>先讀下面的筆記（約 2–5 分鐘），然後做 ' + qs.length + " 題。" + (mustWatch(t) ? "這是必看主題，做完題仍建議看影片：" : "全對就可以略過影片：") + "<b>" + esc(t.action) + '</b></p><div class="row"><button class="primary" id="go">開始小測</button></div></div>' + study +
        '<div class="row"><button class="primary" id="go2">讀完，開始小測</button></div>';
      bind("go", function () { runQuiz(pending.length ? pending : qs, true); });
      bind("go2", function () { runQuiz(pending.length ? pending : qs, true); });
      return;
    }
    var redo = '<button id="redo">重做小測（不計分）</button>';
    // 2 已測未完成：按結果決定看不看影片
    if (!S.done[id]) {
      var pre = S.pre[id], r = latestRight(qs), all = r === qs.length;
      var msg = all
        ? "全部答對。不過這是難度 " + t.level + " 的必看主題，3 題不足以證明完全掌握，建議仍然看影片。"
        : "答對 " + r + "/" + qs.length + "。建議：<b>" + esc(t.action) + "</b>，重點看答錯的部分，看完再重做小測。";
      app.innerHTML = head + '<div class="notice">' + msg + '</div><div class="row"><button class="primary" id="watched">看完影片，標記完成</button>' + redo + '<button class="link" id="skipv">' + (all ? "我有信心，略過影片" : "不看影片，直接完成") + "</button></div>" + study +
        '<p class="muted">搜題關鍵字：' + esc(t.keywords) + "</p>";
      bind("watched", function () { markDone(false); });
      bind("skipv", function () { markDone(true); });
      bind("redo", function () { runQuiz(qs, false); });
      return;
    }
    // 3 已完成
    app.innerHTML = head + (S.skip[id] ? '<div class="notice">先測全對，已略過影片。日後複習答錯，就回看這段影片。</div>' : "") + study + neighbours(t) +
      '<div class="row">' + redo + '<button class="link" id="undo">取消完成</button></div>';
    bind("redo", function () { runQuiz(qs, false); });
    bind("undo", function () { toggleDone(id, false); topicPage(id); });
  }

  function review() {
    var due = shuffle(dueQuestions());
    if (!due.length) {
      app.innerHTML = '<h1>複習</h1><div class="card">目前沒有待複習題目。</div>' + upcoming();
      return;
    }
    app.innerHTML = '<h1>複習</h1><div id="qz"></div>';
    quiz(due.slice(0, 20), {
      mount: document.getElementById("qz"),
      finish: function (r, n) {
        var left = dueQuestions().length;
        app.innerHTML = '<h1>複習完成</h1><div class="card">本輪答對 ' + r + "/" + n + "。還有 " + left + ' 題待複習。<div class="row">' + (left ? '<a class="btn primary" href="#review" id="again">繼續</a>' : "") + '<a class="btn" href="#home">回今日</a></div></div>';
        var again = document.getElementById("again");
        if (again) again.onclick = function (e) { e.preventDefault(); review(); };
      }
    });
  }
  function upcoming() {
    var counts = {};
    Object.keys(S.srs).forEach(function (k) { var d = S.srs[k].due; if (d) counts[d] = (counts[d] || 0) + 1; });
    var days = Object.keys(counts).sort().slice(0, 5);
    return days.length ? '<div class="card"><h2 style="margin-top:0">接下來</h2><ul>' + days.map(function (d) { return "<li>" + d + "：" + counts[d] + " 題</li>"; }).join("") + "</ul></div>" : "";
  }

  function subnet() {
    var q, started;
    function draw() {
      q = window.CCNASubnet.make();
      started = Date.now();
      var s = S.subnet;
      app.innerHTML = '<h1>Subnet 計時器</h1><div class="stats"><div class="stat"><b>' + s.n + '</b><span class="muted">已答</span></div><div class="stat"><b>' + (s.n ? Math.round(s.right / s.n * 100) + "%" : "—") + '</b><span class="muted">答對率</span></div><div class="stat"><b>' + (s.n ? (s.ms / s.n / 1000).toFixed(1) + "s" : "—") + '</b><span class="muted">平均時間</span></div></div>' +
        '<div class="card"><div class="timer" id="tm">0.0s</div><p><b>' + esc(q.text) + '</b></p><form id="sf"><input type="text" id="si" autocomplete="off" inputmode="decimal"><div class="row"><button class="primary">提交</button></div></form><div id="sr"></div></div>';
      var input = document.getElementById("si");
      input.focus();
      clearInterval(timerId);
      timerId = setInterval(function () {
        var el = document.getElementById("tm");
        if (el) el.textContent = ((Date.now() - started) / 1000).toFixed(1) + "s";
      }, 100);
      document.getElementById("sf").onsubmit = function (e) {
        e.preventDefault();
        if (!input.value.trim()) return;
        clearInterval(timerId);
        var ms = Date.now() - started, ok = input.value.trim() === q.answer;
        S.subnet.n++; S.subnet.ms += ms; if (ok) S.subnet.right++;
        save();
        input.disabled = true;
        e.target.querySelector("button").disabled = true;
        document.getElementById("sr").innerHTML = '<div class="result ' + (ok ? "right" : "wrong") + '"><b>' + (ok ? "答對" : "答錯") + "</b> · " + (ms / 1000).toFixed(1) + "s" + (ok ? "" : "，答案：<code>" + esc(q.answer) + "</code>") + "<br>" + esc(q.detail) + '</div><div class="row"><button class="primary" id="sn">下一題</button></div>';
        document.getElementById("sn").onclick = draw;
        document.getElementById("sn").focus();
      };
    }
    draw();
  }

  function cli() {
    var fills = allDoneQuestions().filter(function (q) { return q.fill; });
    if (!fills.length) {
      app.innerHTML = '<h1>CLI 填空</h1><div class="card">完成含指令的主題後，這裡會出現題目。第一批在 #4。</div>';
      return;
    }
    app.innerHTML = '<h1>CLI 填空</h1><p class="muted">純練習，不影響複習排程。題庫：已完成主題共 ' + fills.length + ' 條。</p><div id="qz"></div>';
    quiz(shuffle(fills).slice(0, 10), {
      mount: document.getElementById("qz"), record: false,
      finish: function (r, n) {
        app.innerHTML = '<h1>CLI 填空</h1><div class="card">答對 ' + r + "/" + n + '。<div class="row"><a class="btn primary" href="#cli" id="again">再來一輪</a></div></div>';
        document.getElementById("again").onclick = function (e) { e.preventDefault(); cli(); };
      }
    });
  }

  function weakData() {
    var rows = [];
    D.topics.forEach(function (t) {
      var right = 0, wrong = 0;
      questions(t.id).forEach(function (q) { var r = S.srs[q.id]; if (r) { right += r.right; wrong += r.wrong; } });
      if (wrong) rows.push({ t: t, right: right, wrong: wrong, rate: wrong / (right + wrong) });
    });
    return rows.sort(function (a, b) { return b.rate - a.rate || b.wrong - a.wrong; });
  }
  function weak() {
    var rows = weakData();
    var scores = Object.keys(S.scores).map(function (id) {
      var h = S.scores[id], l = h[h.length - 1];
      return { t: topic(Number(id)), c: l.c, n: l.t, p: l.c / l.t };
    }).sort(function (a, b) { return a.p - b.p; });
    app.innerHTML = "<h1>弱點</h1>" +
      '<div class="card"><h2 style="margin-top:0">小測錯得最多</h2>' + (rows.length ? rows.slice(0, 15).map(function (r) {
        return '<div class="item"><a href="#topic/' + r.t.id + '">#' + r.t.id + " " + esc(r.t.title) + '</a><span class="tag">錯 ' + r.wrong + " 次 · " + Math.round(r.rate * 100) + "%</span></div>";
      }).join("") : '<div class="muted">暫時未有錯題。</div>') + "</div>" +
      '<div class="card"><h2 style="margin-top:0">考試寶分數（低至高）</h2>' + (scores.length ? scores.map(function (s) {
        return '<div class="item"><a href="#topic/' + s.t.id + '">#' + s.t.id + " " + esc(s.t.title) + '</a><span class="tag">' + s.c + "/" + s.n + " · " + Math.round(s.p * 100) + "%</span></div>";
      }).join("") : '<div class="muted">輸入考試寶分數後會顯示在這裡。</div>') + "</div>";
  }

  function exportText() {
    var lines = ["我的 CCNA 弱點，請針對以下內容補充題目：", ""];
    weakData().slice(0, 15).forEach(function (r) { lines.push("#" + r.t.id + " " + r.t.title + "：錯 " + r.wrong + " 次"); });
    var wrongQs = [];
    D.topics.forEach(function (t) { questions(t.id).forEach(function (q) { var r = S.srs[q.id]; if (r && r.wrong) wrongQs.push(q); }); });
    if (wrongQs.length) { lines.push("", "答錯過的題目："); wrongQs.forEach(function (q) { lines.push("- " + q.text); }); }
    var flagged = Object.keys(S.flags);
    if (flagged.length) {
      lines.push("", "我回報有問題的題目：");
      flagged.forEach(function (id) {
        var parts = id.split("-"), q = questions(Number(parts[0]))[Number(parts[1])];
        if (q) lines.push("- [" + id + "] " + q.text);
      });
    }
    return lines.join("\n");
  }
  function data() {
    var flagged = Object.keys(S.flags);
    app.innerHTML = '<h1>資料與備份</h1>' + storageNotice() +
      '<div class="card"><h2 style="margin-top:0">備份進度</h2><p class="muted">進度只存在這個瀏覽器。清除瀏覽器資料會令進度消失，建議每星期備份一次。</p><div class="row"><button class="primary" id="ex">下載備份</button><label class="btn">匯入備份<input type="file" id="im" accept="application/json,.json" hidden></label></div><div id="dm" class="muted"></div></div>' +
      '<div class="card"><h2 style="margin-top:0">貼給 Claude 要新題</h2><textarea id="tx" readonly>' + esc(exportText()) + '</textarea><div class="row"><button id="cp">複製</button></div></div>' +
      '<div class="card"><h2 style="margin-top:0">已回報的題目（' + flagged.length + "）</h2>" + (flagged.length ? flagged.map(function (id) {
        return '<div class="item"><span style="flex:1">' + esc(id) + '</span><button class="link" data-unflag="' + esc(id) + '">恢復</button></div>';
      }).join("") : '<div class="muted">沒有。</div>') + "</div>";
    document.getElementById("ex").onclick = function () {
      var url = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], { type: "application/json" }));
      var a = document.createElement("a");
      a.href = url; a.download = "ccna-backup-" + today() + ".json";
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    };
    document.getElementById("im").onchange = function (e) {
      var file = e.target.files[0], msg = document.getElementById("dm");
      if (!file) return;
      file.text().then(function (txt) {
        var o = JSON.parse(txt);
        if (!valid(o)) throw new Error("bad");
        if (!confirm("匯入會覆蓋目前進度，確定繼續？")) return;
        S = norm(o); save(); data();
        document.getElementById("dm").textContent = "匯入成功。";
      }).catch(function () { msg.textContent = "匯入失敗：這不是有效的備份檔，現有進度未改動。"; });
    };
    document.getElementById("cp").onclick = function (e) {
      var tx = document.getElementById("tx");
      tx.select();
      var done = function () { e.target.textContent = "已複製"; };
      if (navigator.clipboard) navigator.clipboard.writeText(tx.value).then(done, function () { document.execCommand("copy"); done(); });
      else { document.execCommand("copy"); done(); }
    };
    app.querySelectorAll("[data-unflag]").forEach(function (b) {
      b.onclick = function () { delete S.flags[b.dataset.unflag]; save(); data(); };
    });
  }
  function notFound() { app.innerHTML = '<div class="card">找不到這一頁。<a href="#home">回今日</a></div>'; }

  function route() {
    clearInterval(timerId);
    var parts = (location.hash || "#home").slice(1).split("/"), page = parts[0];
    document.querySelectorAll("nav a").forEach(function (a) { a.classList.toggle("on", a.dataset.nav === page); });
    var pages = { home: home, list: list, review: review, subnet: subnet, cli: cli, weak: weak, data: data };
    if (page === "topic") topicPage(Number(parts[1]));
    else if (pages[page]) pages[page]();
    else notFound();
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();
})();
