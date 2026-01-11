function runSimulation() {
  const initial = Number(document.getElementById("initial").value);
  const monthly = Number(document.getElementById("monthly").value);
  const years = Number(document.getElementById("years").value);
  const rate = Number(document.getElementById("rate").value);
  const account = document.getElementById("account").value;

  let total = initial;
  let invested = initial;
  let history = [];

  for (let y = 1; y <= years; y++) {
    invested += monthly * 12;
    total += monthly * 12;
    total *= (1 + rate);
    history.push(total);
  }

  let tax = 0;
  if (account === "tax") {
    tax = (total - invested) * 0.20315;
    total -= tax;
  }

  document.getElementById("result").innerHTML = `
    <strong>投資元本：</strong>${Math.round(invested / 10000)} 万円<br>
    <strong>最終資産：</strong>${Math.round(total / 10000)} 万円<br>
    <strong>税金：</strong>${Math.round(tax / 10000)} 万円
  `;

  drawChart(history);
}

function drawChart(data) {
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const max = Math.max(...data);
  const padding = 20;

  ctx.beginPath();
  data.forEach((value, index) => {
    const x = padding + index * ((canvas.width - padding * 2) / (data.length - 1));
    const y = canvas.height - padding - (value / max) * (canvas.height - padding * 2);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.strokeStyle = "#007aff";
  ctx.lineWidth = 2;
  ctx.stroke();
}