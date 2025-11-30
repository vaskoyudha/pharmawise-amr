PHARMAWISE-AMR: INOVASI WEB APP BERBASIS MACHINE LEARNING BAGI FARMASIS UNTUK REVIEW RESEP, EDUKASI PUBLIK, DAN PENGUATAN ANTIMICROBIAL STEWARDSHIP (AMS) DALAM PENGENDALIAN PENGGUNAAN ANTIBIOTIK DAN RESISTENSI ANTIMIKROBA DI KOMUNITAS 
SUB TEMA:Peran Farmasis dalam Pelayanan Obat dan Masyarakat untuk Mengurangi Resistensi Antimikroba.






Disusun Oleh: 
Vasco Yudha Nodyatama Sera (2404130013)


UNIVERSITAS NEGERI SEMARANG
KOTA SEMARANG
TAHUN 2025

Pendahuluan
Resistensi antimikroba (antimicrobial resistance/AMR) diakui sebagai salah satu ancaman kesehatan global terbesar abad ke-21. Tanpa intervensi efektif, AMR diperkirakan dapat menyebabkan hingga 10 juta kematian per tahun pada 2050 dan menimbulkan beban ekonomi yang besar bagi sistem kesehatan dunia (O’Neill, 2016). WHO bahkan memasukkan AMR ke dalam daftar sepuluh ancaman utama bagi kesehatan global (World Health Organization, 2019).
Salah satu pendorong utama AMR adalah penggunaan antibiotik yang tidak rasional: pemberian pada indikasi yang tidak tepat, dosis dan durasi yang keliru, serta pembelian antibiotik tanpa resep di komunitas. Konsumsi antibiotik meningkat drastis dalam dua dekade terakhir terutama di negara berkembang, seiring mudahnya akses obat dan rendahnya literasi masyarakat (Pfizer Indonesia, 2021; World Health Organization, 2019). Pasien sering menganggap antibiotik “obat ampuh segala penyakit”, melakukan swamedikasi, atau menghentikan terapi saat merasa membaik—perilaku yang mempercepat seleksi bakteri resisten.
Untuk menjawab masalah ini, diterapkan antimicrobial stewardship (AMS), yaitu upaya memastikan penggunaan antimikroba yang tepat obat, tepat dosis, tepat durasi, dan tepat pasien (O’Neill, 2016; Pfizer Indonesia, 2021). Di Indonesia, AMS sudah berjalan melalui Program Pengendalian Resistensi Antimikroba (PPRA), namun pelaksanaannya di komunitas masih lemah padahal sebagian besar antibiotik digunakan di apotek. 
AMR merupakan isu One Health: bakteri resisten dapat menyebar melalui manusia, hewan, pangan, dan lingkungan, sehingga penanganannya membutuhkan pendekatan lintas sektor (Kementerian Kesehatan Republik Indonesia, 2022). Teknologi kecerdasan buatan (AI) dan machine learning (ML) membuka peluang besar memperkuat AMS. Studi menunjukkan CDSS berbasis AI dapat meningkatkan ketepatan terapi antibiotik dan menurunkan antibiotic mismatch secara signifikan (Shapiro Ben David et al., 2025; Miranda-Barros et al., 2025; Pennisi et al., 2025). Berangkat dari permasalahan tersebut, esai ini menawarkan gagasan PharmaWise-AMR, sebuah web app berbasis ML yang mendukung peran farmasis dalam review resep, edukasi publik, dan surveilans AMR di komunitas dengan fondasi One Health.
Peran Farmasis dalam AMS dan Tantangan yang Dihadapi
Farmasis memiliki kompetensi mendalam terkait farmakologi, keamanan obat, dosis, interaksi, serta prinsip terapi rasional. Dalam AMS, farmasis berperan sebagai mitra dokter dalam memastikan antibiotik digunakan tepat indikasi (Pfizer Indonesia, 2021). Di apotek komunitas, farmasis menjadi garda terdepan yang menghadapi permintaan antibiotik dengan resep maupun tanpa resep. Namun, peran kunci ini terkendala oleh waktu pelayanan yang terbatas, akses pedoman dan data resistensi yang tidak selalu tersedia, tekanan pasien untuk memberikan antibiotik, tidak adanya dokumentasi sistematis penggunaan antibiotik.
Inovasi digital diperlukan untuk membantu farmasis mengambil keputusan cepat dan akurat, sekaligus menghasilkan data berharga untuk pengendalian AMR. PharmaWise-AMR hadir sebagai solusi. Model ML yang dilatih menggunakan data resep berlabel (tepat/tidak tepat) dan, jika tersedia, pola resistensi lokal akan menghasilkan skor kewajaran resep (appropriateness score) dalam rentang 0–100. Skor ini dibagi menjadi, Hijau (70–100): kemungkinan besar sesuai pedoman, Kuning (40–69): perlu kehati-hatian/klarifikasi, dan Merah (0–39): berisiko tidak tepat
Selain skor, sistem menampilkan alasan utama (misalnya indikasi tidak sesuai pedoman, spektrum terlalu luas, durasi terlalu pendek/panjang, potensi interaksi, atau risiko alergi) dan, bila relevan, menyarankan alternatif yang lebih rasional berdasarkan pedoman AMS. Studi pada alat CDSS berbasis AI untuk infeksi saluran kemih menunjukkan bahwa ketika rekomendasi AI diikuti, angka ketidaksesuaian antibiotik dengan patogen penyebab (antibiotic mismatch) dapat menurun signifikan dan penggunaan antibiotik spektrum luas seperti siprofloksasin dapat turun hingga 80% (Shapiro Ben David et al., 2025). Temuan ini menjadi dasar bahwa ML dapat diadaptasi untuk membantu farmasis menilai rasionalitas resep di komunitas.

Konsep Inovasi PharmaWise-AMR
1. Review Resep Antibiotik Berbasis Machine Learning
Farmasis dapat memasukkan data resep secara manual atau melalui OCR. Model ML yang dilatih menggunakan resep berlabel dan pola resistensi lokal menghasilkan appropriateness score 0–100 yang menunjukkan tingkat kesesuaian resep dengan pedoman AMS. Sistem juga menampilkan alasan—indikasi tidak sesuai, dosis salah, spektrum terlalu luas, risiko alergi, atau interaksi obat—serta alternatif terapi. Studi Shapiro Ben David et al. (2025) menunjukkan CDSS berbasis AI dapat menurunkan antibiotic mismatch dan penggunaan antibiotik spektrum luas hingga 80%. Ini membuktikan bahwa model serupa sangat relevan diterapkan di komunitas melalui peran farmasis.
2. Edukasi Publik dan Konseling Terstandar
Fitur Generate Konseling menyediakan skrip konseling lisan, leaflet cetak, dan teks WhatsApp berdasarkan profil pasien. Edukasi publik diperkuat melalui infografis antibiotik, FAQ, dan chatbot Tanya Antibiotik/Cek Gejala yang dirancang safety-by-design. Program edukasi ini mendukung upaya peningkatan literasi antibiotik yang telah ditekankan dalam kampanye nasional (Pfizer Indonesia, 2021).
3. Penguatan AMS & Surveilans Komunitas Berbasis One Health
Setiap review resep, permintaan antibiotik tanpa resep, dan laporan kegagalan terapi akan direkam secara teranonimisasi sehingga menghasilkan gambaran pola penggunaan antibiotik di komunitas, termasuk jenis antibiotik yang paling sering diresepkan dan tren permintaan yang tidak rasional. Laporan kegagalan terapi dapat dianalisis menggunakan klaster spasial-temporal untuk mendeteksi sinyal awal peningkatan resistensi, sejalan dengan konsep AI-driven surveillance dalam pemantauan AMR (Pennisi et al., 2025). Data agregat PharmaWise-AMR dapat dibagikan kepada dinas kesehatan dan komite AMR untuk memperkuat pengambilan keputusan. Ke depan, integrasi dengan data hewan dan lingkungan memungkinkan sistem ini berkontribusi pada surveilans AMR yang lebih komprehensif dalam kerangka One Health (Kementerian Kesehatan Republik Indonesia, 2022).
Integrasi Machine Learning melalui Paket Open-Source
Pengembangan PharmaWise-AMR didukung oleh pemanfaatan berbagai paket open-source yang telah digunakan secara luas dalam antimicrobial stewardship (AMS). Paket Ramses menyediakan fondasi analitik rumah sakit melalui pemrosesan data rekam medis dan penggunaan antimikroba, sehingga dapat menjadi kerangka backend penyimpanan data dan analitik (Dutey-Magni & Shallcross, 2024). Paket AMR memudahkan analisis resistensi mikroba dan pembuatan antibiogram otomatis, sehingga sangat relevan untuk modul dashboard pola resistensi (Berends & Hogerwerf, 2022). Repositori amr-uti-stm menawarkan algoritma ML untuk outpatient stewardship pada infeksi saluran kemih sederhana yang dapat diadaptasi sebagai logika dasar modul decision algorithm dalam aplikasi (Clinical Machine Learning Group, 2020). Selain itu, paket AMRgen menyediakan kemampuan integrasi data genotip dan fenotip untuk analisis resistensi tingkat lanjut (AMRverse Team, 2024). Integrasi paket-paket tersebut memungkinkan pengembangan PharmaWise-AMR dilakukan lebih efisien, akurat, dan sesuai semangat open science.
Dampak dan Kontribusi terhadap Ketahanan Kesehatan Nasional
Apabila dikembangkan dan diimplementasikan dengan baik, PharmaWise-AMR berpotensi membawa beberapa dampak penting. Pertama, meningkatkan rasionalitas penggunaan antibiotik di komunitas. Review resep berbasis ML membantu farmasis mengidentifikasi dan memperbaiki resep yang berisiko tidak tepat. Hal ini sejalan dengan temuan bahwa CDSS dapat meningkatkan kepatuhan terhadap pedoman terapi antibiotik dan mengurangi kesalahan preskripsi (Miranda-Barros et al., 2025). Kedua, meningkatkan literasi antibiotik masyarakat. Konseling yang terstandar dan modul edukasi publik akan membuat pasien memahami kapan antibiotik diperlukan, mengapa obat harus dihabiskan, serta bahaya penggunaan sembarangan. Dengan demikian, tekanan dari pasien kepada tenaga kesehatan untuk meresepkan antibiotik “sekadar jaga-jaga” diharapkan menurun (Pfizer Indonesia, 2021).Ketiga, menghasilkan data surveilans komunitas yang selama ini hilang. Pola penggunaan antibiotik di apotek yang sebelumnya tidak terdokumentasi dapat dicatat dan dianalisis secara sistematis. Data ini memperkaya sistem surveilans AMR nasional dan menjadi dasar penyusunan kebijakan berbasis bukti (Kementerian Kesehatan Republik Indonesia, 2022; Pennisi et al., 2025).
Keempat, menguatkan peran farmasis dalam AMS dan pendekatan One Health. Dengan dukungan teknologi, farmasis dapat lebih percaya diri menjalankan fungsi stewardship, tidak hanya sebagai penyerah obat, tetapi sebagai mitra strategis dalam upaya lintas sektor yang mencakup kesehatan manusia, hewan, dan lingkungan. Secara jangka panjang, kombinasi penggunaan antibiotik yang lebih rasional, peningkatan literasi publik, dan sistem surveilans yang kuat akan berkontribusi pada ketahanan kesehatan nasional. Indonesia akan lebih siap menghadapi “pandemi senyap” AMR, sekaligus mendukung agenda global pengendalian resistensi antimikroba dalam kerangka One Health (O’Neill, 2016; Kementerian Kesehatan Republik Indonesia, 2022; Pennisi et al., 2025).
Kesimpulan
PharmaWise-AMR merupakan gagasan inovatif yang menggabungkan kekuatan machine learning, keahlian farmasi, dan pendekatan One Health untuk menanggulangi resistensi antimikroba di lini komunitas. Melalui fitur review resep cerdas, edukasi publik yang mudah dipahami, integrasi paket open-source seperti Ramses, AMR, amr-uti-stm, dan AMRgen, serta dukungan terhadap AMS dan surveilans komunitas, platform ini menempatkan farmasis sebagai aktor kunci dalam upaya nasional melawan AMR. Dengan dukungan pemangku kepentingan, mulai dari institusi pendidikan, organisasi profesi, pemerintah, hingga sektor swasta. PharmaWise-AMR dapat menjadi contoh konkret bagaimana generasi muda lintas disiplin (kesehatan, farmasi, teknologi) menghadirkan solusi yang segar, kritis, dan berbasis bukti untuk memperkuat ketahanan kesehatan Indonesia di masa depan.
Daftar Pustaka
O’Neill, J. (2016). Tackling drug-resistant infections globally: Final report and recommendations. The Review on Antimicrobial Resistance. https://amr-review.org/sites/default/files/160518_Final%20paper_with%20cover.pdf

World Health Organization. (2019). Ten threats to global health in 2019. https://www.who.int/news-room/spotlight/ten-threats-to-global-health-in-2019

Pfizer Indonesia. (2021, June 10). Kemitraan sektor swasta dan peran masyarakat dalam mempromosikan penggunaan antibiotik secara rasional dan tuntas. https://www.pfizer.co.id/news/kemitraan-sektor-swasta-dan-peran-masyarakat-diperlukan-dalam-mempromosikan-penggunaan-antibiotik-secara-rasional-dan-tuntas

Kementerian Kesehatan Republik Indonesia. (2022, October 28). Pendekatan One Health atasi ancaman AMR. https://kemkes.go.id/id/41451

Shapiro Ben David, S., Romano, R., Rahamim-Cohen, D., Azuri, J., Greenfeld, S., Gedassi, B., & Lerner, U. (2025). AI-driven decision support reduces antibiotic mismatches and inappropriate use in outpatient urinary tract infections. npj Digital Medicine. https://www.nature.com/articles/s41746-024-01400-5

Miranda-Barros, A., Pilco, G., & Guaman, D. (2025). Electronic clinical decision support tools in antibiotic prescribing: A systematic review. Pharmacy Practice. https://www.pharmacypractice.org/index.php/pp/article/view/3182

Pennisi, F., Pinto, F., Crispino, F., Di Gennaro, F., & others. (2025). The role of artificial intelligence and machine learning models in antimicrobial stewardship in public health: A narrative review. Antibiotics. https://www.mdpi.com/2079-6382/14/2/134

Lampiran 1
Surat Pernyataan Orisinalitas Karya
Saya yang bertanda tangan dibawah ini:  
Nama			: Vasco Yudha Nodyatama Sera
Instansi Asal 		: Universitas Negeri Semarang
Nomor telepon		: 083106576510


Menyatakan dengan sesungguhnya bahwa essay yang saya ajukan dalam lomba/kompetisi 
yang diselenggarakan oleh FKKH UNDANA pada tahun 2025 adalah karya saya yang belum pernah dipublikasikan sebelumnya di media manapun, dan belum pernah diikutsertakan dalam perlombaan/kompetisi sejenis, dan/atau tidak pernah digunakan untuk media komunikasi apapun, serta bukan hasil dari plagiat.  
Apabila pernyataan saya tersebut di atas dikemudian hari tidak benar, saya bersedia dituntut sesuai dengan peraturan dan perundang-undangan yang berlaku.  
Demikian Surat Pernyataan ini saya buat dalam keadaan sadar untuk dapat dipergunakan  
sebagaimana mestinya.  

 
     Jumat, 28 November 2025 
Yang membuat pernyataan,  

  

(Vasco Yudha Nodyatama Sera)



Lampiran 2






























