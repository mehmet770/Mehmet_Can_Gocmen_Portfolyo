'use client'

import { motion } from 'framer-motion'

interface CertificateCardProps {
  id: string
  title: string
  issuer: string
  date: string
  type: 'certificate' | 'participation' | 'award'
  description: string
  pdfUrl?: string
  setupUrl?: string
  setupLabel?: string
  index: number
}

const typeConfig = {
  certificate: {
    label: 'Sertifika',
    color: 'bg-blue-500',
    border: 'border-blue-200',
    bg: 'bg-blue-50/80',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  participation: {
    label: 'Katılım Belgesi',
    color: 'bg-emerald-500',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50/80',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  award: {
    label: 'Ödül',
    color: 'bg-amber-500',
    border: 'border-amber-200',
    bg: 'bg-amber-50/80',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
}

export default function CertificateCard({
  title,
  issuer,
  date,
  type,
  description,
  pdfUrl,
  setupUrl,
  setupLabel = 'Setup İndir',
  index,
}: CertificateCardProps) {
  const typeData = typeConfig[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-full"
    >
      <div className={`h-full bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:bg-white/55`}>
        {/* Top color stripe */}
        <div className={`h-1 w-full ${typeData.color}`} />

        <div className="p-6 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-12 h-12 ${typeData.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
              {typeData.icon}
            </div>
            <div className="flex-1 min-w-0">
              <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${typeData.bg} ${typeData.border} border mb-2`}>
                {typeData.label}
              </span>
              <h3 className="text-base font-bold text-slate-900 leading-snug">{title}</h3>
            </div>
          </div>

          {/* Issuer & Date */}
          <div className="flex items-center justify-between mb-4 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="font-medium text-slate-700 truncate">{issuer}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{date}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-5">
            {description}
          </p>

          {/* Download Buttons */}
          {(pdfUrl || setupUrl) && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200/50">
              {pdfUrl && (
                <a
                  href={pdfUrl}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Belgeyi İndir
                </a>
              )}
              {setupUrl && (
                <a
                  href={setupUrl}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {setupLabel}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
