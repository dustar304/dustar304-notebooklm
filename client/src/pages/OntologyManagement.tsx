import React, { useState } from 'react'
import {
  Database,
  Zap,
  Shield,
  Network,
  Clock,
  X,
  Activity,
  RefreshCcw,
  Trash2,
  Eye,
  TableProperties,
  GitBranch,
  Bot,
  Route,
  CheckCircle2,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'

export default function OntologyManagement() {
  const [activeTab, setActiveTab] = useState('개요')

  const tabs = [
    { id: '개요', icon: Eye },
    { id: '테이블', icon: TableProperties },
    { id: '관계 매퍼', icon: GitBranch },
    { id: 'AI', icon: Bot },
    { id: '리니지', icon: Route },
    { id: '품질', icon: Shield },
  ]

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] overflow-y-auto custom-scrollbar">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border-b border-slate-200 shrink-0">
        <div>
          <h1 className="text-[22px] font-bold text-[#4f46e5] flex items-center gap-2">
            온톨로지 관리
          </h1>
          <p className="text-[12px] text-slate-500 font-medium mt-1">실시간 데이터 통합 및 지능형 온톨로지 관리</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-[12px] font-bold text-slate-600 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> 캐시: 2초 전</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> 스트림 활성</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> 소스: 활성</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-500 border border-rose-200 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors">
              <X className="w-3.5 h-3.5" strokeWidth={3} /> 스트림 정지
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg transition-colors">
              <Activity className="w-3.5 h-3.5" /> 수동모드
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
              <RefreshCcw className="w-3.5 h-3.5" /> 강제 새로고침
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
              <Trash2 className="w-3.5 h-3.5" /> 캐시 초기화
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 shrink-0">
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden flex flex-col h-[100px]">
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50/50 border-b border-blue-100">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">1</div>
              <span className="text-[13px] font-bold text-slate-700">총 테이블</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <Database className="absolute left-4 bottom-3 w-8 h-8 text-blue-100" />
              <div className="flex flex-col items-center leading-none mt-1">
                <span className="text-3xl font-bold text-blue-600">1056</span>
                <span className="text-[11px] text-slate-500 font-medium mt-1">개</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[100px]">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50/50 border-b border-slate-200">
              <div className="w-5 h-5 rounded-full bg-fuchsia-100 flex items-center justify-center text-fuchsia-600 text-xs font-bold">2</div>
              <span className="text-[13px] font-bold text-slate-700">벡터화 완료</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <Zap className="absolute left-4 bottom-3 w-8 h-8 text-slate-100" />
              <div className="flex flex-col items-center leading-none mt-1">
                <span className="text-3xl font-bold text-[#c026d3]">206</span>
                <span className="text-[11px] text-slate-500 font-medium mt-1">개</span>
              </div>
            </div>
          </div>

          <div className="bg-[#fffbeb] rounded-xl border border-[#fef08a] shadow-sm overflow-hidden flex flex-col h-[100px]">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/50 border-b border-[#fef08a]">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">3</div>
              <span className="text-[13px] font-bold text-slate-700">품질 점수</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <Shield className="absolute left-4 bottom-3 w-8 h-8 text-amber-200/60" />
              <div className="flex flex-col items-center leading-none mt-1">
                <span className="text-3xl font-bold text-[#059669]">80.4%</span>
                <span className="text-[11px] text-slate-500 font-medium mt-1">평균</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[100px]">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50/50 border-b border-slate-200">
              <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xs font-bold">4</div>
              <span className="text-[13px] font-bold text-slate-700">관계</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <Network className="absolute left-4 bottom-3 w-8 h-8 text-slate-100" />
              <div className="flex flex-col items-center leading-none mt-1">
                <span className="text-3xl font-bold text-[#ea580c]">0</span>
                <span className="text-[11px] text-slate-500 font-medium mt-1">개</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f0fdf4] rounded-xl border border-[#bbf7d0] shadow-sm overflow-hidden flex flex-col h-[100px]">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/50 border-b border-[#bbf7d0]">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">5</div>
              <span className="text-[13px] font-bold text-slate-700">캐시 주기</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <Clock className="absolute left-4 bottom-3 w-8 h-8 text-emerald-200/50" />
              <div className="flex flex-col items-center leading-none mt-1">
                <span className="text-3xl font-bold text-[#059669]">15</span>
                <span className="text-[11px] text-slate-500 font-medium mt-1">분</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mt-2">
          <div className="flex bg-white rounded-full p-1 border border-slate-200 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.id}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
          
          {/* 시스템 현황 */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
            <h3 className="flex items-center gap-2 text-[14px] font-bold text-blue-600 border-b border-slate-100 pb-3">
              <TrendingUp className="w-4 h-4" /> 시스템 현황
            </h3>
            
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm font-bold text-slate-700">
                  <span>벡터화 진행률</span>
                  <span className="text-blue-600">20%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full w-[20%]"></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[13px] font-bold border-b border-dashed border-slate-100 pb-3 mt-4">
                <span className="text-slate-600">마지막 동기화</span>
                <span className="text-slate-800">2026. 4. 4. 오후 1:50:16</span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-bold">
                <span className="text-slate-600">평균 품질 점수</span>
                <span className="text-amber-500">80.4%</span>
              </div>
            </div>
          </div>

          {/* 주의사항 */}
          <div className="bg-[#fffbeb] rounded-xl border border-[#fef08a] shadow-sm p-5 flex flex-col gap-4">
            <h3 className="flex items-center gap-2 text-[14px] font-bold text-amber-600 border-b border-amber-100 pb-3">
              <AlertTriangle className="w-4 h-4" /> 주의사항
            </h3>
            
            <div className="mt-2 bg-white rounded-lg border border-yellow-200 p-4 flex items-center justify-between shadow-sm">
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-slate-800">반품 마스터</span>
                <span className="text-[12px] text-slate-500 mt-1">데이터 품질 점검 필요</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-[12px] font-bold border border-yellow-200">
                79.8%
              </div>
            </div>
          </div>

          {/* 테이블 성장 추이 */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col">
            <h3 className="flex items-center gap-2 text-[14px] font-bold text-blue-600 mb-1">
              <TrendingUp className="w-4 h-4" /> 테이블 성장 추이
            </h3>
            <p className="text-[10px] text-slate-400 mb-6">월별 테이블 수, 벡터화된 테이블 수, 관계 수의 변화 추이를 시계열로 표시합니다. 시간에 따른 온톨로지 확장 패턴을 확인할 수 있습니다.</p>
            
            <div className="flex-1 flex items-end relative min-h-[220px] px-8">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-slate-400 pr-2 pb-2 h-full">
                <span>140</span>
                <span>105</span>
                <span>70</span>
                <span>35</span>
                <span>0</span>
              </div>
              
              {/* Grid lines */}
              <div className="absolute left-6 right-32 top-0 bottom-6 flex flex-col justify-between h-full pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full h-[1px] bg-slate-100"></div>
                ))}
              </div>

              {/* Chart SVG */}
              <svg className="w-[calc(100%-8rem)] h-[calc(100%-1.5rem)] absolute left-6 bottom-6 overflow-visible" preserveAspectRatio="none">
                {/* 전체 테이블 (보라색) */}
                <polyline 
                  points="0,110 35,115 70,115 105,110 140,105 175,95 210,90 245,85 280,85 315,80 350,80 385,80" 
                  fill="none" stroke="#a855f7" strokeWidth="2" 
                />
                {[110, 115, 115, 110, 105, 95, 90, 85, 85, 80, 80, 80].map((y, i) => (
                  <circle key={`p1-${i}`} cx={i * 35} cy={y} r="3.5" fill="#a855f7" stroke="#fff" strokeWidth="1.5" />
                ))}

                {/* 벡터화됨 (청록색) */}
                <polyline 
                  points="0,140 35,130 70,125 105,130 140,135 175,130 210,130 245,120 280,125 315,125 350,120 385,120" 
                  fill="none" stroke="#06b6d4" strokeWidth="2" 
                />
                {[140, 130, 125, 130, 135, 130, 130, 120, 125, 125, 120, 120].map((y, i) => (
                  <circle key={`p2-${i}`} cx={i * 35} cy={y} r="3.5" fill="#06b6d4" stroke="#fff" strokeWidth="1.5" />
                ))}

                {/* 관계 (오렌지색) */}
                <polyline 
                  points="0,90 35,60 70,70 105,50 140,60 175,30 210,25 245,20 280,25 315,30 350,10 385,10" 
                  fill="none" stroke="#f97316" strokeWidth="2" 
                />
                {[90, 60, 70, 50, 60, 30, 25, 20, 25, 30, 10, 10].map((y, i) => (
                  <circle key={`p3-${i}`} cx={i * 35} cy={y} r="3.5" fill="#f97316" stroke="#fff" strokeWidth="1.5" />
                ))}
              </svg>

              {/* X-axis labels */}
              <div className="absolute left-6 right-32 bottom-0 flex justify-between text-[10px] text-slate-400">
                <span>1월</span><span>2월</span><span>3월</span><span>4월</span>
                <span>5월</span><span>6월</span><span>7월</span><span>8월</span>
                <span>9월</span><span>10월</span><span>11월</span><span>12월</span>
              </div>
              
              {/* Legend */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 pl-4 border-l border-slate-100">
                <div className="flex items-start gap-2">
                  <div className="w-3 h-3 bg-purple-500 mt-0.5 shrink-0"></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-700">전체 테이블</span>
                    <span className="text-[9px] text-slate-400">데이터베이스의 전체 테이블 수</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-3 h-3 bg-cyan-500 mt-0.5 shrink-0"></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-700">벡터화됨</span>
                    <span className="text-[9px] text-slate-400">AI 검색 가능한 테이블 수</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-3 h-3 bg-orange-500 mt-0.5 shrink-0"></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-700">관계</span>
                    <span className="text-[9px] text-slate-400">테이블 간 발견된 관계 수</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 관계 유형 분포 */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col">
            <h3 className="flex items-center gap-2 text-[14px] font-bold text-fuchsia-600 mb-1">
              <Network className="w-4 h-4" /> 관계 유형 분포
            </h3>
            <p className="text-[10px] text-slate-400 mb-6">테이블 간 관계를 유형별로 분류하여 표시합니다. Foreign Key, Naming Pattern, Data Match, Inferred 등 각 관계 유형의 비율을 확인할 수 있습니다.</p>
            
            <div className="flex-1 flex items-center justify-center gap-12">
              {/* Pie Chart (Conic Gradient) */}
              <div className="relative w-48 h-48 rounded-full border-4 border-white shadow-lg flex-shrink-0"
                   style={{
                     background: 'conic-gradient(#a855f7 0% 45%, #0ea5e9 45% 75%, #f97316 75% 90%, #10b981 90% 100%)'
                   }}>
                {/* Inner white circle for donut effect, optional. Let's keep it pie as requested. */}
                <div className="absolute inset-0 rounded-full bg-transparent border-4 border-white opacity-20"></div>
                
                {/* White separator lines using pseudo elements or just absolute divs */}
                <div className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-white origin-bottom -rotate-[0deg]"></div>
                <div className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-white origin-bottom rotate-[162deg]"></div>
                <div className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-white origin-bottom rotate-[270deg]"></div>
                <div className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-white origin-bottom rotate-[324deg]"></div>
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mt-1 shrink-0"></div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-slate-800">Foreign Key <span className="text-slate-500 font-medium">(45개)</span></span>
                    <span className="text-[10px] text-slate-400">스키마에 정의된 외래키 관계</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500 mt-1 shrink-0"></div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-slate-800">Naming Pattern <span className="text-slate-500 font-medium">(30개)</span></span>
                    <span className="text-[10px] text-slate-400">컬럼명 패턴으로 발견된 관계</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mt-1 shrink-0"></div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-slate-800">Data Match <span className="text-slate-500 font-medium">(15개)</span></span>
                    <span className="text-[10px] text-slate-400">데이터 값 비교로 발견된 관계</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mt-1 shrink-0"></div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-slate-800">Inferred <span className="text-slate-500 font-medium">(10개)</span></span>
                    <span className="text-[10px] text-slate-400">AI가 추론한 관계</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}