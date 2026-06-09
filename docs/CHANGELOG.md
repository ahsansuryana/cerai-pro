# Cerai.Pro — Catatan Perubahan

## Ringkasan

Proyek asli berupa **1 file HTML** (SPA) dengan semua kode campur aduk.  
Sekarang dipecah menjadi **multi-page** dengan struktur file terpisah dan **localStorage** untuk penyimpanan data tanpa backend.

---

## Struktur File

### Sebelum
```
📁 cerai-pro/
├── Cerai. Pro.docx
└── FIXCerai.Pro - Solusi Perceraian.html  ← 1 file beserta CSS+JS inline
```

### Sesudah
```
📁 cerai-pro/
├── index.html              ← Landing page
├── login.html              ← Halaman daftar & masuk
├── dashboard.html          ← Dashboard utama (5 subtab)
├── chat.html               ← Ruang konsultasi chat
├── rating.html             ← Penilaian & feedback
├── print.html              ← Cetak invoice & surat (auto print)
├── style.css               ← CSS terpisah
├── js/
│   ├── storage.js          ← localStorage CRUD
│   ├── app.js              ← Routing & auth guard
│   └── features.js         ← Semua logika fitur
├── docs/
│   ├── cerai-pro.nginx.conf ← Contoh konfigurasi Nginx
│   └── CHANGELOG.md        ← Dokumen ini
```

---

## Perubahan dari File Asli

### 1. Struktur Multi-Page

| Dulu | Sekarang |
|---|---|
| 1 file HTML campur aduk | 5 halaman HTML + 3 JS + 1 CSS |
| Navigasi SPA (JS showPage) | Navigasi antar halaman (link) |
| Semua fungsi dalam 1 `<script>` | Kode dipisah per file berdasarkan fungsi |

### 2. Storage & Data

| Dulu | Sekarang |
|---|---|
| Tidak ada penyimpanan (simulasi) | **localStorage** — data tetap ada meskipun refresh |
| Data dummy hardcode | Data tersimpan per user sesuai registrasi |
| Order statis | Order dinamis dari localStorage |
| Status bayar ilang setelah refresh | Status bayar persist |

### 3. Alur Registrasi & Login

| Dulu | Sekarang |
|---|---|
| Form register langsung masuk dashboard | **Daftar dulu** → simpan user → redirect ke login |
| Tidak ada form login | **Login** dengan email → cocokkan data → masuk dashboard |
| Tidak ada logout | **Keluar** → hapus session → balik ke landing |

### 4. Chat

| Dulu | Sekarang |
|---|---|
| Pesan statis (hardcode HTML) | **Langusng bisa kirim pesan** |
| Input readonly | Input aktif, Enter & klik kirim |
| Tidak ada penyimpanan | Riwayat chat **tersimpan per session** di localStorage |
| Semua chat campur 1 wadah | Setiap konsultasi punya **session ID unik**, chat terpisah |
| Tidak ada balasan | **Simulasi balasan lawyer** 1,2 detik setelah kirim |

### 5. Jadwal

| Dulu | Sekarang |
|---|---|
| "2 Minggu Lagi (Selasa, 23 Juni 2026)" hardcode | **"Sesi langsung tersedia"** — tidak ada waktu tunggu |
| Tombol "Masuk Ruang Tunggu" | Tombol **"Chat Sekarang"** |

### 6. Cetak / Print to PDF

| Dulu | Sekarang |
|---|---|
| Tidak ada | **Invoice pembayaran** bisa dicetak → `print.html?type=invoice` |
| Tidak ada | **Surat gugatan** bisa dicetak → `print.html?type=surat` |
| Tidak ada | Halaman print dengan CSS khusus, auto `window.print()` |

### 7. Generator Surat

| Dulu | Sekarang |
|---|---|
| Input Umur & Agama jadi 1 field | **Dipisah**: dropdown Umur (18-50) + dropdown Agama (6 agama) |
| Format surat sederhana (3 paragraf) | **Surat formal**: kop surat, identitas lengkap, tabel, poin gugatan, tanda tangan |
| Preview teks biasa | Preview **HTML** dengan style Times New Roman |

### 8. Bug yang Dibenerin

| Masalah | Perbaikan |
|---|---|
| `href="file:///C:/Users/keisha/..."` | Diganti jadi `"#"` atau `"login.html"` |
| Tailwind & Google Fonts dari file lokal | Pakai **CDN langsung** |
| Dummy data tidak bisa diubah | Semua data dari **input user + localStorage** |

---

## Fitur Lengkap (Sekarang)

### Landing Page (`index.html`)
- Hero section dengan tagline
- Tombol CTA ke halaman daftar
- Informasi privasi

### Registrasi & Login (`login.html`)
- Tab **Daftar**: form nama, email, NIK, alasan
- Tab **Masuk**: login dengan email
- Banner sukses setelah pendaftaran
- Redirect otomatis ke dashboard setelah login

### Dashboard (`dashboard.html`)
| Subtab | Fungsi |
|---|---|
| **Home** | Pilih konsultan hukum (dengan modal) |
| **Order** | Riwayat konsultasi & pembayaran (dari localStorage) |
| **Generator** | Form (nama, umur, agama, pasangan, alasan) → pratinjau surat formal → cetak PDF |
| **Premium** | Pembayaran Virtual Account Mandiri (simulasi) → cetak invoice |
| **Profile** | Data user dari hasil registrasi |

### Cetak / Print (`print.html`)
- **Invoice** — setelah bayar, otomatis redirect ke halaman print
- **Surat Gugatan** — klik "Unduh PDF Surat Gugatan" → print surat formal
- CSS print khusus (header/footer, margin, font Times New Roman)
- Tombol "Cetak / Simpan PDF" + auto print setelah 0,5 detik

### Chat (`chat.html`)
- Kirim & terima pesan real-time (simulasi)
- Setiap konsultasi punya **session ID** sendiri
- Riwayat chat tersimpan per session
- Balasan lawyer otomatis dari template (tanpa AI/API)

### Rating (`rating.html`)
- Penilaian bintang 1-5
- Text feedback
- Rating tersimpan di localStorage

---

## localStorage — Struktur Data

| Key | Isi | Fungsi |
|---|---|---|
| `cerai_user` | `{ nama, email, nik, alasan }` | Data registrasi |
| `cerai_session` | `{ nama, loginAt }` | Session login |
| `cerai_orders` | `[{ id, lawyer, type, status, ... }]` | Riwayat order |
| `cerai_payment` | `{ consultation, document }` | Status pembayaran |
| `cerai_ratings` | `[{ rating, review, createdAt }]` | Rating & feedback |
| `cerai_doc_data` | `{ jenis, nama, umur, agama, alamat, pasangan, umurPasangan, alamatPasangan, tanggalNikah, nomorAkta, tanggalAkta, alasan, punyaAnak, anak[], hakAsuh, nafkah }` | Data generator surat (diperluas) |
| `cerai_chat_sessions` | `[{ id, lawyer, startedAt }]` | Daftar sesi chat |
| `cerai_chat_messages_CHAT-xxx` | `[{ text, sender, timestamp }]` | Pesan per sesi chat |
| `cerai_print_invoice` | `{ orderId, clientName, type, amount, date }` | Data cetak invoice |
| `cerai_print_surat` | `{ jenis, nama, umur, agama, alamat, pasangan, ... }` | Data cetak surat gugatan/permohonan |
| *(removed)* `cerai_api_key` | — | Tidak dipakai lagi (AI dihapus) |

Semua data **tersimpan di browser pengguna**, tidak perlu backend atau database.

---

### 2026-06-09 — AI Dihapus
- Semua kode terkait **OpenCode Zen API** dihapus (system prompt, callLawyerAPI, getChatHistoryForAPI, typing indicator)
- `sendMessage()` sekarang langsung pakai fallback random tanpa API call
- Hapus `saveApiKey()` / `getApiKey()` dari `storage.js`
- Hapus panel "Pengaturan AI Konsultan" dari tab Profile dashboard
- Hapus key `cerai_api_key` dari dokumentasi localStorage
- Chat tetap berfungsi dengan balasan otomatis dari template

### 2026-06-09 — Generator Form Overhaul + Favicon
- **Dua jenis dokumen**: Gugatan Cerai (Penggugat/Tergugat) dan Permohonan Cerai (Pemohon/Termohon)
- Tombol radio pemilihan jenis dokumen mengubah semua label otomatis
- **Alasan** diubah dari dropdown menjadi textarea (default kosong)
- **Field baru** di form & dokumen:
  - Tanggal Pernikahan, Nomor Akta Nikah, Tanggal Akta Nikah
  - Alamat Penggugat/Pemohon & Alamat Tergugat/Termohon
  - Umur Tergugat/Termohon
  - Anak: punya/tidak, daftar anak dinamis (nama, jk, ttl), hak asuh (Pemohon/Termohon)
  - Nafkah Iddah (Rp, muncul hanya untuk Permohonan Cerai)
- Preview & print dokumen diperbarui untuk kedua jenis dokumen
- **Favicon**: `icon.jpeg` ditambahkan ke semua halaman HTML
- Struktur data `cerai_doc_data` diperluas otomatis (JSON)

### 2026-06-09 — 5 Konsultan Hukum
- **5 lawyer** (3 laki-laki, 2 perempuan) dengan nama, gelar, spesialisasi, pengalaman, dan catatan masing-masing
- Dirender dinamis dari array `LAWYERS` di `features.js`
- Tampil di tab Home dashboard dalam grid card
- Modal menampilkan nama & catatan lawyer yang dipilih
- Semua fungsi (chat, order, premium) otomatis pakai lawyer terpilih

### 2026-06-09 — Landing Page Redesign
- **Hero** baru dengan statistik (2.500+ kasus, 98% berhasil, 10 konsultan) + CTA ganda
- **Alur Layanan** 4 langkah (Konsultasi → Analisis → Dokumen → Siap Ajukan)
- **Layanan Detail** 3 kartu (Konsultasi, Dokumen, Pendampingan) dengan fitur per layanan
- **Estimasi Biaya** 3 paket (Gratis, Premium Rp75.000, Dokumen Rp1.000.000)
- **Profil Tim** 10 konsultan lengkap dengan nama, gelar, spesialisasi
- **Testimoni** 3 kolom dari pengguna anonim
- **Kenapa Harus Memilih Cerai.Pro** (Empati, Transparan, Privasi)
- **Cek Kelayakan Cerai** — kuis interaktif 5 pertanyaan dengan hasil rekomendasi
- **FAQ** accordion (6 pertanyaan: biaya, syarat, lama proses, hak asuh, privasi, online)
- **Artikel Edukasi** 3 artikel (gugatan cerai, hak asuh anak, harta gono-gini)
- **Media Sosial & Kontak** Instagram, YouTube, X, Threads + email, alamat, jam operasional
- **Motivational Footer** "Sebuah Akhir, Sebuah Awal Baru"
- **Footer** baru dengan nav, link privacy/terms, kontak
- **privacy.html** — halaman Kebijakan Privasi
- **terms.html** — halaman Syarat & Ketentuan
- Navbar links jadi anchor scroll (`#layanan`, `#pengacara`, `#alur`, `#biaya`, `#faq`, `#kontak`)

---

## Cara Menjalankan

1. Buka folder proyek dengan **VS Code**
2. Klik kanan `index.html` → **Open with Live Server**
   — atau —
3. Deploy ke **Nginx**: arahkan `root` ke folder ini
4. Buka browser → akses sesuai URL server
