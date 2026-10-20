// Data kegiatan non-akademik Sekolah Vokasi UI.
// Setiap entri WAJIB punya "sumber" (tautan berita resmi) agar informasinya bisa diverifikasi.
// Jangan menambahkan kegiatan, tanggal, atau lokasi yang tidak tercantum di sumber.
//
// Format tanggal: YYYY-MM-DD.
// - tanggalPasti: true  -> "tanggal" adalah tanggal pelaksanaan menurut sumber.
// - tanggalPasti: false -> sumber tidak menyebut tanggal pelaksanaan; "tanggal" diisi tanggal terbit berita.
// - lokasi: null jika sumber tidak menyebutkan lokasi.

const CATEGORIES = [
    { id: "orientasi", label: "Orientasi Mahasiswa Baru", icon: "🎒", color: "#1e40af" },
    { id: "pengabdian", label: "Pengabdian Masyarakat", icon: "🤝", color: "#7c3aed" },
    { id: "seminar", label: "Seminar & Pelatihan", icon: "🎤", color: "#0e7490" },
    { id: "prestasi", label: "Pengembangan Prestasi", icon: "🏆", color: "#b45309" },
    { id: "himpunan", label: "Kegiatan Himpunan", icon: "🏛️", color: "#047857" },
];

const EVENTS = [
    {
        id: 1,
        judul: "Bootcamp Mahasiswa Berprestasi (Mapres) 2026",
        kategori: "prestasi",
        penyelenggara: "Program Pendidikan Vokasi UI",
        tanggal: "2026-03-09",
        tanggalPasti: true,
        lokasi: "Student Center Vokasi UI",
        ringkasan: "Pembukaan bootcamp bagi finalis Mahasiswa Berprestasi Vokasi UI. Tiga perwakilan terbaik dipilih untuk bersaing di tingkat Universitas Indonesia.",
        sumber: "https://vokasi.ui.ac.id/web/vokasi-ui-gelar-bootcamp-mahasiswa-berprestasi-2026-perkuat-karakter-dan-inovasi-menuju-panggung-nasional/",
    },
    {
        id: 2,
        judul: "Pelatihan Program Kreativitas Mahasiswa (PKM) 2026",
        kategori: "seminar",
        penyelenggara: "Prodi Administrasi Keuangan dan Perbankan, Vokasi UI",
        tanggal: "2026-04-11",
        tanggalPasti: true,
        lokasi: null,
        ringkasan: "Pelatihan penyusunan proposal PKM bersama Dasril Guntara (Co-Founder & CEO Immers Asia Corp), membahas bidang PKM-RSH, PKM-K, PKM-PM, hingga PKM-KI.",
        sumber: "https://vokasi.ui.ac.id/web/vokasi-ui-gelar-pelatihan-pkm-2026-dorong-mahasiswa-ciptakan-inovasi-berdampak/",
    },
    {
        id: 3,
        judul: "Aksi Hijau PKKMB 2026: Pengumpulan Minyak Jelantah",
        kategori: "orientasi",
        penyelenggara: "Sekolah Vokasi UI (rangkaian PKKMB Vokasi UI 2026)",
        tanggal: "2026-08-13",
        tanggalPasti: true,
        lokasi: "Sekolah Vokasi UI, Depok",
        ringkasan: "Mahasiswa baru angkatan 2026 mengumpulkan lebih dari 1.600 botol (lebih dari 400 liter) minyak jelantah dan menuangkannya ke mesin UCOllect by Noovoleum.",
        sumber: "https://vokasi.ui.ac.id/web/awali-kehidupan-kampus-dengan-aksi-hijau-mahasiswa-baru-sekolah-vokasi-ui-kumpulkan-ratusan-liter-minyak-jelantah/",
    },
    {
        id: 4,
        judul: "Berlabuh FOKSI 2026",
        kategori: "orientasi",
        penyelenggara: "Forum Kerohanian Islam (FOKSI) Sekolah Vokasi UI",
        tanggal: "2026-09-05",
        tanggalPasti: true,
        lokasi: "Auditorium Vokasi UI",
        ringkasan: "Kegiatan bertema \"Tempat Singgah: Bebas, Bukan Berarti Tanpa Batas\" bagi mahasiswa baru muslim, berisi materi, permainan, pengenalan kehidupan kampus, dan sesi mentoring.",
        sumber: "https://vokasi.ui.ac.id/web/berlabuh-foksi-2026-bekali-mahasiswa-baru-sekolah-vokasi-ui-menemukan-arah-di-dunia-kampus/",
    },
    {
        id: 5,
        judul: "PRoVillage 2026: Budidaya Pakcoy Berkelanjutan",
        kategori: "pengabdian",
        penyelenggara: "HM VokHum UI (Departemen Sosial Masyarakat)",
        tanggal: "2026-09-19",
        tanggalSelesai: "2026-09-20",
        tanggalPasti: true,
        lokasi: "Desa Rawapanjang, Kabupaten Bogor",
        ringkasan: "Gerakan Lansia Menanam bertajuk TERAS: ibu-ibu pralansia dan lansia diajak menanam pakcoy menggunakan galon bekas sebagai pot.",
        sumber: "https://vokasi.ui.ac.id/web/mahasiswa-prodi-humas-sekolah-vokasi-ui-dorong-budidaya-pakcoy-berkelanjutan-melalui-provillage-2026/",
    },
    {
        id: 6,
        judul: "VoxConnect 2026: Entrepreneurship Series",
        kategori: "seminar",
        penyelenggara: "Sekolah Vokasi UI",
        tanggal: "2026-09-22",
        tanggalPasti: true,
        lokasi: "Auditorium Sekolah Vokasi UI",
        ringkasan: "Dialog mahasiswa dengan pemimpin industri dan pemangku kebijakan bertema \"Industry Voices, Vocational Pathways\", membahas kewirausahaan dan pengembangan talenta vokasional.",
        sumber: "https://vokasi.ui.ac.id/web/voxconnect-2026-entrepreneurship-series-perkuat-koneksi-mahasiswa-vokasi-ui-dengan-dunia-industri/",
    },
    {
        id: 7,
        judul: "Explore Tourism 2026",
        kategori: "himpunan",
        penyelenggara: "Himpunan Mahasiswa Manajemen Bisnis Pariwisata (HIMTA)",
        tanggal: "2026-09-22",
        tanggalPasti: false,
        lokasi: "Kampus UI Depok",
        ringkasan: "Kegiatan bertema \"Exploring Every Spot\" yang mengajak 30 siswa SMA/sederajat mengenal prodi Manajemen Bisnis Pariwisata dan menjelajahi kampus UI dengan bikun.",
        sumber: "https://vokasi.ui.ac.id/web/explore-tourism-2026-ajak-siswa-kenal-lebih-dekat-kehidupan-kampus-dan-pariwisata-di-sekolah-vokasi-ui/",
    },
    {
        id: 8,
        judul: "UMKM Naik Kelas: Pendampingan Digital UMKM Jabodetabek",
        kategori: "pengabdian",
        penyelenggara: "Tim mahasiswa Sekolah Vokasi UI (didanai DPIS UI)",
        tanggal: "2026-10-15",
        tanggalPasti: false,
        lokasi: "Depok, Tangerang Selatan, Jakarta, dan Bogor",
        ringkasan: "Pendampingan pelaku UMKM dalam pemasaran media sosial, pembuatan konten digital, fotografi produk, dan desain kemasan.",
        sumber: "https://vokasi.ui.ac.id/web/mahasiswa-sekolah-vokasi-ui-dorong-umkm-jabodetabek-naik-kelas-melalui-pendampingan-digital/",
    },
    {
        id: 9,
        judul: "Pelatihan Terapi Wajah untuk Remaja Manggarai",
        kategori: "pengabdian",
        penyelenggara: "Tim mahasiswa Sekolah Vokasi UI",
        tanggal: "2026-10-17",
        tanggalPasti: false,
        lokasi: "Manggarai, Jakarta Selatan",
        ringkasan: "Pelatihan teknik dasar perawatan wajah, pijat wajah, dan standar kebersihan layanan spa bagi remaja lulusan SMA/SMK.",
        sumber: "https://vokasi.ui.ac.id/web/mahasiswa-sekolah-vokasi-ui-bekali-remaja-manggarai-keterampilan-terapi-wajah-untuk-tingkatkan-peluang-kerja-global/",
    },
];

const ORGANIZATIONS = [
    {
        nama: "BEM Vokasi UI",
        jenis: "Badan Eksekutif Mahasiswa",
        deskripsi: "Badan Eksekutif Mahasiswa Vokasi Universitas Indonesia.",
        tautan: "https://bem.vokasi.ui.ac.id/",
    },
    {
        nama: "FOKSI Vokasi UI",
        jenis: "Kerohanian",
        deskripsi: "Forum Kerohanian Islam Sekolah Vokasi UI, penyelenggara Berlabuh FOKSI.",
        tautan: "https://vokasi.ui.ac.id/web/berlabuh-foksi-2026-bekali-mahasiswa-baru-sekolah-vokasi-ui-menemukan-arah-di-dunia-kampus/",
    },
    {
        nama: "HM VokHum UI",
        jenis: "Himpunan",
        deskripsi: "Himpunan Mahasiswa Vokasi Hubungan Masyarakat UI, penyelenggara PRoVillage.",
        tautan: "https://vokasi.ui.ac.id/web/mahasiswa-prodi-humas-sekolah-vokasi-ui-dorong-budidaya-pakcoy-berkelanjutan-melalui-provillage-2026/",
    },
    {
        nama: "HIMTA",
        jenis: "Himpunan",
        deskripsi: "Himpunan Mahasiswa Manajemen Bisnis Pariwisata, penyelenggara Explore Tourism.",
        tautan: "https://vokasi.ui.ac.id/web/explore-tourism-2026-ajak-siswa-kenal-lebih-dekat-kehidupan-kampus-dan-pariwisata-di-sekolah-vokasi-ui/",
    },
];
