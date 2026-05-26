'use client'

import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'

const projectsData = [
  {
    id: 'genai-tools-academy',
    title: 'GenAI Tools Academy',
    description: 'Akademik alanda yapay zeka kullanımını destekleyen eğitim platformu',
    fullDescription: 'Akademik alanlarda yapay zekanın kullanımını arttırmak ve yanlış kullanımların önüne geçmek amacı ile yapılmaya başlanmış bir projedir. Bu alanda ki Türkçe kaynakları olabildiğince arttırmak ve ulaşılabilir hale getirmek istiyoruz. Ekip arkadaşım ile üzerine çalıştığımız ve aktif olarak da geliştirmeye devam ettiğimiz bir web sitesidir.',
    purpose: 'Akademik çevrelerde yapay zeka araçlarının etik ve verimli kullanımını yaygınlaştırmak, Türkçe kaynak eksikliğini gidermek.',
    targetAudience: 'Öğrenciler, akademisyenler, araştırmacılar ve eğitimciler.',
    category: 'web',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    status: 'active',
    teamProject: true,
    features: [
      'Yapay zeka araçları rehberi',
      'Akademik kullanım kılavuzları',
      'Türkçe kaynak deposu',
      'Etik kullanım yönergeleri',
      'İnteraktif öğrenme modülleri',
      'Güncel AI haberleri',
    ],
    images: [
      '/images/genai-1.png',
      '/images/genai-2.png',
      '/images/genai-3.png'
    ],
  },
  {
    id: 'bloomist',
    title: 'Bloomist',
    description: 'Görevlerini tamamladıkça çiçeğini büyüten planlayıcı uygulama',
    fullDescription: 'Ekip arkadaşım ile gün içerisinde yapmayı unuttuğumuz işleri hatırlatmak ve hatırladığımız her konuda içerideki çiçeğimizi büyütme imkanımız oluyor. Mobil alanındaki ilk deneyimimiz sayılabilecek bir çalışmaydı. Görev tamamlama motivasyonunu oyunlaştırma ile birleştiren yenilikçi bir yaklaşım sunduk.',
    purpose: 'Günlük görev takibini eğlenceli hale getirmek ve kullanıcıları görevlerini tamamlamaya motive etmek.',
    targetAudience: 'Öğrenciler, çalışanlar ve üretkenliklerini artırmak isteyen herkes.',
    category: 'mobile',
    technologies: ['React Native', 'Expo', 'Firebase', 'TypeScript', 'Lottie Animations'],
    status: 'completed',
    teamProject: true,
    features: [
      'Görev planlama ve hatırlatma',
      'Çiçek büyütme oyunlaştırması',
      'Günlük/haftalık görev takibi',
      'Motivasyon odaklı tasarım',
      'Push bildirimleri',
      'İlerleme istatistikleri',
    ],
    images: [
      '/images/bloomist-1.png',
      '/images/bloomist-2.png',
      '/images/bloomist-3.png'
    ],
  },
  {
    id: 'gameartbase',
    title: 'GameArtBase',
    description: 'Sunucu tabanlı dosya paylaşım ve transfer uygulaması',
    fullDescription: 'Üniversite dönem projesi olarak yaptığım bir çalışmaydı. Online bir şekilde sunucular aracılığı ile dosya paylaşabildiğim bir Windows ortamı. Güvenli dosya transferi ve kullanıcı dostu arayüz tasarımı konusunda deneyim kazandığım önemli bir proje oldu.',
    purpose: 'Kullanıcılar arasında güvenli ve hızlı dosya paylaşımı sağlamak.',
    targetAudience: 'Oyun geliştiricileri, sanatçılar ve dosya paylaşımına ihtiyaç duyan ekipler.',
    category: 'desktop',
    technologies: ['C#', '.NET Framework', 'WinForms', 'Socket Programming', 'SQL Server'],
    status: 'completed',
    teamProject: false,
    features: [
      'Gerçek zamanlı dosya transferi',
      'Sunucu-istemci mimarisi',
      'Dosya önizleme',
      'Transfer ilerleme göstergesi',
      'Kullanıcı yetkilendirme',
      'Dosya sıkıştırma desteği',
    ],
    images: [
      '/images/gameartbase-1.png',
      '/images/gameartbase-2.png',
      '/images/gameartbase-3.png'
    ],
  },
  {
    id: 'fast-crush',
    title: 'Fast Crush',
    description: 'Veritabanı destekli rekabetçi 2D yarış oyunu',
    fullDescription: 'Single player olarak yaptığımız oyunda veritabanı ekleyerek oyun rekabetini kızıştırmak için skor tablosunu veritabanına ekledik. Kaç saniyede bitirildiğini göstererek birincilik tablosuna girmeye çalışılmasını amaçladık. Bu ilk mini çaplı oyun deneyimimizdi ve oyun geliştirme süreçlerini öğrenmemize büyük katkı sağladı.',
    purpose: 'Eğlenceli ve rekabetçi bir oyun deneyimi sunmak, oyuncuları skor tablosunda üst sıralara çıkmaya teşvik etmek.',
    targetAudience: 'Casual oyuncular ve rekabetçi oyun severler.',
    category: 'game',
    technologies: ['C#', 'Windows Forms', 'MySQL', 'GDI+', 'PHP Backend'],
    status: 'completed',
    teamProject: true,
    features: [
      'Tek oyunculu yarış modu',
      'Global skor tablosu',
      'Süre bazlı rekor sistemi',
      'Veritabanı entegrasyonu',
      'Liderlik tablosu',
      'Oyun içi ses efektleri',
    ],
    images: [
      '/images/fastcrush-1.png',
      '/images/fastcrush-2.png',
      '/images/fastcrush-3.png'
    ],
  },
]

const categoryConfig: Record<string, { label: string; color: string; icon: string }> = {
  web: { label: 'Web', color: 'bg-blue-500', icon: '🌐' },
  mobile: { label: 'Mobil', color: 'bg-green-500', icon: '📱' },
  desktop: { label: 'Masaüstü', color: 'bg-purple-500', icon: '💻' },
  game: { label: 'Oyun', color: 'bg-orange-500', icon: '🎮' },
}

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: 'Aktif Geliştirme', color: 'bg-emerald-500' },
  completed: { label: 'Tamamlandı', color: 'bg-slate-500' },
  paused: { label: 'Beklemede', color: 'bg-amber-500' },
}

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [project, setProject] = useState<typeof projectsData[0] | null>(null)

  useEffect(() => {
    const projectId = params.id as string
    const foundProject = projectsData.find(p => p.id === projectId)
    if (foundProject) {
      setProject(foundProject)
    } else {
      router.push('/')
    }
  }, [params.id, router])

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Proje yükleniyor...</p>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  const categoryData = categoryConfig[project.category]
  const statusData = statusConfig[project.status]

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-80 pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="mb-8 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Geri Dön
          </motion.button>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`${categoryData.color} text-white text-sm font-bold px-4 py-1.5 rounded-full flex items-center gap-2`}>
                <span>{categoryData.icon}</span>
                {categoryData.label}
              </span>
              <span className={`${statusData.color} text-white text-sm font-medium px-4 py-1.5 rounded-full`}>
                {statusData.label}
              </span>
              {project.teamProject && (
                <span className="bg-slate-700 text-white text-sm font-medium px-4 py-1.5 rounded-full flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  Ekip Projesi
                </span>
              )}
            </div>
            <h1 className="text-5xl font-bold text-slate-900">{project.title}</h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-100 border border-slate-200 shadow-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{categoryData.icon}</span>
                  </div>
                  <p className="text-slate-500 font-medium">Proje Görseli</p>
                  <p className="text-slate-400 text-sm">{project.title}</p>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-600 hover:bg-white transition-all shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-600 hover:bg-white transition-all shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-slate-700' : 'bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 overflow-x-auto">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center ${
                      index === currentImageIndex ? 'border-slate-900' : 'border-transparent'
                    }`}
                  >
                    <span className="text-lg">{categoryData.icon}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Description */}
              <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Proje Açıklaması</h3>
                <p className="text-slate-700 leading-relaxed">{project.fullDescription}</p>
              </div>

              {/* Purpose */}
              <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Amaç</h3>
                <p className="text-slate-700 leading-relaxed">{project.purpose}</p>
              </div>

              {/* Target Audience */}
              <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Hedef Kitle</h3>
                <p className="text-slate-700 leading-relaxed">{project.targetAudience}</p>
              </div>

              {/* Features */}
              <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Özellikler</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-700">
                      <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Kullanılan Teknolojiler</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
