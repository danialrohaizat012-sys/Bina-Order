# Bina Order

Sistem QR order di meja untuk kedai makan, oleh **Bina Lab**.

Pelanggan scan QR di meja, order sendiri dari telefon, dan bayar di kaunter selepas makan.

## Masalah yang diselesaikan

- **Staf terhad, buku menu tak cukup.** Pelanggan order sendiri tanpa tunggu staf.
- **Pelanggan tak selesa staf tunggu depan meja.** Pelanggan pilih menu ikut masa sendiri.
- **Kaunter lupa apa pelanggan makan.** Semua order disimpan ikut nombor meja, jadi bil dah siap di kaunter.

## Tiga skrin

1. **Pelanggan**: menu, nota untuk dapur, status pesanan, tambah pesanan, panggil staf.
2. **Dapur**: order baru, sedang dimasak, siap dihidang.
3. **Kaunter**: grid meja, bil penuh ikut meja, terima bayaran (Tunai / DuitNow QR / Kad), jualan hari ini.

## Link ikut meja & QR

- `/?meja=7` buka skrin pelanggan sahaja, terus untuk Meja 7 (macam bila pelanggan scan QR di meja).
- `/qr.html` ialah page cetak QR: masukkan nama kedai dan bilangan meja, kemudian cetak atau simpan PDF (A4, 4 kad satu muka surat).

Library QR (`vendor/qrcode.js`, qrcode-generator 1.4.4, lesen MIT, Kazuhiko Arase) disimpan dalam repo supaya tak bergantung pada CDN.

## Status

Ini **demo** dalam satu fail (`index.html`), tanpa backend. Data disimpan dalam memori sahaja dan hilang bila page di-refresh. Tab browser yang sama boleh berkongsi data melalui `BroadcastChannel`.

Untuk guna sebenar (telefon pelanggan ke tablet dapur), perlu tambah backend dan database.

## Cara buka

Buka `index.html` dalam browser, atau aktifkan GitHub Pages pada branch `main`.
