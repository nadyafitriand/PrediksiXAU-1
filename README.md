# CP EMAS — GoldVision

Frontend konsep untuk project prediksi harga emas + analisis sentimen berita + rekomendasi BUY/HOLD/SELL.

## Jalankan
1. Buka folder `CP EMAS` di VS Code.
2. Klik kanan `index.html`.
3. Pilih **Open with Live Server**.

## File
- `index.html` — struktur seluruh halaman frontend.
- `style.css` — tampilan/layout.
- `app.js` — interaksi tombol, navigasi, chart, search/filter, dan refresh demo.
- `data/mock-data.js` — seluruh data dummy.

## Penting
Sekarang tombol Refresh hanya mensimulasikan perubahan data. Ini belum real-time dan belum memakai backend.

Nanti ketika backend siap:
`Backend/API → app.js → tampilan frontend`

Data dummy di `data/mock-data.js` dapat diganti response API tanpa mengubah konsep tampilan.
