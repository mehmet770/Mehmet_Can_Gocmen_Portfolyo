'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface ProjectCardProps {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  category: 'web' | 'mobile' | 'desktop' | 'game'
  technologies: string[]
  status: 'active' | 'completed' | 'paused'
  teamProject?: boolean
  features?: string[]
  githubUrl?: string
  liveUrl?: string
  index: number
}

const categoryConfig = {
  web: { label: 'Web', color: 'bg-blue-500', icon: '🌐' },
  mobile: { label: 'Mobil', color: 'bg-green-500', icon: '📱' },
  desktop: { label: 'Masaüstü', color: 'bg-purple-500', icon: '💻' },
  game: { label: 'Oyun', color: 'bg-orange-500', icon: '🎮' },
}

const statusConfig = {
  active: { label: 'Aktif Geliştirme', color: 'bg-emerald-500', pulse: true },
  completed: { label: 'Tamamlandı', color: 'bg-slate-500', pulse: false },
  paused: { label: 'Beklemede', color: 'bg-amber-500', pulse: false },
}

export default function ProjectCard({
  id,
  title,
  shortDescription,
  fullDescription,
  category,
  technologies,
  status,
  teamProject = false,
  features = [],
  githubUrl,
  liveUrl,
  index,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      },
    },
  }

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: 'easeOut' },
        opacity: { duration: 0.3, delay: 0.1 },
      },
    },
  }

  const categoryData = categoryConfig[category]
  const statusData = statusConfig[status]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="mb-6 pr-12"
    >
      <motion.div
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          bg-white/40 backdrop-blur-md rounded-2xl border border-white/50
          overflow-hidden shadow-lg cursor-pointer
          transition-all duration-300 ease-out
          ${isExpanded ? 'shadow-2xl bg-white/60 border-slate-200/50' : 'hover:shadow-xl hover:bg-white/50'}
        `}
      >
        {/* Collapsed View - Always Visible */}
        <div className="p-6">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4 mb-4">
            {/* Left: Title & Category */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {/* Category Badge */}
                <span className={`${categoryData.color} text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5`}>
                  <span>{categoryData.icon}</span>
                  {categoryData.label}
                </span>

                {/* Status Badge */}
                <span className={`${statusData.color} text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5`}>
                  {statusData.pulse && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                  )}
                  {statusData.label}
                </span>

                {/* Team Badge */}
                {teamProject && (
                  <span className="bg-slate-700 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    Ekip Projesi
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-600 text-base leading-relaxed">{shortDescription}</p>
            </div>

            {/* Right: Expand Indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>

          {/* Technology Tags - Always Visible */}
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, isExpanded ? technologies.length : 4).map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-slate-900/10 text-slate-700 text-sm font-medium rounded-lg border border-slate-200/50"
              >
                {tech}
              </span>
            ))}
            {!isExpanded && technologies.length > 4 && (
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-sm font-medium rounded-lg">
                +{technologies.length - 4} daha
              </span>
            )}
          </div>
        </div>

        {/* Expanded View - Detailed Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={expandVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2 border-t border-slate-200/50">
                {/* Full Description */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Proje Detayı</h4>
                  <p className="text-slate-700 leading-relaxed text-base">{fullDescription}</p>
                </div>

                {/* Features */}
                {features.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Özellikler</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-700">
                          <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* All Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Teknolojiler</h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links + Action Hint */}
                <div className="flex flex-col gap-3 pt-4 border-t border-slate-200/30">
                  {(githubUrl || liveUrl) && (
                    <div className="flex gap-3 flex-wrap">
                      {githubUrl && (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-700 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          GitHub&apos;da Görüntüle
                        </a>
                      )}
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Canlı Site
                        </a>
                      )}
                    </div>
                  )}
                  <p className="text-sm text-slate-400 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Kartı kapatmak için tekrar tıklayın
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
