# Website PR GP Ansor Jeru

Website statis (HTML + CSS + JS) untuk Pimpinan Ranting GP Ansor Jeru,
Desa Jeru, Kec. Turen, Kab. Malang. Tidak butuh database atau server
backend — tinggal upload semua file ke hosting (InfinityFree, GitHub
Pages, dll) dan langsung jalan.

## Struktur Folder

```
├── index.html        Halaman depan (hero + link ke halaman lain)
├── tentang.html       Tentang PR Ansor Jeru (Visi/Misi/Nilai) + Makna "Ansor"
├── struktur.html      Struktur Pengurus (kartu profil selang-seling)
├── kegiatan.html       Program & Kegiatan
├── galeri.html         Galeri foto kegiatan
├── kontak.html          Hubungi Kami (WhatsApp/Instagram/Email)
├── css/
│   └── style.css       Semua warna, jarak, ukuran font, responsive
├── js/
│   └── main.js          Toggle menu hamburger + pemuat data/images.json
├── data/
│   └── images.json     Daftar link semua gambar di website (lihat di bawah)
└── Assets/              Taruh file foto lokal di sini (kosong, isi sendiri)
```

## Cara Ganti Foto (data/images.json)

Semua link gambar diatur di **satu file**: `data/images.json`. Tidak
perlu buka/edit file HTML sama sekali untuk ganti foto.

```json
{
  "hero_bg": "...",        // Foto latar samar di section Hero (index.html)
  "hero_photo": "...",     // Foto di bingkai lengkung Hero (index.html)
  "tentang_photo": "...",  // Foto di halaman Tentang
  "galeri": ["...", "...", "...", "..."],  // 4 foto di halaman Galeri, urut
  "pengurus": {
    "ketua": "",              // Kosongkan "" = otomatis pakai ikon avatar
    "wakil_ketua_1": "",
    "wakil_ketua_2": "",
    "sekretaris": "",
    "wakil_sekretaris_1": "",
    "wakil_sekretaris_2": "",
    "bendahara": "",
    "wakil_bendahara": ""
  }
}
```

Cara pakai:
1. Upload foto ke folder `Assets/` (atau host di tempat lain, misal GitHub).
2. Isi value di `images.json` dengan path/link foto tersebut, contoh:
   `"ketua": "Assets/ketua.jpg"` atau link penuh `https://...`.
3. Simpan file, refresh website — foto otomatis berubah, tanpa sentuh HTML.

**Catatan:** `images.json` hanya berfungsi kalau website diakses lewat
server (http/https), termasuk hosting biasa. Kalau file HTML dibuka
langsung dari HP/komputer (`file://`), browser akan memblokir
`fetch()` ke file JSON karena aturan keamanan (CORS) — di situasi ini,
website tetap tampil normal karena ada gambar cadangan bawaan di tiap
file HTML, hanya saja perubahan di `images.json` tidak akan kelihatan
sampai website benar-benar di-hosting.

## Struktur Pengurus (struktur.html)

Setiap pengurus adalah 1 blok `.pengurus-item` berisi kotak nama+jabatan
dan kotak foto. Baris genap otomatis dibalik posisinya (CSS) supaya
tampilannya selang-seling kiri-kanan. Kalau foto belum diisi di
`images.json`, kotak foto otomatis menampilkan ikon avatar sebagai
placeholder — bukan kotak kosong.

Ganti nama/jabatan pengurus: edit langsung teks di dalam
`<div class="pengurus-info">...</div>` pada `struktur.html`, tidak
perlu sentuh CSS.

## Menu Hamburger (Mobile)

Di layar ≤860px, menu navigasi otomatis berubah jadi tombol hamburger
(ikon 3 garis) di pojok kanan header. Diklik akan membuka daftar menu
di bawah header. Logikanya ada di `js/main.js`, gayanya di
`css/style.css` bagian `@media (max-width: 860px)`.

## Yang Perlu Dilakukan Sebelum Upload ke Hosting

- [ ] Isi ulang folder `Assets/` dengan file foto asli (kosong di paket ini).
- [ ] Isi foto pengurus di `data/images.json` kalau sudah ada fotonya.
- [ ] Cek link WhatsApp admin di `kontak.html` (masih placeholder
      `[no/kontak admin]` — peninggalan dari file asli, belum diisi).

## Catatan Desain

- Tidak ada teks/detail yang diubah dari draft sebelumnya — hanya
  layout, ikon (emoji → SVG), dan struktur halaman yang disusun ulang.
- Palet warna tetap hijau-emas (identitas Ansor/NU), ditambah nuansa
  krem hangat supaya tidak flat putih-hijau saja.
- Font: Poppins untuk judul, Inter untuk teks isi.
