import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Upload,
  Download,
  ArrowRight,
  ArrowDown,
  ScanLine,
  Eraser,
  LayoutDashboard,
  Factory,
  Eye,
  Package,
  BarChart2,
  Award,
  Cpu,
} from 'lucide-react'
import Footer from '../components/Footer'
import waveVideo from '../AI_robot.mp4'

const Home = () => {
  const navigate = useNavigate()

  const workflowSteps = [
    { icon: Upload,    text: '데이터 업로드' },
    { icon: Eraser,    text: '전처리·정제' },
    { icon: ScanLine,  text: 'AI 분석·인식' },
    { icon: BarChart2, text: '시각화·리포트' },
    { icon: Download,  text: '결과 다운로드' },
  ]

  const sfCards = [
    {
      icon: LayoutDashboard,
      title: '통합 대시보드',
      desc: '생산 라인 KPI, 불량률 Pareto 차트, 실시간 품질 현황을 한눈에 모니터링',
      path: '/sf-dashboard',
      gradient: 'from-blue-500 to-cyan-400',
      badge: '실시간',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    },
    {
      icon: Factory,
      title: '작업 실적 등록',
      desc: 'MES 바코드/QR 스캔으로 공정별 생산 실적·불량 수량을 빠르게 등록·관리',
      path: '/sf-production',
      gradient: 'from-emerald-400 to-green-400',
      badge: 'MES 연동',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      icon: Eye,
      title: 'AI 비전 검사 모니터링',
      desc: '실시간 웹캠 AI 불량 감지, 신뢰도 스코어, 이미지 캡처 히스토리 로그',
      path: '/sf-vision',
      gradient: 'from-violet-400 to-fuchsia-400',
      badge: 'AI 검사',
      badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30'
    },
    {
      icon: Package,
      title: '검사 요청 등록',
      desc: '품목에 대한 검사 요청 등록 및 AI 비전 자동 불량 판별 등록',
      path: '/sf-defect-types',
      gradient: 'from-orange-400 to-amber-400',
      badge: '기준정보',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
  ]

  return (
    <div className="flex-1 overflow-auto bg-slate-950">
      <div className="max-w-none mx-auto">

        {/* ── 헤더 ── */}
        <div className="relative text-center mb-8 sm:mb-12 py-24 sm:py-32 overflow-hidden bg-slate-950 w-full min-h-[600px] flex flex-col justify-center">
          {/* 동영상 배경 (자동 재생 및 마우스 호버 시 재생 보장) */}
          <div 
            className="absolute inset-0 z-0 w-full h-full flex items-center justify-center"
            onMouseEnter={(e) => {
              const video = e.currentTarget.querySelector('video')
              if (video) video.play().catch(() => {})
            }}
          >
            <video 
              src={waveVideo} 
              type="video/mp4"
              className="w-full h-full object-contain opacity-80 mix-blend-screen pointer-events-none"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              disableRemotePlayback
            />
            {/* 영상 위에 약간의 오버레이 추가 (가독성을 위해) */}
            <div className="absolute inset-0 bg-slate-950/40 pointer-events-none w-full h-full"></div>
          </div>

          <div className="relative z-10 px-4 w-full">
            {/* 기관 배지 */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-400/30 text-blue-300 text-base sm:text-lg font-bold mb-4 sm:mb-6 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Award className="w-5 h-5 text-blue-400" />
              한국 품질재단 (KFQ) 공식 실습 플랫폼
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg leading-tight">
              제조 AI 데이터분석
              <br />
              <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] mt-2 inline-block">스마트팩토리 실습</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium bg-slate-900/60 backdrop-blur-xl p-4 rounded-2xl inline-block border border-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]">
              AI 비전 불량 검사 · MES 작업실적 관리 · 생산 대시보드부터<br className="hidden sm:block"/>
              PDF 문서 편집·AI 동영상 제작까지 통합 실습 환경을 제공합니다
            </p>

            {/* 통계 뱃지 */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-10 flex-wrap">
              {[
                { label: '실습 모듈', value: '6개' },
                { label: 'AI 기능', value: '10+' },
                { label: '스마트팩토리', value: '4종' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all">
                  <span className="text-cyan-400 font-black text-xl drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">{stat.value}</span>
                  <span className="text-slate-400 text-base font-semibold">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* ── 제조 AI 스마트팩토리 실습 섹션 ── */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4 sm:mb-6 px-1">
            <div className="w-8 h-8 bg-slate-800 rounded-xl flex items-center justify-center shrink-0 border border-slate-700 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <h2 className="text-sm font-black text-cyan-400 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              스마트팩토리 실습 모듈
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {sfCards.map((card) => (
              <button
                key={card.path}
                onClick={() => navigate(card.path)}
                className="w-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] rounded-3xl p-5 text-left hover:border-white/30 hover:bg-white/10 active:bg-white/5 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]`}>
                    <card.icon className="w-6 h-6 text-white drop-shadow-md" />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex flex-col gap-2 mb-2">
                      <h3 className="text-slate-100 font-bold text-[15px]">{card.title}</h3>
                      <span className={`w-fit text-[10px] px-2 py-0.5 rounded-md border font-bold tracking-wide ${card.badgeColor}`}>
                        {card.badge}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed font-medium mt-2">{card.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── 데이터 흐름 ── */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 text-center">
            제조 AI 데이터 처리 흐름
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            {workflowSteps.map((step, i, arr) => {
              const neonColors = ['text-blue-400', 'text-emerald-400', 'text-cyan-400', 'text-violet-400', 'text-orange-400']
              const neonColor = neonColors[i % neonColors.length]
              return (
                <React.Fragment key={step.text}>
                  <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] rounded-2xl px-5 py-3 w-full sm:w-auto justify-center font-medium hover:bg-white/10 hover:border-white/20 transition-all">
                    <step.icon className={`w-4 h-4 shrink-0 ${neonColor}`} />
                    <span className="text-slate-300 text-sm font-bold whitespace-nowrap">{step.text}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <>
                      <ArrowDown className="w-5 h-5 text-slate-600 shrink-0 sm:hidden" />
                      <ArrowRight className="w-5 h-5 text-slate-600 shrink-0 hidden sm:block" />
                    </>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>

      </div>
      <div className="border-t border-white/10 bg-slate-950">
        <Footer />
      </div>
    </div>
  )
}

export default Home
