(() => {
'use strict';

/* ================= Icons ================= */
const ICONS = {
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  tray: '<path d="M3 13l2.5-7.5h13L21 13v6H3z"/><path d="M3 13h5l1.5 2.5h5L16 13h5"/>',
  pin: '<path d="M9 3.5h6l-1 5.5 3.5 3v2h-11v-2L10 9z"/><path d="M12 14.5V21"/>',
  unpin: '<path d="M9 3.5h6l-1 5.5 3.5 3v2h-11v-2L10 9z"/><path d="M12 14.5V21M3 3l18 18"/>',
  trash: '<path d="M4 7h16M9.5 7V4.5h5V7M6 7l1 13h10l1-13"/><path d="M10 11v5.5M14 11v5.5"/>',
  sort: '<path d="M7 4v16M3.5 16.5L7 20l3.5-3.5M17 20V4M13.5 7.5L17 4l3.5 3.5"/>',
  chev: '<path d="M6 9l6 6 6-6"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  sidebar: '<rect x="3" y="4.5" width="18" height="15" rx="3"/><path d="M9.5 4.5v15"/>',
  bullet: '<path d="M10 7h10M10 12h10M10 17h10"/><circle cx="5" cy="7" r=".6"/><circle cx="5" cy="12" r=".6"/><circle cx="5" cy="17" r=".6"/>',
  numbered: '<path d="M10.5 7h9.5M10.5 12h9.5M10.5 17h9.5"/><path d="M4 5.5L5.5 4.5v5" stroke-width="1.8"/><path d="M3.8 14c.5-1 2.7-.9 2.7.4 0 1.1-2.7 1.9-2.7 3.6h2.9" stroke-width="1.8"/>',
  checklist: '<path d="M3.5 7l2 2 3.5-4M3.5 16.5l2 2 3.5-4M12.5 7.5H21M12.5 17H21"/>',
  scribble: '<path d="M3 17.5c2.5-5 4.5-9 6.5-9 2.3 0-1.2 8.5 1.3 8.5 2.2 0 3.2-6 5.4-6 1.9 0-.4 5 1.6 5 1.2 0 2.2-1.2 3.2-2.4"/>',
  highlighter: '<path d="M15 4.5l4.5 4.5-7.5 7.5H8.5V13z"/><path d="M8.5 16.5L6 19h4"/>',
  pen: '<path d="M4.5 19.5l1-4.5L16 4.5l3.5 3.5L9 18.5z"/><path d="M14 6.5l3.5 3.5"/>',
  eraser: '<path d="M9 20h11M4.7 14.7l9.6-10 5.4 5.4-9.4 9.9H9.6z"/><path d="M9.2 10l5.3 5.3"/>',
  undo: '<path d="M9 13.5L4.5 9 9 4.5"/><path d="M4.5 9h10a5.5 5.5 0 010 11H11"/>',
  redo: '<path d="M15 13.5L19.5 9 15 4.5"/><path d="M19.5 9h-10a5.5 5.5 0 000 11H13"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  folder: '<path d="M3 7.5a2 2 0 012-2h4l2 2h8a2 2 0 012 2V17a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
  tag: '<path d="M3.5 11.5v-7h7l10 10-7 7z"/><circle cx="8" cy="9" r="1.3"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"/>',
  edit: '<path d="M4.5 19.5l1-4.5L16 4.5l3.5 3.5L9 18.5z"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  restore: '<path d="M9 13.5L4.5 9 9 4.5"/><path d="M4.5 9h10a5.5 5.5 0 010 11H11"/>',
  textformat: '<path d="M3.5 7V5h11v2M9 5v14M7 19h4"/><path d="M14 12.5v-1.5h7v1.5M17.5 11v8M16 19h3"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  az: '<path d="M4 17l3.5-10 3.5 10M5.2 13.5h4.6M14 7h6l-6 10h6"/>',
};
const icon = (name, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
const DAY = 86400000;

/* ================= Constants from the app ================= */
const ACCENTS = ['yellow', 'pink', 'blue', 'green', 'purple', 'orange'];
const ACCENT_NAME = { yellow: 'Yellow', pink: 'Pink', blue: 'Blue', green: 'Green', purple: 'Purple', orange: 'Orange' };
const INKS = ['ink', 'blue', 'pink', 'green', 'purple', 'orange', 'yellow'];
const PEN_W = [2, 4, 8], MARKER_W = [10, 18, 28], ERASER_W = [10, 22, 40];
const WIDTH_NAMES = ['Thin', 'Medium', 'Thick'];
const inkName = c => c === 'ink' ? 'Ink' : ACCENT_NAME[c];
const DRAW_MIN = 160, DRAW_MAX = 1200, DRAW_DEFAULT = 320;
const RETENTION_DAYS = 30;
const EMOJIS = ['📘','📗','📕','📙','📓','📒','🧪','🔬','🧬','🧮','➗','📐','📊','💼','🏛️','🌍','🗺️','🎨','🎵','🎭','💻','🧠','⚽️','🏀','✏️','🖍️','📝','💡','⭐️','🌱','🍎','🗣️'];
const SORTS = [
  { id: 'lastEdited', label: 'Last edited', icon: 'clock' },
  { id: 'created', label: 'Date created', icon: 'calendar' },
  { id: 'title', label: 'Title', icon: 'az' },
];
const PLACEHOLDER = { paragraph: 'Start writing…', heading: 'Heading', subheading: 'Subheading', bullet: 'List item', numbered: 'List item', checklist: 'To-do' };

/* ================= Storage ================= */
const KEY = 'powernotes.web.v1';
let D = null;
const S = {
  view: 'all', noteId: null, search: '', sort: 'lastEdited', pane: 'list', sideOpen: false,
  focusBlockId: null, activeDrawingId: null, lastRange: null,
  tool: { tool: 'pen', ink: 'ink', wi: 1, before: 'pen' },
  redo: {}, newCardId: null,
};

function store(read) {
  try { return read ? localStorage.getItem(KEY) : null; } catch { return null; }
}
let saveTimer = null;
function save(now) {
  clearTimeout(saveTimer);
  const run = () => {
    D.ui = { view: S.view, noteId: S.noteId, sort: S.sort };
    try { localStorage.setItem(KEY, JSON.stringify(D)); } catch {}
  };
  if (now) run(); else saveTimer = setTimeout(run, 600);
}
function load() {
  let parsed = null;
  try { parsed = JSON.parse(store(true) || 'null'); } catch { parsed = null; }
  if (parsed && Array.isArray(parsed.notes) && Array.isArray(parsed.subjects)) {
    D = parsed;
    D.tags = D.tags || [];
  } else {
    D = seed();
  }
  const ui = D.ui || {};
  S.sort = ui.sort || 'lastEdited';
  S.view = ui.view || 'all';
  if (S.view !== 'all' && S.view !== 'pinned' && S.view !== 'trash' && !subjectById(S.view)) S.view = 'all';
  // Clear notes that have been in Recently Deleted for 30 days.
  const now = Date.now();
  D.notes = D.notes.filter(n => !n.deletedAt || now < n.deletedAt + RETENTION_DAYS * DAY);
  S.noteId = ui.noteId && noteById(ui.noteId) ? ui.noteId : null;
  if (!S.noteId && innerWidth > 720) S.noteId = notesForView()[0]?.id ?? null;
}

/* ================= Sample data (same as SampleData.swift) ================= */
function seed() {
  const now = Date.now();
  const subjects = [
    { id: uid(), name: 'Accounting', emoji: '📘', accent: 'blue' },
    { id: uid(), name: 'Science', emoji: '🧪', accent: 'green' },
    { id: uid(), name: 'Personal', emoji: '✏️', accent: 'pink' },
  ];
  const tags = ['exam', 'homework', 'lab', 'ideas'].map((name, i) => ({ id: uid(), name, accent: ACCENTS[i % ACCENTS.length] }));
  const T = n => tags.find(t => t.name === n).id;
  const [acc, sci, per] = subjects;
  const b = (kind, html, extra = {}) => ({ id: uid(), kind, html, ...extra });
  const hl = (t, c) => `<mark data-hl="${c}">${t}</mark>`;
  const notes = [];
  const add = (title, subject, tagNames, pinned, daysAgo, blocks) => {
    const t = now - daysAgo * DAY - notes.length * 60000;
    blocks.push(b('paragraph', ''));
    notes.push({ id: uid(), title, subjectId: subject.id, tagIds: tagNames.map(T), pinned, createdAt: t, updatedAt: t, deletedAt: null, blocks });
  };
  add('Debits and credits cheat sheet', acc, ['exam'], true, 1, [
    b('heading', 'The golden rule'),
    b('paragraph', `Every transaction has ${hl('two sides', 'yellow')}, and they always balance.`),
    b('bullet', '<b>Debit</b> goes on the left: assets and expenses go up.'),
    b('bullet', '<b>Credit</b> goes on the right: liabilities, equity and income go up.'),
    b('paragraph', '<i>Tip: </i>say it out loud while you do the practice set.'),
  ]);
  add('Chapter 3: The balance sheet', acc, ['homework'], false, 3, [
    b('heading', 'Three parts'),
    b('numbered', 'Assets: what the business owns'),
    b('numbered', 'Liabilities: what it owes'),
    b('numbered', "Equity: what's left for the owners"),
    b('paragraph', hl('Assets = Liabilities + Equity', 'blue')),
  ]);
  add('Quiz prep', acc, ['exam'], false, 6, [
    b('subheading', 'Before Friday'),
    b('checklist', 'Reread chapters 2 and 3', { checked: true }),
    b('checklist', 'Do practice set B'),
    b('checklist', 'Make flash notes for the key terms'),
  ]);
  add('Cell structure', sci, ['exam', 'lab'], false, 0, [
    b('heading', 'Parts of a cell'),
    b('bullet', '<b>Nucleus</b>: holds the DNA'),
    b('bullet', '<b>Mitochondria</b>: make energy for the cell'),
    b('bullet', '<b>Membrane</b>: controls what goes in and out'),
    { id: uid(), kind: 'drawing', strokes: cellDoodle(), height: 300 },
    b('paragraph', '<u>Sketch it from memory</u> before the test.'),
  ]);
  add('Lab report: plant growth', sci, ['lab', 'homework'], false, 4, [
    b('subheading', 'Hypothesis'),
    b('paragraph', `Plants near the window will grow ${hl('faster', 'green')}.`),
    b('subheading', 'Steps'),
    b('numbered', 'Measure each plant on Monday'),
    b('numbered', 'Water every other day'),
    b('numbered', 'Measure again next Monday'),
    b('checklist', 'Take photos for the report', { checked: true }),
    b('checklist', 'Write up the results'),
  ]);
  add('Weekend to-do', per, [], true, 2, [
    b('checklist', 'Return library books', { checked: true }),
    b('checklist', 'Call grandma'),
    b('checklist', 'Clean my desk'),
    b('checklist', 'Plan next week'),
  ]);
  add('Book ideas', per, ['ideas'], false, 9, [
    b('paragraph', `A mystery set in a ${hl('school library', 'purple')} where the books <i>rearrange themselves</i> at night.`),
  ]);
  return { v: 1, subjects, tags, notes, ui: {} };
}
function cellDoodle() {
  const oval = (cx, cy, rx, ry, c, w) => {
    const p = [];
    for (let s = 0; s <= 60; s++) {
      const a = s / 60 * Math.PI * 2, wob = 1 + 0.03 * Math.sin(a * 3);
      p.push(+(cx + rx * Math.cos(a) * wob).toFixed(1), +(cy + ry * Math.sin(a) * wob).toFixed(1), 50);
    }
    return { t: 'pen', c, w, pr: 0, p };
  };
  return [
    oval(220, 150, 170, 115, 'ink', 5),
    oval(200, 140, 46, 40, 'purple', 5),
    oval(320, 110, 30, 14, 'green', 4),
    oval(290, 205, 28, 13, 'green', 4),
  ];
}

/* ================= Queries ================= */
const subjectById = id => D.subjects.find(s => s.id === id);
const tagById = id => D.tags.find(t => t.id === id);
const noteById = id => D.notes.find(n => n.id === id);
const current = () => noteById(S.noteId);
const live = () => D.notes.filter(n => !n.deletedAt);
const textOf = html => String(html || '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
const bodyText = n => n.blocks.filter(b => b.kind !== 'drawing').map(b => textOf(b.html)).filter(Boolean).join(' ');
const noteTags = n => (n.tagIds || []).map(tagById).filter(Boolean);
const fold = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function matches(q, n) {
  const trimmed = q.trim();
  if (!trimmed) return true;
  const tags = noteTags(n).map(t => fold(t.name));
  if (trimmed.startsWith('#')) {
    const tag = fold(trimmed.slice(1).trim());
    if (!tag) return tags.length > 0;
    return tags.some(t => t.includes(tag));
  }
  const title = fold(n.title || ''), body = fold(bodyText(n));
  return fold(trimmed).split(/\s+/).every(w => title.includes(w) || body.includes(w) || tags.some(t => t.includes(w)));
}
function notesForView() {
  let list;
  if (S.view === 'trash') list = D.notes.filter(n => n.deletedAt);
  else if (S.view === 'pinned') list = live().filter(n => n.pinned);
  else if (S.view === 'all') list = live();
  else list = live().filter(n => n.subjectId === S.view);
  list = list.filter(n => matches(S.search, n));
  if (S.view === 'trash') return list.sort((a, b) => b.deletedAt - a.deletedAt);
  return list.sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    if (S.sort === 'created') return b.createdAt - a.createdAt;
    if (S.sort === 'title') {
      const o = (a.title || 'Untitled').localeCompare(b.title || 'Untitled', undefined, { numeric: true, sensitivity: 'base' });
      return o || b.updatedAt - a.updatedAt;
    }
    return b.updatedAt - a.updatedAt;
  });
}
const daysLeft = n => Math.max(0, Math.ceil((n.deletedAt + RETENTION_DAYS * DAY - Date.now()) / DAY));
function shortDate(ts) {
  const d = new Date(ts), now = new Date();
  const sameDay = (a, b) => a.toDateString() === b.toDateString();
  if (sameDay(d, now)) return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  if (sameDay(d, new Date(now - DAY))) return 'Yesterday';
  if (d.getFullYear() === now.getFullYear()) return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
}
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
const viewTitle = () => {
  if (S.view === 'all') return 'All Notes';
  if (S.view === 'pinned') return 'Pinned';
  if (S.view === 'trash') return 'Recently Deleted';
  const s = subjectById(S.view);
  return s ? `${s.emoji} ${s.name}` : 'Notes';
};

/* ================= Library actions ================= */
function touch(n) { n.updatedAt = Date.now(); save(); }
function newNote() {
  closeFloating();
  if (S.view === 'trash' || S.view === 'pinned') S.view = 'all';
  const t = Date.now();
  const n = { id: uid(), title: '', subjectId: subjectById(S.view) ? S.view : null, tagIds: [], pinned: false, createdAt: t, updatedAt: t, deletedAt: null, blocks: [{ id: uid(), kind: 'paragraph', html: '' }] };
  D.notes.push(n);
  S.search = '';
  S.newCardId = n.id;
  openNote(n.id, { focusTitle: true });
  save();
}
function openNote(id, opts = {}) {
  S.noteId = id;
  S.activeDrawingId = null;
  S.focusBlockId = null;
  S.pane = 'editor';
  S.sideOpen = false;
  renderAll();
  if (opts.focusTitle) requestAnimationFrame(() => $('#title')?.focus());
  save();
}
function deleteNote(n, { undo = true } = {}) {
  if (!n || n.deletedAt) return;
  const list = notesForView();
  const i = list.indexOf(n);
  n.deletedAt = Date.now();
  if (S.noteId === n.id) {
    const rest = list.filter(x => x !== n);
    S.noteId = innerWidth > 720 ? (rest[Math.min(i, rest.length - 1)]?.id ?? null) : null;
    S.pane = 'list';
    S.activeDrawingId = null;
  }
  renderAll();
  save();
  if (undo) toast('Moved to Recently Deleted', 'Undo', () => { n.deletedAt = null; S.noteId = n.id; renderAll(); save(); });
}
function restoreNote(n) {
  n.deletedAt = null;
  if (n.subjectId && !subjectById(n.subjectId)) n.subjectId = null;
  renderAll(); save();
  toast('Note restored');
}
function destroyNote(n) {
  D.notes = D.notes.filter(x => x !== n);
  if (S.noteId === n.id) { S.noteId = null; S.pane = 'list'; }
  renderAll(); save();
}
function duplicateNote(n) {
  const t = Date.now();
  const copy = JSON.parse(JSON.stringify(n));
  Object.assign(copy, { id: uid(), title: (n.title || 'Untitled') + ' copy', pinned: false, createdAt: t, updatedAt: t });
  copy.blocks.forEach(b => { b.id = uid(); });
  D.notes.push(copy);
  S.newCardId = copy.id;
  openNote(copy.id);
}
function togglePin(n) {
  n.pinned = !n.pinned;
  save();
  renderList();
  renderSidebar();
  const btn = $('#pinBtn');
  if (btn) {
    btn.classList.toggle('on', n.pinned);
    btn.setAttribute('aria-label', n.pinned ? 'Unpin note' : 'Pin note');
    btn.innerHTML = icon(n.pinned ? 'pin' : 'pin');
    btn.classList.remove('wiggle'); void btn.offsetWidth; btn.classList.add('wiggle');
  }
}
function moveNote(n, subjectId) {
  n.subjectId = subjectId;
  touch(n);
  renderAll();
  const s = subjectById(subjectId);
  toast(s ? `Moved to ${s.emoji} ${s.name}` : 'Moved out of its subject');
}
function tagNamed(name) {
  const clean = name.trim().replace(/^#/, '').toLowerCase();
  if (!clean) return null;
  let t = D.tags.find(x => x.name.toLowerCase() === clean);
  if (!t) { t = { id: uid(), name: clean, accent: ACCENTS[D.tags.length % ACCENTS.length] }; D.tags.push(t); }
  return t;
}
function deleteSubject(s) {
  const now = Date.now();
  live().filter(n => n.subjectId === s.id).forEach(n => { n.deletedAt = now; n.subjectId = null; });
  D.subjects = D.subjects.filter(x => x !== s);
  if (S.view === s.id) S.view = 'all';
  const cur = current();
  if (cur && cur.deletedAt && S.view !== 'trash') S.noteId = null;
  renderAll(); save();
}

/* ================= Rendering: sidebar ================= */
function renderSidebar() {
  const el = $('#sidebar');
  const count = v => v === 'all' ? live().length : v === 'pinned' ? live().filter(n => n.pinned).length : v === 'trash' ? D.notes.filter(n => n.deletedAt).length : live().filter(n => n.subjectId === v).length;
  const libRow = (v, label, ic, fill) => `
    <button class="row pop pressable ${S.view === v ? 'pressed' : ''}" data-view="${v}" style="${fill ? `background:var(--${fill});color:var(--on-accent)` : ''}" aria-current="${S.view === v}">
      <span class="badge">${icon(ic)}</span><span class="name">${label}</span><span class="count">${count(v)}</span>
    </button>`;
  el.innerHTML = `
    <div class="brand"><span class="brand-mark pop" aria-hidden="true">📒</span><h1>PowerNotes</h1></div>
    <div class="side-group">
      ${libRow('all', 'All Notes', 'tray', S.view === 'all' ? 'yellow' : '')}
      ${libRow('pinned', 'Pinned', 'pin', S.view === 'pinned' ? 'yellow' : '')}
      ${libRow('trash', 'Recently Deleted', 'trash', S.view === 'trash' ? 'yellow' : '')}
    </div>
    <div class="side-head"><span class="eyebrow">Subjects</span>
      <button class="icon-btn plain" id="addSubject" aria-label="New subject" title="New subject">${icon('plus')}</button></div>
    <div class="side-group" id="subjectRows">
      ${D.subjects.map(s => `
        <button class="row subject pop pressable ${S.view === s.id ? 'pressed' : ''}" data-view="${s.id}" style="background:var(--${s.accent})" aria-label="${esc(s.name)}, ${plural(count(s.id), 'note')}">
          <span class="badge">${esc(s.emoji)}</span><span class="name">${esc(s.name)}</span><span class="count">${count(s.id)}</span>
        </button>`).join('')}
      ${D.subjects.length ? '' : `<p class="caption" style="margin:0;padding:0 4px">Add a subject for each class, like Biology or History.</p>`}
    </div>
    <div class="side-foot">
      <p>Your notes are saved in this browser, on this device.</p>
      <button class="link-btn" id="resetBtn">Reset to sample notes</button>
    </div>`;

  $$('[data-view]', el).forEach(row => {
    row.addEventListener('click', () => {
      if (row.dataset.lp) { delete row.dataset.lp; return; }
      selectView(row.dataset.view);
    });
    const v = row.dataset.view;
    if (subjectById(v)) longPress(row, (x, y) => subjectMenu(subjectById(v), x, y));
    // Drag a note card onto a row.
    row.addEventListener('dragover', e => { if (dragId) { e.preventDefault(); row.classList.add('drop-target'); } });
    row.addEventListener('dragleave', () => row.classList.remove('drop-target'));
    row.addEventListener('drop', e => {
      e.preventDefault(); row.classList.remove('drop-target');
      const n = noteById(dragId); dragId = null;
      if (!n) return;
      if (v === 'trash') deleteNote(n);
      else if (v === 'pinned') { if (!n.pinned) togglePin(n); }
      else if (v === 'all') { if (n.deletedAt) restoreNote(n); }
      else { if (n.deletedAt) n.deletedAt = null; moveNote(n, v); }
    });
  });
  $('#addSubject', el).onclick = () => subjectSheet(null);
  $('#resetBtn', el).onclick = () => confirmSheet({
    title: 'Reset to the sample notes?',
    body: 'This replaces every note, subject and tag in this browser with the starter set.',
    action: 'Reset', onConfirm: () => {
      D = seed(); S.view = 'all'; S.search = ''; S.noteId = innerWidth > 720 ? notesForView()[0]?.id : null; S.pane = 'list';
      renderAll(); save(true);
    },
  });
}
function selectView(v) {
  S.view = v;
  S.search = '';
  S.sideOpen = false;
  S.pane = 'list';
  const list = notesForView();
  if (innerWidth > 720 && !list.some(n => n.id === S.noteId)) S.noteId = list[0]?.id ?? null;
  S.activeDrawingId = null;
  renderAll();
  save();
}

/* ================= Rendering: note list ================= */
function renderListHead() {
  const el = $('#listCol');
  const trash = S.view === 'trash';
  const trashCount = D.notes.filter(n => n.deletedAt).length;
  el.innerHTML = `
    <div class="list-head">
      <div class="list-title-row">
        <button class="icon-btn pop pressable sidebar-toggle" id="sideToggle" aria-label="Show subjects">${icon('sidebar')}</button>
        <h2 class="list-title" id="listTitle"></h2>
        ${trash && trashCount ? `<button class="btn danger pop pressable" id="emptyTrash" style="min-height:40px;padding:0 14px;font-size:15px">Empty</button>` : ''}
      </div>
      <div class="caption list-sub" id="listSub"></div>
      <div class="search-row">
        <label class="search pop">${icon('search')}
          <input id="search" type="text" enterkeyhint="search" autocomplete="off" placeholder="Search titles, notes and tags" aria-label="Search titles, notes and tags">
          <button class="clear" id="clearSearch" aria-label="Clear search" hidden>${icon('x')}</button>
        </label>
        ${trash ? '' : `<button class="icon-btn pop pressable" id="sortBtn" aria-label="Sort notes" title="Sort notes">${icon('sort')}</button>`}
      </div>
    </div>
    <div class="cards" id="cards"></div>
    ${trash ? '' : `<button class="fab pop pressable" id="fab" aria-label="New note" title="New note (⌘N)">${icon('plus')}</button>`}`;
  const input = $('#search', el);
  input.value = S.search;
  input.addEventListener('input', () => { S.search = input.value; renderCards(); $('#clearSearch').hidden = !S.search; });
  $('#clearSearch', el).hidden = !S.search;
  $('#clearSearch', el).onclick = e => { e.preventDefault(); S.search = ''; input.value = ''; renderCards(); $('#clearSearch').hidden = true; input.focus(); };
  $('#sideToggle', el).onclick = () => { S.sideOpen = true; applyFrame(); };
  if ($('#fab', el)) $('#fab', el).onclick = newNote;
  if ($('#sortBtn', el)) $('#sortBtn', el).onclick = e => menu(e.currentTarget, [
    { section: 'Sort by' },
    ...SORTS.map(s => ({ label: s.label, icon: s.icon, checked: S.sort === s.id, onSelect: () => { S.sort = s.id; renderCards(); save(); } })),
  ]);
  if ($('#emptyTrash', el)) $('#emptyTrash', el).onclick = () => confirmSheet({
    title: 'Empty Recently Deleted?',
    body: `${plural(trashCount, 'note')} will be deleted for good. You can't undo this.`,
    action: 'Delete All', onConfirm: () => {
      D.notes = D.notes.filter(n => !n.deletedAt);
      if (!current()) S.noteId = null;
      renderAll(); save();
    },
  });
}
function renderList() {
  renderListHead();
  renderCards();
}
let dragId = null;
function renderCards() {
  const el = $('#cards');
  if (!el) return;
  const list = notesForView();
  $('#listTitle').textContent = viewTitle();
  $('#listSub').textContent = plural(list.length, 'note') + (S.view !== 'trash' && S.search ? ' found' : '');
  if (!list.length) { el.innerHTML = emptyList(); wireEmpty(el); return; }
  const trash = S.view === 'trash';
  el.innerHTML = list.map(n => {
    const s = subjectById(n.subjectId);
    const tags = noteTags(n);
    const shown = tags.slice(0, 3);
    const preview = bodyText(n) || (n.blocks.some(b => b.kind === 'drawing') ? 'A sketch' : 'No text yet');
    const when = trash ? (daysLeft(n) === 1 ? '1 day left' : `${daysLeft(n)} days left`) : shortDate(S.sort === 'created' ? n.createdAt : n.updatedAt);
    const meta = s ? `${esc(s.emoji)} ${esc(s.name)} · ${when}` : `No subject · ${when}`;
    return `
      <article class="card pop pressable ${n.id === S.noteId ? 'pressed' : ''} ${n.id === S.newCardId ? 'popin' : ''}" data-id="${n.id}" role="button" tabindex="0" ${matchMedia('(hover: hover)').matches && !trash ? 'draggable="true"' : ''} aria-label="${esc(n.title || 'Untitled')}">
        <div class="strip" style="background:${s ? `var(--${s.accent})` : 'var(--sunken)'}"></div>
        <div class="body">
          <div class="top"><h3>${esc(n.title || 'Untitled')}</h3>${n.pinned && !trash ? `<span class="pin-mark" title="Pinned">${icon('pin')}</span>` : ''}</div>
          <p class="preview">${esc(preview)}</p>
          <div class="meta">${meta}</div>
          ${tags.length ? `<div class="chips">${shown.map(t => `<button class="chip" data-tag="${esc(t.name)}" style="background:var(--${t.accent})" aria-label="Search for #${esc(t.name)}">#${esc(t.name)}</button>`).join('')}${tags.length > 3 ? `<span class="chip" style="background:var(--surface);color:var(--ink)">+${tags.length - 3}</span>` : ''}</div>` : ''}
        </div>
      </article>`;
  }).join('');
  S.newCardId = null;
  $$('.card', el).forEach(card => {
    const n = noteById(card.dataset.id);
    card.addEventListener('click', e => {
      if (card.dataset.lp) { delete card.dataset.lp; return; }
      const chip = e.target.closest('[data-tag]');
      if (chip) { e.stopPropagation(); searchFor('#' + chip.dataset.tag); return; }
      openNote(n.id);
    });
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openNote(n.id); } });
    longPress(card, (x, y) => noteMenu(n, x, y));
    card.addEventListener('dragstart', e => { dragId = n.id; e.dataTransfer.setData('text/plain', n.title || 'Untitled'); e.dataTransfer.effectAllowed = 'move'; card.classList.add('dragging'); });
    card.addEventListener('dragend', () => { card.classList.remove('dragging'); dragId = null; $$('.drop-target').forEach(r => r.classList.remove('drop-target')); });
  });
}
function searchFor(q) {
  S.search = q;
  const input = $('#search');
  if (input) { input.value = q; $('#clearSearch').hidden = !q; }
  S.pane = 'list';
  applyFrame();
  renderCards();
}
const art = (a, b, c) => `<div class="art" aria-hidden="true"><span class="a1">${a}</span><span class="a2">${b}</span><span class="a3">${c}</span></div>`;
function emptyList() {
  if (S.search.trim()) {
    const tags = D.tags.filter(t => live().some(n => n.tagIds.includes(t.id)));
    return `<div class="empty">${art('🔍', '🤔', '❓')}<h2>No luck finding “${esc(S.search.trim())}”</h2>
      <p>${tags.length ? 'Check the spelling, or try one of your tags:' : 'Check the spelling, or try a different word.'}</p>
      ${tags.length ? `<div class="chips">${tags.map(t => `<button class="chip big" data-tag="${esc(t.name)}" style="background:var(--${t.accent})">#${esc(t.name)}</button>`).join('')}</div>` : ''}</div>`;
  }
  if (S.view === 'trash') return `<div class="empty">${art('🗑️', '✨', '🧹')}<h2>Nothing in here</h2><p>Deleted notes wait here for ${RETENTION_DAYS} days, then they're gone for good.</p></div>`;
  if (S.view === 'pinned') return `<div class="empty">${art('📌', '⭐️', '📝')}<h2>No pinned notes</h2><p>Pin a note and it stays at the top of every list.</p></div>`;
  const s = subjectById(S.view);
  return `<div class="empty">${art(s ? esc(s.emoji) : '📝', '✏️', '✨')}<h2>Nothing here yet!</h2><p>${s ? `Start your ${esc(s.name)} notes.` : 'Your notes will show up here.'}</p>
    <button class="btn yellow pop pressable" data-make>${icon('plus')} Make your first note</button></div>`;
}
function wireEmpty(el) {
  $$('[data-tag]', el).forEach(c => c.onclick = () => searchFor('#' + c.dataset.tag));
  const m = $('[data-make]', el);
  if (m) m.onclick = newNote;
}

/* ================= Rendering: editor ================= */
let observers = [];
function renderEditor() {
  const el = $('#editorCol');
  observers.forEach(o => o.disconnect());
  observers = [];
  drawings.clear();
  const n = current();
  if (!n) {
    el.innerHTML = `<div class="editor-empty"><div class="empty">${art('📒', '✏️', '💡')}<h2>Pick a note to start</h2>
      <p>Or make a new one. Apple Pencil and typing both work here.</p>
      ${S.view === 'trash' ? '' : `<button class="btn yellow pop pressable" data-make>${icon('plus')} New note</button>`}</div></div>`;
    const m = $('[data-make]', el); if (m) m.onclick = newNote;
    return;
  }
  const ro = !!n.deletedAt;
  const s = subjectById(n.subjectId);
  el.innerHTML = `
    <div class="editor-scroll" id="edScroll">
      <div class="toolbar-slot" id="toolbarSlot"></div>
      <div class="page">
        ${ro ? `<div class="trash-banner"><div class="txt-wrap"><strong>This note is in Recently Deleted</strong>
            <span class="caption">${daysLeft(n) === 0 ? 'It will be deleted for good today.' : daysLeft(n) === 1 ? 'It will be deleted for good tomorrow.' : `It will be deleted for good in ${daysLeft(n)} days.`}</span></div>
            <button class="btn yellow pop pressable" id="restoreBtn">${icon('restore')} Restore</button>
            <button class="btn danger pop pressable" id="destroyBtn">Delete Now</button></div>` : ''}
        <div class="ed-row">
          <button class="icon-btn pop pressable back-btn" id="backBtn" aria-label="Back to notes">${icon('back')}</button>
          <button class="subject-chip ${s ? '' : 'none'}" id="subjectBtn" ${s ? `style="background:var(--${s.accent})"` : ''} ${ro ? 'disabled' : ''} aria-label="Subject: ${s ? esc(s.name) : 'none'}">
            ${s ? `<span>${esc(s.emoji)}</span> ${esc(s.name)}` : `${icon('folder')} No subject`} ${ro ? '' : icon('chev')}
          </button>
          <span class="spacer"></span>
          ${ro ? '' : `
          <button class="icon-btn pop pressable pin-btn ${n.pinned ? 'on' : ''}" id="pinBtn" aria-label="${n.pinned ? 'Unpin note' : 'Pin note'}" title="Pin">${icon('pin')}</button>
          <button class="icon-btn pop pressable" id="deleteBtn" aria-label="Delete note" title="Delete note (⌘⌫)">${icon('trash')}</button>`}
        </div>
        <textarea id="title" class="title" rows="1" placeholder="Title" aria-label="Title" ${ro ? 'readonly' : ''}></textarea>
        <div class="ed-meta" id="edMeta"></div>
        <div class="ed-tags" id="edTags"></div>
        <div class="blocks" id="blocks"></div>
      </div>
    </div>`;
  const title = $('#title', el);
  title.value = n.title;
  const grow = () => { title.style.height = 'auto'; title.style.height = title.scrollHeight + 'px'; };
  requestAnimationFrame(grow);
  title.addEventListener('input', () => { n.title = title.value.replace(/\n/g, ' '); grow(); touch(n); updateMeta(); refreshListSoon(); });
  title.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); const first = n.blocks.find(b => b.kind !== 'drawing'); if (first) focusBlock(first.id, 0); }
  });
  title.addEventListener('focus', () => { if (S.activeDrawingId) deactivateDrawing(); S.focusBlockId = null; updateToolbarState(); });
  $('#backBtn', el).onclick = () => { S.pane = 'list'; applyFrame(); };
  if (!ro) {
    $('#subjectBtn', el).onclick = e => menu(e.currentTarget, [
      { section: 'Subject' },
      ...D.subjects.map(x => ({ label: x.name, emoji: x.emoji, checked: n.subjectId === x.id, onSelect: () => moveNote(n, x.id) })),
      { label: 'No subject', icon: 'folder', checked: !n.subjectId, onSelect: () => moveNote(n, null) },
    ]);
    $('#pinBtn', el).onclick = () => togglePin(n);
    $('#deleteBtn', el).onclick = () => deleteNote(n);
  } else {
    $('#restoreBtn', el).onclick = () => restoreNote(n);
    $('#destroyBtn', el).onclick = () => confirmSheet({ title: 'Delete this note for good?', body: "You can't undo this.", action: 'Delete', onConfirm: () => destroyNote(n) });
  }
  updateMeta();
  renderTags();
  renderBlocks();
  renderToolbar();
}
function updateMeta() {
  const n = current(), m = $('#edMeta');
  if (n && m) m.textContent = `Edited ${shortDate(n.updatedAt)} · Created ${shortDate(n.createdAt)}`;
}
function renderTags() {
  const n = current(), el = $('#edTags');
  if (!n || !el) return;
  const ro = !!n.deletedAt;
  el.innerHTML = noteTags(n).map(t => `<button class="chip big" data-tag="${esc(t.name)}" style="background:var(--${t.accent})" aria-label="Search for #${esc(t.name)}" title="Search for this tag">#${esc(t.name)}</button>`).join('')
    + (ro ? '' : `<button class="chip add" id="addTag" aria-label="Add or remove tags">${icon('tag')} ${noteTags(n).length ? 'Tags' : 'Add tag'}</button>`);
  $$('[data-tag]', el).forEach(c => c.onclick = () => searchFor('#' + c.dataset.tag));
  const add = $('#addTag', el);
  if (add) add.onclick = () => tagPicker(add, n);
}
let listTimer = null;
function refreshListSoon() { clearTimeout(listTimer); listTimer = setTimeout(() => { renderCards(); }, 350); }

/* ---------- Blocks ---------- */
function ensureTrailing(n) {
  if (!n.blocks.length || n.blocks[n.blocks.length - 1].kind === 'drawing') n.blocks.push({ id: uid(), kind: 'paragraph', html: '' });
}
function renderBlocks(focus) {
  const n = current(), el = $('#blocks');
  if (!n || !el) return;
  ensureTrailing(n);
  observers.forEach(o => o.disconnect());
  observers = [];
  drawings.clear();
  const ro = !!n.deletedAt;
  let num = 0;
  const onlyEmpty = n.blocks.length === 1;
  el.innerHTML = n.blocks.map(b => {
    num = b.kind === 'numbered' ? num + 1 : 0;
    if (b.kind === 'drawing') {
      return `<div class="block k-drawing" data-id="${b.id}">
        <div class="draw-wrap ${S.activeDrawingId === b.id ? 'active' : ''} ${ro ? 'readonly' : ''}" style="height:${b.height || DRAW_DEFAULT}px" aria-label="Drawing">
          <canvas class="main"></canvas><canvas class="live"></canvas>
          <span class="draw-hint">Tap to draw with your finger · Pencil draws right away</span>
          <div class="grip" aria-label="Drag to resize the drawing"></div>
        </div></div>`;
    }
    const gutter = b.kind === 'numbered' ? `${num}.` : b.kind === 'checklist'
      ? `<button class="check ${b.checked ? 'on' : ''}" aria-label="${b.checked ? 'Done' : 'Not done'}" ${ro ? 'disabled' : ''}>${icon('check')}</button>` : '';
    return `<div class="block k-${b.kind} ${b.kind === 'checklist' && b.checked ? 'done' : ''}" data-id="${b.id}">
      <div class="gutter">${gutter}</div>
      <div class="txt ${onlyEmpty ? 'only' : ''}" ${ro ? '' : 'contenteditable="true"'} data-ph="${PLACEHOLDER[b.kind]}" spellcheck="true">${b.html || ''}</div></div>`;
  }).join('');
  $$('.k-drawing', el).forEach(be => mountDrawing(n.blocks.find(b => b.id === be.dataset.id), be, ro));
  if (focus) focusBlock(focus.id, focus.offset);
}
function blockOf(node) {
  const be = node?.closest?.('.block');
  const n = current();
  return be && n ? n.blocks.find(b => b.id === be.dataset.id) : null;
}
function txtEl(id) { return $(`.block[data-id="${id}"] .txt`); }
function focusBlock(id, offset) {
  const el = txtEl(id);
  if (!el) return;
  el.focus({ preventScroll: false });
  setCaret(el, offset === 'end' ? Infinity : (offset || 0));
}

/* Caret helpers */
function caretOffset(el) {
  const sel = getSelection();
  if (!sel.rangeCount) return 0;
  const r = sel.getRangeAt(0);
  if (!el.contains(r.startContainer)) return 0;
  const pre = document.createRange();
  pre.selectNodeContents(el);
  pre.setEnd(r.startContainer, r.startOffset);
  return pre.toString().length;
}
function setCaret(el, offset) {
  const sel = getSelection();
  const r = document.createRange();
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let seen = 0, node, placed = false;
  while ((node = walker.nextNode())) {
    if (seen + node.length >= offset) { r.setStart(node, Math.max(0, offset - seen)); placed = true; break; }
    seen += node.length;
  }
  if (!placed) { r.selectNodeContents(el); r.collapse(false); } else r.collapse(true);
  sel.removeAllRanges();
  sel.addRange(r);
}

/* Keep only bold, italic, underline, highlight and line breaks. */
function clean(html) {
  const d = document.createElement('div');
  d.innerHTML = html;
  const walk = node => {
    for (const c of [...node.childNodes]) {
      if (c.nodeType === 3) continue;
      if (c.nodeType !== 1) { c.remove(); continue; }
      walk(c);
      let tag = { STRONG: 'B', EM: 'I' }[c.tagName] || c.tagName;
      if (tag === 'BR') continue;
      if (tag === 'SPAN' || tag === 'FONT') {
        const st = c.style;
        if (st && /^(bold|[6-9]00)$/.test(st.fontWeight)) tag = 'B';
        else if (st && st.fontStyle === 'italic') tag = 'I';
        else if (st && /underline/.test(st.textDecoration || st.textDecorationLine)) tag = 'U';
      }
      if (['B', 'I', 'U', 'MARK'].includes(tag)) {
        if (!c.textContent) { c.remove(); continue; }
        const nn = document.createElement(tag);
        if (tag === 'MARK') nn.dataset.hl = ACCENTS.includes(c.dataset?.hl) ? c.dataset.hl : 'yellow';
        while (c.firstChild) nn.appendChild(c.firstChild);
        c.replaceWith(nn);
      } else {
        c.replaceWith(...c.childNodes);
      }
    }
  };
  walk(d);
  let out = d.innerHTML;
  if (/^(<br>)+$/.test(out)) out = '';
  return out.replace(/<br>$/, '');
}
function syncBlock(el) {
  const b = blockOf(el), n = current();
  if (!b || !n) return;
  b.html = clean(el.innerHTML);
  touch(n);
  updateMeta();
  refreshListSoon();
}

/* Editing keys: Return splits blocks, Backspace at the start merges or un-lists. */
function onTextKey(e) {
  const el = e.target.closest('.txt');
  if (!el) return;
  const n = current(), b = blockOf(el);
  if (!n || !b) return;
  const idx = n.blocks.indexOf(b);
  const mod = e.metaKey || e.ctrlKey;
  if (mod && !e.shiftKey && !e.altKey && ['b', 'i', 'u'].includes(e.key.toLowerCase())) {
    e.preventDefault();
    format({ b: 'bold', i: 'italic', u: 'underline' }[e.key.toLowerCase()]);
    return;
  }
  if (e.isComposing) return;
  if (e.key === 'Enter' && e.shiftKey) { e.preventDefault(); document.execCommand('insertLineBreak'); syncBlock(el); return; }
  if (e.key === 'Enter') {
    e.preventDefault();
    const isList = ['bullet', 'numbered', 'checklist'].includes(b.kind);
    if (isList && !el.textContent.length) { setKind(b, 'paragraph'); return; }
    const sel = getSelection();
    if (!sel.rangeCount) return;
    const r = sel.getRangeAt(0);
    r.deleteContents();
    const after = document.createRange();
    after.setStart(r.startContainer, r.startOffset);
    after.setEnd(el, el.childNodes.length);
    const tmp = document.createElement('div');
    tmp.appendChild(after.extractContents());
    b.html = clean(el.innerHTML);
    const nb = { id: uid(), kind: isList ? b.kind : 'paragraph', html: clean(tmp.innerHTML) };
    if (nb.kind === 'checklist') nb.checked = false;
    n.blocks.splice(idx + 1, 0, nb);
    touch(n);
    renderBlocks({ id: nb.id, offset: 0 });
    refreshListSoon();
    return;
  }
  const sel = getSelection();
  const collapsed = sel.rangeCount && sel.getRangeAt(0).collapsed;
  if (e.key === 'Backspace' && collapsed && caretOffset(el) === 0) {
    if (b.kind !== 'paragraph') { e.preventDefault(); setKind(b, 'paragraph'); return; }
    const prev = n.blocks[idx - 1];
    if (!prev) return;
    e.preventDefault();
    if (prev.kind === 'drawing') {
      if (!el.textContent.length && idx < n.blocks.length - 1) { n.blocks.splice(idx, 1); touch(n); renderBlocks(); activateDrawing(prev.id); }
      return;
    }
    const at = textOf(prev.html).length;
    prev.html = clean((prev.html || '') + (b.html || ''));
    n.blocks.splice(idx, 1);
    touch(n);
    renderBlocks({ id: prev.id, offset: at });
    refreshListSoon();
    return;
  }
  if (e.key === 'ArrowUp' && collapsed && caretOffset(el) === 0) {
    const prev = [...n.blocks.slice(0, idx)].reverse().find(x => x.kind !== 'drawing');
    if (prev) { e.preventDefault(); focusBlock(prev.id, 'end'); }
    else { e.preventDefault(); $('#title')?.focus(); }
    return;
  }
  if (e.key === 'ArrowDown' && collapsed && caretOffset(el) === el.textContent.length) {
    const next = n.blocks.slice(idx + 1).find(x => x.kind !== 'drawing');
    if (next) { e.preventDefault(); focusBlock(next.id, 0); }
  }
}
function setKind(b, kind) {
  const n = current();
  const el = txtEl(b.id);
  const off = el && document.activeElement === el ? caretOffset(el) : 'end';
  if (el) b.html = clean(el.innerHTML);
  b.kind = kind;
  if (kind === 'checklist') b.checked = !!b.checked; else delete b.checked;
  touch(n);
  renderBlocks({ id: b.id, offset: off });
  updateToolbarState();
}

/* ---------- Formatting ---------- */
function restoreSelection() {
  const r = S.lastRange;
  if (!r) return null;
  const el = r.startContainer.parentElement?.closest('.txt') || (r.startContainer.closest && r.startContainer.closest('.txt'));
  if (!el || !document.contains(el)) return null;
  if (document.activeElement !== el) el.focus({ preventScroll: true });
  const sel = getSelection();
  sel.removeAllRanges();
  sel.addRange(r);
  return el;
}
function focusedTxt() {
  const a = document.activeElement;
  if (a && a.classList?.contains('txt')) return a;
  return restoreSelection();
}
function format(cmd) {
  const el = focusedTxt();
  if (!el) return;
  document.execCommand('styleWithCSS', false, false);
  document.execCommand(cmd);
  syncBlock(el);
  updateToolbarState();
}
function highlight(accent) {
  const el = focusedTxt();
  if (!el) return;
  const sel = getSelection();
  if (!sel.rangeCount) return;
  const range = sel.getRangeAt(0);
  if (!accent) {
    $$('mark', el).forEach(m => { if (range.intersectsNode(m)) m.replaceWith(...m.childNodes); });
    el.normalize();
  } else {
    if (range.collapsed) { toast('Select some text to highlight'); return; }
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('hiliteColor', false, 'rgb(1, 2, 3)');
    document.execCommand('styleWithCSS', false, false);
    const made = $$('[style]', el).filter(x => (x.style.backgroundColor || '').replace(/\s/g, '') === 'rgb(1,2,3)');
    made.forEach(x => {
      const m = document.createElement('mark');
      m.dataset.hl = accent;
      while (x.firstChild) m.appendChild(x.firstChild);
      x.style.backgroundColor = '';
      if (x.getAttribute('style')?.trim() || !['SPAN', 'FONT'].includes(x.tagName)) { x.appendChild(m); } else x.replaceWith(m);
    });
    // Unwrap highlights nested inside the new one.
    $$('mark mark', el).forEach(inner => { if (inner.parentElement.closest('mark').dataset.hl === accent || made.length) inner.replaceWith(...inner.childNodes); });
    const marks = $$('mark', el).filter(m => m.dataset.hl === accent && range.intersectsNode(m));
    if (marks.length) {
      const r = document.createRange();
      r.setStartBefore(marks[0]); r.setEndAfter(marks[marks.length - 1]);
      sel.removeAllRanges(); sel.addRange(r);
    }
  }
  syncBlock(el);
  updateToolbarState();
}
function currentHighlight() {
  const sel = getSelection();
  if (!sel.rangeCount) return null;
  const node = sel.anchorNode;
  const m = (node?.nodeType === 3 ? node.parentElement : node)?.closest?.('mark');
  return m ? m.dataset.hl : null;
}
function insertDrawing() {
  const n = current();
  if (!n || n.deletedAt) return;
  let idx = n.blocks.findIndex(b => b.id === S.focusBlockId);
  if (idx < 0) idx = n.blocks.length - 1;
  const fb = n.blocks[idx];
  const d = { id: uid(), kind: 'drawing', strokes: [], height: DRAW_DEFAULT };
  if (fb && fb.kind === 'paragraph' && !textOf(fb.html).trim()) n.blocks.splice(idx, 0, d);
  else n.blocks.splice(idx + 1, 0, d);
  touch(n);
  S.activeDrawingId = d.id;
  document.activeElement?.blur?.();
  renderBlocks();
  renderToolbar();
  requestAnimationFrame(() => $(`.block[data-id="${d.id}"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' }));
}

/* ---------- Toolbar ---------- */
function stopFocusSteal(el) {
  el.addEventListener('mousedown', e => e.preventDefault());
  el.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse') e.preventDefault(); });
}
function renderToolbar() {
  const slot = $('#toolbarSlot'), n = current();
  if (!slot || !n) return;
  if (n.deletedAt) { slot.innerHTML = ''; return; }
  if (S.activeDrawingId) {
    const t = S.tool;
    slot.innerHTML = `<div class="pill pop" role="toolbar" aria-label="Drawing tools">
      ${['pen', 'marker', 'eraser'].map(k => `<button class="tb ${t.tool === k ? 'on' : ''}" data-tool="${k}" aria-label="${{ pen: 'Pen', marker: 'Highlighter', eraser: 'Eraser' }[k]}" title="${{ pen: 'Pen', marker: 'Highlighter', eraser: 'Eraser' }[k]}">${icon(k === 'marker' ? 'highlighter' : k)}</button>`).join('')}
      <span class="tb-div"></span>
      <button class="tb" data-act="color" aria-label="Ink color: ${inkName(t.ink)}" title="Color"><span class="swatch" style="background:var(--${t.ink});margin:0;width:26px;height:26px"></span></button>
      <button class="tb" data-act="width" aria-label="Stroke: ${WIDTH_NAMES[t.wi]}" title="Stroke width"><span class="wdot" style="width:${6 + t.wi * 5}px;height:${6 + t.wi * 5}px"></span></button>
      <span class="tb-div"></span>
      <button class="tb" data-act="undo" aria-label="Undo" title="Undo">${icon('undo')}</button>
      <button class="tb" data-act="redo" aria-label="Redo" title="Redo">${icon('redo')}</button>
      <button class="tb" data-act="remove" aria-label="Delete drawing" title="Delete drawing">${icon('trash')}</button>
      <button class="done-btn" data-act="done" aria-label="Done drawing">Done</button>
    </div>`;
    const pill = $('.pill', slot);
    stopFocusSteal(pill);
    pill.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      if (btn.dataset.tool) { if (btn.dataset.tool === 'eraser' && t.tool !== 'eraser') t.before = t.tool; t.tool = btn.dataset.tool; }
      else if (btn.dataset.act === 'color') {
        menu(btn, [{ section: 'Color' }, ...INKS.map(c => ({ label: inkName(c), swatch: `var(--${c})`, round: true, checked: t.ink === c, onSelect: () => { t.ink = c; if (t.tool === 'eraser') t.tool = t.before || 'pen'; renderToolbar(); } }))], { keepFocus: true });
        return;
      } else if (btn.dataset.act === 'width') {
        menu(btn, [{ section: 'Stroke' }, ...[0, 1, 2].map(i => ({ label: WIDTH_NAMES[i], dot: 6 + i * 5, checked: t.wi === i, onSelect: () => { t.wi = i; if (t.tool === 'eraser') t.tool = t.before || 'pen'; renderToolbar(); } }))], { keepFocus: true });
        return;
      }
      else if (btn.dataset.act === 'undo') drawUndo();
      else if (btn.dataset.act === 'redo') drawRedo();
      else if (btn.dataset.act === 'remove') removeDrawing();
      else if (btn.dataset.act === 'done') { deactivateDrawing(); return; }
      renderToolbar();
    });
    return;
  }
  slot.innerHTML = `<div class="pill pop" role="toolbar" aria-label="Formatting">
    <button class="tb wide" data-act="style" aria-label="Text style" title="Text style">${icon('textformat')}${icon('chev', 'chev')}</button>
    <span class="tb-div"></span>
    <button class="tb" data-act="bold" aria-label="Bold" title="Bold (⌘B)" style="font-weight:900">B</button>
    <button class="tb" data-act="italic" aria-label="Italic" title="Italic (⌘I)" style="font-style:italic;font-family:Georgia,serif;font-weight:700">I</button>
    <button class="tb" data-act="underline" aria-label="Underline" title="Underline (⌘U)" style="text-decoration:underline;text-underline-offset:3px">U</button>
    <button class="tb" data-act="highlight" aria-label="Highlight" title="Highlight">${icon('highlighter')}<span class="hl-bar" id="hlBar"></span></button>
    <span class="tb-div"></span>
    <button class="tb" data-act="bullet" aria-label="Bulleted list" title="Bulleted list">${icon('bullet')}</button>
    <button class="tb" data-act="numbered" aria-label="Numbered list" title="Numbered list">${icon('numbered')}</button>
    <button class="tb" data-act="checklist" aria-label="Checklist" title="Checklist">${icon('checklist')}</button>
    <span class="tb-div"></span>
    <button class="tb" data-act="drawing" aria-label="Add drawing" title="Add drawing">${icon('scribble')}</button>
  </div>`;
  const pill = $('.pill', slot);
  stopFocusSteal(pill);
  pill.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn || btn.disabled) return;
    const act = btn.dataset.act;
    const b = current()?.blocks.find(x => x.id === S.focusBlockId);
    if (act === 'bold' || act === 'italic' || act === 'underline') format(act);
    else if (act === 'bullet' || act === 'numbered' || act === 'checklist') { if (b) setKind(b, b.kind === act ? 'paragraph' : act); }
    else if (act === 'drawing') insertDrawing();
    else if (act === 'style') {
      if (!b) return;
      menu(btn, [
        { section: 'Text style' },
        { label: 'Heading', icon: 'textformat', checked: b.kind === 'heading', onSelect: () => setKind(b, 'heading') },
        { label: 'Subheading', icon: 'textformat', checked: b.kind === 'subheading', onSelect: () => setKind(b, 'subheading') },
        { label: 'Body', icon: 'bullet', checked: !['heading', 'subheading'].includes(b.kind), onSelect: () => setKind(b, 'paragraph') },
      ], { keepFocus: true });
    } else if (act === 'highlight') {
      const cur = currentHighlight();
      menu(btn, [
        { section: 'Highlight' },
        ...ACCENTS.map(a => ({ label: ACCENT_NAME[a], swatch: `var(--hl-${a})`, checked: cur === a, onSelect: () => highlight(a) })),
        { label: 'None', icon: 'x', checked: !cur, onSelect: () => highlight(null) },
      ], { keepFocus: true });
    }
  });
  updateToolbarState();
}
function updateToolbarState() {
  const slot = $('#toolbarSlot');
  if (!slot || S.activeDrawingId) return;
  const n = current();
  const b = n?.blocks.find(x => x.id === S.focusBlockId);
  const has = !!b && b.kind !== 'drawing';
  $$('.tb[data-act]', slot).forEach(btn => {
    const act = btn.dataset.act;
    if (act === 'drawing') return;
    btn.disabled = !has;
    let on = false;
    if (has) {
      if (act === 'style') on = b.kind === 'heading' || b.kind === 'subheading';
      else if (['bold', 'italic', 'underline'].includes(act)) { try { on = document.queryCommandState(act); } catch {} }
      else if (['bullet', 'numbered', 'checklist'].includes(act)) on = b.kind === act;
      else if (act === 'highlight') on = !!currentHighlight();
    }
    btn.classList.toggle('on', on);
    btn.setAttribute('aria-pressed', on);
  });
  const bar = $('#hlBar');
  if (bar) { const h = has ? currentHighlight() : null; bar.style.background = h ? `var(--${h})` : 'transparent'; }
}
document.addEventListener('selectionchange', () => {
  const sel = getSelection();
  if (!sel.rangeCount) return;
  const r = sel.getRangeAt(0);
  const host = (r.startContainer.nodeType === 3 ? r.startContainer.parentElement : r.startContainer)?.closest?.('.txt');
  if (host && $('#blocks')?.contains(host)) {
    S.lastRange = r.cloneRange();
    if (document.activeElement !== host) return;
    const b = blockOf(host);
    if (b) S.focusBlockId = b.id;
    updateToolbarState();
  }
});

/* ================= Drawing ================= */
const drawings = new Map();
const dpr = () => Math.min(window.devicePixelRatio || 1, 3);
const cssVar = name => getComputedStyle(document.documentElement).getPropertyValue('--' + name).trim() || '#1A1A2E';
const isDark = () => cssVar('bg').toLowerCase() === '#16161f';
function drawStroke(ctx, s) {
  const p = s.p, n = p.length / 3;
  if (!n) return;
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  if (s.t === 'eraser') { ctx.globalCompositeOperation = 'destination-out'; ctx.strokeStyle = ctx.fillStyle = '#000'; }
  else { ctx.strokeStyle = ctx.fillStyle = cssVar(s.c); }
  if (s.t === 'marker') ctx.globalAlpha = parseFloat(cssVar('marker-alpha')) || 0.4;
  const X = i => p[i * 3], Y = i => p[i * 3 + 1], P = i => p[i * 3 + 2] / 100;
  const wAt = i => s.pr ? Math.max(0.6, s.w * (0.35 + P(i) * 1.3)) : s.w;
  if (n === 1) {
    ctx.beginPath(); ctx.arc(X(0), Y(0), wAt(0) / 2, 0, Math.PI * 2); ctx.fill();
  } else if (s.pr && s.t === 'pen') {
    // Pressure-sensitive: each segment gets its own width.
    for (let i = 0; i < n - 1; i++) {
      const sx = i === 0 ? X(0) : (X(i - 1) + X(i)) / 2, sy = i === 0 ? Y(0) : (Y(i - 1) + Y(i)) / 2;
      const last = i === n - 2;
      const ex = last ? X(i + 1) : (X(i) + X(i + 1)) / 2, ey = last ? Y(i + 1) : (Y(i) + Y(i + 1)) / 2;
      ctx.beginPath();
      ctx.lineWidth = (wAt(i) + wAt(i + 1)) / 2;
      ctx.moveTo(sx, sy);
      if (i === 0) ctx.lineTo(ex, ey); else ctx.quadraticCurveTo(X(i), Y(i), ex, ey);
      ctx.stroke();
    }
  } else {
    ctx.lineWidth = s.w;
    ctx.beginPath();
    ctx.moveTo(X(0), Y(0));
    for (let i = 1; i < n - 1; i++) ctx.quadraticCurveTo(X(i), Y(i), (X(i) + X(i + 1)) / 2, (Y(i) + Y(i + 1)) / 2);
    ctx.lineTo(X(n - 1), Y(n - 1));
    ctx.stroke();
  }
  ctx.restore();
}
function mountDrawing(b, be, ro) {
  if (!b) return;
  b.strokes = b.strokes || [];
  const wrap = $('.draw-wrap', be), main = $('canvas.main', wrap), liveC = $('canvas.live', wrap), grip = $('.grip', wrap);
  const st = { b, wrap, main, live: liveC, cur: null, pid: null, raf: 0 };
  drawings.set(b.id, st);
  const size = () => {
    const w = wrap.clientWidth, h = b.height || DRAW_DEFAULT, r = dpr();
    for (const c of [main, liveC]) {
      c.width = Math.round(w * r); c.height = Math.round(h * r);
      c.style.width = w + 'px'; c.style.height = h + 'px';
    }
    redraw(st);
  };
  size();
  const obs = new ResizeObserver(() => { if (main.style.width !== wrap.clientWidth + 'px') size(); });
  obs.observe(wrap);
  observers.push(obs);
  st.size = size;
  if (ro) return;

  const pos = e => { const r = liveC.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const widthFor = () => (S.tool.tool === 'pen' ? PEN_W : S.tool.tool === 'marker' ? MARKER_W : ERASER_W)[S.tool.wi];
  const addPt = (e, isPen) => {
    const [x, y] = pos(e);
    const p = st.cur.p, k = p.length;
    if (k >= 3 && Math.abs(p[k - 3] - x) < 0.6 && Math.abs(p[k - 2] - y) < 0.6) return;
    p.push(Math.round(x * 10) / 10, Math.round(y * 10) / 10, isPen ? Math.round((e.pressure || 0.5) * 100) : 50);
  };
  const paint = () => {
    st.raf = 0;
    if (!st.cur) return;
    if (st.cur.t === 'eraser') { redraw(st, st.cur); return; }
    const ctx = liveC.getContext('2d');
    ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0);
    ctx.clearRect(0, 0, liveC.width, liveC.height);
    drawStroke(ctx, st.cur);
  };
  // Stop Safari from scrolling when the Pencil (or a finger on an active drawing) touches down.
  liveC.addEventListener('touchstart', e => {
    if ([...e.touches].some(t => t.touchType === 'stylus') || S.activeDrawingId === b.id) e.preventDefault();
  }, { passive: false });
  liveC.addEventListener('touchmove', e => { if (st.cur) e.preventDefault(); }, { passive: false });
  liveC.addEventListener('pointerdown', e => {
    const isPen = e.pointerType === 'pen';
    if (e.pointerType === 'touch' && S.activeDrawingId !== b.id) return; // a tap activates (see click)
    if (e.button > 0) return;
    if (S.activeDrawingId !== b.id) activateDrawing(b.id);
    e.preventDefault();
    try { liveC.setPointerCapture(e.pointerId); } catch {}
    st.pid = e.pointerId;
    st.cur = { t: S.tool.tool, c: S.tool.ink, w: widthFor(), pr: isPen && S.tool.tool === 'pen' ? 1 : 0, p: [] };
    addPt(e, isPen);
    paint();
  });
  liveC.addEventListener('pointermove', e => {
    if (!st.cur || e.pointerId !== st.pid) return;
    const isPen = e.pointerType === 'pen';
    const list = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
    (list.length ? list : [e]).forEach(ev => addPt(ev, isPen));
    if (!st.raf) st.raf = requestAnimationFrame(paint);
  });
  const end = e => {
    if (!st.cur || e.pointerId !== st.pid) return;
    const s = st.cur;
    st.cur = null; st.pid = null;
    const lctx = liveC.getContext('2d');
    lctx.setTransform(1, 0, 0, 1, 0, 0);
    lctx.clearRect(0, 0, liveC.width, liveC.height);
    if (s.p.length) {
      b.strokes.push(s);
      S.redo[b.id] = [];
      redraw(st);
      touch(current());
      updateMeta();
    }
  };
  liveC.addEventListener('pointerup', end);
  liveC.addEventListener('pointercancel', end);
  liveC.addEventListener('click', () => { if (S.activeDrawingId !== b.id) activateDrawing(b.id); });

  // Drag the grip to make the drawing taller or shorter.
  let startY = 0, startH = 0, gid = null;
  grip.addEventListener('pointerdown', e => {
    e.preventDefault(); e.stopPropagation();
    gid = e.pointerId; startY = e.clientY; startH = b.height || DRAW_DEFAULT;
    try { grip.setPointerCapture(e.pointerId); } catch {}
  });
  grip.addEventListener('pointermove', e => {
    if (e.pointerId !== gid) return;
    b.height = Math.round(Math.min(DRAW_MAX, Math.max(DRAW_MIN, startH + e.clientY - startY)));
    wrap.style.height = b.height + 'px';
    size();
  });
  const gend = e => { if (e.pointerId === gid) { gid = null; touch(current()); } };
  grip.addEventListener('pointerup', gend);
  grip.addEventListener('pointercancel', gend);
}
function redraw(st, extra) {
  const ctx = st.main.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, st.main.width, st.main.height);
  ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0);
  for (const s of st.b.strokes) drawStroke(ctx, s);
  if (extra) drawStroke(ctx, extra);
}
function redrawAll() { drawings.forEach(st => redraw(st)); }
function activateDrawing(id) {
  S.activeDrawingId = id;
  S.focusBlockId = null;
  const a = document.activeElement;
  if (a && (a.classList?.contains('txt') || a.id === 'title')) a.blur();
  $$('.draw-wrap').forEach(w => w.classList.toggle('active', w.closest('.block')?.dataset.id === id));
  renderToolbar();
}
function deactivateDrawing() {
  S.activeDrawingId = null;
  $$('.draw-wrap.active').forEach(w => w.classList.remove('active'));
  renderToolbar();
}
function drawUndo() {
  const st = drawings.get(S.activeDrawingId);
  if (!st || !st.b.strokes.length) return;
  (S.redo[st.b.id] = S.redo[st.b.id] || []).push(st.b.strokes.pop());
  redraw(st); touch(current());
}
function drawRedo() {
  const st = drawings.get(S.activeDrawingId);
  const stack = st && S.redo[st.b.id];
  if (!stack || !stack.length) return;
  st.b.strokes.push(stack.pop());
  redraw(st); touch(current());
}
function removeDrawing() {
  const n = current();
  const b = n?.blocks.find(x => x.id === S.activeDrawingId);
  if (!b) return;
  const i = n.blocks.indexOf(b);
  n.blocks.splice(i, 1);
  S.activeDrawingId = null;
  touch(n);
  renderBlocks();
  renderToolbar();
  toast('Drawing deleted', 'Undo', () => { n.blocks.splice(i, 0, b); touch(n); renderBlocks(); renderToolbar(); });
}

/* ================= Floating UI: menus, sheets, toasts ================= */
let floating = null;
function closeFloating() {
  if (floating) { floating.forEach(x => x.remove()); floating = null; }
}
function placeAt(pop, x, y, anchorRect) {
  document.body.appendChild(pop);
  const w = pop.offsetWidth, h = pop.offsetHeight, vw = innerWidth, vh = innerHeight;
  let left = x, top = y;
  if (anchorRect) {
    left = anchorRect.left;
    top = anchorRect.bottom + 8;
    if (top + h > vh - 12) top = Math.max(12, anchorRect.top - h - 8);
  } else if (top + h > vh - 12) top = Math.max(12, vh - h - 12);
  left = Math.min(Math.max(12, left), vw - w - 12);
  pop.style.left = left + 'px';
  pop.style.top = top + 'px';
}
function openPopover(content, { anchor, x, y, keepFocus } = {}) {
  closeFloating();
  const scrim = document.createElement('div');
  scrim.className = 'scrim';
  const pop = document.createElement('div');
  pop.className = 'popover pop';
  pop.setAttribute('role', 'menu');
  if (typeof content === 'string') pop.innerHTML = content; else pop.appendChild(content);
  if (keepFocus) stopFocusSteal(pop);
  scrim.addEventListener('pointerdown', e => { e.preventDefault(); closeFloating(); });
  document.body.appendChild(scrim);
  placeAt(pop, x, y, anchor ? anchor.getBoundingClientRect() : null);
  floating = [scrim, pop];
  return pop;
}
function menu(anchorOrPoint, items, opts = {}) {
  const html = items.map((it, i) => {
    if (it.section) return `<div class="menu-sec eyebrow">${esc(it.section)}</div>`;
    if (it.sep) return '<div class="menu-sep"></div>';
    const lead = it.emoji ? `<span class="emo">${esc(it.emoji)}</span>` : it.dot ? `<span class="emo"><span class="wdot" style="width:${it.dot}px;height:${it.dot}px"></span></span>` : it.swatch ? `<span class="hl-swatch" style="background:${it.swatch};${it.round ? 'border-radius:999px' : ''}"></span>` : it.icon ? icon(it.icon) : '<span class="emo"></span>';
    return `<button class="menu-item ${it.danger ? 'danger' : ''}" role="menuitem" data-i="${i}" ${it.disabled ? 'disabled' : ''}>${lead}<span class="lbl">${esc(it.label)}</span>${it.checked ? icon('check', 'tick') : ''}</button>`;
  }).join('');
  const pos = anchorOrPoint instanceof Element ? { anchor: anchorOrPoint } : anchorOrPoint;
  const pop = openPopover(html, { ...pos, keepFocus: opts.keepFocus });
  pop.addEventListener('click', e => {
    const btn = e.target.closest('[data-i]');
    if (!btn) return;
    const it = items[+btn.dataset.i];
    closeFloating();
    it.onSelect && it.onSelect();
  });
  if (!opts.keepFocus) $('.menu-item', pop)?.focus({ preventScroll: true });
}
function noteMenu(n, x, y) {
  if (n.deletedAt) {
    menu({ x, y }, [
      { label: 'Restore', icon: 'restore', onSelect: () => restoreNote(n) },
      { label: 'Delete Now', icon: 'trash', danger: true, onSelect: () => confirmSheet({ title: 'Delete this note for good?', body: "You can't undo this.", action: 'Delete', onConfirm: () => destroyNote(n) }) },
    ]);
    return;
  }
  menu({ x, y }, [
    { label: n.pinned ? 'Unpin' : 'Pin to Top', icon: n.pinned ? 'unpin' : 'pin', onSelect: () => togglePin(n) },
    { label: 'Duplicate', icon: 'copy', onSelect: () => duplicateNote(n) },
    { sep: true },
    { section: 'Move to' },
    ...D.subjects.map(s => ({ label: s.name, emoji: s.emoji, checked: n.subjectId === s.id, onSelect: () => moveNote(n, s.id) })),
    { label: 'No subject', icon: 'folder', checked: !n.subjectId, onSelect: () => moveNote(n, null) },
    { sep: true },
    { label: 'Delete', icon: 'trash', danger: true, onSelect: () => deleteNote(n) },
  ]);
}
function subjectMenu(s, x, y) {
  const i = D.subjects.indexOf(s);
  const swap = j => { [D.subjects[i], D.subjects[j]] = [D.subjects[j], D.subjects[i]]; renderSidebar(); save(); };
  menu({ x, y }, [
    { label: 'Edit Subject', icon: 'edit', onSelect: () => subjectSheet(s) },
    { label: 'Move Up', icon: 'up', disabled: i === 0, onSelect: () => swap(i - 1) },
    { label: 'Move Down', icon: 'down', disabled: i === D.subjects.length - 1, onSelect: () => swap(i + 1) },
    { label: 'Duplicate', icon: 'copy', onSelect: () => { D.subjects.splice(i + 1, 0, { ...s, id: uid(), name: s.name + ' copy' }); renderSidebar(); save(); } },
    { sep: true },
    { label: 'Delete Subject', icon: 'trash', danger: true, onSelect: () => askDeleteSubject(s) },
  ]);
}
function askDeleteSubject(s) {
  const c = live().filter(n => n.subjectId === s.id).length;
  confirmSheet({
    title: `Delete “${s.name}”?`,
    body: c ? `Its ${plural(c, 'note')} will move to Recently Deleted for ${RETENTION_DAYS} days.` : 'This subject has no notes.',
    action: 'Delete Subject', onConfirm: () => deleteSubject(s),
  });
}
function longPress(el, cb) {
  let timer = null, sx = 0, sy = 0;
  const clear = () => { clearTimeout(timer); timer = null; };
  el.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse') return;
    sx = e.clientX; sy = e.clientY;
    clear();
    timer = setTimeout(() => { timer = null; el.dataset.lp = '1'; navigator.vibrate?.(10); cb(sx, sy); setTimeout(() => delete el.dataset.lp, 800); }, 480);
  });
  el.addEventListener('pointermove', e => { if (timer && Math.hypot(e.clientX - sx, e.clientY - sy) > 10) clear(); });
  el.addEventListener('pointerup', clear);
  el.addEventListener('pointercancel', clear);
  el.addEventListener('contextmenu', e => {
    e.preventDefault();
    if (el.dataset.lp) return;
    cb(e.clientX, e.clientY);
  });
}
function tagPicker(anchor, n) {
  const wrap = document.createElement('div');
  wrap.className = 'tag-pick';
  const draw = () => {
    wrap.innerHTML = `<div class="eyebrow">Tags</div>
      ${D.tags.length ? `<div class="chips">${D.tags.map(t => `<button class="chip ${n.tagIds.includes(t.id) ? '' : 'off'}" data-t="${t.id}" style="background:var(--${t.accent})" aria-pressed="${n.tagIds.includes(t.id)}">${n.tagIds.includes(t.id) ? icon('check', 'tick') : ''}#${esc(t.name)}</button>`).join('')}</div>` : '<p class="caption" style="margin:0">No tags yet. Make your first one.</p>'}
      <form class="tag-new"><input class="field" id="newTag" placeholder="New tag" autocomplete="off" autocapitalize="off" enterkeyhint="done" aria-label="New tag"><button class="btn yellow pop pressable" type="submit" style="min-height:44px;padding:0 14px">Add</button></form>`;
    $$('[data-t]', wrap).forEach(c => c.onclick = () => {
      const id = c.dataset.t;
      n.tagIds = n.tagIds.includes(id) ? n.tagIds.filter(x => x !== id) : [...n.tagIds, id];
      touch(n); draw(); renderTags(); refreshListSoon();
    });
    $('form', wrap).onsubmit = e => {
      e.preventDefault();
      const t = tagNamed($('#newTag', wrap).value);
      if (t && !n.tagIds.includes(t.id)) n.tagIds.push(t.id);
      touch(n); draw(); renderTags(); refreshListSoon();
      $('#newTag', wrap).focus();
    };
    wrap.querySelectorAll('.tick').forEach(s => { s.style.width = '14px'; s.style.height = '14px'; });
  };
  draw();
  openPopover(wrap, { anchor });
}
function sheet(build) {
  closeFloating();
  const wrap = document.createElement('div');
  wrap.className = 'sheet-wrap';
  const box = document.createElement('div');
  box.className = 'sheet pop';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  wrap.appendChild(box);
  const close = () => wrap.remove();
  wrap.addEventListener('pointerdown', e => { if (e.target === wrap) close(); });
  document.body.appendChild(wrap);
  build(box, close);
  return close;
}
function confirmSheet({ title, body, action, onConfirm }) {
  sheet((box, close) => {
    box.innerHTML = `<h2>${esc(title)}</h2><p>${esc(body)}</p>
      <div class="actions"><button class="btn pop pressable" data-c>Cancel</button><button class="btn danger pop pressable" data-ok>${esc(action)}</button></div>`;
    $('[data-c]', box).onclick = close;
    $('[data-ok]', box).onclick = () => { close(); onConfirm(); };
    $('[data-ok]', box).focus();
  });
}
function subjectSheet(subject) {
  const draft = subject ? { ...subject } : { name: '', emoji: '📘', accent: ACCENTS[(D.subjects.length + 2) % ACCENTS.length] };
  sheet((box, close) => {
    box.innerHTML = `
      <h2>${subject ? 'Edit Subject' : 'New Subject'}</h2>
      <div class="row subject pop" id="sPreview" style="pointer-events:none"></div>
      <label class="eyebrow" for="sName">Name</label>
      <input class="field" id="sName" placeholder="Biology, History, Art…" maxlength="40" autocomplete="off" style="height:48px;font-size:17px">
      <div class="eyebrow">Emoji</div>
      <div class="emoji-grid" id="sEmoji">${EMOJIS.map(e => `<button data-e="${e}" aria-label="${e}">${e}</button>`).join('')}</div>
      <div style="display:flex;gap:10px;align-items:center"><span class="caption">Or type your own:</span><input class="field" id="sCustom" maxlength="4" aria-label="Custom emoji" style="max-width:80px;text-align:center;font-size:20px"></div>
      <div class="eyebrow">Color</div>
      <div class="color-row" id="sColor">${ACCENTS.map(a => `<button data-a="${a}" style="background:var(--${a})" aria-label="${ACCENT_NAME[a]}"></button>`).join('')}</div>
      <div class="actions">
        ${subject ? '<button class="btn pop pressable left" data-del style="color:var(--danger)">Delete Subject</button>' : ''}
        <button class="btn pop pressable" data-c>Cancel</button>
        <button class="btn yellow pop pressable" data-ok>Save</button>
      </div>`;
    const name = $('#sName', box);
    name.value = draft.name;
    const paint = () => {
      $('#sPreview', box).style.background = `var(--${draft.accent})`;
      $('#sPreview', box).innerHTML = `<span class="badge">${esc(draft.emoji)}</span><span class="name">${esc(draft.name.trim() || 'New subject')}</span>`;
      $$('[data-e]', box).forEach(b => b.classList.toggle('on', b.dataset.e === draft.emoji));
      $$('[data-a]', box).forEach(b => { b.innerHTML = b.dataset.a === draft.accent ? icon('check') : ''; b.setAttribute('aria-pressed', b.dataset.a === draft.accent); });
      $('[data-ok]', box).disabled = !draft.name.trim();
      $('[data-ok]', box).style.opacity = draft.name.trim() ? 1 : .45;
    };
    name.oninput = () => { draft.name = name.value; paint(); };
    $$('[data-e]', box).forEach(b => b.onclick = () => { draft.emoji = b.dataset.e; paint(); });
    $('#sCustom', box).oninput = e => { const chars = [...e.target.value.trim()]; if (chars.length) { draft.emoji = e.target.value.trim(); paint(); } };
    $$('[data-a]', box).forEach(b => b.onclick = () => { draft.accent = b.dataset.a; paint(); });
    $('[data-c]', box).onclick = close;
    const submit = () => {
      if (!draft.name.trim()) return;
      draft.name = draft.name.trim();
      if (subject) Object.assign(subject, draft);
      else { const s = { id: uid(), ...draft }; D.subjects.push(s); S.view = s.id; S.noteId = innerWidth > 720 ? null : S.noteId; }
      close(); renderAll(); save();
    };
    $('[data-ok]', box).onclick = submit;
    name.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
    if (subject) $('[data-del]', box).onclick = () => { close(); askDeleteSubject(subject); };
    paint();
    if (!subject) setTimeout(() => name.focus(), 50);
  });
}
let toastTimer = null;
function toast(msg, actionLabel, action) {
  $('.toast')?.remove();
  clearTimeout(toastTimer);
  const t = document.createElement('div');
  t.className = 'toast';
  t.setAttribute('role', 'status');
  t.innerHTML = `<span>${esc(msg)}</span>${actionLabel ? `<button>${esc(actionLabel)}</button>` : ''}`;
  if (!actionLabel) t.style.paddingRight = '18px';
  document.body.appendChild(t);
  if (actionLabel) t.querySelector('button').onclick = () => { t.remove(); action(); };
  toastTimer = setTimeout(() => t.remove(), 4000);
}

/* ================= Frame ================= */
function applyFrame() {
  const app = $('#app');
  app.dataset.pane = S.pane;
  app.classList.toggle('side-open', S.sideOpen);
}
function renderAll() {
  applyFrame();
  renderSidebar();
  renderList();
  renderEditor();
}

/* Editor events, delegated once. */
const editorCol = $('#editorCol');
editorCol.addEventListener('input', e => { const el = e.target.closest('.txt'); if (el) syncBlock(el); });
editorCol.addEventListener('keydown', onTextKey);
editorCol.addEventListener('focusin', e => {
  const el = e.target.closest('.txt');
  if (!el) return;
  const b = blockOf(el);
  if (S.activeDrawingId) deactivateDrawing();
  S.focusBlockId = b?.id ?? null;
  updateToolbarState();
});
editorCol.addEventListener('paste', e => {
  const el = e.target.closest('.txt');
  if (!el) return;
  e.preventDefault();
  const text = (e.clipboardData || window.clipboardData)?.getData('text/plain') || '';
  document.execCommand('insertText', false, text.replace(/\r?\n/g, ' '));
});
editorCol.addEventListener('click', e => {
  const chk = e.target.closest('.check');
  if (!chk) return;
  const b = blockOf(chk);
  if (!b) return;
  b.checked = !b.checked;
  chk.classList.toggle('on', b.checked);
  chk.setAttribute('aria-label', b.checked ? 'Done' : 'Not done');
  chk.closest('.block').classList.toggle('done', b.checked);
  chk.classList.remove('bounce'); void chk.offsetWidth; chk.classList.add('bounce');
  touch(current()); updateMeta(); refreshListSoon();
});
$('#sideScrim').addEventListener('click', () => { S.sideOpen = false; applyFrame(); });

/* Keyboard shortcuts from the app: ⌘N, ⌘F, ⌘⌫ (⌘B/I/U are handled while typing). */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (floating) { closeFloating(); return; }
    const sw = $('.sheet-wrap'); if (sw) { sw.remove(); return; }
    if (S.activeDrawingId) { deactivateDrawing(); return; }
    if (S.sideOpen) { S.sideOpen = false; applyFrame(); }
    return;
  }
  const mod = e.metaKey || e.ctrlKey;
  if (!mod || e.altKey) return;
  const k = e.key.toLowerCase();
  const a = document.activeElement;
  const typing = a && (a.isContentEditable || a.tagName === 'INPUT' || a.tagName === 'TEXTAREA');
  if (k === 'n' && !e.shiftKey) { e.preventDefault(); newNote(); }
  else if (k === 'f' && !e.shiftKey) { e.preventDefault(); S.pane = 'list'; applyFrame(); $('#search')?.focus(); $('#search')?.select(); }
  else if ((e.key === 'Backspace' || e.key === 'Delete') && !typing) { const n = current(); if (n && !n.deletedAt) { e.preventDefault(); deleteNote(n); } }
  else if (k === 'z' && S.activeDrawingId && !typing) { e.preventDefault(); e.shiftKey ? drawRedo() : drawUndo(); }
});

/* Redraw sketches when the theme flips, so ink stays readable. */
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => setTimeout(redrawAll, 30));
new MutationObserver(() => setTimeout(redrawAll, 30)).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class', 'style'] });
document.addEventListener('visibilitychange', () => { if (document.hidden) save(true); });
addEventListener('pagehide', () => save(true));
let lastWide = innerWidth > 720;
addEventListener('resize', () => {
  const wide = innerWidth > 720;
  if (wide !== lastWide) { lastWide = wide; if (wide && !S.noteId) { S.noteId = notesForView()[0]?.id ?? null; renderEditor(); renderCards(); } }
});

// Works offline once it has loaded, and can be added to the Home Screen.
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

load();
if (innerWidth <= 720) S.pane = 'list';
renderAll();
if (document.fonts?.ready) document.fonts.ready.then(() => { const t = $('#title'); if (t) { t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; } });
})();
