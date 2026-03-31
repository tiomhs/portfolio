export const useProjects = () => {
  const webApps = [
    {
      slug: "pemira-co-id",
      title: "Pemira.co.id",
      subtitle: "Platform E-Voting",
      role: "Front-End & Back-End Developer",
      stack: ["NestJS", "Next.js", "Vue.js", "Tailwind CSS"],
      desc: "Platform pemungutan suara digital berskala kampus untuk memfasilitasi pemilihan Presiden & Wakil Presiden Mahasiswa secara aman, real-time, dan transparan."
    },
    {
      slug: "tixgro-com",
      title: "Tixgro.com",
      subtitle: "Ticketing Management",
      role: "Front-End & Back-End Developer",
      stack: ["Laravel", "Livewire", "Tailwind CSS", "Midtrans", "Xendit"],
      desc: "Platform manajemen tiket komprehensif yang memfasilitasi pembelian, penukaran tiket, hingga event check-in terintegrasi dengan berbagai payment gateway."
    },
    {
      slug: "membership-dreamy",
      title: "Membership Dreamy",
      subtitle: "Sistem Manajemen MLM",
      role: "Front-End & Back-End Developer",
      stack: ["Laravel", "Livewire", "MySQL"],
      desc: "Sistem manajemen keanggotaan berbasis Multi-Level Marketing (MLM) dengan kalkulasi pencapaian dan distribusi bonus otomatis secara rekursif antar level jaringan."
    },
    {
      slug: "radio-streaming-web",
      title: "Radio Streaming Web",
      subtitle: "Aplikasi Real-time Broadcasting",
      role: "Full-Stack & DevOps",
      stack: ["NuxtJS", "Vue.js", "Express.js"],
      desc: "Aplikasi web berbasis streaming stasiun radio real-time yang dirancang agar terintegrasi dengan OBS dan mendukung siaran interaktif."
    }
  ];

  const cmsProjects = [
    {
      slug: "cat-sashimi-studio",
      title: "Cat & Sashimi Studio",
      subtitle: "Web Dev & UI/UX",
      role: "Web Developer",
      stack: ["WordPress", "PHP", "Tailwind CSS"],
      desc: "Pengembangan website perusahaan dan desain antarmuka pengguna untuk Cat & Sashimi Studio, menitikberatkan pada estetika visual dan pengalaman navigasi interaktif."
    },
    {
      slug: "ubud-wellness-bali",
      title: "Ubud Wellness Bali",
      subtitle: "Web Dev",
      role: "Web Developer",
      stack: ["WordPress", "Elementor", "SEO"],
      desc: "Sistem web publik untuk lini bisnis asri Ubud Wellness di Bali, menyajikan profil layanan kesehatan komprehensif yang dirancang khusus untuk kenyamanan turis internasional."
    },
    {
      slug: "asanka-corporate",
      title: "Asanka Corporate & Digital",
      subtitle: "Web Dev",
      role: "Web Developer",
      stack: ["WordPress", "PHP", "MySQL"],
      desc: "Pengembangan web korporat dinamis bagi Asanka, menangani kompleksitas integrasi sistem profil perusahaan beserta optimasi performa backend."
    },
    {
      slug: "muktamar-peraboi-2025",
      title: "Muktamar Peraboi 2025",
      subtitle: "Web Dev",
      role: "Web Developer",
      stack: ["Laravel", "Tailwind CSS", "MySQL"],
      desc: "Pengembangan platform pendaftaran dan publikasi berbasis web untuk event akbar Muktamar Peraboi 2025, yang memfasilitasi ribuan peserta medis dalam satu sistem terpusat."
    }
  ];

  const getProjectBySlug = (slug: string) => {
    return webApps.find(project => project.slug === slug) || cmsProjects.find(project => project.slug === slug);
  };

  return {
    webApps,
    cmsProjects,
    getProjectBySlug
  };
};
