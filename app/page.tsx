'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import ProjectCard from './components/ProjectCard'

// ─── Veri ────────────────────────────────────────────────────────────────────

const projectsData = [
  {
    id: 'genai-tools-academy',
    title: 'GenAI Tools Academy',
    shortDescription: 'Akademik alanda yapay zeka kullanımını destekleyen eğitim platformu',
    fullDescription:
      'Akademik alanlarda yapay zekanın kullanımını arttırmak ve yanlış kullanımların önüne geçmek amacı ile yapılmaya başlanmış bir projedir. Bu alanda ki Türkçe kaynakları olabildiğince arttırmak ve ulaşılabilir hale getirmek istiyoruz. Ekip arkadaşım ile üzerine çalıştığımız ve aktif olarak da geliştirmeye devam ettiğimiz bir web sitesidir.',
    category: 'web' as const,
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    status: 'active' as const,
    teamProject: true,
    features: [
      'Yapay zeka araçları rehberi',
      'Akademik kullanım kılavuzları',
      'Türkçe kaynak deposu',
      'Etik kullanım yönergeleri',
      'İnteraktif öğrenme modülleri',
      'Güncel AI haberleri',
    ],
    githubUrl: 'https://github.com/mehmet770/genai-tools-academy',
    liveUrl: 'https://genai-tools-academy.vercel.app',
  },
  {
    id: 'jarvis-tuy',
    title: 'Jarvis Tüy',
    shortDescription: 'Tamamen yerel ortamda çalışan kişisel yapay zeka asistanı',
    fullDescription:
      'Jarvis Tüy, internet bağlantısı gerektirmeksizin kendi bilgisayarınızda çalışabilen, kişisel kullanım odaklı bir yapay zeka asistanıdır. Yerel dil modelleri ve özel altyapı bileşenleriyle entegre çalışacak şekilde tasarlanmıştır; bu sayede gizlilik ve hız konusunda bulut tabanlı çözümlere kıyasla ciddi avantajlar sunmaktadır. Proje henüz geliştirme aşamasında olduğundan kaynak kodlarını şu an kamuoyuyla paylaşmıyorum; ilerleyen süreçte açık kaynak olarak yayımlamayı planlıyorum.',
    category: 'desktop' as const,
    technologies: ['Python', 'Ollama', 'Local LLM', 'FastAPI', 'SQLite'],
    status: 'active' as const,
    teamProject: false,
    features: [
      'Tamamen çevrimdışı, yerel çalışma',
      'Özelleştirilebilir yapay zeka modeli desteği',
      'Kişisel veri gizliliği odaklı mimari',
      'Hızlı yerel çıkarım (inference)',
      'Modüler ve genişletilebilir yapı',
      'Düşük sistem kaynağı tüketimi',
    ],
  },
  {
    id: 'fast-crush',
    title: 'Fast Crush',
    shortDescription: 'Veritabanı destekli rekabetçi 2D yarış oyunu',
    fullDescription:
      'Single player olarak yaptığımız oyunda veritabanı ekleyerek oyun rekabetini kızıştırmak için skor tablosunu veritabanına ekledik. Kaç saniyede bitirildiğini göstererek birincilik tablosuna girmeye çalışılmasını amaçladık. Bu ilk mini çaplı oyun deneyimimizdi ve oyun geliştirme süreçlerini öğrenmemize büyük katkı sağladı.',
    category: 'game' as const,
    technologies: ['C#', 'Windows Forms', 'MySQL', 'GDI+', 'PHP Backend'],
    status: 'completed' as const,
    teamProject: true,
    features: [
      'Tek oyunculu yarış modu',
      'Global skor tablosu',
      'Süre bazlı rekor sistemi',
      'Veritabanı entegrasyonu',
      'Liderlik tablosu',
      'Oyun içi ses efektleri',
    ],
    githubUrl: 'https://github.com/mehmet770/Fast_Crash_2D',
  },
]

const skillsData = [
  {
    category: 'Frontend',
    color: 'blue',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    color: 'purple',
    skills: ['C#', 'PHP', 'SQL', 'MySQL'],
  },
  {
    category: 'Araçlar & Platform',
    color: 'orange',
    skills: ['Git', 'GitHub', 'Vercel', 'Supabase', 'WinSCP'],
  },
]

const colorMap: Record<string, { badge: string; heading: string; dot: string }> = {
  blue: {
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    heading: 'text-blue-700',
    dot: 'bg-blue-500',
  },
  purple: {
    badge: 'bg-purple-50 text-purple-700 border-purple-200',
    heading: 'text-purple-700',
    dot: 'bg-purple-500',
  },
  green: {
    badge: 'bg-green-50 text-green-700 border-green-200',
    heading: 'text-green-700',
    dot: 'bg-green-500',
  },
  orange: {
    badge: 'bg-orange-50 text-orange-700 border-orange-200',
    heading: 'text-orange-700',
    dot: 'bg-orange-500',
  },
}

// ─── Bileşen ──────────────────────────────────────────────────────────────────

export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 30 })
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sectionTitleVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-slate-900 origin-left z-[60]"
      />

      <Sidebar />

      {/* Main Content */}
      <main className="ml-80 pt-1 pb-20">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section id="home" className="min-h-screen flex items-center justify-start pr-12 pl-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.h1 className="text-7xl font-bold text-slate-900 mb-8 leading-tight">
              Merhaba, ben{' '}
              <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Mehmet Can
              </span>
            </motion.h1>
            <motion.p className="text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl">
              Yazılım geliştirici olarak web ve masaüstü projeleri üzerinde
              çalışıyorum. Yapay zeka ve teknolojinin eğitimdeki kullanımı
              konusunda araştırmalar yapıyorum.
            </motion.p>
            <div className="flex gap-4 flex-wrap">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-10 py-5 bg-slate-900 text-white font-semibold rounded-2xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
              >
                Projelerimi Keşfet
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-10 py-5 bg-white/60 backdrop-blur-md text-slate-900 font-semibold rounded-2xl border border-white/70 hover:bg-white/80 transition-all shadow-lg hover:shadow-xl"
              >
                İletişime Geç
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* ── Projects ─────────────────────────────────────────────────── */}
        <section id="projects" className="py-24 pl-8">
          <motion.div
            variants={sectionTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-5xl font-bold text-slate-900 mb-4">Projelerim</h2>
            <p className="text-xl text-slate-500 max-w-2xl">Detayları görmek için kartlara tıklayın</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4 mb-12 pr-12"
          >
            <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/50 p-4 text-center">
              <p className="text-3xl font-bold text-slate-900">{projectsData.length}</p>
              <p className="text-sm text-slate-500">Toplam Proje</p>
            </div>
            <div className="bg-blue-50/80 backdrop-blur-md rounded-xl border border-blue-100 p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">
                {projectsData.filter(p => p.category === 'web').length}
              </p>
              <p className="text-sm text-blue-500">Web Projesi</p>
            </div>
            <div className="bg-orange-50/80 backdrop-blur-md rounded-xl border border-orange-100 p-4 text-center">
              <p className="text-3xl font-bold text-orange-600">
                {projectsData.filter(p => p.category === 'game' || p.category === 'desktop').length}
              </p>
              <p className="text-sm text-orange-500">Masaüstü/Oyun</p>
            </div>
          </motion.div>

          <div className="space-y-2">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                shortDescription={project.shortDescription}
                fullDescription={project.fullDescription}
                category={project.category}
                technologies={project.technologies}
                status={project.status}
                teamProject={project.teamProject}
                features={project.features}
                githubUrl={'githubUrl' in project ? project.githubUrl : undefined}
                liveUrl={'liveUrl' in project ? project.liveUrl : undefined}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* ── Skills ───────────────────────────────────────────────────── */}
        <section id="skills" className="py-24 pr-12 pl-8">
          <motion.div
            variants={sectionTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-5xl font-bold text-slate-900 mb-4">Yetenekler</h2>
            <p className="text-xl text-slate-500">Çalıştığım teknolojiler ve araçlar</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsData.map((group, gi) => {
              const c = colorMap[group.color]
              return (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: gi * 0.1 }}
                  className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${c.dot}`} />
                      <h3 className={`text-base font-bold ${c.heading} uppercase tracking-wider`}>
                        {group.category}
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded-full">
                      Temel Düzey
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1.5 text-sm font-semibold rounded-xl border ${c.badge} transition-transform hover:-translate-y-0.5`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* ── Web Sitem ─────────────────────────────────────────────────── */}
        <section id="website" className="py-24 pr-12 pl-8">
          <motion.div
            variants={sectionTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-5xl font-bold text-slate-900 mb-4">Web Sitem</h2>
            <p className="text-xl text-slate-500">Canlı olarak yayında olan web projesi</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-slate-900">GenAI Tools Academy</h3>
                    <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      Canlı
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Akademik alanlarda yapay zekanın doğru kullanımını destekleyen, Türkçe kaynaklar sunan eğitim platformu.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="text-sm text-slate-600 font-mono">genai-tools-academy.vercel.app</span>
              </div>

              <motion.a
                href="https://genai-tools-academy.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Web Sitesini Ziyaret Et
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* ── About ────────────────────────────────────────────────────── */}
        <section id="about" className="py-24 pr-12 pl-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-12">Hakkımda</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 p-8 shadow-lg">
                <p className="text-lg text-slate-700 leading-relaxed">
                  Yazılım geliştirme alanında web ve masaüstü uygulamaları üzerine pratik çalışmalar gerçekleştiriyorum.
                  Yapay zeka araçlarının akademik alanlardaki etkin ve doğru kullanımı üzerine araştırmalar yapmaktayım.
                  TEKNOFEST kapsamında arama kurtarma dronu geliştiren ekibin liderliğini üstlendim; projenin ESC K30
                  entegrasyonu ve geliştirme süreçlerini aktif olarak yönetmeye devam ediyorum. Ekip çalışmasına uyumlu,
                  yeni teknolojileri öğrenmeye istekli bir önlisans öğrencisiyim.
                </p>
              </div>
              <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 p-8 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">İlgi Alanlarım</h3>
                <ul className="space-y-3 text-slate-700">
                  {[
                    { label: 'Web Geliştirme (React, Next.js)', dot: 'bg-blue-500' },
                    { label: 'Masaüstü Uygulama Geliştirme', dot: 'bg-orange-500' },
                    { label: 'Oyun Geliştirme', dot: 'bg-slate-500' },
                    { label: 'Yapay Zeka ve Eğitim Teknolojileri', dot: 'bg-purple-500' },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <div className={`w-2 h-2 ${item.dot} rounded-full flex-shrink-0`} />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </motion.div>
        </section>

        {/* ── Contact ──────────────────────────────────────────────────── */}
        <section id="contact" className="py-24 pr-12 pl-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-12">İletişim</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 px-8 py-6 text-center shadow-lg"
              >
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-slate-600 mb-1">E-posta</p>
                <p className="text-slate-900 font-semibold text-sm mb-4">gocmenmehmet111@gmail.com</p>
                <motion.a
                  href="mailto:gocmenmehmet111@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Bana Mesaj Gönderin
                </motion.a>
              </motion.div>

              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://github.com/mehmet770"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 px-8 py-6 text-center hover:shadow-lg transition-all group shadow-lg"
              >
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <p className="text-sm text-slate-600 mb-2">GitHub</p>
                <p className="text-slate-900 font-semibold">github.com/mehmet770</p>
              </motion.a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Scroll to Top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={showScrollTop ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-slate-900 text-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-slate-800 transition-colors z-50"
        aria-label="Yukarı çık"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </div>
  )
}
