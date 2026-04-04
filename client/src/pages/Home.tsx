import React, { useEffect, useRef, useState } from 'react'
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

const Home = () => {
  const navigate = useNavigate()
  
  // WebP 애니메이션 상태 및 참조
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const frameCount = 287
  const imagesRef = useRef<HTMLImageElement[]>([])

  useEffect(() => {
    let loadedCount = 0
    const loadImages = async () => {
      const promises = Array.from({ length: frameCount }).map((_, i) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image()
          img.src = `/frames_robot/frame_${(i + 1).toString().padStart(4, '0')}.webp`
          img.onload = () => {
            loadedCount++
            setLoadProgress(Math.round((loadedCount / frameCount) * 100))
            imagesRef.current[i] = img
            resolve(img)
          }
          img.onerror = () => {
            loadedCount++
            setLoadProgress(Math.round((loadedCount / frameCount) * 100))
            resolve(img)
          }
        })
      })
      await Promise.all(promises)
      setImagesLoaded(true)
    }
    loadImages()
  }, [])

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let frameIndex = 0
    let animationFrameId: number
    let lastTime = performance.now()
    const fps = 24
    const interval = 1000 / fps

    const firstImage = imagesRef.current[0]
    if (firstImage) {
        canvas.width = firstImage.width
        canvas.height = firstImage.height
    }

    const renderLoop = (time: number) => {
      animationFrameId = requestAnimationFrame(renderLoop)
      const deltaTime = time - lastTime
      
      if (deltaTime >= interval) {
        lastTime = time - (deltaTime % interval)
        
        const img = imagesRef.current[frameIndex]
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
        
        frameIndex = (frameIndex + 1) % frameCount
      }
    }
    
    animationFrameId = requestAnimationFrame(renderLoop)
    return () => cancelAnimationFrame(animationFrameId)
  }, [imagesLoaded])

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
      gradient: 'from-blue-600 to-cyan-500',
      badge: '실시간',
      badgeColor: 'bg-blue-50 border-blue-100 text-blue-600'
    },
    {
      icon: Factory,
      title: '작업 실적 등록',
      desc: 'MES 바코드/QR 스캔으로 공정별 생산 실적·불량 수량을 빠르게 등록·관리',
      path: '/sf-production',
      gradient: 'from-emerald-500 to-teal-500',
      badge: 'MES 연동',
      badgeColor: 'bg-blue-50 border-blue-100 text-blue-600'
    },
    {
      icon: Eye,
      title: 'AI 비전 검사 모니터링',
      desc: '실시간 웹캠 AI 불량 감지, 신뢰도 스코어, 이미지 캡처 히스토리 로그',
      path: '/sf-vision',
      gradient: 'from-violet-500 to-purple-600',
      badge: 'AI 검사',
      badgeColor: 'bg-blue-50 border-blue-100 text-blue-600'
    },
    {
      icon: Package,
      title: '검사 요청 등록',
      desc: '품목에 대한 검사 요청 등록 및 AI 비전 자동 불량 판별 등록',
      path: '/sf-defect-types',
      gradient: 'from-amber-500 to-orange-500',
      badge: '기준정보',
      badgeColor: 'bg-blue-50 border-blue-100 text-blue-600'
    },
  ]

  return (
    <div className="flex-1 overflow-auto bg-slate-50">
      <div className="max-w-none mx-auto">

        {/* ── 헤더 ── */}
        <div className="relative text-center mb-8 sm:mb-12 py-24 sm:py-32 overflow-hidden bg-slate-900 w-full min-h-[600px] flex flex-col justify-center">
          {/* 동영상 배경 (WebP 캔버스 애니메이션) */}
          <div className="absolute inset-0 z-0 w-full h-full flex items-center justify-center bg-slate-900">
            {!imagesLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-400 z-10">
                <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <span className="text-sm font-bold animate-pulse">Loading Animation... {loadProgress}%</span>
              </div>
            )}
            <canvas 
              ref={canvasRef}
              className={`w-full h-full object-cover opacity-70 pointer-events-none transition-opacity duration-1000 ${imagesLoaded ? 'opacity-70' : 'opacity-0'}`}
            />
            {/* 영상 위에 약간의 오버레이 추가 (가독성을 위해) */}
            <div className="absolute inset-0 bg-slate-900/40 pointer-events-none w-full h-full"></div>
            {/* 자연스러운 연결을 위한 하단 화이트 페이드 아웃 효과 */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
          </div>

          <div className="relative z-10 px-4 w-full">
            {/* 기관 배지 */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-100 text-base sm:text-lg font-bold mb-4 sm:mb-6 shadow-sm">
              <Award className="w-5 h-5 text-blue-300" />
              한국 품질재단 (KFQ) 공식 실습 플랫폼
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg leading-tight">
              제조 AI 데이터분석
              <br />
              <span className="text-blue-400 drop-shadow-md mt-2 inline-block">스마트팩토리 실습</span>
            </h1>
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium bg-slate-900/40 backdrop-blur-md p-4 rounded-2xl inline-block border border-slate-700/50 shadow-sm">
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
                <div key={stat.label} className="flex items-center gap-3 px-6 py-3 bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-600/50 shadow-sm hover:shadow-md hover:bg-slate-800/80 transition-all">
                  <span className="text-blue-400 font-bold text-xl drop-shadow-sm">{stat.value}</span>
                  <span className="text-slate-300 text-base font-semibold">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* ── 제조 AI 스마트팩토리 실습 섹션 ── */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4 sm:mb-6 px-1">
            <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 border border-blue-200 shadow-sm">
              <Cpu className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wider">
              스마트팩토리 실습 모듈
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {sfCards.map((card) => (
              <button
                key={card.path}
                onClick={() => navigate(card.path)}
                className="w-full bg-white border border-slate-200 shadow-sm rounded-xl p-5 text-left hover:border-blue-300 hover:shadow-md hover:bg-blue-50/50 active:bg-slate-50 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex flex-col gap-2 mb-2">
                      <h3 className="text-slate-800 font-bold text-[15px]">{card.title}</h3>
                      <span className={`w-fit text-[10px] px-2 py-0.5 rounded border font-semibold tracking-wide ${card.badgeColor}`}>
                        {card.badge}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium mt-2">{card.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── 데이터 흐름 ── */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6 text-center">
            제조 AI 데이터 처리 흐름
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            {workflowSteps.map((step, i, arr) => {
              return (
                <React.Fragment key={step.text}>
                  <div className="flex items-center gap-2.5 bg-white border border-slate-200 shadow-sm rounded-lg px-5 py-3 w-full sm:w-auto justify-center font-medium">
                    <step.icon className={`w-4 h-4 shrink-0 text-blue-500`} />
                    <span className="text-slate-700 text-sm font-semibold whitespace-nowrap">{step.text}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <>
                      <ArrowDown className="w-5 h-5 text-slate-300 shrink-0 sm:hidden" />
                      <ArrowRight className="w-5 h-5 text-slate-300 shrink-0 hidden sm:block" />
                    </>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
        </div>

      </div>
      <div className="border-t border-slate-200 bg-white">
        <Footer />
      </div>
    </div>
  )
}

export default Home
