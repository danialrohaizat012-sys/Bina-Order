# Audit Sistem Bina Order

Tarikh: 4 November 2026
Skop: `index.html` (pelanggan, dapur, kaunter), `qr.html` (cetak QR), `assets/shared.js`.

Audit ada dua bahagian:
- **A.** Bug dan kelemahan dalam demo yang **dah dibaiki** dalam versi ini.
- **B.** Perkara yang **mesti ada sebelum guna di kedai sebenar**. Ini kerja fasa produksi, contohnya bila guna Supabase.

---

## A. Dah dibaiki

| # | Tahap | Masalah | Pembaikan |
|---|---|---|---|
| 1 | Tinggi | Bila kaunter terima bayaran sebelum makanan dihidang, tiket hilang dari skrin dapur. Makanan boleh terlupa. | Dapur sekarang tunjuk semua order yang belum dihidang, walaupun bil dah dibayar (ada label "Bil dah dibayar"). |
| 2 | Tinggi | Page QR boleh cetak sampai 60 meja, tapi demo hanya terima Meja 1–12. QR Meja 13 ke atas buka demo penuh, bukan skrin pelanggan. | Bilangan meja jadi tetapan (1–50) yang dikongsi oleh demo dan page QR. Link QR terima meja 1–99. |
| 3 | Sederhana | Harga dikira guna nombor perpuluhan (contoh 0.1 + 0.2), jadi jumlah boleh lari sedikit. | Semua harga disimpan dalam sen (integer). |
| 4 | Sederhana | Data hilang bila page di-refresh. | State disimpan dalam `localStorage`, dan boleh dipadam guna butang "Reset demo". |
| 5 | Sederhana | Pelanggan terus hantar order tanpa semak, jadi senang tersalah tekan. | Ada skrin **Semak pesanan** sebelum hantar: ubah kuantiti, tulis nota dan lihat jumlah. |
| 6 | Sederhana | Tiada cara untuk dapur tanda menu yang dah habis. Pelanggan boleh order makanan yang tiada. | Butang **Stok habis** di dapur. Item yang habis jadi kelabu dan tak boleh ditambah. Kalau item habis semasa ada dalam troli, ia dibuang masa hantar. |
| 7 | Sederhana | Link `?meja=` yang salah (contoh `?meja=abc`) buka demo penuh. | Tunjuk mesej "QR tidak sah". |
| 8 | Rendah | Notifikasi (toast) menutup butang utama di bahagian bawah skrin telefon. | Toast dipindah ke bahagian atas. |
| 9 | Rendah | Amaran panggil staf hilang sebaik kaunter klik meja, walaupun staf belum pergi. | Ada butang **Selesai** yang berasingan untuk amaran panggil staf. |
| 10 | Rendah | Kaunter tak tahu ada makanan yang belum dihidang semasa kira bil. | Bil tunjuk "X item belum dihidang", dan grid meja ada titik oren. |
| 11 | Rendah | Nama kedai dari URL (`?kedai=`) tak di-escape. Ada risiko HTML injection. | Semua teks daripada pengguna atau URL di-escape. |
| 12 | Rendah | Label masa dan nota boleh hilang fokus semasa page refresh automatik. | Refresh automatik tak berjalan semasa pengguna sedang menaip. Fokus nota dikekalkan. |
| 13 | Rendah | Aksesibiliti: dialog, tab dan butang ikon tiada label. | `aria-label`, `role="dialog"`, `aria-pressed`, `aria-live` untuk toast, dan kekunci `Esc` untuk tutup skrin semak. |
| 14 | Rendah | Animasi tetap berjalan untuk pengguna yang pilih "kurangkan gerakan". | Ikut tetapan `prefers-reduced-motion`. |

## Skrin Urus Menu (owner / manager)

- Tambah, edit dan padam menu: nama, penerangan, harga, kategori, emoji, tag "Laris" dan status habis.
- Muat naik gambar dari telefon atau galeri. Gambar dipotong 4:3 dan dikecilkan ke 640×480 JPEG (sekitar 40–80 KB).
- Tambah kategori baru dan susun kategori serta menu (butang ↑ ↓).
- Padam menu dan pulihkan menu asal perlu ditekan dua kali, untuk elak tersalah tekan.
- **Bil tak berubah bila menu diedit.** Setiap order simpan nama dan harga pada masa order dibuat. Bil yang sedia ada kekal walaupun harga ditukar atau menu dipadam.
- Kalau storan browser penuh, menu tak disimpan dan mesej ralat dipaparkan. Tiada data yang hilang tanpa diberitahu.
- "Reset demo" hanya padam order dan jualan. Menu yang dah diedit kekal.

## Ciri baru dalam versi sebelum ini

- **5 template UI**: Bina Klasik, Kopitiam, Warisan Kelantan, Kafe Moden, Gerai Malam. Setiap satu ada warna, font, bucu dan susun atur menu (senarai atau grid) sendiri.
- Template dan nama kedai dibawa dalam link QR (`?meja=7&kedai=...&tema=...`). Kad QR yang dicetak juga ikut template.
- Carian menu, tag "Laris", dan bar progress status untuk setiap order.
- Kad bil besar di telefon pelanggan ("tunjuk skrin ini di kaunter").
- Skrin terima kasih selepas bayar, dengan butang **Beri review Google** (pautan ke Bina Review).
- Dapur: senarai **Perlu disediakan**, iaitu jumlah setiap menu merentas semua order. Tiket bertukar warna selepas 10 dan 15 minit.
- Kaunter: senarai bil terakhir, pilihan cara bayaran dan amaran panggil staf.

---

## B. Sebelum guna di kedai sebenar

| # | Keutamaan | Perkara | Kenapa penting |
|---|---|---|---|
| 1 | Wajib | **Backend dan database** (contoh Supabase) dengan realtime | Sekarang data hanya wujud dalam satu browser. Telefon pelanggan tak boleh hantar order ke tablet dapur. |
| 2 | Wajib | **Token meja yang tak boleh diteka** | Sesiapa boleh tukar `?meja=7` jadi `?meja=8` dan hantar order atas nama meja lain. Guna kod rawak untuk setiap meja (contoh `?t=k8F2xQ`), dan tukar kod bila perlu. |
| 3 | Wajib | **Log masuk staf** untuk skrin dapur dan kaunter | Sekarang sesiapa yang ada link boleh buka kaunter dan tanda bil dibayar. |
| 4 | Wajib | **Had kadar (rate limit) dan pengesahan order di server** | Untuk elak order palsu atau spam, dan semak harga di server, bukan di telefon pelanggan. |
| 5 | Tinggi | **Urus menu di server** dengan log masuk owner/manager | Skrin Urus Menu dah ada dalam demo, tapi menu dan gambar disimpan dalam browser sahaja (had sekitar 5 MB). Dalam produksi, simpan dalam database dan gambar dalam storage (contoh Supabase Storage). |
| 7 | Tinggi | **Pilihan item** (panas/ais, saiz, tahap pedas, tambah telur) | Kedai di Kelantan banyak guna pilihan macam ni. Sekarang hanya ada ruang nota. |
| 8 | Tinggi | **Cetak resit dan slip dapur** (printer thermal 58/80mm) | Banyak kedai masih nak resit kertas. |
| 9 | Sederhana | **Laporan jualan** harian, mingguan, menu paling laku dan waktu puncak | Nilai utama untuk owner, dan sebab untuk langganan bulanan. |
| 10 | Sederhana | **SST / caj perkhidmatan** (boleh hidup atau matikan) dan **e-Invois LHDN** | Keperluan undang-undang untuk sesetengah kedai. |
| 11 | Sederhana | **Mod luar talian** untuk dapur | Internet di kedai kadang-kadang tak stabil. |
| 12 | Sederhana | **Gabung atau pindah meja**, dan **bayar berasingan** (split bill) | Situasi biasa di kedai makan. |
| 13 | Rendah | **Dwibahasa** (BM / English) | Untuk pelancong dan pelanggan bukan Melayu. |
| 14 | Rendah | **Font tempatan** (self-host) | Sekarang font dimuat dari Google Fonts. Kalau internet perlahan, font asal browser digunakan. |

## Had demo yang perlu dimaklumkan kepada owner

- Order dari telefon owner **tak akan** muncul di laptop demo, sebab demo ini tiada backend.
- Tab dalam **browser yang sama** berkongsi data (BroadcastChannel dan localStorage). Jadi untuk demo serentak, buka dua tetingkap pada satu laptop.
- Menu, harga dan jualan dalam demo adalah **contoh**.
