/* Dbweb Glory — shared helpers */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

async function api(url, opts = {}) {
  const o = { credentials: 'same-origin', ...opts, headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) } };
  if (o.body && typeof o.body !== 'string') o.body = JSON.stringify(o.body);
  const r = await fetch(url, o);
  let d = null;
  try { d = await r.json(); } catch (e) {}
  if (!r.ok) { const err = new Error((d && d.error) || ('Request failed (' + r.status + ')')); err.status = r.status; throw err; }
  return d;
}
const post = (url, body) => api(url, { method: 'POST', body: body || {} });

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function toast(msg, type) {
  let box = $('#toasts');
  if (!box) { box = document.createElement('div'); box.id = 'toasts'; document.body.appendChild(box); }
  const t = document.createElement('div');
  t.className = 'toast ' + (type || '');
  t.textContent = msg;
  box.appendChild(t);
  setTimeout(() => t.remove(), 3600);
}
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); }
  catch (e) {
    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e2) {} ta.remove();
  }
  toast('Copied', 'ok');
}
function fmtDate(ts) {
  if (!ts) return '—';
  const d = new Date(ts * 1000);
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short' }) + ' ' +
         d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}
const inr = n => '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });

let CONFIG = { brand: 'Dbweb Glory', dev_email: 'lumenomore@hotmail.com', upi_enabled: false, basic_price: 0, premium_price: 0 };
async function loadConfig() {
  try { CONFIG = await api('/api/public/config'); } catch (e) {}
  $$('[data-brand]').forEach(el => el.textContent = CONFIG.brand);
  $$('[data-email]').forEach(el => { el.textContent = CONFIG.dev_email; if (el.tagName === 'A') el.href = 'mailto:' + CONFIG.dev_email; });
  $$('[data-basic-price]').forEach(el => el.textContent = inr(CONFIG.basic_price));
  $$('[data-premium-price]').forEach(el => el.textContent = inr(CONFIG.premium_price));
  document.title = document.title.replace('{brand}', CONFIG.brand);
  return CONFIG;
}
async function requireUser(adminOnly) {
  try {
    const me = await api('/api/me');
    if (adminOnly && me.role !== 'admin') { location.href = '/client'; return null; }
    return me;
  } catch (e) { location.href = '/login'; return null; }
}
async function logout() { try { await post('/api/auth/logout'); } catch (e) {} location.href = '/login'; }
function modal(html) {
  const bg = document.createElement('div');
  bg.className = 'modal-bg';
  bg.innerHTML = '<div class="neo modal">' + html + '</div>';
  bg.addEventListener('click', e => { if (e.target === bg) bg.remove(); });
  document.body.appendChild(bg);
  return bg;
}
const STATUS_BADGE = { created: 'info', submitted: 'warn', approved: 'ok', rejected: 'bad', cancelled: 'bad', active: 'info', used: 'ok' };
const badge = s => '<span class="badge ' + (STATUS_BADGE[s] || '') + '">' + esc(s) + '</span>';
