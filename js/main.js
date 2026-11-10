(function () {
  const root = document.documentElement;
  const cfg = window.SACC_CONFIG;

  document.querySelectorAll("[data-forms]").forEach((a) => {
    a.href = cfg.formsUrl;
  });

  // ---- Contagem regressiva ----
  const target = new Date(cfg.eventStart).getTime();
  const pad = (n) => String(n).padStart(2, "0");
  const units = document.querySelectorAll("[data-count]");
  function tick() {
    let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    const parts = { d: Math.floor(s / 86400), h: Math.floor((s %= 86400) / 3600), m: Math.floor((s %= 3600) / 60), s: s % 60 };
    units.forEach((el) => { el.textContent = pad(parts[el.dataset.count]); });
  }
  if (units.length) { tick(); setInterval(tick, 1000); }

  // ---- Cronograma ----
  const icon = (name) => SACC_PIXEL.sprite(SACC_PIXEL.ICONS[name], { X: "currentColor" }, 3);
  const initials = (name) => {
    const words = name.split(" ");
    return words.length > 1 ? words[0][0] + words[words.length - 1][0] : words[0][0];
  };
  const avatar = (name) => cfg.photos[name]
    ? `<img class="avatar" src="${cfg.photos[name]}" alt="" loading="lazy">`
    : `<span class="avatar" aria-hidden="true">${initials(name)}</span>`;
  const pending = (name) => cfg.pendingPeople.includes(name) ? `<span class="tag tag--warn">A confirmar</span>` : "";

  function slot(it) {
    const place = it.place ? `<span class="slot__place">${it.place}</span>` : "";
    if (it.pause) {
      return `<li class="slot slot--pause">${icon(it.icon || "intervalo")}<time>${it.time}</time><b>${it.title}</b>${place}</li>`;
    }
    const people = it.people || [];
    const solo = people.length === 1 ? people[0] : null;
    const media = solo ? avatar(solo) : it.logo
      ? `<img class="avatar avatar--logo" src="${it.logo}" alt="" loading="lazy">`
      : it.icon ? `<span class="avatar" aria-hidden="true">${icon(it.icon)}</span>` : "";
    const tag = it.tag ? `<span class="tag tag--${it.tag}">${it.tag}</span>` : "";
    const flag = it.flag ? `<span class="tag tag--warn">${it.flag}</span>` : "";
    return `<li class="slot${media ? "" : " slot--group"}">${media}<div class="slot__body">
      <p class="slot__meta"><time>${it.time}</time>${tag}${flag}${solo ? pending(solo) : ""}${place}</p>
      ${solo ? `<p class="slot__name">${solo}</p>` : ""}
      <h4>${it.title}</h4>
      ${it.note ? `<p class="slot__note">${it.note}</p>` : ""}
      ${solo || !people.length ? "" : `<ul class="people">${people.map((name) => `<li>${avatar(name)}<span>${name}</span>${pending(name)}</li>`).join("")}</ul>`}
    </div></li>`;
  }

  document.querySelector("[data-schedule]").innerHTML = cfg.schedule.map((d) => `
    <section class="day">
      <h3 class="day__head"><b>${d.day}</b> ${d.date}${d.place ? `<span class="slot__place">${d.place}</span>` : ""}</h3>
      <ol class="day__list">${d.items.map(slot).join("")}</ol>
    </section>`).join("");

  // ---- Tela de carregamento ----
  const boot = document.getElementById("boot");
  if (!boot) return;
  if (!root.classList.contains("is-booting")) { boot.remove(); return; }

  const log = boot.querySelector(".boot__log");
  const logo = boot.querySelector(".boot__logo");
  const msg = boot.querySelector(".boot__typed");
  const pct = boot.querySelector(".boot__pct");
  const bar = boot.querySelector(".bar");
  const BLOCKS = 20;
  for (let i = 0; i < BLOCKS; i++) bar.appendChild(document.createElement("i"));

  const LOG = [
    ["IFFAR-FW BIOS v3.0 · (C) 2026 CIÊNCIA DA COMPUTAÇÃO", ""],
    ["MEMÓRIA BASE ............. ", "640K OK"],
    ["DETECTANDO ESTUDANTES .... ", "OK"],
    ["MONTANDO C:\\SACC ......... ", "OK"],
  ];
  const MESSAGE = "CARREGANDO...";

  let finished = false;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function type(el, text, speed) {
    for (let i = 1; i <= text.length && !finished; i++) {
      el.textContent = text.slice(0, i);
      await sleep(speed);
    }
  }

  function setProgress(p) {
    pct.textContent = `${p}%`;
    const on = Math.round((p / 100) * BLOCKS);
    [...bar.children].forEach((b, i) => b.classList.toggle("on", i < on));
  }

  // Avança aos trancos e trava em 99% por um instante, como todo bom instalador.
  async function progress() {
    let p = 0;
    while (p < 100 && !finished) {
      p = Math.min(100, p + 3 + Math.floor(Math.random() * 10));
      if (p >= 99 && p < 100) p = 99;
      setProgress(p);
      if (p === 99) { await sleep(650); p = 100; setProgress(p); break; }
      await sleep(70 + Math.random() * 90);
    }
  }

  function finish() {
    if (finished) return;
    finished = true;
    boot.classList.add("is-leaving");
    setTimeout(() => root.classList.add("is-ready"), 200);
    setTimeout(() => {
      root.classList.remove("is-booting");
      boot.remove();
      removeEventListener("keydown", onKey);
    }, 520);
  }

  function onKey(e) {
    if (e.key === "Escape" || boot.classList.contains("is-done")) finish();
  }

  async function run() {
    for (const [line, status] of LOG) {
      if (finished) return;
      const li = document.createElement("li");
      const text = document.createElement("span");
      li.appendChild(text);
      log.appendChild(li);
      await type(text, line, 12);
      if (status) {
        await sleep(140);
        const ok = document.createElement("span");
        ok.className = "ok";
        ok.textContent = status;
        li.appendChild(ok);
      }
      await sleep(110);
    }
    if (finished) return;
    logo.classList.add("is-on");
    await sleep(450);
    await Promise.all([type(msg, MESSAGE, 40), progress()]);
    if (finished) return;
    boot.classList.add("is-done");
    await sleep(1800);
    finish();
  }

  boot.querySelector(".boot__skip").addEventListener("click", finish);
  boot.addEventListener("click", (e) => {
    if (boot.classList.contains("is-done") && !e.target.closest("button")) finish();
  });
  addEventListener("keydown", onKey);
  run();
})();
