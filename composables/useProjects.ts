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
    "Cat & Sashimi Studio (Web Dev & UI/UX)",
    "Ubud Wellness Bali (Web Dev)",
    "Asanka Corporate & Digital (Web Dev)",
    "Muktamar Peraboi 2025 (Web Dev)"
  ];

  const getProjectBySlug = (slug: string) => {
    return webApps.find(project => project.slug === slug);
  };

  return {
    webApps,
    cmsProjects,
    getProjectBySlug
  };
};
