const WEBHOOK = "https://discord.com/api/webhooks/1569848782240096467/0rLkRjszdXfhHGtFv8pALYOvcEiYp8uN9SWcBveHkBl3ltKjZ8CPyPnAYRucghyiqiMA";

const CORES = { forja: 0xffe61a, jardim: 0x00e1ff, casamento: 0xd63ce0 };

const texto = (v, max) => String(v == null ? "" : v).trim().slice(0, max);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ erro: "metodo" });
  }
  const webhook = process.env.DISCORD_WEBHOOK || WEBHOOK;
  if (!webhook) return res.status(503).json({ erro: "fechado" });

  const b = req.body || {};
  const personagem = texto(b.personagem, 60);
  if (!CORES[b.aventura] || !personagem || !Array.isArray(b.campos)) {
    return res.status(400).json({ erro: "dados" });
  }
  const fields = b.campos.slice(0, 8)
    .map((c) => ({ name: texto(c && c.name, 256), value: texto(c && c.value, 1024), inline: !!(c && c.inline) }))
    .filter((c) => c.name && c.value);

  const payload = {
    username: "Noite de Jogos · SACC",
    allowed_mentions: { parse: [] },
    embeds: [{
      title: (b.atualizacao ? "Inscrição atualizada: " : "Nova inscrição: ") + personagem,
      color: CORES[b.aventura],
      fields,
      footer: { text: "Ficha completa no arquivo anexo" },
      timestamp: new Date().toISOString(),
    }],
  };
  const arquivo = personagem.normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "personagem";

  const form = new FormData();
  form.append("payload_json", JSON.stringify(payload));
  form.append("files[0]", new Blob([texto(b.ficha, 20000)], { type: "text/plain;charset=utf-8" }), `ficha-${arquivo}.txt`);

  try {
    const r = await fetch(webhook, { method: "POST", body: form });
    if (r.ok) return res.status(200).json({ ok: true });
    return res.status(r.status === 429 ? 429 : 502).json({ erro: "discord", status: r.status });
  } catch (e) {
    return res.status(502).json({ erro: "rede" });
  }
};
