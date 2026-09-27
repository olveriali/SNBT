(function() {
  // 1. Buat kontainer pembungkus widget
  const container = document.createElement('div');
  container.className = 'snbt-accordion-widget-wrapper';

  // 2. Tempelkan CSS dan Struktur HTML
  container.innerHTML = `
    <style>
      .snbt-accordion-widget-wrapper {
        --bg: #0f172a;
        --card-bg: #1e293b;
        --primary: #6366f1;
        --accent: #06b6d4;
        --text: #f8fafc;
        --text-muted: #94a3b8;
        --border: #334155;
        --success: #22c55e;
        --warning: #f59e0b;
        --danger: #ef4444;

        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background-color: var(--bg);
        color: var(--text);
        padding: 12px;
        border-radius: 12px;
        text-align: left;
      }

      .snbt-accordion-widget-wrapper * { box-sizing: border-box; }
      .snbt-accordion-widget-wrapper .container { max-width: 850px; margin: 0 auto; }

      .snbt-accordion-widget-wrapper .header {
        background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
        padding: 20px;
        border-radius: 16px;
        margin-bottom: 16px;
        box-shadow: 0 10px 25px rgba(99, 102, 241, 0.25);
      }
      .snbt-accordion-widget-wrapper .header h1 { margin: 0 0 6px 0; font-size: 20px; color: #ffffff; }
      .snbt-accordion-widget-wrapper .header p { margin: 0; font-size: 12px; opacity: 0.95; line-height: 1.4; color: #ffffff; }

      .snbt-accordion-widget-wrapper .summary-card {
        background: var(--card-bg);
        border: 1px solid var(--border);
        border-radius: 14px;
        padding: 14px;
        margin-bottom: 16px;
      }
      .snbt-accordion-widget-wrapper .summary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 10px;
        margin-bottom: 12px;
      }
      .snbt-accordion-widget-wrapper .stat-box {
        background: #0f172a;
        border: 1px solid var(--border);
        padding: 10px;
        border-radius: 8px;
        text-align: center;
      }
      .snbt-accordion-widget-wrapper .stat-box small { display: block; font-size: 10px; color: var(--text-muted); }
      .snbt-accordion-widget-wrapper .stat-box strong { font-size: 16px; color: var(--accent); display: block; margin-top: 2px; }

      .snbt-accordion-widget-wrapper .progress-bar-bg {
        background: #0f172a;
        height: 10px;
        border-radius: 5px;
        overflow: hidden;
        border: 1px solid var(--border);
      }
      .snbt-accordion-widget-wrapper .progress-bar-fill {
        height: 100%;
        background: linear-gradient(90deg, #22c55e, #10b981);
        width: 0%;
        transition: width 0.4s ease;
      }

      .snbt-accordion-widget-wrapper .accordion-section {
        background: var(--card-bg);
        border: 1px solid var(--border);
        border-radius: 12px;
        margin-bottom: 12px;
        overflow: hidden;
      }
      .snbt-accordion-widget-wrapper .accordion-header {
        padding: 14px;
        background: #1e293b;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        border-bottom: 1px solid transparent;
        transition: background 0.2s;
      }
      .snbt-accordion-widget-wrapper .accordion-header:hover { background: #334155; }
      .snbt-accordion-widget-wrapper .accordion-header.active { border-bottom-color: var(--border); }

      .snbt-accordion-widget-wrapper .accordion-title-group { display: flex; flex-direction: column; gap: 2px; }
      .snbt-accordion-widget-wrapper .accordion-title { font-size: 14px; font-weight: bold; }
      .snbt-accordion-widget-wrapper .accordion-target { font-size: 11px; color: var(--text-muted); }

      .snbt-accordion-widget-wrapper .accordion-stats { text-align: right; }
      .snbt-accordion-widget-wrapper .accordion-percent { font-size: 15px; font-weight: bold; color: var(--success); }
      .snbt-accordion-widget-wrapper .accordion-icon { font-size: 12px; margin-left: 8px; color: var(--text-muted); }

      .snbt-accordion-widget-wrapper .accordion-body {
        display: none;
        padding: 12px;
        background: #0f172a;
      }

      .snbt-accordion-widget-wrapper .day-card {
        background: var(--card-bg);
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 12px;
        margin-bottom: 10px;
      }
      .snbt-accordion-widget-wrapper .day-card-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
      }
      .snbt-accordion-widget-wrapper .day-badge {
        background: rgba(99, 102, 241, 0.2);
        color: #a5b4fc;
        border: 1px solid rgba(99, 102, 241, 0.4);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: bold;
      }

      .snbt-accordion-widget-wrapper .sub-bab-box {
        background: #0f172a;
        border: 1px dashed var(--border);
        padding: 8px 10px;
        border-radius: 6px;
        margin: 8px 0;
        font-size: 11px;
        color: #cbd5e1;
      }
      .snbt-accordion-widget-wrapper .sub-bab-box ul { margin: 4px 0 0 14px; padding: 0; }
      .snbt-accordion-widget-wrapper .sub-bab-box li { margin-bottom: 2px; }

      .snbt-accordion-widget-wrapper .grid-inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-top: 8px;
      }
      @media (max-width: 480px) {
        .snbt-accordion-widget-wrapper .grid-inputs { grid-template-columns: 1fr; }
      }

      .snbt-accordion-widget-wrapper label { font-size: 10px; color: var(--text-muted); display: block; margin-bottom: 2px; }
      .snbt-accordion-widget-wrapper input[type="number"], 
      .snbt-accordion-widget-wrapper select, 
      .snbt-accordion-widget-wrapper input[type="text"] {
        width: 100%;
        background: #0f172a;
        border: 1px solid var(--border);
        color: var(--text);
        padding: 6px;
        border-radius: 6px;
        font-size: 11px;
      }
    </style>

    <div class="container">
      <div class="header">
        <h1>🎯 Master Tracker SNBT 2027 (Full 92 Hari)</h1>
        <p>Sistem Accordion Subtes | Target Min. 3 Jam/Hari (30 Sep - 30 Des 2026)</p>
      </div>

      <div class="summary-card">
        <div class="summary-grid">
          <div class="stat-box">
            <small>Total Jam Belajar</small>
            <strong id="stat-hours">0 / 276 Jam</strong>
          </div>
          <div class="stat-box">
            <small>Total Latsol Dikerjakan</small>
            <strong id="stat-latsol">0 Soal</strong>
          </div>
          <div class="stat-box">
            <small>Total Hari Paham</small>
            <strong id="stat-paham">0 / 92 Hari</strong>
          </div>
          <div class="stat-box">
            <small>Materi Perlu Review</small>
            <strong id="stat-review">0 Hari</strong>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
          <span>Progres Kelengkapan 92 Hari</span>
          <strong id="progress-percent">0%</strong>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" id="progress-bar"></div>
        </div>
      </div>

      <div id="accordion-container"></div>
    </div>
  `;

  // 3. Sisipkan kontainer ke lokasi script dipanggil
  const currentScript = document.currentScript;
  currentScript.parentNode.insertBefore(container, currentScript);

  // 4. Sistem Logika JavaScript Internal
  const memoryStore = {};
  function safeGet(key) {
    try { return localStorage.getItem(key) || memoryStore[key] || ''; } 
    catch(e) { return memoryStore[key] || ''; }
  }
  function safeSet(key, val) {
    try { localStorage.setItem(key, val); } catch(e) {}
    memoryStore[key] = val;
  }

  const subtestMeta = [
    { code: 'pk', name: 'Penalaran Kuantitatif (PK)', target: 'Target Score > 770', color: '#3b82f6' },
    { code: 'pm', name: 'Penalaran Matematika (PM)', target: 'Target Score > 770', color: '#8b5cf6' },
    { code: 'pu', name: 'Penalaran Umum (PU)', target: 'Target Score > 770', color: '#ec4899' },
    { code: 'lbi', name: 'Literasi Bahasa Indonesia (LBI)', target: 'Target Score > 700', color: '#f97316' },
    { code: 'lbe', name: 'Literasi Bahasa Inggris (LBE)', target: 'Target Score > 700', color: '#06b6d4' },
    { code: 'ppu', name: 'Pengetahuan & Pemahaman Umum (PPU)', target: 'Target Score > 700', color: '#eab308' },
    { code: 'pbm', name: 'Pemahaman Bacaan & Menulis (PBM)', target: 'Target Score > 700', color: '#10b981' },
    { code: 'tryout', name: 'Tryout & Review Module (15x TO)', target: 'Simulasi & Evaluasi Error Log', color: '#ef4444' }
  ];

  const syllabus = [
    { s: "pk", d: "30 Sep 2026", dayNum: 1, t: "Operasi Aritmatika Dasar & Bilangan", sub: ["Pecahan, Desimal & Persen", "Bentuk Pangkat (Eksponen) & Akar", "Sifat Keterbagian, FPB & KPK"], m: "20 Soal Hitung Cepat Tanpa Kalkulator" },
    { s: "pk", d: "01 Okt 2026", dayNum: 2, t: "Logaritma & Sifat-Sifat Hitung Cepat", sub: ["Sifat Dasar Logaritma", "Persamaan Logaritma Sederhana", "Trik Hitung Cepat Soal Isian"], m: "20 Soal Variasi PK" },
    { s: "pk", d: "19 Okt 2026", dayNum: 19, t: "Persamaan Kuadrat & Faktorisasi Cepat", sub: ["Faktorisasi & Rumus ABC", "Akar-Akar Persamaan Kuadrat (x1+x2, x1*x2)", "Menyusun Persamaan Kuadrat Baru"], m: "20 Soal Faktorisasi Cepat" },
    { s: "pk", d: "20 Okt 2026", dayNum: 20, t: "Pertidaksamaan Kuadrat & Diskriminan", sub: ["Nilai Diskriminan (D>0, D=0, D<0)", "Garis Bilangan & Pertidaksamaan", "Definit Positif & Definit Negatif"], m: "20 Soal Pertidaksamaan PK" },
    { s: "pk", d: "31 Okt 2026", dayNum: 31, t: "Geometri Datar: Luas, Keliling & Sudut", sub: ["Segitiga, Segi Empat & Lingkaran", "Sudut Sehadap & Bertolak Belakang", "Luas Daerah Arsiran"], m: "20 Soal Geometri Datar" },
    { s: "pk", d: "01 Nov 2026", dayNum: 32, t: "Geometri Ruang Dasar & Pythagoras", sub: ["Kubus, Balok, Tabung & Bola", "Teorema Pythagoras 3D", "Volume & Luas Permukaan"], m: "20 Soal Spatial Geometry" },
    { s: "pk", d: "13 Nov 2026", dayNum: 45, t: "Statistika: Pemusatan & Penyebaran Data", sub: ["Mean, Median, Modus Data Tunggal", "Kuartil & Jangkauan Data", "Efek Perubahan Nilai pada Mean"], m: "20 Soal Pemusatan Data" },
    { s: "pk", d: "14 Nov 2026", dayNum: 46, t: "Reading Data: Diagram, Chart & Histogram", sub: ["Membaca Diagram Batang, Garis, Pie", "Histogram & Ogive", "Inference Data Grafik"], m: "20 Soal Membaca Data" },
    { s: "pk", d: "20 Nov 2026", dayNum: 52, t: "Fungsi, Domain, Range & Grafik Fungsi", sub: ["Konsep Relasi & Fungsi", "Menentukan Domain & Range", "Grafik Fungsi Linear & Kuadrat"], m: "20 Soal Grafik Fungsi" },
    { s: "pk", d: "21 Nov 2026", dayNum: 53, t: "Komposisi Fungsi & Fungsi Invers", sub: ["Fungsi Komposisi (f o g)(x)", "Invers Fungsi f^-1(x)", "Invers Fungsi Komposisi"], m: "20 Soal Algebra Invers" },
    { s: "pk", d: "11 Des 2026", dayNum: 73, t: "Kecukupan Data: Pernyataan (1) & (2)", sub: ["Pernyataan (1) Saja Cukup", "Pernyataan (2) Saja Cukup", "Kedua Pernyataan Bersama Cukup/Tidak"], m: "25 Soal Data Sufficiency" },
    { s: "pk", d: "12 Des 2026", dayNum: 74, t: "Isian Singkat Angka & Kecerdasan Berhitung", sub: ["Trik Isian Angka Tanpa Pilihan Ganda", "Estimasi Cepat Hasil Hitungan", "Pencegahan Salah Ketik Isian"], m: "25 Soal Isian Angka" },

    { s: "pm", d: "11 Okt 2026", dayNum: 11, t: "Aljabar Dasar & Pemodelan Soal Cerita SPLDV", sub: ["Penerjemahan Teks ke Persamaan Aljabar", "Eliminasi & Subtitusi SPLDV", "Aplikasi SPLDV Kontekstual"], m: "15 Soal Numerasi Kontekstual" },
    { s: "pm", d: "12 Okt 2026", dayNum: 12, t: "Pemodelan SPLTV & Pertidaksamaan Linear", sub: ["SPLTV Soal Cerita 3 Variabel", "Sistem Pertidaksamaan Linear", "Daerah Himpunan Penyelesaian"], m: "15 Soal Text-to-Equation" },
    { s: "pm", d: "26 Okt 2026", dayNum: 27, t: "Aritmatika Sosial: Diskon, Bunga & Finansial", sub: ["Persentase Untung, Rugi & Diskon Berlapis", "Bunga Tunggal & Bunga Majemuk Dasar", "Pajak (PPN/PPh) & Netto/Bruto/Tara"], m: "20 Soal Cerita Finansial" },
    { s: "pm", d: "27 Okt 2026", dayNum: 28, t: "Rasio, Proporsi & Perbandingan", sub: ["Perbandingan Senilai & Berbalik Nilai", "Pekerja Tambahan & Kecepatan-Waktu", "Skala & Peta Numerasi"], m: "20 Soal Tabel Numerasi" },
    { s: "pm", d: "15 Nov 2026", dayNum: 47, t: "Kaidah Pencacahan, Permutasi & Kombinasi", sub: ["Aturan Perkalian & Penjumlahan", "Permutasi Siklis & Unsur Sama", "Kombinasi Pengambilan Sampel"], m: "20 Soal Kombinatorika" },
    { s: "pm", d: "16 Nov 2026", dayNum: 48, t: "Peluang Kejadian Tunggal & Majemuk", sub: ["Peluang Kejadian Saling Lepas & Bebas", "Peluang Bersyarat Kontekstual", "Frekuensi Harapan"], m: "20 Soal Peluang Kontekstual" },
    { s: "pm", d: "23 Nov 2026", dayNum: 55, t: "Pemodelan Laju Perubahan & Grafik Data", sub: ["Laju Perubahan Rata-Rata Grafik", "Interpolasi & Ekstrapolasi Data", "Aplikasi Grafik pada Soal Cerita"], m: "15 Soal PM HOTS" },
    { s: "pm", d: "02 Des 2026", dayNum: 64, t: "Geometri Analitis: Persamaan Garis & Gradien", sub: ["Gradien Garis Lurus (m)", "Persamaan Garis Sejajar & Tegak Lurus", "Jarak Dua Titik Koordinat"], m: "15 Soal Garis Lurus" },
    { s: "pm", d: "03 Des 2026", dayNum: 65, t: "Trigonometri Dasar pada Soal Cerita", sub: ["Sin, Cos, Tan Segitiga Siku-Siku", "Sudut Elevasi & Depresi Soal Cerita", "Aturan Sinus & Kosinus Dasar"], m: "15 Soal Trigonometri" },
    { s: "pm", d: "16 Des 2026", dayNum: 78, t: "Integrasi Grafik, Tabel & Narasi Panjang", sub: ["Penalaran Matematika Soal Panjang", "Pemodelan Multi-Langkah", "Pengambilan Keputusan Numerasi"], m: "15 Soal Complex PM" },

    { s: "pu", d: "02 Okt 2026", dayNum: 3, t: "Penalaran Induktif & Deductif Dasar", sub: ["Silogisme (Premis Mayor & Minor)", "Modus Ponens & Modus Tollens", "Diagram Venn Himpunan"], m: "15 Soal Logika Verbal" },
    { s: "pu", d: "03 Okt 2026", dayNum: 4, t: "Negasi, Kontraposisi & Logika Posisi", sub: ["Implikasi, Konvers, Invers, Kontraposisi", "Negasi Pernyataan Majemuk", "Pernyataan Berkuantor (Semua/Ada)"], m: "20 Soal Kebenaran Logika" },
    { s: "pu", d: "21 Okt 2026", dayNum: 21, t: "Pola Bilangan, Deret Angka & Matriks Angka", sub: ["Deret Aritmatika & Geometri Unik", "Pola Angka Bertingkat & Larik", "Pola Angka dalam Gambar/Matriks"], m: "25 Soal Pattern Recognition" },
    { s: "pu", d: "22 Okt 2026", dayNum: 22, t: "Pola Gambar (Spatial Reasoning) & Rotasi 3D", sub: ["Serial Gambar & Jaring-Jaring 3D", "Rotasi, Cermin & Analogi Gambar", "Pola Lipatan Kertas"], m: "25 Soal Visual Spatial" },
    { s: "pu", d: "07 Nov 2026", dayNum: 39, t: "Penalaran Analitis: Urutan & Posisi", sub: ["Soal Tempat Duduk, Antrean & Skor", "Urutan Lebih Tinggi/Lembah", "Eleminasi Kemungkinan Pilihan"], m: "15 Soal Analitis" },
    { s: "pu", d: "08 Nov 2026", dayNum: 40, t: "Logic Condition: Bersyarat & Kombinasi", sub: ["Syarat Mutlak vs Syarat Opsional", "Matriks Tabel Analitis", "Penarikan Kesimpulan Bersyarat"], m: "15 Soal Matriks Analitis" },
    { s: "pu", d: "26 Nov 2026", dayNum: 58, t: "Penalaran Kuantitatif Tipe P vs Q & 1,2,3,4", sub: ["Membandingkan Kuantitas P dan Q", "Kecukupan Pernyataan 1, 2, 3, 4", "Eliminasi Pilihan Kuantitatif"], m: "25 Soal P vs Q Logic" },
    { s: "pu", d: "07 Des 2026", dayNum: 69, t: "Analisis Sebab-Akibat Kompleks", sub: ["Menganalisis Dua Fenomena Berhubungan", "Sebab Mutlak vs Kebetulan", "Logika Akibat Berantai"], m: "20 Soal Cause-Effect Logic" },
    { s: "pu", d: "17 Des 2026", dayNum: 79, t: "Drill Marathon Logika Verbal & Kuantitatif", sub: ["Latihan Gabungan Silogisme, Pola & Analitis", "Fokus Waktu < 1 Menit per Soal"], m: "30 Soal PU Combined" },

    { s: "lbi", d: "13 Okt 2026", dayNum: 13, t: "Ide Pokok & Gagasan Utama Paragraf", sub: ["Paragraf Deduktif & Induktif", "Kalimat Utama vs Kalimat Penjelas", "Pikiran Implisit Paragraf"], m: "20 Soal Literasi Teks Panjang" },
    { s: "lbi", d: "14 Okt 2026", dayNum: 14, t: "Simpulan Teks Panjang & Evaluasi Paragraf", sub: ["Menyimpulkan Isi Teks Akademik", "Pernyataan Sesuai/Tidak Sesuai", "Generalisasi Isi Paragraf"], m: "20 Soal Simpulan Literasi" },
    { s: "lbi", d: "02 Nov 2026", dayNum: 34, t: "Evaluasi Kekuatan & Kelemahan Argumen", sub: ["Analisis Fakta vs Opini Penulis", "Menilai Kelemahan Argumen Teks", "Sikap & Asumsi Penulis Paragraf"], m: "15 Soal Analisis Argumen" },
    { s: "lbi", d: "03 Nov 2026", dayNum: 35, t: "Membandingkan Isi 2 Teks Berbeda", sub: ["Persamaan & Perbedaan Topik 2 Teks", "Hubungan Antar Teks", "Sintesis Informasi 2 Bacaan"], m: "15 Soal Comparative Text" },
    { s: "lbi", d: "08 Des 2026", dayNum: 70, t: "Teks Grafik, Tabel & Infografis Kompleks", sub: ["Membaca Gabungan Narasi + Infografis", "Verifikasi Data Tabel dengan Paragraf", "Evaluasi Kebenaran Data Grafik"], m: "15 Soal Visual Literacy" },
    { s: "lbi", d: "20 Des 2026", dayNum: 82, t: "Drill Dual Language Literacy Texts", sub: ["Latihan Literasi Bahasa Indonesia & Inggris", "Analisis Paragraf Panjang Akademik"], m: "30 Soal LBI & LBE" },

    { s: "lbe", d: "06 Okt 2026", dayNum: 7, t: "English Sentence Structure & Clauses", sub: ["Subject-Verb Agreement", "Dependent & Independent Clauses", "Complex Sentence Identification"], m: "15 Soal Teks Akademik Inggris" },
    { s: "lbe", d: "10 Okt 2026", dayNum: 10, t: "Main Idea, Paragraph Topic & Topic Sentence", sub: ["Skimming & Scanning Techniques", "Identifying Paragraph Core Idea", "Main Idea vs Detail"], m: "15 Soal Reading Comprehension" },
    { s: "lbe", d: "28 Okt 2026", dayNum: 29, t: "Detailed Information & Scanning Facts", sub: ["Locating Specific Facts in Text", "True/False Statements in English", "Synonym Matching in Paragraph"], m: "20 Soal Teks Inggris" },
    { s: "lbe", d: "06 Nov 2026", dayNum: 38, t: "Author's Tone, Attitude & Purpose", sub: ["Critical, Neutral, Optimistic Tone", "Author's Bias & Assumption", "Purpose of Writing Paragraph"], m: "15 Soal Critical Reading" },
    { s: "lbe", d: "22 Nov 2026", dayNum: 54, t: "Vocabulary in Context & Synonyms/Antonyms", sub: ["Contextual Word Meaning in Passages", "Academic English Vocabulary", "Prefixes & Suffixes Meaning"], m: "20 Soal Vocab Inggris" },
    { s: "lbe", d: "01 Des 2026", dayNum: 63, t: "Paraphrasing Sentences & Text Summary", sub: ["Best Restatement Sentence", "Summary Sentence of Passage", "Avoiding Distractor Paraphrases"], m: "20 Soal Restatement" },

    { s: "ppu", d: "15 Okt 2026", dayNum: 15, t: "Makna Kata, Istilah Serapan & Contextual Vocabulary", sub: ["Makna Denotatif & Konotatif", "Istilah Khusus Bidang Ilmu", "Sinonim Kata dalam Konteks"], m: "25 Soal Wacana PPU" },
    { s: "ppu", d: "16 Okt 2026", dayNum: 16, t: "Bentukan Kata & Pergeseran Makna", sub: ["Imbuhan me-, ber-, di-, pe-an", "Kata Ulang & Kata Majemuk", "Generalisasi & Spesifikasi Makna"], m: "25 Soal Imbuhan Paragraf" },
    { s: "ppu", d: "09 Nov 2026", dayNum: 41, t: "Hubungan Antarparagraf & Kohesi Teks", sub: ["Paragraf Kohesif & Koheren", "Fungsi Paragraf Penjelas", "Transisi Maksud Antarparagraf"], m: "20 Soal Text Flow PPU" },
    { s: "ppu", d: "10 Nov 2026", dayNum: 42, t: "Kalimat Sumbang & Keutuhan Paragraf", sub: ["Identifikasi Kalimat Keluar Topik", "Kepaduan Makna Paragraf", "Revisi Paragraf Tidak Padu"], m: "20 Soal PPU Paragraf" },
    { s: "ppu", d: "13 Des 2026", dayNum: 75, t: "Bedah Teks Panjang & Analisis Serapan", sub: ["Bedah Teks Panjang Sains/Sosial", "Ejaan Kata Serapan Asing/Daerah", "Penggunaan Idiom & Ungkapan"], m: "25 Soal PPU Marathon" },

    { s: "pbm", d: "04 Okt 2026", dayNum: 5, t: "PUEBI/EYD V: Huruf & Penulisan Kata", sub: ["Penggunaan Huruf Kapital & Miring", "Penulisan Kata Depan & Imbuhan", "Singkatan & Akronim Baku"], m: "25 Soal Memperbaiki Ejaan" },
    { s: "pbm", d: "05 Okt 2026", dayNum: 6, t: "Tanda Baca & Transliterasi", sub: ["Penggunaan Koma, Titik Dua, Titik Koma", "Tanda Hubung & Tanda Petik", "Kerapihan Ejaan Paragraf"], m: "25 Soal PBM Ejaan" },
    { s: "pbm", d: "23 Okt 2026", dayNum: 23, t: "Kalimat Efektif & Syarat Kelogisan", sub: ["Subjek & Predikat Wajib (SPOK)", "Keparalelan Bentuk & Kehematan", "Kelogisan Makna Kalimat"], m: "20 Soal PBM HOTS" },
    { s: "pbm", d: "17 Nov 2026", dayNum: 49, t: "Konjungsi Intrakalimat & Antarkalimat", sub: ["Konjungsi Koordinatif & Subordinatif", "Konjungsi Antarkalimat", "Penggunaan Konjungsi Pertentangan"], m: "25 Soal PBM Konjungsi" },
    { s: "pbm", d: "27 Nov 2026", dayNum: 59, t: "Penggabungan Kalimat Kompleks", sub: ["Penggabungan 2 Kalimat Tunggal", "Efektivitas Konjungsi Penggabung", "Kepaduan Struktur Kalimat Gabungan"], m: "20 Soal Penggabungan Kalimat" },
    { s: "pbm", d: "06 Des 2026", dayNum: 68, t: "Penataan Paragraf & Teks Rumpang", sub: ["Melengkapi Kata/Kalimat Rumpang", "Menyusun Acak Kalimat Jadi Padu", "Pilihan Kata (Diksi) Tepat"], m: "25 Soal Teks Rumpang" },
    { s: "pbm", d: "21 Des 2026", dayNum: 83, t: "Bedah 50 Soal Kebahasaan HOTS", sub: ["Marathon PBM & PPU Soal Baku", "Koreksi Cepat Ejaan & Konjungsi"], m: "50 Soal Kebahasaan" },

    { s: "tryout", d: "07 Okt 2026", dayNum: 8, t: "Review Formula Sheet Loose Leaf Grid (PK & PU)", sub: ["Active Recall Rumus Eksponen & Logaritma", "Review Rumus Silogisme & Logika"], m: "Review Catatan Binder B5" },
    { s: "tryout", d: "08 Okt 2026", dayNum: 9, t: "🔴 TRYOUT 1 (Diagnostic Test 195 Soal)", sub: ["Tryout Full Set 7 Subtes SNBT", "Pemetaan Skor Awal & Baseline Score"], m: "195 Soal Full Set SNBT" },
    { s: "tryout", d: "09 Okt 2026", dayNum: 10, t: "Bedah Error Log TO 1 & Analisis Soal Salah", sub: ["Catat Nomor Soal Salah di Binder B5", "Identifikasi Lemah Konsep vs Teliti"], m: "Bedah Kunci Jawaban TO 1" },
    { s: "tryout", d: "17 Okt 2026", dayNum: 17, t: "🔴 TRYOUT 2 (Simulasi Akurasi & Waktu)", sub: ["Tryout Full Set SNBT", "Target: Menekan Soal Kosong"], m: "195 Soal Full Set" },
    { s: "tryout", d: "18 Okt 2026", dayNum: 18, t: "Bedah Error Log TO 2", sub: ["Evaluasi Kesalahan SPLDV & Ejaan", "Pembaruan Binder B5 Error Notebook"], m: "Bedah Kunci Jawaban TO 2" },
    { s: "tryout", d: "24 Okt 2026", dayNum: 24, t: "🔴 TRYOUT 3 (Progress Check 3 Minggu)", sub: ["Tryout Full Set SNBT", "Uji Coba Hasil Belajar Aljabar & Logika"], m: "195 Soal Full Set" },
    { s: "tryout", d: "25 Okt 2026", dayNum: 25, t: "Bedah Error Log TO 3", sub: ["Evaluasi Deret Angka & Kalimat Efektif", "Update Grafik Perkembangan Nilai"], m: "Bedah TO 3" },
    { s: "tryout", d: "29 Okt 2026", dayNum: 30, t: "🔴 TRYOUT 4 (Akhir Bulan 1 - Diagnostic Check)", sub: ["Simulasi Full Set Akhir Bulan Pertama", "Evaluasi Pencapaian Target Skor Awal"], m: "195 Soal Full Set" },
    { s: "tryout", d: "30 Okt 2026", dayNum: 31, t: "Bedah Error Log TO 4", sub: ["Evaluasi Total Materi Bulan Pertama", "Penyusunan Ulang Strategi Bulan Kedua"], m: "Review Total Bulan 1" },
    { s: "tryout", d: "04 Nov 2026", dayNum: 36, t: "🔴 TRYOUT 5 (Penerapan Konsep HOTS)", sub: ["Tryout Full Set SNBT", "Uji Coba Soal Tingkat Kesulitan Tinggi"], m: "195 Soal Full Set" },
    { s: "tryout", d: "05 Nov 2026", dayNum: 37, t: "Bedah Error Log TO 5", sub: ["Evaluasi Geometri & Comparasion Text", "Update Error Notebook Loose Leaf"], m: "Bedah TO 5" },
    { s: "tryout", d: "11 Nov 2026", dayNum: 43, t: "🔴 TRYOUT 6 (Penajaman LBI & LBE)", sub: ["Tryout Full Set SNBT", "Target Skor Literasi LBI & LBE > 700"], m: "195 Soal Full Set" },
    { s: "tryout", d: "12 Nov 2026", dayNum: 44, t: "Bedah Error Log TO 6", sub: ["Evaluasi Author Tone & Analitis", "Update Catatan Strategi Literasi"], m: "Bedah TO 6" },
    { s: "tryout", d: "18 Nov 2026", dayNum: 50, t: "🔴 TRYOUT 7 (Manajemen Waktu Soal Sulit)", sub: ["Tryout Full Set SNBT", "Latihan Lewati Soal Sulit < 1.5 Menit"], m: "195 Soal Full Set" },
    { s: "tryout", d: "19 Nov 2026", dayNum: 51, t: "Bedah Error Log TO 7", sub: ["Evaluasi Statistika & Peluang", "Update Loose Leaf Error Notebook"], m: "Bedah TO 7" },
    { s: "tryout", d: "24 Nov 2026", dayNum: 56, t: "🔴 TRYOUT 8 (Akhir Bulan 2)", sub: ["Tryout Full Set Akhir Bulan Kedua", "Evaluasi Target Skor Bulan Kedua"], m: "195 Soal Full Set" },
    { s: "tryout", d: "25 Nov 2026", dayNum: 57, t: "Bedah Error Log TO 8", sub: ["Evaluasi Total Fungsi & Konjungsi", "Penyusunan Strategi Bulan Ketiga"], m: "Bedah TO 8" },
    { s: "tryout", d: "28 Nov 2026", dayNum: 60, t: "🔴 TRYOUT 9 (Speed Test Isian Singkat)", sub: ["Tryout Full Set SNBT", "Fokus Kecepatan Isian Singkat Angka"], m: "195 Soal Full Set" },
    { s: "tryout", d: "29 Nov 2026", dayNum: 61, t: "Bedah Error Log TO 9", sub: ["Evaluasi Isian Singkat Angka", "Pembaruan Binder B5 Catatan Ringkas"], m: "Bedah TO 9" },
    { s: "tryout", d: "30 Nov 2026", dayNum: 62, t: "Review Total Catatan & Loose Leaf Bulan 2", sub: ["Active Recall Rumus Statistika, Peluang & Fungsi", "Review Kosakata Inggris & Ejaan PBM"], m: "Review Total Bulan 2" },
    { s: "tryout", d: "04 Des 2026", dayNum: 66, t: "🔴 TRYOUT 10 (Target PK & PM > 720)", sub: ["Tryout Full Set SNBT", "Target Peningkatan Skor Hitungan PK/PM"], m: "195 Soal Full Set" },
    { s: "tryout", d: "05 Des 2026", dayNum: 67, t: "Bedah Error Log TO 10", sub: ["Evaluasi Trigonometri & Gradien Garis", "Update Error Log Binder B5"], m: "Bedah TO 10" },
    { s: "tryout", d: "09 Des 2026", dayNum: 71, t: "🔴 TRYOUT 11 (Simulasi Ruangan Asli)", sub: ["Tryout Full Set SNBT", "Simulasi Tanpa Distraksi HP / Fokus Total"], m: "195 Soal Full Set" },
    { s: "tryout", d: "10 Des 2026", dayNum: 72, t: "Bedah Error Log TO 11", sub: ["Evaluasi Infografis & Teks Rumpang", "Update Catatan Binder B5"], m: "Bedah TO 11" },
    { s: "tryout", d: "14 Des 2026", dayNum: 76, t: "🔴 TRYOUT 12 (Ketahanan Fokus Full)", sub: ["Tryout Full Set SNBT", "Uji Ketahanan Fisik & Fokus Ujian Full"], m: "195 Soal Full Set" },
    { s: "tryout", d: "15 Des 2026", dayNum: 77, t: "Bedah Error Log TO 12", sub: ["Evaluasi Data Sufficiency & Serapan", "Pembaruan Loose Leaf Error Notebook"], m: "Bedah TO 12" },
    { s: "tryout", d: "18 Des 2026", dayNum: 80, t: "🔴 TRYOUT 13 (Penajaman Akurasi > 750)", sub: ["Tryout Full Set SNBT", "Target Skor Kumulatif > 750"], m: "195 Soal Full Set" },
    { s: "tryout", d: "19 Des 2026", dayNum: 81, t: "Bedah Error Log TO 13", sub: ["Evaluasi Complex PM & Logic PU", "Catat Strategi Final"], m: "Bedah TO 13" },
    { s: "tryout", d: "22 Des 2026", dayNum: 84, t: "🔴 TRYOUT 14 (Simulasi Puncak Target > 770)", sub: ["Tryout Full Set SNBT", "Pembuktian Target PK/PM/PU > 770"], m: "195 Soal Full Set" },
    { s: "tryout", d: "23 Des 2026", dayNum: 85, t: "Bedah Error Log TO 14", sub: ["Evaluasi Akhir Soal HOTS", "Penyempurnaan Binder B5 Rangkuman"], m: "Bedah TO 14" },
    { s: "tryout", d: "24 Des 2026", dayNum: 86, t: "Review Kertas Grid Formula Sheet PK & PM", sub: ["Active Recall Seluruh Rumus Matematika", "Membaca Ulang Ringkasan Loose Leaf"], m: "Review Formula Binder B5" },
    { s: "tryout", d: "25 Des 2026", dayNum: 87, t: "🔴 TRYOUT 15 (Grand Simulation Finale)", sub: ["Simulasi Ujian Akhir Penutup SNBT", "Evaluasi Mental & Strategi Akhir"], m: "195 Soal Full Set" },
    { s: "tryout", d: "26 Des 2026", dayNum: 88, t: "Bedah Error Log TO 15", sub: ["Analisis Kesiapan Mental & Waktu Ujian", "Refleksi Hasil Tryout 1 s.d 15"], m: "Bedah TO 15" },
    { s: "tryout", d: "27 Des 2026", dayNum: 89, t: "Review Kesalahan Terbanyak (Error Notebook)", sub: ["Membaca Ulang Seluruh Error Log TO 1-15", "Memastikan Tidak Mengulangi Salah Sama"], m: "Read Error Notebook" },
    { s: "tryout", d: "28 Des 2026", dayNum: 90, t: "Active Recall Rumus-Rumus Cepat Matematika", sub: ["Uji Ingatan Rumus Eksponen, Logaritma, Peluang", "Latihan Mental Hitung Cepat"], m: "Formula Memory Check" },
    { s: "tryout", d: "29 Des 2026", dayNum: 91, t: "Pemantapan Strategi & Time Management", sub: ["Review Urutan Pengerjaan Subtes", "Strategi Eliminasi Opsi Cepat"], m: "Time Strategy Review" },
    { s: "tryout", d: "30 Des 2026", dayNum: 92, t: "Rest, Relax & Evaluasi Total 3 Bulan", sub: ["Istirahat Cukup & Tidur Lelap", "Persiapan Mental SNBT & Apresiasi Diri"], m: "Evaluasi Total 3 Bulan" }
  ];

  function calculateGlobalAnalytics() {
    let totalHours = 0;
    let totalLatsol = 0;
    let countPaham = 0;
    let countReview = 0;
    let completedDays = 0;

    for (let i = 1; i <= 92; i++) {
      const id = `day_${i}`;
      const hrs = parseFloat(safeGet(`hrs_${id}`)) || 0;
      const lat = parseInt(safeGet(`lat_${id}`)) || 0;
      const st = safeGet(`st_${id}`) || 'belum';

      totalHours += hrs;
      totalLatsol += lat;

      if (st === 'paham') countPaham++;
      if (st === 'ulang' || st === 'evaluasi') countReview++;
      if (st !== 'belum') completedDays++;
    }

    const percentComplete = Math.round((completedDays / 92) * 100);

    const elHours = container.querySelector('#stat-hours');
    const elLatsol = container.querySelector('#stat-latsol');
    const elPaham = container.querySelector('#stat-paham');
    const elReview = container.querySelector('#stat-review');
    const elPercent = container.querySelector('#progress-percent');
    const elBar = container.querySelector('#progress-bar');

    if (elHours) elHours.innerText = `${totalHours} / 276 Jam`;
    if (elLatsol) elLatsol.innerText = `${totalLatsol} Soal`;
    if (elPaham) elPaham.innerText = `${countPaham} / 92 Hari`;
    if (elReview) elReview.innerText = `${countReview} Hari`;
    if (elPercent) elPercent.innerText = `${percentComplete}%`;
    if (elBar) elBar.style.width = `${percentComplete}%`;
  }

  function renderApp() {
    const accContainer = container.querySelector('#accordion-container');
    if (!accContainer) return;
    accContainer.innerHTML = '';

    subtestMeta.forEach((st) => {
      const items = syllabus.filter(x => x.s === st.code);
      const totalDays = items.length;
      
      let countPaham = 0;
      let totalLatsolSub = 0;
      let totalHoursSub = 0;

      items.forEach((item) => {
        const id = `day_${item.dayNum}`;
        const status = safeGet(`st_${id}`) || 'belum';
        const hrs = parseFloat(safeGet(`hrs_${id}`)) || 0;
        const lat = parseInt(safeGet(`lat_${id}`)) || 0;

        if (status === 'paham') countPaham++;
        totalHoursSub += hrs;
        totalLatsolSub += lat;
      });

      const percent = totalDays === 0 ? 0 : Math.round((countPaham / totalDays) * 100);

      let cardsHTML = '';
      items.forEach((item) => {
        const id = `day_${item.dayNum}`;
        const savedHours = safeGet(`hrs_${id}`);
        const savedLatsol = safeGet(`lat_${id}`);
        const savedStatus = safeGet(`st_${id}`) || 'belum';
        const savedNote = safeGet(`nt_${id}`);

        let subListHTML = '';
        if (item.sub && item.sub.length > 0) {
          subListHTML = `
            <div class="sub-bab-box">
              <strong>Rincian Sub-Bab Materi:</strong>
              <ul>${item.sub.map(s => `<li>${s}</li>`).join('')}</ul>
            </div>
          `;
        }

        cardsHTML += `
          <div class="day-card">
            <div class="day-card-top">
              <span class="day-badge">Hari ${item.dayNum} (${item.s.toUpperCase()})</span>
              <small style="color:var(--text-muted); font-size:10px;">${item.d}</small>
            </div>
            <strong style="font-size:13px; display:block; margin:4px 0 2px 0;">${item.t}</strong>
            <p style="font-size:11px; color:var(--text-muted); margin:0 0 4px 0;">Target: ${item.m}</p>

            ${subListHTML}

            <div class="grid-inputs">
              <div>
                <label>Realisasi Jam (Min 3h):</label>
                <input type="number" placeholder="Misal: 3" value="${savedHours}" onchange="window.updateSNBTData('hrs_${id}', this.value)">
              </div>
              <div>
                <label>Jumlah Latsol Dikerjakan:</label>
                <input type="number" placeholder="Misal: 20" value="${savedLatsol}" onchange="window.updateSNBTData('lat_${id}', this.value)">
              </div>
            </div>

            <div style="margin-top:6px;">
              <label>Status Pemahaman Hari Ini:</label>
              <select onchange="window.updateSNBTData('st_${id}', this.value)">
                <option value="belum" ${savedStatus==='belum'?'selected':''}>❌ Belum Selesai</option>
                <option value="paham" ${savedStatus==='paham'?'selected':''}>✅ Paham Sepenuhnya (>80% Benar)</option>
                <option value="ulang" ${savedStatus==='ulang'?'selected':''}>🔄 Perlu Diulang (Masih Ragu/Lambat)</option>
                <option value="evaluasi" ${savedStatus==='evaluasi'?'selected':''}>⚠️ Evaluasi Khusus (Banyak Salah)</option>
              </select>
            </div>

            <div style="margin-top:6px;">
              <input type="text" placeholder="Catatan evaluasi / nomor soal yang salah..." value="${savedNote}" onchange="window.updateSNBTData('nt_${id}', this.value)">
            </div>
          </div>
        `;
      });

      const accSection = document.createElement('div');
      accSection.className = 'accordion-section';
      accSection.innerHTML = `
        <div class="accordion-header" id="head-${st.code}" onclick="window.toggleSNBTAccordion('${st.code}')">
          <div class="accordion-title-group">
            <span class="accordion-title" style="color:${st.color};">${st.name}</span>
            <span class="accordion-target">${st.target} • ${totalDays} Modul Materi</span>
          </div>
          <div class="accordion-stats">
            <span class="accordion-percent">${percent}% Paham</span>
            <span class="accordion-icon" id="icon-${st.code}">▼</span>
          </div>
        </div>
        <div class="accordion-body" id="body-${st.code}">
          <div style="font-size:11px; color:var(--text-muted); margin-bottom:10px; padding:4px 0; border-bottom:1px solid var(--border);">
            📊 Akumulasi Subtes Ini: <strong>${totalHoursSub} Jam Belajar</strong> | <strong>${totalLatsolSub} Soal Dikerjakan</strong>
          </div>
          ${cardsHTML}
        </div>
      `;
      accContainer.appendChild(accSection);
    });

    calculateGlobalAnalytics();
  }

  // Global Binding
  window.toggleSNBTAccordion = function(code) {
    const body = container.querySelector(`#body-${code}`);
    const head = container.querySelector(`#head-${code}`);
    const icon = container.querySelector(`#icon-${code}`);
    if (!body) return;

    if (body.style.display === 'block') {
      body.style.display = 'none';
      head.classList.remove('active');
      if (icon) icon.innerText = '▼';
    } else {
      body.style.display = 'block';
      head.classList.add('active');
      if (icon) icon.innerText = '▲';
    }
  };

  window.updateSNBTData = function(key, val) {
    safeSet(key, val);
    renderApp();
  };

  renderApp();
})();
