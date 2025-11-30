
# 1. Ringkasan Produk

**Nama produk:** PharmaWise-AMR
**Bentuk:** Web app (responsive) + opsi PWA/mobile wrapper
**Tujuan utama:**

1. Membantu farmasis melakukan **review resep antibiotik secara cepat & berbasis data**.
2. Menstandarkan & mempersonalisasi **konseling pasien**.
3. Menyediakan kanal edukasi publik untuk menekan permintaan antibiotik tidak rasional.
4. Menghasilkan **surveilans komunitas** (dari apotek) untuk sinyal dini AMR & perilaku konsumsi.

**Value proposition:**
“Farmasis punya alat klinis setara decision-support, dan masyarakat punya edukasi yang mudah diakses serta dipercaya.”

---

# 2. Target Pengguna & Persona

## Persona A – Farmasis Apotek Komunitas

* Waktu terbatas, antrean panjang
* Sering mendapat resep antibiotik empiris tanpa info lengkap
* Menghadapi pasien “minta antibiotik buat flu”
* Butuh tool cepat, bukan sistem ribet

**Kebutuhan:** review resep kilat, skrip edukasi siap pakai, bukti ilmiah saat menolak antibiotik.

## Persona B – Farmasis RS / Tim AMS

* Lebih banyak data klinis
* Butuh dokumentasi stewardship & audit
* Tertarik antibiogram lokal dan tren resistensi

**Kebutuhan:** dashboard tren, laporan AMS, integrasi lab RS.

## Persona C – Masyarakat Umum

* Literasi antibiotik rendah
* Bingung bedanya bakteri vs virus
* Cenderung self-medication

**Kebutuhan:** chatbot sederhana, edukasi singkat, rekomendasi aman kapan perlu ke dokter.

## Persona D – Regulator/Organisasi Profesi

* Butuh data kebijakan
* Butuh alat pelatihan & sertifikasi

**Kebutuhan:** agregasi data permintaan/resistensi, modul micro-credential.

---

# 3. User Journey Inti

## 3.1 Farmasis melakukan Review Resep

1. Login → pilih **“Review Resep”**
2. Input cepat resep (scan OCR / manual):

   * diagnosis/keluhan singkat
   * antibiotik, dosis, durasi, rute
   * data pasien minimal (umur, BB, alergi)
3. AI menghitung **Appropriateness Score**
4. Sistem tampilkan:

   * skor 0–100 (hijau/kuning/merah)
   * alasan singkat
   * saran alternatif / koreksi
5. Farmasis klik:

   * “Setujui + Konseling”
   * “Perlu Klarifikasi ke Dokter”
   * “Tolak/Delay (tidak indikatif)”
6. Tersimpan sebagai log untuk audit AMS.

## 3.2 Farmasis memberi Konseling ke Pasien

1. Setelah review → klik **“Generate Konseling”**
2. Pilih format:

   * ringkas 20 detik
   * standar 60 detik
   * versi WhatsApp (teks)
3. AI menghasilkan skrip sesuai antibiotik & profil pasien
4. Farmasis bisa edit cepat → “Simpan & Kirim”

## 3.3 Publik pakai Chatbot

1. Buka halaman publik tanpa login
2. Pilih **“Tanya AMR”** atau **“Cek Gejala”**
3. Chatbot triage:

   * self-care vs rujuk vs darurat
4. Edukasi singkat + ajakan tidak minta antibiotik sembarangan
5. (Opsional) survei pemahaman 3 pertanyaan → data literasi agregat.

---

# 4. Modul Sistem & Fitur Detail

## Modul A — Prescription Review Assistant (AI-based)

**Tujuan:** menilai rasionalitas resep antibiotik.

### A1. Input data

* Manual form super cepat (dropdown)
* Upload foto resep → OCR → auto-fill
* Integrasi e-resep (API RS/apotek besar)

### A2. Output AI

1. **Appropriateness Score**

   * 0–39: Red (high-risk inappropriate)
   * 40–69: Yellow (needs clarification)
   * 70–100: Green (appropriate)
2. **Explainability Panel**

   * indikasi tidak sesuai guideline
   * spektrum terlalu luas
   * dosis/durasi tidak tepat
   * kontraindikasi/alergi/interaksi
3. **Suggested Action**

   * de-escalation
   * line-1 alternative
   * “rujuk kultur dulu”
   * “no antibiotic needed”

### A3. Guardrails

* AI tidak boleh memberi antibiotik baru tanpa basis guideline (rule-based filter)
* Semua rekomendasi wajib punya referensi guideline internal.

---

## Modul B — Counseling Script Generator (LLM-guided)

**Tujuan:** skrip konseling konsisten, cepat, personal.

### B1. Template inti

* tujuan obat
* cara minum
* durasi & larangan stop
* efek samping umum
* red flags
* tips patuh minum

### B2. Personalisasi AI

Parameter:

* usia (anak/dewasa/lansia)
* kehamilan
* penyakit penyerta
* tingkat literasi (dipilih farmasis)
* preferensi bahasa (Indonesia/Jawa/Sunda/Inggris sederhana)

**Output format:**

* Script verbal
* Leaflet PDF 1 halaman
* Pesan WA siap kirim

---

## Modul C — Public AMR Chatbot & Symptom Triage

**Tujuan:** menurunkan permintaan antibiotik salah.

### C1. Mode “Cek Gejala”

* input gejala + durasi + red flags
* AI klasifikasi aman:

  * viral/self-limiting → edukasi & self-care
  * perlu dokter → rujuk
  * darurat → saran IGD

### C2. Mode “Tanya Antibiotik”

* FAQ dinamis
* contoh kasus populer (flu, diare, sakit gigi)

### C3. Safety rules

* tidak memberi nama antibiotik untuk dibeli sendiri
* tidak memberi diagnosis final
* selalu ada tombol “Cari fasilitas kesehatan terdekat” (link eksternal).

---

## Modul D — Campaign Toolkit untuk Apotek

**Tujuan:** memudahkan edukasi rutin.

Isi toolkit:

* poster A4/A3
* template IG carousel
* video pendek 30 detik
* “kalimat penolakan antibiotik yang empatik”
* kalender kampanye musiman (ISPA vs diare vs luka)

AI tambahan:

* **Campaign Recommender** → menyarankan konten sesuai tren demand lokal.

---

## Modul E — Inappropriate Demand Reporting + Prediction

**Tujuan:** mengukur tekanan permintaan publik.

### E1. Laporan cepat farmasis

* “pasien minta antibiotik tanpa resep”
* kategori penyakit (flu/diare/nyeri gigi/jerawat)
* antibiotik diminta
* wilayah & tanggal

### E2. Demand Prediction Engine

* model time-series / gradient boosting
* output:

  * pressure index per wilayah
  * prediksi permintaan 4–8 minggu ke depan
  * rekomendasi intervensi edukasi

---

## Modul F — AMR Early Warning dari Apotek

**Tujuan:** sinyal dini resistensi berbasis kegagalan terapi.

Input:

* pasien kembali karena tidak membaik setelah antibiotik X
* durasi pemakaian
* keluhan singkat

AI:

* deteksi klaster kegagalan terapi (spatial-temporal clustering)
  Output:
* alert “kemungkinan resistensi naik” untuk wilayah tertentu
* notifikasi ke farmasis + dinas (agregat, anonim).

---

## Modul G — Micro-Credential AMS berbasis AI

**Tujuan:** peningkatan kapasitas farmasis.

Fitur:

* pretest singkat → AI buat learning path
* modul microlearning 5–7 menit
* studi kasus apotek nyata
* posttest → sertifikat digital

---

# 5. Data Model (Simplified)

**Tabel utama:**

1. **Users**

   * user_id, role (community/RS/regulator), lokasi, organisasi
2. **Prescriptions**

   * rx_id, user_id, patient_age, weight, diagnosis_text, drug_list, dose, duration, route, date
3. **ReviewResults**

   * rx_id, score, risk_level, reasons[], suggested_actions[], final_decision
4. **CounselingOutputs**

   * rx_id, script_text, format, edited_by_user (bool)
5. **DemandReports**

   * report_id, user_id, category, drug_requested, location, date
6. **TherapyFailureReports**

   * fail_id, rx_id, region, symptoms, date
7. **LearningRecords**

   * user_id, module_id, score_pre, score_post, certificate_url
8. **LocalResistanceData (optional integration)**

   * region, pathogen, antibiotic, resistance_rate, last_updated

---

# 6. AI/ML Architecture Detail

## 6.1 Model 1 — Appropriateness Classifier

**Input features:**

* embedding diagnosis_text (NLP)
* antibiotik, dosis, durasi, rute
* umur, BB, alergi, komorbid
* tren resistensi lokal (jika ada)

**Output:** probability inappropriate + score 0–100
**Model candidate:** XGBoost/LightGBM + IndoBERT embedding.

**Training data:**

* dataset resep historis berlabel (appropriate/inappropriate)
* label dari panel farmasis AMS (gold standard)

**Explainability:** SHAP/top reason list.

---

## 6.2 Model 2 — Counseling LLM (Template-guided)

* LLM kecil/fine-tune + guardrails.
* Output wajib melewati “Guideline Filter”

  * jika ada kalimat di luar guideline → dipotong & diganti template aman.

---

## 6.3 Model 3 — Symptom Triage

* kombinasi rule-based klinis + classifier NLP.
* rule-based menangani red-flags (demam tinggi >3 hari, sesak, BAB berdarah, dll).

---

## 6.4 Model 4 — Demand Prediction

* fitur: laporan demand, musiman, lokasi, data penyakit musiman (opsional).
* model: Prophet / LSTM ringan / XGBoost time features.

---

## 6.5 Model 5 — Early Warning Clustering

* DBSCAN / Kulldorff scan statistics
* mendeteksi klaster kegagalan terapi.

---

# 7. UI/UX Rancangan Halaman

## 7.1 Halaman Farmasis

**Sidebar:** Dashboard | Review Resep | Konseling | Report Demand | Early Warning | Learning | Settings

### Dashboard

* kartu ringkas:

  * #review hari ini
  * % inappropriate flagged
  * demand index wilayah
* grafik tren bulanan

### Review Resep

* input 2 kolom (kiri resep, kanan hasil AI)
* tombol action besar (Setujui / Klarifikasi / Tolak)

### Konseling

* dropdown antibiotik (auto dari resep)
* pilihan format → output realtime
* tombol “Copy”, “Download PDF”, “Send WA”

### Report Demand

* form 20 detik + quick categories

### Early Warning

* peta mini + list alert terakhir

### Learning

* progress bar + rekomendasi modul

---

## 7.2 Halaman Publik

**Top nav:** Cek Gejala | Tanya Antibiotik | Fakta AMR | Materi Kampanye | Cari Apotek

* desain “bahasa awam, 1 layar = 1 ide”
* chatbot floating kecil

---

# 8. Tech Stack (rekomendasi realistis)

**Frontend:**

* Next.js / React, TailwindCSS, PWA support
* i18n (multi bahasa lokal)

**AI/ML:**

* Python pipelines (scikit-learn, PyTorch)
* Model serving via FastAPI / TorchServe
* Monitoring model drift (EvidentlyAI)

**Integrasi eksternal:**

* API e-resep RS
* API antibiogram lokal (jika tersedia)
* WhatsApp share deep link

---

# 9. Privasi, Etik, dan Keamanan

1. **Anonimisasi otomatis**

   * tidak menyimpan nama/ID pasien
2. **Role-based access**

   * farmasis hanya lihat datanya, regulator hanya agregat
3. **Audit trail**

   * siapa review apa, kapan, keputusan akhir
4. **AI transparency**

   * selalu tampilkan alasan skor
5. **Consent & Terms jelas**

   * pop-up wajib sebelum input data klinis

---

# 10. Evaluasi Keberhasilan (Metrics)

## Klinis

* % resep antibiotik inappropriate turun
* durasi rata-rata antibiotik menurun ke guideline
* frekuensi de-escalation meningkat

## Perilaku Publik

* demand index turun musiman
* engagement chatbot + quiz literasi naik

## Sistem

* waktu review rata-rata < 45 detik/resep
* akurasi classifier > 85% F1
* model drift < threshold bulanan

---

# 11. Roadmap Implementasi

## Phase 0 – Riset & Dataset (1–2 bulan)

* kumpulkan guideline nasional
* kumpulkan 5–10 ribu resep berlabel
* desain UI awal

## Phase 1 – MVP (3 bulan)

Fokus fitur yang paling “kerasa”:

1. Review Resep (rule-based dulu + skor sederhana)
2. Counseling Script Generator (template)
3. Chatbot publik FAQ
4. Log & dashboard basic

## Phase 2 – AI Enhanced (3–4 bulan)

1. Appropriateness ML classifier v1
2. Chatbot triage ML + rules
3. Demand report + prediction v1

## Phase 3 – One Health Linkage (lanjutan)

1. Early warning clustering
2. Integrasi antibiogram RS/daerah
3. Micro-credential AI

---

# 12. Risiko & Mitigasi

1. **Data resep tidak lengkap**

   * buat input “minimal viable” + opsi “unknown”
2. **AI dianggap menggantikan dokter**

   * tonjolkan “assistive tool”, bukan diagnosis
3. **Bias model (wilayah tertentu dominan)**

   * stratified sampling + evaluasi per wilayah
4. **Farmasis malas input**

   * OCR resep + default fields + waktu input super singkat

--


KOMPONEN TAMBAHAN:
Ramses (atau ramses-package)
>>>Paket software untuk rumah sakit: data warehousing & analisis penggunaan antimikroba, konsumsi, inisiasi & de-escalation, manajemen infeksi. Mendukung data rekam medis elektronik — admission, resep, administrasi obat, mikrobiologi, hasil lab, dll.

>>>— Cocok jika kamu ingin fitur “kaji ulang/pantau penggunaan antibiotik & pola konsumsi” di RS/apotek besar.
— Bisa jadi kerangka backend data + analitik sebelum kamu tambah layer AI / UI web.
— Tapi status “WIP / pengembangan awal” — perlu evaluasi stabilitas jika dipakai produksi.


KOMPONEN TAMBAHAN:
AMR (R package)
>>>Paket R open-source untuk analisis & prediksi AMR: interpretasi data mikrobiologi, resistensi, klasifikasi/analisis mikroba & antimikroba. Dukung data dari banyak format termasuk WHONET

>>>— Sangat berguna jika kamu perlu modul analitik resistensi — misalnya untuk bagian “local antibiogram / tren resistensi” di PharmaWise-AMR.
— Bisa dipakai untuk analisis data lab, integrasi data mikrobiologi — kemudian hasil dipresentasikan dalam UI web.
— Karena gratis dan tanpa dependensi berat → bagus untuk resource terbatas.

KOMPONEN TAMBAHAN:
clinicalml/amr‑uti‑stm (GitHub)
>>>Source code untuk algoritma keputusan stewardship ambulatori — khusus untuk infeksi saluran kemih (UTI) sederhana. Studi ini mempromosikan AMS luar rumah sakit.

>>>— Menunjukkan contoh spesifik: stewardship untuk penyakit umum/komunitas.
— Bisa kamu adaptasi ide “decision algorithm + rekomendasi” untuk apotek / dokter umum / chatbot.
— Karena sudah di GitHub & MIT licensed → bisa di-fork & modifikasi untuk kebutuhan lokal.

KOMPONEN TAMBAHAN:
AMRgen (R package)
>>>Paket open-source untuk menjembatani data genotip dan fenotip resistensi — interpretasi genetik & phenotypic AMR data, integrasi data mikrobiologi & genetik.

>>>— Kalau kamu berniat mengembangkan sistem surveilans resistensi lebih mendalam (misalnya berbasis data genetik atau lab mikrobiologi), paket ini bisa jadi basis analitik lanjutan.
— Kombinasi data fenotip & genotip memungkinkan analisis resistensi lebih menyeluruh — nilai tambah untuk aspek “scientific & epidemiologis” dari PharmaWise-AMR.


🔍 Kenapa Proyek-proyek Ini Relevan & Apa yang Kurang jika Diadaptasi

Banyak proyek di atas adalah open-source → sangat cocok untuk dikustomisasi.

Mereka sudah menangani aspek penting: data obat/resistensi, analitik penggunaan antibiotik, representasi data mikrobiologi, visualisasi — ini bagian dari fondasi yang kamu butuhkan.

Namun, sebagian besar:

Fokus pada setting rumah sakit / klinik besar, bukan apotek komunitas atau pelayanan publik.

Belum punya modul interaksi dengan pengguna (UI/UX modern, web/mobile, chatbot).

Belum terintegrasi dengan AI decision-support, triage, edukasi pasien/publik — bagian yang ingin kamu tambahkan.

Jadi idealnya kamu gabungkan / extend komponen-komponen dari proyek di atas + tambahan fitur AI & UI sesuai kebutuhan PharmaWise-AMR.

🎯 Rekomendasi: Proyek mana untuk di-fork dan digunakan sebagai pondasi

Jika aku kamu, untuk memulai prototipe cepat:

Gunakan RadaR atau Ramses sebagai backend analitik + data engine — untuk menyimpan & memproses data penggunaan antibiotik, resistensi, hasil lab.

Gunakan paket AMR (R) untuk analisis data mikrobiologi / resistensi + antibiogram — sangat berguna jika kamu ingin dashboard “tren resistensi lokal / nasional”.

Fork clinicalml/amr-uti-stm untuk logika decision algorithm — adaptasikan ke antibiotik umum/populer di apotek atau untuk infeksi komunitas; bisa jadi basis “Prescribing Review Assistant”.

Pada layer frontend/web: bangun web app kamu sendiri (React/Vue/Next.js/dsb), lalu hubungkan backend (R + API) + modul AI/ML yang kamu kembangkan.

Dengan cara ini, kamu meminimalkan “starting from zero” dan menghemat waktu sekaligus memanfaatkan komunitas riset/opensource global.

🧠 Ide Integrasi & Pengembangan Tambahan (gabungkan dengan proyek di atas)

Backend data + analitik dari RadaR/Ramses/AMR → menghasilkan dashboard & laporan otomatis.

Tambahkan modul AI — decision support, triage chatbot — sebagai layer tambahan di atas backend tersebut.

Buat antarmuka web responsif + modul frontend untuk apotek/masyarakat.

Sediakan API agar data bisa di-import dari e-resep, sistem apotek, RS, laboratorium mikrobiologi.

Buat sistem anonymization + governance data agar aman untuk publik / regulasi.

📥 Link & Akses Proyek Sekilas

RadaR — open-source infection management & AMS (R + Shiny) 
ResearchGate

Ramses (ramses-package) — analitik antimikroba & infection management dari data e-health records 
GitHub

AMR (R package) — analisis & prediksi resistensi, interpretasi data mikrobiologi/antimikroba 
GitHub

clinicalml/amr-uti-stm — decision algorithm untuk stewardship luar RS (UTI) 
GitHub

AMRgen — paket untuk integrasi data genotip & fenotip resistensi 
GitHub

⚠️ Hal yang Perlu Diperhatikan (Sebelum Menggunakan Proyek Open-Source)

Lisensi: meskipun open source, pastikan kompatibilitas lisensi jika kamu modifikasi & distribusikan. Paket seperti AMR memakai GPL-2.0. 
GitHub

Validitas data & konteks lokal: proyek-proyek tersebut dikembangkan di negara/wilayah dengan sistem kesehatan & pola antibiotik tertentu — perlu adaptasi guideline, data lokal (resistensi, populasi, epidemiologi).

Privasi & regulasi: data pasien/apotek harus di-anonimisasi dengan benar jika ingin diterapkan di skala nyata.

Stabilitas & maintenance: beberapa proyek (misalnya Ramses) masih WIP — butuh pengecekan kompatibilitas, dependensi, dan pengujian ulang sebelum dipakai di produksi.

✅ Kesimpulan — Layakkah Dipakai & Dimodifikasi?

Ya — proyek-proyek tersebut sangat layak dijadikan pondasi untuk ide PharmaWise-AMR. Mereka menyediakan bagian kritis: analisis data konsumsi & resistensi, surveillance, dokumentasi, dan logistik data mikrobiologi. Namun untuk mencapai visi kamu (termasuk fitur AI, chatbot, UI apotek/masyarakat, triage/prescribing decision, edukasi publik), kamu tetap perlu mengembangkan ekstensi besar: baik di frontend, backend logic, maupun modul AI/ML.

Tetapi dengan basis open-source, kamu bisa menghemat banyak waktu & tenaga, serta mendapatkan benefit komunitas — daripada membangun semuanya dari nol.

Apa itu PharmaWise-AMR

PharmaWise-AMR adalah konsep web-app / platform digital berbasis data dan (opsional) AI/ML, yang dirancang sebagai alat kolaboratif bagi apoteker / farmasis, tenaga kesehatan, dan masyarakat umum untuk mendukung penggunaan antimikroba (termasuk antibiotik) yang lebih bijak, serta sebagai instrumen edukasi, pengawasan, dan pencegahan resistensi antimikroba (AMR).

Secara ringkas, PharmaWise-AMR berperan sebagai “Antimicrobial Stewardship Portal & Public Education Hub”, dimana farmasis tidak hanya sebagai dispenser obat — tetapi sebagai pengendali (steward) penggunaan antibiotik & agen antimikroba, sekaligus menjadi gerbang edukasi terhadap pasien dan publik.

📚 Latar Belakang — Mengapa Dibutuhkan

Antimicrobial Resistance (AMR) terjadi ketika mikroorganisme (bakteri, virus, jamur, parasit) berkembang sehingga obat antimikroba tidak lagi efektif. Ini akibat dari penggunaan antimikroba yang tidak tepat — misalnya dosis salah, durasi tidak benar, penggunaan empiris tanpa indikasi jelas, atau injeksi ke hewan/peternakan serta lingkungan. 
Wikipedia
+2
bbvetwates.ditjenpkh.pertanian.go.id
+2

Karena AMR mengancam efektivitas pengobatan infeksi serta kesehatan populasi — termasuk manusia, hewan, dan lingkungan — banyak upaya global/nasional menekankan pentingnya strategi pengendalian, salah satunya Antimicrobial Stewardship (AMS). AMS bertujuan mengoptimalkan penggunaan antimikroba: memilih agen yang tepat, dosis, durasi, dan rute, agar hasil klinis baik sekaligus meminimalkan dampak resistensi. 
NCBI
+2
Wikipedia
+2

Peran apoteker/farmasis dalam AMS sangat krusial — mereka memiliki keahlian farmakoterapi, memahami obat, interaksi, dosis, dan potensi risiko, serta dapat memberi edukasi kepada pasien. Dalam implementasi AMS, farmasis kerap terlibat dalam review resep, audit konsumsi, konseling, dan edukasi komunitas. 
Safety and Quality Commission
+2
ejournal.bintangpersada.ac.id
+2

Namun, di banyak tempat — terutama di komunitas/apotek skala kecil — implementasi AMS kurang optimal: sumber daya terbatas, data penyebaran resistensi tidak tersedia, edukasi masyarakat rendah, dan praktik obat bisa tidak bijak. Inilah gap yang ingin ditutup oleh PharmaWise-AMR.

🧩 Ruang Lingkup & Fungsi PharmaWise-AMR

PharmaWise-AMR dirancang mencakup beberapa fungsi/kawasan utama:

Decision support untuk farmasis: membantu farmasis mengevaluasi resep antibiotik — apakah sudah sesuai indikasi, dosis, durasi — sehingga bisa menolak atau mengoreksi resep yang berisiko AMR.

Edukasi & konseling pasien/masyarakat: menyediakan skrip konseling yang tepat, materi edukasi sederhana untuk publik tentang bahaya penyalahgunaan antibiotik, dan informasi kapan antibiotik diperlukan (vs ketika tidak).

Surveilans & data use tracking: mencatat penggunaan antibiotik di apotek (dan bisa RS), melacak tren permintaan, mendeteksi pola “overuse” atau penyalahgunaan, sehingga bisa memetakan risiko AMR di komunitas.

Platform kolaborasi & transparansi: memungkinkan data, pengetahuan, dan praktik baik dishare antar farmasis, tenaga kesehatan, regulator, sehingga mendorong stewardship kolektif dan tanggung jawab bersama.

Edukasi & peningkatan kapasitas farmasis (stewardship capacity building): menyediakan modul pelatihan, panduan, referensi, dan alat bantu bagi farmasis agar mampu berperan aktif dalam mengendalikan AMR.

Dengan demikian, PharmaWise-AMR bukan sekadar “web edukasi” atau “apotek online” — melainkan sistem terpadu stewardship & masyarakat untuk menjaga efikasi antimikroba sekarang dan masa depan.

✅ Keunggulan & Potensi Dampak

Implementasi PharmaWise-AMR bisa membawa banyak manfaat:

Membantu farmasis membuat keputusan lebih rasional — bukan sekadar “menjual obat”, tapi sebagai penjaga kualitas terapi.

Mengurangi penggunaan antibiotik yang tidak perlu → menurunkan tekanan seleksi resistensi mikroba.

Meningkatkan literasi masyarakat tentang AMR, sehingga permintaan antibiotik tanpa indikasi turun.

Membangun data dan surveilans komunitas yang sebelumnya sulit didapat — memungkinkan deteksi dini tren resistensi atau penyalahgunaan obat.

Mendorong kolaborasi lintas sektor (kesehatan, masyarakat, regulasi) — penting dalam pendekatan One Health terhadap AMR.

🔧 Kesimpulan: Pengertian Singkat

PharmaWise-AMR adalah platform digital inovatif yang memadukan klinik, farmasi, edukasi, data & komunitas untuk menjalankan stewardship antimikroba secara nyata — menjadikan farmasis sebagai aktor kunci dalam upaya menekan AMR, serta memberdayakan masyarakat agar menggunakan antibiotik secara bertanggung jawab. 
