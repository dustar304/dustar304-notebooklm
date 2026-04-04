import React, { useState } from 'react'
import {
  Database,
  FileText,
  HardDrive,
  Clock,
  TableProperties,
  RefreshCcw,
  CheckCircle2,
  Zap,
  Check,
  Settings,
  X
} from 'lucide-react'

export default function AIOntologyAnalysis() {
  const [showVectorizeModal, setShowVectorizeModal] = useState(false);

  const handleVectorizeClick = () => {
    setShowVectorizeModal(true);
  };

  const handleCloseModal = () => {
    setShowVectorizeModal(false);
  };

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
      <button onClick={handleVectorizeClick} className="absolute bottom-6 right-6 w-14 h-14 bg-[#4f46e5] hover:bg-[#4338ca] rounded-full shadow-[0_4px_14px_rgba(79,70,229,0.5)] flex items-center justify-center text-white transition-transform hover:scale-105 active:scale-95 z-50">
        <Zap className="w-6 h-6 fill-white" />
      </button>

      {/* Vectorization Modal */}
      {showVectorizeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Database className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">전체 테이블 벡터화 설정</h3>
                  <p className="text-xs text-slate-500 mt-0.5">데이터베이스의 모든 테이블을 JSON 형태로 변환하여 벡터 캐싱을 진행합니다.</p>
                </div>
              </div>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              
              {/* Flow Diagram */}
              <div className="flex flex-col md:flex-row items-center justify-between bg-slate-50 rounded-xl p-6 border border-slate-200 mb-8 shadow-inner">
                <div className="flex flex-col items-center gap-2 text-center w-24">
                  <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700">
                    <TableProperties className="w-5 h-5" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700 leading-tight">테이블 데이터</span>
                  <span className="text-[10px] text-slate-500">RDB 스키마</span>
                </div>
                
                <div className="hidden md:flex flex-col items-center flex-1 px-2">
                  <div className="h-[1px] w-full bg-slate-300 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 border-[4px] border-transparent border-l-slate-300"></div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2 text-center mt-4 md:mt-0 w-24">
                  <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700 leading-tight">긴 문자열</span>
                  <span className="text-[10px] text-slate-500">JSON Format</span>
                </div>

                <div className="hidden md:flex flex-col items-center flex-1 px-2">
                  <div className="h-[1px] w-full bg-blue-300 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 border-[4px] border-transparent border-l-blue-300"></div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-500 mt-1.5 whitespace-nowrap bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">TF-IDF / 임베딩</span>
                </div>

                <div className="flex flex-col items-center gap-2 text-center mt-4 md:mt-0 w-24">
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 shadow-sm flex items-center justify-center text-blue-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-400/20 animate-pulse"></div>
                    <HardDrive className="w-5 h-5 relative z-10" />
                  </div>
                  <span className="text-[13px] font-bold text-blue-600 leading-tight">JSON 캐싱</span>
                  <span className="text-[10px] text-blue-400">Vector Store</span>
                </div>
              </div>

              {/* Settings Form */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-slate-500" /> 변환 형식 설정
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex items-start gap-3 p-4 border-2 border-blue-500 bg-blue-50 rounded-xl cursor-pointer shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-bl-full -mr-8 -mt-8"></div>
                      <input type="radio" name="format" className="mt-1 w-4 h-4 text-blue-600" defaultChecked />
                      <div className="relative z-10">
                        <span className="block text-sm font-bold text-blue-900 mb-1">단일 JSON 객체 (Row-level)</span>
                        <span className="block text-[11px] text-slate-500 leading-relaxed">각 행(Row)을 하나의 독립적인 JSON 객체로 변환하여 개별 문서로 벡터 데이터베이스에 인덱싱합니다.</span>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-4 border border-slate-200 bg-slate-50 rounded-xl cursor-not-allowed opacity-60 grayscale">
                      <input type="radio" name="format" className="mt-1 w-4 h-4 text-slate-400" disabled />
                      <div>
                        <span className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">계층형 JSON (Table-level) <span className="px-1.5 py-0.5 bg-slate-200 text-[9px] rounded-sm text-slate-500">준비중</span></span>
                        <span className="block text-[11px] text-slate-400 leading-relaxed">테이블 전체를 하나의 JSON 트리로 묶어 거시적 컨텍스트를 유지합니다.</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-slate-500" /> 임베딩 모델 선택
                  </h4>
                  <select className="w-full bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none shadow-sm transition-shadow">
                    <option>OpenAI text-embedding-3-small (기본 설정, 빠름)</option>
                    <option>OpenAI text-embedding-3-large (높은 정확도)</option>
                    <option>Cohere embed-multilingual-v3.0 (다국어 최적화)</option>
                    <option>Local BGE-M3 (TF-IDF & Dense 하이브리드 검색)</option>
                  </select>
                  <p className="text-[11px] text-slate-500 mt-2 ml-1">※ 한글 데이터의 정확한 패턴 매칭을 위해 BGE-M3 또는 OpenAI 모델 사용을 권장합니다.</p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="text-[11px] text-slate-400 font-medium">
                예상 소요 시간: 약 3~5분 (데이터 크기에 따라 다름)
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 bg-white border border-slate-200 rounded-xl transition-colors shadow-sm"
                >
                  취소
                </button>
                <button 
                  onClick={() => {
                    alert('전체 테이블 벡터화 및 JSON 캐싱 작업이 백그라운드에서 시작되었습니다.');
                    handleCloseModal();
                  }}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm flex items-center gap-2 transition-all hover:shadow-md"
                >
                  <Database className="w-4 h-4" /> 벡터화 실행
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
