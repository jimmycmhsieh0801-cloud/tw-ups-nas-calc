function calcUps(loadWatts, pf = 0.6, upsVa = 1000) {
  const w = Math.max(10, Number(loadWatts) || 250);
  const p = Math.min(1.0, Math.max(0.5, Number(pf) || 0.6));
  const va = Math.max(300, Number(upsVa) || 1000);
  const minVa = Math.ceil((w * 1.25) / p / 50) * 50;
  const maxWatts = Math.round(va * p);
  // Rough runtime estimate for typical 12V 7Ah/9Ah lead-acid battery per ~600VA tier
  const batteryWh = (va / 1000) * 160;
  const estMinutes = Math.max(1, Math.round((batteryWh * 0.85 / w) * 60));
  return { minVa, maxWatts, estMinutes };
}
if (typeof document !== "undefined") {
  const ids = ["loadWatts", "pfInput", "upsVaInput"];
  function render() {
    const [w, p, va] = ids.map(id => document.getElementById(id).value);
    const res = calcUps(w, p, va);
    document.getElementById("recVaEl").textContent = `${res.minVa} VA 以上`;
    document.getElementById("maxWattEl").textContent = `${res.maxWatts} W`;
    document.getElementById("runtimeEl").textContent = `約 ${res.estMinutes} 分鐘`;
  }
  ids.forEach(id => document.getElementById(id).addEventListener("input", render));
  render();
}
if (typeof module !== "undefined" && module.exports) module.exports = { calcUps };