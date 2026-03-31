export const useProjects = () => {
  const webApps = [
    {
      slug: "pemira-co-id",
      title: "pemira.dpm-itbstikombali.id",
      subtitle: "Platform E-Voting",
      role: "Front-End & Back-End Developer",
      stack: ["NestJS", "Next.js", "Vue.js"],
      desc: "Platform pemungutan suara digital (e-voting) berskala kampus untuk memfasilitasi pemilihan Presiden & Wakil Presiden Mahasiswa, Ketua DPM, serta Ketua Himaprodi secara aman, transparan, dan efisien."
    },
    {
      slug: "tixgro-com",
      title: "tixgro.com",
      subtitle: "Ticketing & Event Management",
      role: "Front-End & Back-End Developer",
      stack: ["Laravel", "Livewire", "Tailwind CSS", "Alpine.js"],
      desc: "Platform manajemen tiket komprehensif yang memfasilitasi pembelian, penukaran tiket, hingga sistem check-in pengunjung. Mendukung transaksi otomatis melalui integrasi multi-payment gateway (Midtrans & Xendit)."
    },
    {
      slug: "app-muktamar-peraboi-2025",
      title: "App Muktamar Peraboi 2025",
      subtitle: "Event Registration & Check-in",
      role: "Front-End & Back-End Developer",
      stack: ["Laravel", "Tailwind CSS"],
      desc: "Aplikasi registrasi dan sistem check-in terintegrasi untuk menangani alur peserta event Muktamar Peraboi 2025, lengkap dengan integrasi pembayaran otomatis melalui DOKU payment gateway."
    },
    {
      slug: "membership-dreamy",
      title: "Membership Dreamy",
      subtitle: "Sistem MLM & Jaringan",
      role: "Front-End & Back-End Developer",
      stack: ["Laravel", "Livewire"],
      desc: "Sistem manajemen keanggotaan berbasis Multi-Level Marketing (MLM). Fitur utama meliputi pendaftaran member, pencatatan transaksi, serta algoritma kalkulasi distribusi bonus otomatis antar level jaringan (parent dan child)."
    },
    {
      slug: "jarimenari-com",
      title: "JariMenari.com",
      subtitle: "Booking System & Corporate Site",
      role: "Front-End & Back-End Developer",
      stack: ["Laravel", "Bootstrap"],
      desc: "Website profil perusahaan yang dilengkapi dengan sistem booking layanan secara online, terintegrasi dengan payment gateway DOKU untuk kemudahan transaksi pelanggan."
    },
    {
      slug: "aplikasi-radio-streaming",
      title: "Aplikasi Radio Streaming",
      subtitle: "Real-Time Broadcasting",
      role: "Front-End, Back-End Developer, & DevOps",
      stack: ["NuxtJS"],
      desc: "Aplikasi web berbasis streaming radio real-time dengan arsitektur yang dirancang agar dapat terintegrasi langsung dengan perangkat lunak broadcasting seperti OBS."
    },
    {
      slug: "umkm-com",
      title: "UMKM.com",
      subtitle: "Marketplace Directory",
      role: "Front-End & Back-End Developer",
      stack: ["Laravel", "Livewire"],
      desc: "Platform direktori digital yang menjembatani para pelaku UMKM (penyedia barang/jasa) agar terhubung dan menjangkau calon pelanggan dengan lebih efektif."
    },
    {
      slug: "sistem-manajemen-sekolah",
      title: "Sistem Manajemen Sekolah",
      subtitle: "SMA 1 Banjar",
      role: "Web Developer",
      stack: ["Laravel", "Livewire"],
      desc: "Sistem informasi akademik berbasis web untuk mendigitalisasi dan mengelola data serta operasional administrasi di lingkungan SMA 1 Banjar."
    },
    {
      slug: "gretiva-com",
      title: "Gretiva.com",
      subtitle: "Interactive Company Profile",
      role: "Front-End & Back-End Developer",
      stack: ["Express.js", "Vue.js"],
      desc: "Website company profile interaktif untuk membangun identitas brand dan representasi digital PT Gretiva."
    }
  ];

  const cmsProjects = [
    {
      slug: "cat-sashimi-studio",
      title: "Cat & Sashimi Studio",
      subtitle: "Company Profile",
      role: "Web Developer & UI/UX Designer",
      stack: ["WordPress", "Figma"],
      desc: "Pengembangan website company profile dengan fokus pada representasi visual dan antarmuka pengguna yang menarik."
    },
    {
      slug: "ubud-wellness-bali",
      title: "Ubud Wellness Bali",
      subtitle: "Profil & Booking Spa",
      role: "Web Developer",
      stack: ["WordPress"],
      desc: "Website profil bisnis yang dilengkapi dengan sistem booking terintegrasi untuk layanan spa."
    },
    {
      slug: "asanka-corporate-digital",
      title: "Asanka Corporate & Digital",
      subtitle: "Portal Korporat",
      role: "Web Developer",
      stack: ["WordPress"],
      desc: "Pengembangan portal korporat utama dan divisi digital PT Asanka (asanka.co.id & digital.asanka.co.id)."
    },
    {
      slug: "second-floor-coffee",
      title: "Second Floor Coffee",
      subtitle: "Brand F&B Representation",
      role: "Web Developer",
      stack: ["WordPress"],
      desc: "Website representasi digital dan identitas brand untuk lini bisnis F&B Second Floor Coffee."
    },
    {
      slug: "tanah-merah-bali",
      title: "Tanah Merah Bali",
      subtitle: "Company Profile",
      role: "Web Developer",
      stack: ["WordPress"],
      desc: "Website company profile profesional untuk mendukung eksistensi digital Tanah Merah Bali."
    },
    {
      slug: "muktamar-peraboi-2025-landing",
      title: "Muktamar Peraboi 2025",
      subtitle: "Landing Page Event",
      role: "Web Developer",
      stack: ["WordPress"],
      desc: "Landing page resmi (muktamarperaboi2025.com) yang menyediakan informasi terpusat terkait penyelenggaraan event."
    },
    {
      slug: "btkv-fk-udayana",
      title: "BTKV FK Udayana",
      subtitle: "Portal Informasi Akademik",
      role: "Web Developer",
      stack: ["WordPress"],
      desc: "Portal informasi resmi untuk memfasilitasi publikasi dan komunikasi institusi pendidikan/fakultas."
    },
    {
      slug: "kim-soo",
      title: "Kim Soo",
      subtitle: "Website Company Profile dan Online Shop",
      role: "Web Developer",
      stack: ["Shopify, Liquid"],
      desc: "Website company profile dan online shop profesional untuk mendukung eksistensi digital Kim Soo."
    }
  ];

  const getProjectBySlug = (slug) => {
    return webApps.find(project => project.slug === slug) || cmsProjects.find(project => project.slug === slug);
  };

  return {
    webApps,
    cmsProjects,
    getProjectBySlug
  };
};