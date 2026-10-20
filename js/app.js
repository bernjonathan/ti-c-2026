const state = {
    kategori: "semua",
    sort: "terbaru",
    query: "",
};

const $ = (selector) => document.querySelector(selector);
const categoryById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

function parseDate(value) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
}

const dateFormatter = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" });

function formatDate(event) {
    const start = dateFormatter.format(parseDate(event.tanggal));
    if (!event.tanggalPasti) return `Diberitakan ${start}`;
    if (!event.tanggalSelesai) return start;
    return `${start} – ${dateFormatter.format(parseDate(event.tanggalSelesai))}`;
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function filteredEvents() {
    const q = state.query.trim().toLowerCase();
    const list = EVENTS.filter((e) => {
        if (state.kategori !== "semua" && e.kategori !== state.kategori) return false;
        if (!q) return true;
        return [e.judul, e.penyelenggara, e.lokasi || "", e.ringkasan].some((f) => f.toLowerCase().includes(q));
    });

    const sorters = {
        terbaru: (a, b) => parseDate(b.tanggal) - parseDate(a.tanggal),
        terlama: (a, b) => parseDate(a.tanggal) - parseDate(b.tanggal),
        nama: (a, b) => a.judul.localeCompare(b.judul, "id"),
    };
    return list.sort(sorters[state.sort]);
}

function renderStats() {
    const penyelenggara = new Set(EVENTS.map((e) => e.penyelenggara));
    const pengabdian = EVENTS.filter((e) => e.kategori === "pengabdian").length;
    $("#stats").innerHTML = `
        <div class="stat"><strong>${EVENTS.length}</strong><span>Kegiatan tercatat</span></div>
        <div class="stat"><strong>${pengabdian}</strong><span>Pengabdian masyarakat</span></div>
        <div class="stat"><strong>${penyelenggara.size}</strong><span>Penyelenggara</span></div>
        <div class="stat"><strong>${CATEGORIES.length}</strong><span>Kategori</span></div>
    `;
}

function renderCategories() {
    const all = [{ id: "semua", label: "Semua", icon: "✨" }, ...CATEGORIES];
    $("#categories").innerHTML = all
        .map(
            (c) => `<button class="chip${state.kategori === c.id ? " active" : ""}" role="tab"
                aria-selected="${state.kategori === c.id}" data-kategori="${c.id}">${c.icon} ${c.label}</button>`
        )
        .join("");
}

function renderEvents() {
    const list = filteredEvents();
    $("#result-count").textContent = `Menampilkan ${list.length} dari ${EVENTS.length} kegiatan`;
    $("#empty").hidden = list.length > 0;
    $("#event-list").innerHTML = list
        .map((e) => {
            const cat = categoryById[e.kategori];
            return `
            <article class="card" tabindex="0" data-id="${e.id}" style="--accent:${cat.color}">
                <div class="card-top">
                    <span class="badge" style="background:${cat.color}">${cat.icon} ${cat.label}</span>
                </div>
                <h3>${escapeHtml(e.judul)}</h3>
                <p class="meta">📅 ${formatDate(e)}</p>
                ${e.lokasi ? `<p class="meta">📍 ${escapeHtml(e.lokasi)}</p>` : ""}
                <p class="meta">👥 ${escapeHtml(e.penyelenggara)}</p>
                <span class="card-link">Lihat detail →</span>
            </article>`;
        })
        .join("");
}

function renderOrganizations() {
    $("#org-list").innerHTML = ORGANIZATIONS.map(
        (o) => `
        <a class="org" href="${o.tautan}" target="_blank" rel="noopener">
            <span class="org-type">${escapeHtml(o.jenis)}</span>
            <h3>${escapeHtml(o.nama)}</h3>
            <p>${escapeHtml(o.deskripsi)}</p>
        </a>`
    ).join("");
}

function openDetail(id) {
    const e = EVENTS.find((ev) => ev.id === id);
    if (!e) return;
    const cat = categoryById[e.kategori];
    $("#detail-body").innerHTML = `
        <span class="badge" style="background:${cat.color}">${cat.icon} ${cat.label}</span>
        <h2>${escapeHtml(e.judul)}</h2>
        <p>${escapeHtml(e.ringkasan)}</p>
        <dl>
            <dt>Tanggal</dt><dd>${formatDate(e)}</dd>
            <dt>Lokasi</dt><dd>${e.lokasi ? escapeHtml(e.lokasi) : "Tidak disebutkan di sumber"}</dd>
            <dt>Penyelenggara</dt><dd>${escapeHtml(e.penyelenggara)}</dd>
        </dl>
        <a class="source-link" href="${e.sumber}" target="_blank" rel="noopener">Baca berita resmi di vokasi.ui.ac.id ↗</a>
    `;
    $("#detail").showModal();
}

function bindEvents() {
    $("#categories").addEventListener("click", (ev) => {
        const btn = ev.target.closest("[data-kategori]");
        if (!btn) return;
        state.kategori = btn.dataset.kategori;
        renderCategories();
        renderEvents();
    });

    $("#search").addEventListener("input", (ev) => {
        state.query = ev.target.value;
        renderEvents();
    });

    $("#sort").addEventListener("change", (ev) => {
        state.sort = ev.target.value;
        renderEvents();
    });

    const list = $("#event-list");
    list.addEventListener("click", (ev) => {
        const card = ev.target.closest(".card");
        if (card) openDetail(Number(card.dataset.id));
    });
    list.addEventListener("keydown", (ev) => {
        const card = ev.target.closest(".card");
        if (card && (ev.key === "Enter" || ev.key === " ")) {
            ev.preventDefault();
            openDetail(Number(card.dataset.id));
        }
    });

    const dialog = $("#detail");
    dialog.querySelector(".modal-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (ev) => {
        if (ev.target === dialog) dialog.close();
    });

    const toggle = $(".nav-toggle");
    const links = $(".nav-links");
    toggle.addEventListener("click", () => {
        const open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open);
    });
    links.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", false);
    });
}

$("#year").textContent = new Date().getFullYear();
renderStats();
renderCategories();
renderEvents();
renderOrganizations();
bindEvents();
