## PharmaWise-AMR MVP

PharmaWise-AMR adalah workspace stewardship antibiotik berbasis Next.js + Firebase dengan tampilan glassmorphism premium dan modul publik (cek gejala, edukasi antibiotik, toolkit kampanye).

### 1. Struktur Proyek
- `src/app` – halaman publik + workspace farmasis (App Router).
- `src/components` – komponen UI (button, card, chatbot, formulir).
- `src/lib` – utilitas Firebase client/admin, data mock, proxy Cloud Functions.
- `functions/` – Firebase Cloud Functions (scoring, konseling, chatbot, forecast).
- `scripts/seed/firestore.ts` – seeding data awal persona.

### 2. Prasyarat
1. Node.js 20+
2. Firebase CLI (`npm install -g firebase-tools`)
3. Akun Firebase (Auth, Firestore, Storage, Functions aktif)
4. Akun GitHub + Vercel untuk deploy frontend

### 3. Konfigurasi Environment
1. Gandakan `env.example` → `.env.local`
2. Isi Firebase Web SDK & service account:
```bash
   NEXT_PUBLIC_FIREBASE_API_KEY="..."
   FIREBASE_PROJECT_ID="..."
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```
3. Opsional: set `FIREBASE_FUNCTIONS_BASE_URL` untuk memanggil Cloud Functions langsung; jika kosong, frontend memakai mock agar demo tetap berjalan.

### 4. Instalasi & Development
```bash
npm install
npm run prepare:functions   # install deps di folder functions/
npm run dev                 # Next.js dev server (http://localhost:3000)
```

Menjalankan emulator Firebase:
```bash
npm run emulators
```

### 5. Seed Firestore
Pastikan env admin terisi lalu:
```bash
npm run seed:firestore
```

### 6. Cloud Functions
Semua fungsi berada di `functions/src/index.ts`:
- `scorePrescription`
- `generateCounselingScript`
- `publicChatbot`
- `demandForecast`

Build & deploy:
```bash
npm run functions:build
firebase deploy --only functions
```

### 7. Deployment (GitHub ➜ Vercel ➜ Firebase)
1. Push repositori ke GitHub.
2. Import ke Vercel → pilih Next.js → set env sesuai `.env.local`.
3. Deploy Firestore rules, Storage rules, Functions:
   ```bash
   firebase deploy
   ```

### 8. Role & Data Mode
- Role gate muncul otomatis: Juri/Farmasis/Admin/Dummy mendapat dummy data lengkap tanpa login. Pengguna biasa wajib login via Firebase Auth dan melihat empty state.
- Tombol `Role: ...` di kanan bawah dapat dipakai untuk mengganti pengalaman kapan saja.
- Komponen workspace membaca mode (`demo` vs `empty`) dan menampilkan data/messaging yang sesuai.

### 9. QA Checklist
- [ ] Landing page berisi jumbotron baru, role showcase, feature tour, persona, journey, modul, CTA.
- [ ] `/workspace` dashboard menampilkan KPI cards, chart demand, timeline learning, alert feed; Experience banner mencerminkan role.
- [ ] Role gate bekerja (juri/admin/farmasis/dummy tanpa login; pengguna biasa harus login/registrasi).
- [ ] Modul Review/Konseling/Demand/Early Warning/Learning dapat digunakan sesuai mode.
- [ ] Halaman kampanye (`/workspace/campaign`) memuat builder, jadwal, rekomendasi.
- [ ] Halaman publik (`/cek-gejala`, `/tanya-antibiotik`, `/fakta-amr`, `/materi-kampanye`, `/cari-apotek`, `/quiz-literasi`) dapat dibuka.
- [ ] `npm run lint` lulus tanpa error.

### 10. Skrip Penting
| Perintah | Deskripsi |
| --- | --- |
| `npm run dev` | Menjalankan Next.js dev server |
| `npm run build` | Build produksi (untuk Vercel) |
| `npm run lint` | Menjalankan ESLint |
| `npm run emulators` | Menjalankan emulator Firebase (Auth/Firestore/Storage/Functions) |
| `npm run seed:firestore` | Mengisi data sample sesuai persona |
| `npm run functions:build` | Build Cloud Functions TypeScript |

### 11. PWA & Observability
- Manifest tersedia di `src/app/manifest.ts`. Service worker sederhana berada di `public/sw.js` dan diregistrasi via `PWARegister`.
- Tambahkan ikon PWA sesuai kebutuhan dan rebuild.
- Sentry siap pakai: isi `NEXT_PUBLIC_SENTRY_DSN` untuk mengaktifkan tracing/logging (lihat `sentry.*.config.ts`).

### 12. CI/CD
- Workflow GitHub Actions (`.github/workflows/ci.yml`) menjalankan lint dan build pada setiap push/PR ke `main`.
- Untuk deploy otomatis: hubungkan repo ke Vercel (frontend) dan jalankan `firebase deploy` via GitHub Actions/Manual sesuai kebutuhan.
