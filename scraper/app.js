const fetch = require("node-fetch");
const cheerio = require("cheerio");

const url =
  "https://www.cnnbrasil.com.br/entretenimento/vma-2024-confira-a-lista-completa-de-vencedores-da-premiacao/";

async function getWinners() {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  const winners = [];

  $("h3.text-xl.my-5.font-bold.break-words").each((i, el) => {
    const category = $(el).text().trim();
    const list = $(el).next("ul");

    if (list.length) {
      const winnerLi = list
        .find("li")
        .filter((_, li) => {
          const text = $(li).text();
          return text.includes("(VENCEDOR)") || text.includes("(VENCEDORA)");
        })
        .first();

      if (winnerLi.length) {
        // Retirando o texto "(VENCEDOR)" ou "(VENCEDORA)" para limpar o nome
        const winner = winnerLi
          .text()
          .replace(/\(VENCEDOR\)|\(VENCEDORA\)/gi, "")
          .trim();
        winners.push({ category, winner });
      }
    }
  });

  return winners;
}

getWinners()
  .then((winners) => {
    console.log("Vencedores encontrados:");
    winners.forEach(({ category, winner }) => {
      console.log(`${category}: ${winner}`);
    });
  })
  .catch(console.error);
