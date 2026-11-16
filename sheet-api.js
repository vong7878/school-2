// sheet-api.js
const SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbz2GeJz9zdeNbJ__dOuVkW5oT1Gfzdz5OZekUhBiGU0AlBE46lBre1JH_GFr3agr5Gi/exec";

const SheetAPI = {
  async read(sheetName) {
    const url = `${SHEET_WEB_APP_URL}?sheet=${encodeURIComponent(sheetName)}&_t=${Date.now()}`;
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "ອ່ານຂໍ້ມູນບໍ່ສຳເລັດ");
    return data.rows || data.accounts || data.users || [];
  },

  async add(sheetName, record) {
    const res = await fetch(SHEET_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "add",
        sheet: sheetName,
        data: record
      })
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ");
    return data;
  },

  async update(sheetName, target, record) {
    const res = await fetch(SHEET_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "update",
        sheet: sheetName,
        row: target.row || null,
        id: target.id || null,
        data: record
      })
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ");
    return data;
  },

  async remove(sheetName, target) {
    const res = await fetch(SHEET_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "delete",
        sheet: sheetName,
        row: target.row || null,
        id: target.id || null
      })
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "ລົບຂໍ້ມູນບໍ່ສຳເລັດ");
    return data;
  }
};
