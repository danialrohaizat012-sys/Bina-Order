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

## Status

Ini **demo** dalam satu fail (`index.html`), tanpa backend. Data disimpan dalam memori sahaja dan hilang bila page di-refresh. Tab browser yang sama boleh berkongsi data melalui `BroadcastChannel`.

Untuk guna sebenar (telefon pelanggan ke tablet dapur), perlu tambah backend dan database.

## Cara buka

Buka `index.html` dalam browser, atau aktifkan GitHub Pages pada branch `main`.
