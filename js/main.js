/* =====================================================================
   FILE INI: js/main.js
   ---------------------------------------------------------------------
   Ada 2 tugas di file ini:

   1) MENU HAMBURGER (mobile)
      Tombol ".nav-toggle" buka/tutup daftar menu "#navMenu" di layar
      kecil. Kalau salah satu link menu diklik, menu otomatis nutup.

   2) MEMUAT GAMBAR DARI data/images.json
      Semua elemen yang punya atribut data-img="kunci" atau
      data-img-list="kunci" akan diisi otomatis dari file JSON.
      Kalau file JSON gagal dimuat (misal dibuka langsung dari HP tanpa
      server), website TETAP JALAN karena gambar bawaan di HTML masih
      ada sebagai cadangan.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ---------- 1) HAMBURGER MENU ---------- */
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            var isOpen = menu.classList.toggle('open');
            toggle.classList.toggle('is-active', isOpen);
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('open');
                toggle.classList.remove('is-active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- 2) MUAT data/images.json ---------- */
    fetch('data/images.json')
        .then(function (res) { return res.ok ? res.json() : Promise.reject(res.status); })
        .then(applyImageConfig)
        .catch(function () {
            /* Gagal memuat JSON (misal dibuka via file:// tanpa server) ->
               biarkan gambar default yang sudah ada di HTML. */
        });

    function getNested(obj, path) {
        return path.split('.').reduce(function (val, key) {
            return (val && val[key] !== undefined) ? val[key] : undefined;
        }, obj);
    }

    function applyImageConfig(data) {
        /* Gambar tunggal: <img data-img="hero_photo"> atau
           elemen non-<img> untuk background: <section data-img-bg="hero_bg"> */
        document.querySelectorAll('[data-img]').forEach(function (el) {
            var value = getNested(data, el.getAttribute('data-img'));
            if (!value) return;
            el.src = value;

            var box = el.closest('.foto-box');
            if (box) {
                var avatar = box.querySelector('.icon-avatar');
                if (avatar) avatar.style.display = 'none';
                el.hidden = false;
            }
        });

        document.querySelectorAll('[data-img-bg]').forEach(function (el) {
            var value = getNested(data, el.getAttribute('data-img-bg'));
            if (!value) return;
            el.style.setProperty('--hero-bg-img', 'url("' + value + '")');
        });

        /* Daftar gambar (galeri): <img data-img-list="galeri" data-img-index="0"> */
        document.querySelectorAll('[data-img-list]').forEach(function (el) {
            var list = getNested(data, el.getAttribute('data-img-list'));
            var idx = Number(el.getAttribute('data-img-index'));
            if (Array.isArray(list) && list[idx]) {
                el.src = list[idx];
            }
        });
    }
});
