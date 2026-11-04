# Bina Order

Sistem QR order di meja untuk kedai makan, oleh **Bina Lab**.

Pelanggan scan QR di meja, order sendiri dari telefon, dan bayar di kaunter selepas makan.

## Masalah yang diselesaikan

- **Staf terhad, buku menu tak cukup.** Pelanggan order sendiri tanpa tunggu staf.
- **Pelanggan tak selesa staf tunggu depan meja.** Pelanggan pilih menu ikut masa sendiri.
- **Kaunter lupa apa pelanggan makan.** Semua order disimpan ikut nombor meja, jadi bil dah siap di kaunter.

## Tiga skrin

1. **Pelanggan**: carian menu, kategori, semak pesanan sebelum hantar, nota untuk dapur, status setiap order, kad bil, panggil staf, terima kasih dan review.
2. **Dapur**: order baru, sedang dimasak, siap dihidang, senarai "perlu disediakan", tanda stok habis.
3. **Kaunter**: grid meja, bil penuh ikut meja, amaran panggil staf, terima bayaran (Tunai / DuitNow QR / Kad), jualan hari ini, bil terakhir.
4. **Urus Menu** (owner / manager): tambah, edit dan padam menu, muat naik gambar, kategori, susunan, tag Laris dan stok habis.

## Template UI

Pilih di bahagian atas demo. Ada 5 pilihan: **Bina Klasik**, **Kopitiam**, **Warisan Kelantan**, **Kafe Moden** dan **Gerai Malam**.

Template ditetapkan dalam `assets/shared.js` (`BINA_THEMES`). Untuk tambah template baru, salin satu entri dan tukar warna, font serta `layout` (`list` atau `grid`).

## Link ikut meja & QR

- `/?meja=7&kedai=Nama%20Kedai&tema=kopitiam` buka skrin pelanggan sahaja untuk Meja 7, dengan nama kedai dan template tersebut.
- `/qr.html` ialah page cetak QR: pilih nama kedai, bilangan meja dan template, kemudian cetak atau simpan PDF (A4, 4 kad satu muka surat).

## Struktur

```
index.html        demo 3 skrin + mod pelanggan (?meja=)
qr.html           cetak kad QR meja
assets/shared.js  template, tetapan, storan
vendor/qrcode.js  qrcode-generator 1.4.4 (MIT, Kazuhiko Arase)
AUDIT.md          hasil audit dan senarai kerja sebelum produksi
```

## Status

Ini **demo** tanpa backend. Data disimpan dalam browser sahaja (`localStorage`). Tab dalam browser yang sama berkongsi data. Butang **Reset demo** padam order dan jualan demo. Menu yang diedit kekal, dan boleh dipulihkan guna **Pulihkan menu asal** di skrin Urus Menu.

Lihat [AUDIT.md](AUDIT.md) untuk senarai perkara yang perlu ada sebelum guna di kedai sebenar.
