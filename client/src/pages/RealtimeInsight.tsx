import React, { useState } from 'react'
import {
  Activity,
  Database,
  BarChart2,
  Network,
  Zap,
  Shield,
  AlertTriangle,
  Clock,
  Eye,
  TrendingUp,
  Target,
  ChevronDown,
  Download,
  PauseCircle,
  BrainCircuit,
  Bot
} from 'lucide-react'

export default function RealtimeInsight() {
  const [activeTab, setActiveTab] = useState('개요')

  const tabs = [
    { id: '개요', icon: Eye },
    { id: '예측', icon: TrendingUp },
    { id: '이상탐지', icon: AlertTriangle },
    { id: '패턴', icon: Target },
    { id: '융합', icon: Zap },
  ]

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] overflow-y-auto custom-scrollbar">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-[#6366f1]" />
          <h1 className="text-[20px] font-bold text-[#6366f1] flex items-center gap-3">
            실시간 인사이트 플랫폼
            <span className="flex items-center gap-1 text-[11px] font-bold bg-[#4f46e5] text-white px-2 py-0.5 rounded shadow-sm">
              <Activity className="w-3 h-3" /> LIVE
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-sm transition-colors">
            24시간 <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#10b981] hover:bg-[#059669] rounded-lg shadow-sm transition-colors">
            <PauseCircle className="w-4 h-4" /> 일시정지
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#6366f1] hover:bg-[#4f46e5] rounded-lg shadow-sm transition-colors">
            <Download className="w-4 h-4" /> JSON
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Top 8 KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 shrink-0">
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-center relative overflow-hidden h-[100px]">
            <span className="text-[12px] font-bold text-slate-500 mb-1">데이터 수집</span>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-slate-800">1203</span>
              <span className="text-[13px] font-bold text-slate-800 mb-1">/s</span>
            </div>
            <Database className="absolute right-4 bottom-4 w-8 h-8 text-blue-500" strokeWidth={1.5} />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-center relative overflow-hidden h-[100px]">
            <span className="text-[12px] font-bold text-slate-500 mb-1">처리된 레코드</span>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-slate-800">47,430</span>
            </div>
            <BarChart2 className="absolute right-4 bottom-4 w-8 h-8 text-[#10b981]" strokeWidth={1.5} />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-center relative overflow-hidden h-[100px]">
            <span className="text-[12px] font-bold text-slate-500 mb-1">활성 연결</span>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-slate-800">14</span>
            </div>
            <Network className="absolute right-4 bottom-4 w-8 h-8 text-[#a855f7]" strokeWidth={1.5} />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-center relative overflow-hidden h-[100px]">
            <span className="text-[12px] font-bold text-slate-500 mb-1">시스템 부하</span>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-slate-800">66.0%</span>
            </div>
            <TrendingUp className="absolute right-4 top-4 w-8 h-8 text-[#ea580c]" strokeWidth={1.5} />
            <div className="absolute bottom-4 left-4 right-4 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-[66%] rounded-full"></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-center relative overflow-hidden h-[100px]">
            <span className="text-[12px] font-bold text-slate-500 mb-1">메모리 사용</span>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-slate-800">66.0%</span>
            </div>
            <Zap className="absolute right-4 top-4 w-8 h-8 text-[#eab308]" strokeWidth={1.5} />
            <div className="absolute bottom-4 left-4 right-4 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-[66%] rounded-full"></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-center relative overflow-hidden h-[100px]">
            <span className="text-[12px] font-bold text-slate-500 mb-1">이상 탐지</span>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-[#ef4444]">1</span>
            </div>
            <Shield className="absolute right-4 bottom-4 w-8 h-8 text-[#ef4444]" strokeWidth={1.5} />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-center relative overflow-hidden h-[100px]">
            <span className="text-[12px] font-bold text-slate-500 mb-1">알림</span>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-[#f97316]">2</span>
            </div>
            <AlertTriangle className="absolute right-4 bottom-4 w-8 h-8 text-[#f97316]" strokeWidth={1.5} />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-center relative overflow-hidden h-[100px]">
            <span className="text-[12px] font-bold text-slate-500 mb-1">업데이트</span>
            <div className="flex items-end gap-1 mt-1">
              <span className="text-[13px] font-bold text-slate-500">오후 2:10:48</span>
            </div>
            <Clock className="absolute right-4 top-4 w-8 h-8 text-slate-400" strokeWidth={1.5} />
          </div>

        </div>

        {/* Tabs */}
        <div className="flex justify-center mt-2 border-b border-slate-200 w-fit mx-auto pb-0">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3 text-[14px] font-bold transition-all relative ${
                  activeTab === tab.id
                    ? 'text-blue-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.id}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2 shrink-0">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200 shadow-sm overflow-hidden flex flex-col h-[110px]">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/50 border-b border-blue-100">
              <span className="text-[13px] font-bold text-slate-800">탐지된 패턴</span>
            </div>
            <div className="flex-1 flex flex-col justify-center px-4 relative">
              <TrendingUp className="absolute right-4 bottom-3 w-6 h-6 text-blue-600" />
              <div className="flex flex-col mt-1">
                <span className="text-3xl font-bold text-slate-800">4</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200 shadow-sm overflow-hidden flex flex-col h-[110px]">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/50 border-b border-emerald-100">
              <span className="text-[13px] font-bold text-slate-800">강한 패턴</span>
            </div>
            <div className="flex-1 flex flex-col justify-center px-4 relative">
              <Activity className="absolute right-4 bottom-3 w-6 h-6 text-emerald-600" />
              <div className="flex flex-col mt-1">
                <span className="text-3xl font-bold text-emerald-600">2</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl border border-red-200 shadow-sm overflow-hidden flex flex-col h-[110px]">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/50 border-b border-red-100">
              <span className="text-[13px] font-bold text-slate-800">이상 패턴</span>
            </div>
            <div className="flex-1 flex flex-col justify-center px-4 relative">
              <AlertTriangle className="absolute right-4 bottom-3 w-6 h-6 text-red-600" />
              <div className="flex flex-col mt-1">
                <span className="text-3xl font-bold text-red-600">0</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-fuchsia-50 to-purple-100/50 rounded-xl border border-purple-200 shadow-sm overflow-hidden flex flex-col h-[110px]">
            <div className="flex items-center justify-between px-3 py-2 bg-white/50 border-b border-purple-100">
              <span className="text-[13px] font-bold text-slate-800">예측 정확도</span>
            </div>
            <div className="flex-1 flex flex-col justify-center px-4 relative">
              <Target className="absolute right-4 bottom-3 w-6 h-6 text-fuchsia-600" />
              <div className="flex flex-col mt-1">
                <span className="text-3xl font-bold text-fuchsia-600">66%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Columns Grid -> Main Content */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" /> 시계열 패턴
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column - Trends/Seasonality */}
            <div className="flex flex-col gap-4">
              
              {/* 트렌드 */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                <div className="flex items-center p-4 bg-[#f8f5ff] border-b border-[#e9d5ff]">
                  <h3 className="flex items-center gap-2 text-[16px] font-bold text-[#6366f1]">
                    <TrendingUp className="w-5 h-5" /> 트렌드
                  </h3>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[12px] font-bold text-slate-500">패턴 강도</span>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[85%] rounded-full"></div>
                      </div>
                      <span className="text-[13px] font-bold text-slate-800">85%</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <span className="text-[12px] font-bold text-slate-500">방향성</span>
                    <div>
                      <span className="inline-flex px-3 py-1 rounded-full bg-blue-600 text-white text-[12px] font-bold">증가</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-[12px] font-bold text-slate-500">변화점</span>
                    <span className="text-[13px] font-bold text-slate-800">2개 감지됨</span>
                  </div>
                </div>
              </div>

              {/* 계절성 */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                <div className="flex items-center p-4 bg-[#f8f5ff] border-b border-[#e9d5ff]">
                  <h3 className="flex items-center gap-2 text-[16px] font-bold text-[#6366f1]">
                    <Activity className="w-5 h-5" /> 계절성
                  </h3>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[12px] font-bold text-slate-500">패턴 강도</span>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[72%] rounded-full"></div>
                      </div>
                      <span className="text-[13px] font-bold text-slate-800">72%</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-[12px] font-bold text-slate-500">주기</span>
                    <span className="text-[13px] font-bold text-slate-800">7일</span>
                  </div>
                </div>
              </div>

              {/* 순환성 */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                <div className="flex items-center p-4 bg-[#f8f5ff] border-b border-[#e9d5ff]">
                  <h3 className="flex items-center gap-2 text-[16px] font-bold text-[#6366f1]">
                    <Clock className="w-5 h-5" /> 순환성
                  </h3>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[12px] font-bold text-slate-500">패턴 강도</span>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[61%] rounded-full"></div>
                      </div>
                      <span className="text-[13px] font-bold text-slate-800">61%</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column - Anomaly & Recommendations */}
            <div className="flex flex-col gap-4">
              
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-bold text-amber-600 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> 이상 패턴 탐지
                </h2>
              </div>

              <div className="bg-white rounded-xl border border-amber-300 border-l-[6px] border-l-amber-400 shadow-sm p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <h3 className="flex items-center gap-2 text-[15px] font-bold text-rose-600">
                    <AlertTriangle className="w-4 h-4" /> 피크 시간 대비 시스템 성능 저하 감지
                  </h3>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded">MEDIUM</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] font-bold text-slate-500">영향받는 메트릭</span>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 text-[12px] font-bold rounded-md">시스템 응답시간</span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 text-[12px] font-bold rounded-md">CPU 사용률</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-[12px] font-bold text-slate-500">이상 점수</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-slate-800">2.1</span>
                    <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-[60%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f8f5ff] rounded-xl border border-[#e9d5ff] p-5 flex flex-col mt-4">
                <h3 className="flex items-center gap-2 text-[16px] font-bold text-[#a855f7] mb-4">
                  <Target className="w-5 h-5" /> 패턴 기반 권장사항
                </h3>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                    <Search className="w-4 h-4 text-blue-500" />
                    <span className="text-[13px] font-bold text-slate-700">강한 트렌드 패턴을 활용한 예측 모델 구축 권장</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    <span className="text-[13px] font-bold text-slate-700">계절성 패턴을 고려한 리소스 배분 최적화</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="text-[13px] font-bold text-slate-700">이상 패턴에 대한 자동 알림 시스템 구축</span>
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
