import React from 'react'
import {
  Database,
  FileText,
  HardDrive,
  Clock,
  TableProperties,
  RefreshCcw,
  CheckCircle2,
  Zap,
  Check
} from 'lucide-react'

export default function AIOntologyAnalysis() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] p-4 gap-4 overflow-y-auto custom-scrollbar relative">
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
        
        {/* Card 1 */}
        <div className="bg-[#eff6ff] rounded-xl border border-[#bfdbfe] overflow-hidden flex flex-col relative h-[100px]">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/50 border-b border-[#bfdbfe]">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">1</div>
            <span className="text-[13px] font-bold text-slate-700">벡터화 테이블</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <Database className="absolute left-4 bottom-3 w-8 h-8 text-blue-200/50" />
            <div className="flex flex-col items-center leading-none mt-1">
              <span className="text-3xl font-bold text-blue-600">206</span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">개</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#f8fafc] rounded-xl border border-slate-200 overflow-hidden flex flex-col relative h-[100px]">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/50 border-b border-slate-200">
            <div className="w-5 h-5 rounded-full bg-fuchsia-100 flex items-center justify-center text-fuchsia-600 text-xs font-bold">2</div>
            <span className="text-[13px] font-bold text-slate-700">총 문서</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <FileText className="absolute left-4 bottom-3 w-8 h-8 text-slate-200" />
            <div className="flex flex-col items-center leading-none mt-1">
              <span className="text-3xl font-bold text-[#c026d3]">8,083</span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">개</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#fffbeb] rounded-xl border border-[#fef08a] overflow-hidden flex flex-col relative h-[100px]">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/50 border-b border-[#fef08a]">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">3</div>
            <span className="text-[13px] font-bold text-slate-700">캐시 크기</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <HardDrive className="absolute left-4 bottom-3 w-8 h-8 text-amber-200/60" />
            <div className="flex flex-col items-center leading-none mt-1">
              <span className="text-3xl font-bold text-[#059669]">206</span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">MB</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-[#f8fafc] rounded-xl border border-slate-200 overflow-hidden flex flex-col relative h-[100px]">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/50 border-b border-slate-200">
            <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xs font-bold">4</div>
            <span className="text-[13px] font-bold text-slate-700">최근 업데이트</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <Clock className="absolute left-4 bottom-3 w-8 h-8 text-slate-200" />
            <div className="flex flex-col items-center leading-none mt-1">
              <span className="text-2xl font-bold text-[#ea580c] mt-1">4월 3일</span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">일자</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Lists Section */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0 pb-16">
        
        {/* Left Column: Available Tables */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#fffbeb]/50 border-b border-slate-200">
            <div className="flex items-center gap-2 text-orange-500">
              <TableProperties className="w-4 h-4" />
              <span className="text-[13px] font-bold">사용 가능한 테이블</span>
            </div>
            <button className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50">
              <RefreshCcw className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
            
            {/* Items */}
            <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-slate-700">ac_detail</span>
                <Check className="w-3 h-3 text-slate-600" strokeWidth={3} />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded text-slate-700 text-xs font-bold hover:bg-slate-50">
                <Zap className="w-3.5 h-3.5" /> 재
              </button>
            </div>

            <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
              <span className="text-[13px] font-bold text-slate-700">ac_detail_temp</span>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 border border-blue-600 rounded text-white text-xs font-bold hover:bg-blue-700 shadow-sm">
                <Zap className="w-3.5 h-3.5 fill-white" /> 벡터화
              </button>
            </div>

            <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
              <span className="text-[13px] font-bold text-slate-700">ac_detail_trans</span>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 border border-blue-600 rounded text-white text-xs font-bold hover:bg-blue-700 shadow-sm">
                <Zap className="w-3.5 h-3.5 fill-white" /> 벡터화
              </button>
            </div>

            <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
              <span className="text-[13px] font-bold text-slate-700">ac_detail_trans_cost</span>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 border border-blue-600 rounded text-white text-xs font-bold hover:bg-blue-700 shadow-sm">
                <Zap className="w-3.5 h-3.5 fill-white" /> 벡터화
              </button>
            </div>

            <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
              <span className="text-[13px] font-bold text-slate-700">ac_ilbo_mst</span>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 border border-blue-600 rounded text-white text-xs font-bold hover:bg-blue-700 shadow-sm">
                <Zap className="w-3.5 h-3.5 fill-white" /> 벡터화
              </button>
            </div>
            
          </div>
        </div>

        {/* Right Column: Vectorized Tables */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#ecfdf5]/50 border-b border-slate-200">
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-[13px] font-bold">벡터화된 테이블</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
            
            {/* Items */}
            {['cust_mst', 'item_mst', 'emp_mst', 't_pur_mst', 'dg_tax_mst', 'dg_mst'].map((tableName) => (
              <div key={tableName} className="flex items-center justify-between px-4 py-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                <span className="text-[13px] font-bold text-slate-700">{tableName}</span>
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </div>
              </div>
            ))}
            
          </div>
        </div>

      </div>

      {/* Floating Action Button */}
      <button className="absolute bottom-6 right-6 w-14 h-14 bg-[#4f46e5] hover:bg-[#4338ca] rounded-full shadow-[0_4px_14px_rgba(79,70,229,0.5)] flex items-center justify-center text-white transition-transform hover:scale-105 active:scale-95 z-50">
        <Zap className="w-6 h-6 fill-white" />
      </button>

    </div>
  )
}
