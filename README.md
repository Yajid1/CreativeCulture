# CreativeCulture

Website resmi UPTD Padepokan Seni, Kreativitas dan Kebudayaan Kota Bandung — menampilkan informasi fasilitas budaya, ruangan, artikel, dan berita, dilengkapi dashboard admin untuk pengelolaan konten.

Dibangun menggunakan Laravel + Inertia.js + React + TypeScript.

---

## 🧰 Prasyarat

Pastikan perangkat kamu sudah terpasang:

| Kebutuhan | Versi Minimum |
|---|---|
| PHP | 8.3+ |
| Composer | 2.x |
| Node.js | 20+ |
| NPM / PNPM | Versi terbaru |
| SQLite | Aktifkan ekstensi `pdo_sqlite` |

---

## 🚀 Clone & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Yajid1/CreativeCulture.git
cd CreativeCulture
```

### 2. Install Dependensi PHP

```bash
composer install
```

### 3. Salin File Environment

```bash
cp .env.example .env
```

### 4. Generate Application Key

```bash
php artisan key:generate
```
Buka file `.env`, sesuaikan konfigurasi database:
 
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=creativeculture
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Buat File Database SQLite

Buat database baru bernama `creativeculture` melalui phpMyAdmin/HeidiSQL, atau lewat terminal:
 
```bash
mysql -u root -e "CREATE DATABASE creativeculture"
``
```

### 6. Jalankan Migrasi Database

```bash
php artisan migrate
```

### 7. Install Dependensi JavaScript

```bash
npm install
```

### 8. Build Aset Frontend

```bash
npm run build
```

---

## ▶️ Menjalankan Aplikasi

Jalankan semua layanan sekaligus (server, queue, dan Vite) dengan satu perintah:

```bash
composer run dev
```

Atau jalankan secara terpisah:

**Terminal 1 — Laravel Server**

```bash
php artisan serve
```

**Terminal 2 — Vite Dev Server**

```bash
npm run dev
```

**Terminal 3 — Queue Worker**

```bash
php artisan queue:listen --tries=1
```

Aplikasi akan berjalan di:

**http://localhost:8000**

---

## ⚡ Setup Cepat

Untuk melakukan setup secara otomatis, jalankan:

```bash
composer run setup
```

Perintah tersebut akan menjalankan:

- `composer install`
- Menyalin `.env`
- Generate application key
- Migrasi database
- `npm install`
- `npm run build`

---

## 🗂️ Tech Stack

| Layer | Teknologi |
|---|---|
| Backend | Laravel 13, PHP 8.3 |
| Authentication | Laravel Fortify |
| SPA Bridge | Inertia.js v3 |
| Frontend | React 19, TypeScript |
| Styling | TailwindCSS v4 |
| UI Components | Radix UI, Lucide React |
| Routing (TypeScript) | Laravel Wayfinder |
| Build Tool | Vite |
| Testing | Pest v4 |
| Code Quality | Pint, PHPStan (Larastan) |

---

## 🧪 Menjalankan Tes

Untuk menjalankan seluruh test:

```bash
php artisan test --compact
```

---

## 🔧 Perintah Berguna

### Format Kode PHP

```bash
vendor/bin/pint
```

### Analisis Tipe Statis

```bash
php artisan types:check
```

### Lint JavaScript

```bash
npm run lint
```

### Format JavaScript

```bash
npm run format
```

### Generate TypeScript Route Functions

```bash
php artisan wayfinder:generate
```

---

## 📄 Lisensi

Proyek ini menggunakan lisensi **MIT**.
