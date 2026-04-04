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
              <span className="text-2xl font-bold text-slate-800">1361</span>
              <span className="text-[13px] font-bold text-slate-800 mb-1">/s</span>
            </div>
            <Database className="absolute right-4 bottom-4 w-8 h-8 text-blue-500" strokeWidth={1.5} />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-center relative overflow-hidden h-[100px]">
            <span className="text-[12px] font-bold text-slate-500 mb-1">처리된 레코드</span>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-slate-800">38,295</span>
            </div>
            <BarChart2 className="absolute right-4 bottom-4 w-8 h-8 text-[#10b981]" strokeWidth={1.5} />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-center relative overflow-hidden h-[100px]">
            <span className="text-[12px] font-bold text-slate-500 mb-1">활성 연결</span>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-slate-800">13</span>
            </div>
            <Network className="absolute right-4 bottom-4 w-8 h-8 text-[#a855f7]" strokeWidth={1.5} />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-center relative overflow-hidden h-[100px]">
            <span className="text-[12px] font-bold text-slate-500 mb-1">시스템 부하</span>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-slate-800">91.0%</span>
            </div>
            <TrendingUp className="absolute right-4 top-4 w-8 h-8 text-[#ea580c]" strokeWidth={1.5} />
            <div className="absolute bottom-4 left-4 right-4 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-[91%] rounded-full"></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-center relative overflow-hidden h-[100px]">
            <span className="text-[12px] font-bold text-slate-500 mb-1">메모리 사용</span>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-slate-800">90.0%</span>
            </div>
            <Zap className="absolute right-4 top-4 w-8 h-8 text-[#eab308]" strokeWidth={1.5} />
            <div className="absolute bottom-4 left-4 right-4 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-[90%] rounded-full"></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-center relative overflow-hidden h-[100px]">
            <span className="text-[12px] font-bold text-slate-500 mb-1">이상 탐지</span>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-[#ef4444]">2</span>
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
              <span className="text-[13px] font-bold text-slate-500">오후 1:58:43</span>
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
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">1</div>
              <span className="text-[13px] font-bold text-slate-800">예측 모델</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <BrainCircuit className="absolute left-4 bottom-3 w-10 h-10 text-blue-200/60" />
              <div className="flex flex-col items-center leading-none mt-1">
                <span className="text-3xl font-bold text-blue-600">4</span>
                <span className="text-[12px] text-slate-600 font-bold mt-1">개</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl border border-red-200 shadow-sm overflow-hidden flex flex-col h-[110px]">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/50 border-b border-red-100">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs font-bold">2</div>
              <span className="text-[13px] font-bold text-slate-800">이상 탐지</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <AlertTriangle className="absolute left-4 bottom-3 w-10 h-10 text-red-200/60" />
              <div className="flex flex-col items-center leading-none mt-1">
                <span className="text-3xl font-bold text-red-600">2</span>
                <span className="text-[12px] text-slate-600 font-bold mt-1">건</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-yellow-100/50 rounded-xl border border-yellow-200 shadow-sm overflow-hidden flex flex-col h-[110px]">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/50 border-b border-yellow-100">
              <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs font-bold">3</div>
              <span className="text-[13px] font-bold text-slate-800">패턴</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <Target className="absolute left-4 bottom-3 w-10 h-10 text-amber-200/60" />
              <div className="flex flex-col items-center leading-none mt-1">
                <span className="text-3xl font-bold text-fuchsia-500">4</span>
                <span className="text-[12px] text-slate-600 font-bold mt-1">개</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200 shadow-sm overflow-hidden flex flex-col h-[110px]">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/50 border-b border-emerald-100">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">4</div>
              <span className="text-[13px] font-bold text-slate-800">처리된 레코드</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <Activity className="absolute left-4 bottom-3 w-10 h-10 text-emerald-200/60" />
              <div className="flex flex-col items-center leading-none mt-1">
                <span className="text-3xl font-bold text-emerald-600">38.3K</span>
                <span className="text-[12px] text-slate-600 font-bold mt-1">건</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-2">
          
          {/* 예측 모델 */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between p-4 bg-[#f8f5ff] border-b border-[#e9d5ff] rounded-t-xl">
              <h3 className="flex items-center gap-2 text-[16px] font-bold text-[#a855f7]">
                <BrainCircuit className="w-5 h-5" /> 예측 모델
              </h3>
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </div>
            <div className="p-4 flex flex-col gap-3">
              <div className="bg-[#f8fafc] rounded-lg p-4 flex items-center justify-between shadow-sm border border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-slate-800">고객 행동 예측 모델</span>
                  <span className="text-[11px] text-slate-500 mt-1">classification</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[12px] font-bold text-[#10b981]">ready</span>
                  <span className="text-[11px] text-slate-500 mt-1">정확도: 87.0%</span>
                </div>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-4 flex items-center justify-between shadow-sm border border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-slate-800">수출 예측 모델</span>
                  <span className="text-[11px] text-slate-500 mt-1">timeseries</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[12px] font-bold text-[#10b981]">ready</span>
                  <span className="text-[11px] text-slate-500 mt-1">정확도: 91.0%</span>
                </div>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-4 flex items-center justify-between shadow-sm border border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-slate-800">품질 불량 탐지 모델</span>
                  <span className="text-[11px] text-slate-500 mt-1">anomaly</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[12px] font-bold text-[#10b981]">ready</span>
                  <span className="text-[11px] text-slate-500 mt-1">정확도: 94.0%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 이상 탐지 */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between p-4 bg-[#f8f5ff] border-b border-[#e9d5ff] rounded-t-xl">
              <h3 className="flex items-center gap-2 text-[16px] font-bold text-[#a855f7]">
                <AlertTriangle className="w-5 h-5" /> 이상 탐지
              </h3>
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </div>
            <div className="p-4 flex flex-col gap-3">
              <div className="bg-[#f8fafc] rounded-lg p-4 shadow-sm border border-slate-100 flex gap-3">
                <div className="w-2 h-2 rounded-full bg-[#eab308] mt-1.5 shrink-0"></div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-slate-800 leading-snug">피크 시간 대비 시스템 성능 저하 감지</span>
                  <span className="text-[11px] text-slate-400 mt-1.5">2026. 4. 4. 오후 1:13:43</span>
                </div>
              </div>
            </div>
          </div>

          {/* 패턴 분석 */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between p-4 bg-[#f8f5ff] border-b border-[#e9d5ff] rounded-t-xl">
              <h3 className="flex items-center gap-2 text-[16px] font-bold text-[#a855f7]">
                <TrendingUp className="w-5 h-5" /> 패턴 분석
              </h3>
              <ChevronDown className="w-5 h-5 text-slate-400 opacity-0" /> {/* hidden for alignment if needed, or remove */}
            </div>
            <div className="p-4 flex flex-col gap-3">
              <div className="bg-[#f8fafc] rounded-lg p-4 flex items-center justify-between shadow-sm border border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-slate-800">Trend</span>
                  <span className="text-[11px] text-slate-500 mt-1">방향: increasing</span>
                </div>
                <span className="text-[12px] text-slate-600 font-bold">강도: 85%</span>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-4 flex items-center justify-between shadow-sm border border-slate-100">
                <span className="text-[14px] font-bold text-slate-800">Seasonal</span>
                <span className="text-[12px] text-slate-600 font-bold">강도: 72%</span>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-4 flex items-center justify-between shadow-sm border border-slate-100">
                <span className="text-[14px] font-bold text-slate-800">Cyclic</span>
                <span className="text-[12px] text-slate-600 font-bold">강도: 61%</span>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-4 flex items-center justify-between shadow-sm border border-slate-100">
                <span className="text-[14px] font-bold text-slate-800">Irregular</span>
                <span className="text-[12px] text-slate-600 font-bold">강도: 45%</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
