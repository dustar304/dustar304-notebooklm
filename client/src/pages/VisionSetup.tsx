import { useState, useRef, useEffect } from "react";
import {
  Settings, Save,
  Camera, CheckCircle, ChevronDown, Check,
  RotateCcw, Search, AlertCircle, HelpCircle, Trash2,
  Square, X, Package
} from "lucide-react";
import SmartFactoryWrapper from "@/components/SmartFactoryWrapper";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useAppStore } from "../store/useAppStore";
import { useQuery } from "@tanstack/react-query";

interface Item {
  id: number;
  itemCd: string;
  itemName: string;
  std: string;
}

export default function VisionSetupPage() {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // 글로벌 스토어 연동 (설정 데이터 및 불량 유형 데이터 공유)
  const setupData = useAppStore(s => s.visionSetupData);
  const setSetupData = useAppStore(s => s.setVisionSetupData);
  const defectTypes = useAppStore(s => s.defectTypes);

    // 로컬 폼 상태
  const [activeTab, setActiveTab] = useState<'software' | 'hardware'>('software');
  const [form, setForm] = useState(setupData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [defectCounts, setDefectCounts] = useState<Record<string, number>>({
    'OK': 6,
    '가공불량(양면삭)': 4
  });

  const [isLive, setIsLive] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [itemSearchText, setItemSearchText] = useState("");

  const { data: items = [] } = useQuery<Item[]>({
    queryKey: ["/api/items"],
    queryFn: async () => {
      const res = await fetch("/api/items");
      if (!res.ok) throw new Error("조회 실패");
      return res.json();
    },
  });

  const filteredItems = items.filter(item => {
    if (!itemSearchText) return true;
    const lowerSearch = itemSearchText.toLowerCase();
    return (
      (item.itemName && item.itemName.toLowerCase().includes(lowerSearch)) || 
      (item.itemCd && item.itemCd.toLowerCase().includes(lowerSearch))
    );
  });

  // 컴포넌트 마운트 시 스토어 데이터를 폼으로 복사
  useEffect(() => {
    setForm(setupData);
  }, [setupData]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) { 
        videoRef.current.srcObject = stream; 
        streamRef.current = stream; 
        setIsLive(true); 
      }
    } catch (err) {
      console.error("Camera Error:", err);
      toast({ variant: "destructive", title: "카메라 오류", description: "카메라를 실행할 수 없습니다." });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) { 
      streamRef.current.getTracks().forEach(track => track.stop()); 
      streamRef.current = null; 
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsLive(false);
  };

  useEffect(() => { return () => stopCamera(); }, []);

  const handleSave = () => {
    setSetupData(form);
    toast({ title: "설정 저장 완료", description: "AI 비전 검사 기준이 저장되었습니다." });
  };

  const toggleDefectSelection = (typeName: string) => {
    setForm(prev => {
      const selected = prev.selectedDefects.includes(typeName)
        ? prev.selectedDefects.filter(t => t !== typeName)
        : [...prev.selectedDefects, typeName];
      return { ...prev, selectedDefects: selected };
    });
  };

  const handleTrainClick = (type: string) => {
    setDefectCounts(prev => ({
      ...prev,
      [type]: (prev[type] || 0) + 1
    }));
    toast({ title: "학습 데이터 추가", description: `[${type}] 데이터가 추가되었습니다.`, duration: 1500 });
  };

  const handleRemoveTrainData = (type: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDefectCounts(prev => {
      const current = prev[type] || 0;
      if (current <= 0) return prev;
      
      const newCount = current - 1;
      const newState = { ...prev };
      if (newCount === 0) {
        delete newState[type];
      } else {
        newState[type] = newCount;
      }
      return newState;
    });
    toast({ title: "학습 데이터 삭제", description: `[${type}] 데이터가 1건 삭제되었습니다.`, duration: 1500 });
  };

  const handleResetCounts = () => {
    setDefectCounts({});
    toast({ title: "초기화 완료", description: "학습 데이터가 초기화되었습니다.", duration: 1500 });
  };

  const removeDefect = (typeName: string) => {
    setForm(prev => ({
      ...prev,
      selectedDefects: prev.selectedDefects.filter(t => t !== typeName)
    }));
  };

  const inputCls = "h-9 px-3 text-sm bg-white border border-slate-300 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500";
  const labelCls = "text-xs text-slate-600 mb-1.5 block font-medium";
  const cardCls = "bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden card-animate relative";

  return (
    <SmartFactoryWrapper>
      <Toaster />
      <style>{`
        @keyframes slide-in { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .card-animate { animation: slide-in .4s ease-out both; }
      `}</style>

      <div className="flex flex-col absolute inset-0 bg-[#f8f9fc] p-2">
        {/* 상단 타이틀 */}
        <div className="relative bg-purple-50/50 border border-purple-100 rounded-xl px-4 py-3 mb-2 flex flex-wrap items-center gap-3 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-purple-600" />
            <div>
              <h2 className="text-purple-900 font-bold text-lg tracking-tight">AI 비전 검사 설정</h2>
              <p className="text-slate-500 text-[11px] mt-0.5">딥러닝 모델 학습 및 하드웨어 비전 장비 연동 설정</p>
            </div>
          </div>
        </div>

          {/* 탭 헤더 영역 추가 */}
          <div className="flex gap-1 px-2 mt-2 relative z-20">
            <button 
              onClick={() => setActiveTab('software')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border rounded-t-xl transition-colors ${activeTab === 'software' ? 'bg-white text-purple-700 border-purple-200 border-b-white shadow-[0_-2px_10px_-4px_rgba(168,85,247,0.2)] z-10' : 'bg-slate-200/50 text-slate-500 border-transparent border-b-transparent hover:bg-slate-300/50'}`}
              style={{ marginBottom: activeTab === 'software' ? '-1px' : '0' }}
            >
              <Camera className="w-4 h-4" />
              소프트웨어 AI 비전 (웹캠)
            </button>
            <button 
              onClick={() => setActiveTab('hardware')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border rounded-t-xl transition-colors ${activeTab === 'hardware' ? 'bg-white text-purple-700 border-purple-200 border-b-white shadow-[0_-2px_10px_-4px_rgba(168,85,247,0.2)] z-10' : 'bg-slate-200/50 text-slate-500 border-transparent border-b-transparent hover:bg-slate-300/50'}`}
              style={{ marginBottom: activeTab === 'hardware' ? '-1px' : '0' }}
            >
              <div className="flex flex-col gap-[3px] mt-0.5">
                <div className="flex gap-[3px]">
                  <div className="w-[5px] h-[5px] border-[2px] border-current rounded-sm"></div>
                  <div className="w-[11px] h-[5px] border-[2px] border-current rounded-sm"></div>
                </div>
                <div className="flex gap-[3px]">
                  <div className="w-[11px] h-[5px] border-[2px] border-current rounded-sm"></div>
                  <div className="w-[5px] h-[5px] border-[2px] border-current rounded-sm"></div>
                </div>
              </div>
              비전 매트릭스 (하드웨어 연동)
            </button>
          </div>

          <div className="flex flex-col flex-1 overflow-hidden z-10 bg-transparent rounded-xl rounded-tl-none p-0 relative">
          {activeTab === 'software' ? (
            <div className="flex flex-col lg:flex-row gap-2 flex-1 p-2 h-full w-full bg-white border border-purple-200 shadow-[0_2px_10px_-4px_rgba(168,85,247,0.2)] rounded-xl rounded-tl-none -mt-[1px] relative z-10">
              {/* 좌측 영역 (카메라 및 학습 데이터 관리) */}
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            {/* 실시간 카메라 미리보기 */}
            <div className={`bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden card-animate relative flex flex-col cursor-pointer`} style={{ animationDelay: ".05s" }} onClick={!isLive ? startCamera : undefined}>
              <div className="absolute top-4 left-4 z-10 bg-[#8fa4b8]/70 backdrop-blur-md border border-white/20 rounded-xl p-3.5 shadow-lg text-sm w-56 text-white transition-all">
                <div className="flex items-center gap-2 font-bold mb-3 pb-3 border-b border-white/20 text-white/90">
                  <AlertCircle className="w-4 h-4" /> 가이드
                </div>
                정상/불량 버튼을 10회 이상 클릭하여 학습시키세요.
              </div>
              <div className="bg-[#f1f5f9] relative aspect-video flex items-center justify-center min-h-[300px] w-full">
                <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-contain ${!isLive ? 'hidden' : ''}`} />
                {!isLive && (
                  <div className="text-slate-400 flex flex-col items-center gap-3">
                    <Camera className="w-12 h-12 opacity-30" />
                    <span className="text-sm font-medium">카메라 대기 중</span>
                  </div>
                )}
                {isLive && (
                   <button onClick={stopCamera} className="absolute top-4 right-4 px-3 py-1.5 rounded-md text-xs font-semibold bg-white text-rose-600 hover:bg-rose-50 border border-slate-200 shadow-sm flex items-center gap-1.5 transition-all">
                     <Square className="w-3.5 h-3.5 fill-current" /> 종료
                   </button>
                )}
              </div>
            </div>

            {/* 학습 데이터 관리 패널 */}
            <div className={`bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden card-animate relative flex-1 flex flex-col min-h-[250px]`} style={{ animationDelay: ".1s" }}>
              <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 text-[13px] font-semibold">학습 데이터 관리 - 버튼 클릭시 AI 학습 검사 품목에 따라 학습하세요.</span>
                </div>
                <button onClick={handleResetCounts} className="text-[12px] text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors">
                  <RotateCcw className="w-3.5 h-3.5" /> 전체 초기화
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {/* 정상 버튼 */}
                  <button 
                    onClick={() => handleTrainClick('OK')}
                    className="bg-[#ecfdf5] border-2 border-[#10b981] rounded-xl p-4 flex flex-col items-center justify-center hover:bg-emerald-100 transition-all group relative w-full h-full min-h-[90px]"
                  >
                     <div className="flex items-center justify-center gap-1.5 mb-1">
                        <CheckCircle className="w-5 h-5 text-[#10b981] group-hover:scale-110 transition-transform" />
                        <span className="text-[#10b981] font-bold text-[15px]">OK (정상)</span>
                     </div>
                     <span className="text-[#10b981] opacity-70 text-[11px]">학습 데이터 추가</span>
                     
                     <div className="absolute -top-3 -right-3 flex items-center bg-white rounded-full overflow-hidden border border-[#10b981] shadow-sm z-10 transition-all h-[26px] min-w-[26px] justify-center">
                       <span className="px-1.5 text-[12px] text-[#10b981] font-bold">
                         {defectCounts['OK'] || 0}
                       </span>
                       {(defectCounts['OK'] || 0) > 0 && (
                         <div 
                           onClick={(e) => handleRemoveTrainData('OK', e)}
                           className="hidden group-hover:flex px-1.5 hover:bg-rose-50 bg-white text-rose-600 transition-colors cursor-pointer border-l border-[#10b981] items-center justify-center h-full"
                           title="데이터 1건 삭제"
                         >
                           <Trash2 className="w-3 h-3" />
                         </div>
                       )}
                     </div>
                  </button>
                  
                  {/* 선택된 불량 유형 버튼들 */}
                  {form.selectedDefects.map((defect) => (
                    <button 
                      key={defect} 
                      onClick={() => handleTrainClick(defect)}
                      className="bg-[#fff1f2] border-2 border-[#fecdd3] rounded-xl p-4 flex flex-col items-center justify-center hover:bg-rose-100 transition-all group relative w-full h-full min-h-[90px]"
                    >
                      <div className="flex items-center justify-center gap-1.5 mb-1 max-w-full">
                         <Camera className="w-4 h-4 text-[#f43f5e] shrink-0 group-hover:scale-110 transition-transform" />
                         <span className="text-[#f43f5e] font-bold text-[14px] truncate px-1" title={defect}>{defect}</span>
                      </div>
                      <span className="text-[#f43f5e] opacity-70 text-[11px]">불량 예시 추가</span>
                      
                      <div className="absolute -top-3 -right-3 flex items-center bg-white rounded-full overflow-hidden border border-[#fecdd3] shadow-sm z-10 transition-all h-[26px] min-w-[26px] justify-center">
                        <span className="px-1.5 text-[12px] text-[#f43f5e] font-bold">
                          {defectCounts[defect] || 0}
                        </span>
                        {(defectCounts[defect] || 0) > 0 && (
                          <div 
                            onClick={(e) => handleRemoveTrainData(defect, e)}
                            className="hidden group-hover:flex px-1.5 hover:bg-rose-100 bg-white text-rose-600 transition-colors cursor-pointer border-l border-[#fecdd3] items-center justify-center h-full"
                            title="데이터 1건 삭제"
                          >
                            <Trash2 className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}

                  {form.selectedDefects.length === 0 && (
                     <div className="col-span-1 md:col-span-2 py-4 flex flex-col items-center justify-center text-center text-slate-400 text-[12px] border-2 border-dashed border-slate-200 rounded-xl min-h-[90px] bg-slate-50/50">
                       우측 설정에서<br/>불량 유형을 추가하세요
                     </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 우측 영역 (검사 기준 설정 폼) */}
          <div className={`bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden card-animate relative w-full lg:w-[420px] shrink-0 flex flex-col z-20`} style={{ animationDelay: ".15s" }}>
            <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2 bg-slate-50">
              <Settings className="w-4 h-4 text-purple-500" />
              <span className="text-purple-600 text-[15px] font-bold">검사 기준 설정</span>
            </div>
            
            <div className="p-6 flex flex-col gap-6 overflow-y-auto flex-1 bg-white">
              
              {/* 불량 유형 다중 선택 컴포넌트 */}
              <div className="relative">
                <label className={labelCls}>검사할 불량 유형 추가</label>
                <div 
                  className={`${inputCls} flex items-center justify-between cursor-pointer`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className={form.selectedDefects.length ? 'text-slate-800' : 'text-slate-400'}>
                    {form.selectedDefects.length ? `${form.selectedDefects.length}개 유형 선택됨` : '유형 선택...'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-[70px] left-0 right-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto py-1">
                    {defectTypes.map((type) => (
                      <div 
                        key={type.id}
                        className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                        onClick={() => toggleDefectSelection(type.typeName)}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${form.selectedDefects.includes(type.typeName) ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                           {form.selectedDefects.includes(type.typeName) && <Check className="w-3 h-3 text-white" />}
                        </div>
                        {type.typeName} <span className="text-[10px] text-slate-400 ml-auto">{type.groupName}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* 선택된 태그 표시 영역 */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {form.selectedDefects.map(defect => (
                    <span key={defect} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 border border-blue-100 text-blue-600 text-[11px]">
                      {defect}
                      <button onClick={() => removeDefect(defect)} className="hover:text-rose-500 transition-colors ml-0.5">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>검사 주기 (초)</label>
                  <input 
                    type="number" 
                    className={`${inputCls} w-full text-center`} 
                    value={form.inspectionInterval} 
                    onChange={e => setForm({...form, inspectionInterval: Number(e.target.value)})} 
                  />
                </div>
                <div>
                  <label className={labelCls}>판정 임계값 (%)</label>
                  <input 
                    type="number" 
                    className={`${inputCls} w-full text-center`} 
                    value={form.confidenceThreshold} 
                    onChange={e => setForm({...form, confidenceThreshold: Number(e.target.value)})} 
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>검사 부서</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className={`${inputCls} w-full pr-9`} 
                    value={form.department} 
                    placeholder="부서 선택"
                    onChange={e => setForm({...form, department: e.target.value})} 
                  />
                  <div className="absolute right-0 top-0 h-9 w-9 flex items-center justify-center border-l border-slate-200 bg-slate-50 rounded-r-md cursor-pointer hover:bg-slate-100 transition-colors">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className={labelCls}>검사 품목</label>
                <div className="relative">
                  <input 
                    type="text" 
                    readOnly
                    className={`${inputCls} w-full pr-9 cursor-pointer`} 
                    value={form.itemName} 
                    onClick={() => setIsItemModalOpen(true)}
                    placeholder="품목 선택"
                  />
                  <div 
                    className="absolute right-0 top-0 h-9 w-9 flex items-center justify-center border-l border-slate-200 bg-slate-50 rounded-r-md cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => setIsItemModalOpen(true)}
                  >
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-4">
                <div className="flex items-center gap-1.5 text-blue-500 text-[12px]">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <p>설정 변경 후 반드시 <b>[저장하기]</b>를 클릭하세요.</p>
                </div>
                <button onClick={handleSave} className="w-full py-3 bg-[#9b87f5] hover:bg-[#8b77e5] text-white font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> AI 모델 및 설정 저장
                </button>
              </div>
            </div>
          </div>
        </div>
          ) : (
              <div className="flex flex-col lg:flex-row gap-6 flex-1 h-full w-full bg-[#f8f9fc] border border-indigo-100 shadow-[0_2px_10px_-4px_rgba(99,102,241,0.2)] rounded-xl rounded-tl-none -mt-[1px] p-6 overflow-hidden relative z-10">
                {/* 하드웨어 연동 좌측 (장비 통신 설정) */}
                <div className="flex-1 bg-white border border-slate-200 shadow-sm rounded-xl p-6 flex flex-col h-full overflow-y-auto min-w-[300px] xl:max-w-none">
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
                    <div className="flex flex-col gap-[2px] w-5 h-5 items-center justify-center text-indigo-500">
                      <div className="flex gap-[2px]">
                         <div className="w-[4px] h-[4px] border-[1.5px] border-current rounded-sm"></div>
                         <div className="w-[8px] h-[4px] border-[1.5px] border-current rounded-sm"></div>
                      </div>
                      <div className="flex gap-[2px]">
                         <div className="w-[8px] h-[4px] border-[1.5px] border-current rounded-sm"></div>
                         <div className="w-[4px] h-[4px] border-[1.5px] border-current rounded-sm"></div>
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-800 text-[15px]">장비 통신 설정 (TCP/IP & API)</h3>
                  </div>
                  
                    <div className="flex-1 flex flex-col space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>장비 IP 주소</label>
                          <input type="text" className={`${inputCls} w-full bg-slate-50 border-slate-200`} defaultValue="192.168.1.100" />
                        </div>
                        <div>
                          <label className={labelCls}>포트 (Port)</label>
                          <input type="text" className={`${inputCls} w-full bg-slate-50 border-slate-200`} defaultValue="5000" />
                        </div>
                      </div>
                      
                      <div>
                        <label className={labelCls}>통신 프로토콜</label>
                        <select className={`${inputCls} w-full appearance-none bg-slate-50 border-slate-200`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1em 1em` }}>
                          <option>TCP/IP Socket</option>
                          <option>HTTP REST API</option>
                          <option>Modbus TCP</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className={labelCls}>장비 식별자 (Equipment ID)</label>
                        <input type="text" className={`${inputCls} w-full bg-slate-50 border-slate-200`} defaultValue="VSN-MATRIX-001" />
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-slate-100">
                        <button className="w-full py-2.5 border border-indigo-200 text-indigo-700 bg-indigo-50/50 font-bold rounded-lg hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2 shadow-sm">
                          <Search className="w-4 h-4" /> 연결 테스트 (Ping)
                        </button>
                      </div>
                    </div>
                </div>

                {/* 하드웨어 연동 우측 (검사 데이터 매핑 설정) */}
                <div className="w-[450px] xl:w-[500px] shrink-0 bg-white border border-slate-200 shadow-sm rounded-xl p-6 flex flex-col h-full overflow-y-auto">
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
                    <Settings className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-slate-800 text-[15px]">검사 데이터 매핑 설정</h3>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label className={labelCls}>검사 부서</label>
                        <div className="relative">
                          <input type="text" className={`${inputCls} w-full pr-9 bg-slate-50`} placeholder="부서 선택" />
                          <div className="absolute right-0 top-0 h-9 w-9 flex items-center justify-center border-l border-slate-200 bg-slate-100 rounded-r-md cursor-pointer hover:bg-slate-200 transition-colors">
                            <Search className="w-3.5 h-3.5 text-slate-500" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className={labelCls}>대상 품목</label>
                        <div className="relative">
                          <input type="text" className={`${inputCls} w-full pr-9 bg-slate-50`} placeholder="품목 선택" />
                          <div className="absolute right-0 top-0 h-9 w-9 flex items-center justify-center border-l border-slate-200 bg-slate-100 rounded-r-md cursor-pointer hover:bg-slate-200 transition-colors">
                            <Search className="w-3.5 h-3.5 text-slate-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                      <div className="mt-auto pt-4 border-t border-slate-100">
                        <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-4 text-[12px] text-[#1e40af] mb-4 relative shadow-sm">
                          <div className="flex items-center gap-1.5 font-bold mb-2 text-[#1d4ed8]">
                            <AlertCircle className="w-4 h-4" /> 데이터 수신 안내
                          </div>
                          <p className="leading-relaxed text-[#1e40af] mb-1.5 break-keep opacity-90">
                            비전 매트릭스 장비에서 불량 판정 시 ERP 내부 API 엔드포인트 <code className="bg-[#dbeafe] px-1 py-0.5 rounded text-[#1d4ed8] font-mono text-[11px] mx-0.5 border border-[#bfdbfe]">/api/vision/hardware</code> 로 판정 결과를 전송하도록 설정하십시오.
                          </p>
                          <p className="mt-2 text-[#1e40af] font-medium opacity-90">필수 수신 데이터: 장비 ID, 판정 결과(OK/NG), 불량 코드, 이미지 저장 경로</p>
                        </div>

                        <button className="w-full py-3 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
                          <Save className="w-4 h-4" /> 하드웨어 연동 설정 저장 (VIS7 SDK)
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 품목 선택 모달 */}
        {isItemModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsItemModalOpen(false)} />
            <div className="relative w-full max-w-2xl mx-4 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xl flex flex-col max-h-[80vh]">
              <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-800 text-sm font-semibold">검사 품목 선택</span>
                </div>
                <button onClick={() => setIsItemModalOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-4 shrink-0 border-b border-slate-200 bg-white">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={itemSearchText} 
                    onChange={e => setItemSearchText(e.target.value)} 
                    placeholder="품목코드 또는 품목명 검색..." 
                    className="w-full h-10 pl-9 pr-4 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="overflow-auto flex-1 p-2">
                <table className="w-full text-xs text-left">
                  <thead className="sticky top-0 bg-white z-10">
                    <tr>
                      <th className="px-3 py-2 text-slate-500 font-medium border-b border-slate-200">품목코드</th>
                      <th className="px-3 py-2 text-slate-500 font-medium border-b border-slate-200">품목명</th>
                      <th className="px-3 py-2 text-slate-500 font-medium border-b border-slate-200">규격</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map(item => (
                      <tr 
                        key={item.id} 
                        onClick={() => {
                          setForm({...form, itemName: item.itemName});
                          setIsItemModalOpen(false);
                        }}
                        className="border-b border-slate-100 hover:bg-blue-50 cursor-pointer transition-colors"
                      >
                        <td className="px-3 py-2.5 text-blue-600 font-mono">{item.itemCd}</td>
                        <td className="px-3 py-2.5 text-slate-800">{item.itemName}</td>
                        <td className="px-3 py-2.5 text-slate-500">{item.std || '-'}</td>
                      </tr>
                    ))}
                    {filteredItems.length === 0 && (
                      <tr>
                        <td colSpan={3} className="text-center py-8 text-slate-500">
                          검색 결과가 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

    </SmartFactoryWrapper>
  );
}