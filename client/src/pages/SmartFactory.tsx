import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Factory, Eye, User } from 'lucide-react'
import { cn } from '../lib/utils'

interface SmartFactoryProps {
  path?: string
}

const SMART_FACTORY_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_SMART_FACTORY_URL || 'http://localhost:5002')
  : '/factory'

const subPages = [
  {
    routePath: '/smart-factory',
    iframePath: '/',
    label: '대시보드',
    icon: LayoutDashboard,
    activeClass: 'bg-blue-600 text-white shadow-md',
  },
  {
    routePath: '/smart-factory/production',
    iframePath: '/production',
    label: '작업실적입력',
    icon: Factory,
    activeClass: 'bg-emerald-600 text-white shadow-md',
  },
  {
    routePath: '/smart-factory/vision',
    iframePath: '/vision',
    label: 'AI 비전 검사',
    icon: Eye,
    activeClass: 'bg-purple-600 text-white shadow-md',
  },
]

const SmartFactory = ({ path = '/' }: SmartFactoryProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentSub = subPages.find((p) => p.iframePath === path) ?? subPages[0]
  const src = `${SMART_FACTORY_URL}${path}?embed=true`

  const today = new Date()
  const dateStr = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}.`

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      {/* ── 상단 헤더 바 ── */}
      <div className="flex items-center gap-3 px-4 h-12 bg-white border-b border-slate-200 shrink-0 shadow-sm">
        {/* 브랜드 */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-600 flex items-center justify-center text-white font-extrabold text-[10px] shadow">
            KQ
          </div>
          <span className="text-slate-700 text-xs font-semibold hidden sm:inline">
            한국 품질재단
          </span>
          <span className="text-slate-400 text-xs hidden sm:inline">
            제조AI 스마트팩토리 실습
          </span>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex items-center gap-1.5 ml-4">
          {subPages.map((page) => {
            const isActive = location.pathname === page.routePath
            const Icon = page.icon
            return (
              <button
                key={page.routePath}
                onClick={() => navigate(page.routePath)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                  isActive
                    ? page.activeClass
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{page.label}</span>
              </button>
            )
          })}
        </div>

        {/* 오른쪽 영역 */}
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-2 text-right">
            <User className="w-4 h-4 text-slate-400" />
            <div className="hidden sm:block">
              <div className="text-[11px] font-semibold text-slate-700 leading-tight">{dateStr}</div>
              <div className="text-[10px] text-slate-400 leading-tight">실습 공장</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── iframe ── */}
      <iframe
        key={src}
        src={src}
        title={currentSub.label}
        className="flex-1 w-full border-none"
        style={{ minHeight: 0 }}
        allow="camera; microphone"
      />
    </div>
  )
}

export default SmartFactory
