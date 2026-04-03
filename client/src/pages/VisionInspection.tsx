import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Camera, ZoomIn, Play, Square, AlertTriangle, CheckCircle, Activity, X, 
  Settings, UploadCloud, RefreshCw, AlertCircle, RefreshCcw,
  Scan, Package, List, BrainCircuit, Link, Database, Bug, Grid
} from "lucide-react";
import SmartFactoryWrapper from "@/components/SmartFactoryWrapper";
import { useAppStore } from "../store/useAppStore";

type VisionLog = {
  id: number;
  time: string;
  barcode: string;
  result: "OK" | "NG";
  defectType: string | null;
  confidence: string;
  image: string;
  itemName: string;
};

export default function VisionInspectionPage() {
  const [activeTab, setActiveTab] = useState<'software' | 'hardware'>('software');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [showSettings, setShowSettings] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 글로벌 스토어에서 비전 설정 정보 및 불량 유형 가져오기 (안전하게 기본값 설정)
  const appSetupData = useAppStore(s => s.visionSetupData);
  const setVisionSetupData = useAppStore(s => s.setVisionSetupData);
  const appDefectTypes = useAppStore(s => s.defectTypes);

  const setupData = appSetupData || {
    inspectionInterval: 2,
    confidenceThreshold: 90,
    department: '관리부',
    itemName: 'D4H LOOSE LINK & PIN&BUSH GROUP WITH SEAL',
    selectedDefects: [],
    autoSave: false,
    autoSaveInterval: 60,
    autoSaveType: '',
  };

  const defectTypes = appDefectTypes || [];

  const { data: logs } = useQuery<VisionLog[]>({
    queryKey: ["/api/vision/logs"],
    refetchInterval: 2000,
  });

  const okCount = logs ? logs.filter(l => l.result === "OK").length : 0;
  const ngCount = logs ? logs.filter(l => l.result === "NG").length : 0;
  const totalCount = logs ? logs.length : 0;
  const yieldRate = totalCount > 0 ? ((okCount / totalCount) * 100).toFixed(1) : "100";

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
      alert("카메라를 실행할 수 없습니다. 권한을 확인해주세요.");
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

  useEffect(() => {
    let animationFrameId: number;
    const drawOverlay = () => {
      if (!isLive || !videoRef.current || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() > 0.95) {
        const x = Math.random() * (canvas.width - 100);
        const y = Math.random() * (canvas.height - 100);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, 100, 100);
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(`NG ${(Math.random() * 10 + 89).toFixed(1)}%`, x, y - 10);
      }
      animationFrameId = requestAnimationFrame(drawOverlay);
    };
    if (isLive) {
      drawOverlay();
    } else {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    }
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isLive]);

  useEffect(() => { return () => stopCamera(); }, []);

  // 자동 저장 타이머
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (setupData.autoSave && setupData.autoSaveInterval > 0) {
      interval = setInterval(() => {
        console.log(`${setupData.autoSaveInterval}분 경과: 자동 검사요청등록 실행`);
        alert(`[자동 저장] ${setupData.itemName}의 검사 결과가 검사요청등록에 저장되었습니다.`);
      }, setupData.autoSaveInterval * 60 * 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [setupData.autoSave, setupData.autoSaveInterval, setupData.itemName]);

  const handleManualSave = () => {
    setShowRequestModal(true);
    setShowSettings(false);
  };

  const handleSendRequest = () => {
    setShowRequestModal(false);
    const ngLogsCount = logs ? logs.filter(l => l.result === "NG").length : 0;
    setToastMessage(`불량 검사 결과 ${ngLogsCount}건이 검사요청등록에 성공적으로 전송되었습니다.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  // 불량 유형별 카운트 계산
  const defectCounts = defectTypes.reduce((acc, dt) => {
    acc[dt.typeName] = logs ? logs.filter(l => l.defectType === dt.typeName).length : 0;
    return acc;
  }, {} as Record<string, number>);

  return (
    <SmartFactoryWrapper>
      <div className="flex flex-col absolute inset-0 bg-[#f8f9fc] p-2">
        
        {/* 상단 헤더 영역 */}
        <div className="relative bg-white border border-indigo-100 rounded-xl px-4 py-3 mb-2 flex flex-wrap items-center justify-between gap-3 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-indigo-900 font-bold text-lg tracking-tight">
                MES AI 비전 모니터링
              </h2>
              <p className="text-slate-500 text-[11px] mt-0.5">실시간 결함 탐지 및 자동 품질 판정 현황</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700 shadow-sm">
              <Package className="w-3.5 h-3.5 text-slate-400" />
              {setupData.itemName}
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-medium text-slate-600 shadow-sm">
              <List className="w-3.5 h-3.5 text-slate-400" />
              불량 대기 중: {ngCount}건
            </div>
          </div>
        </div>

        {/* 탭 헤더 영역 */}
        <div className="flex gap-1 px-2 relative z-20">
          <button 
            onClick={() => setActiveTab('software')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border rounded-t-xl transition-colors ${activeTab === 'software' ? 'bg-[#f8f9fc] text-indigo-700 border-indigo-100 border-b-[#f8f9fc] shadow-[0_-2px_10px_-4px_rgba(99,102,241,0.2)] z-10' : 'bg-slate-200/50 text-slate-500 border-transparent border-b-transparent hover:bg-slate-300/50'}`}
            style={{ marginBottom: activeTab === 'software' ? '-1px' : '0' }}
          >
            <Camera className="w-4 h-4" />
            소프트웨어 AI 비전
          </button>
          <button 
            onClick={() => setActiveTab('hardware')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border rounded-t-xl transition-colors ${activeTab === 'hardware' ? 'bg-white text-fuchsia-600 border-fuchsia-200 border-b-white shadow-[0_-2px_10px_-4px_rgba(217,70,239,0.2)] z-10' : 'bg-slate-200/50 text-slate-500 border-transparent border-b-transparent hover:bg-slate-300/50'}`}
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
            비전 매트릭스 (하드웨어)
          </button>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="flex flex-col flex-1 overflow-hidden z-10 bg-transparent rounded-xl rounded-tl-none p-0 relative">
          {activeTab === 'software' ? (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-2 p-2 bg-[#f8f9fc] border border-indigo-100 shadow-[0_2px_10px_-4px_rgba(99,102,241,0.2)] rounded-xl rounded-tl-none -mt-[1px] relative z-10">
          
          {/* 왼쪽 영역: 카메라 및 불량유형 상세 */}
          <div className="lg:col-span-2 flex flex-col gap-2 min-h-0">
            
            {/* 카메라 뷰 */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden relative flex-1 min-h-[300px]">
              {/* 설정 정보 오버레이 */}
              <div className="absolute top-4 left-4 z-20 bg-[#8fa4b8]/70 backdrop-blur-md border border-white/20 rounded-xl p-3.5 shadow-lg text-sm w-56 text-white transition-all">
                <div className="flex items-center gap-2 font-bold mb-3 pb-3 border-b border-white/20 text-white/90">
                  <AlertCircle className="w-4 h-4" />
                  설정 정보
                </div>
                <ul className="space-y-2.5 font-medium tracking-wide">
                  <li className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-white/70"></span>검사 주기: <span className="font-bold text-white">{setupData.inspectionInterval}초</span></li>
                  <li className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-white/70"></span>판정 기준: <span className="font-bold text-white">{setupData.confidenceThreshold}%</span></li>
                  <li className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-white/70"></span>자동 등록: <span className="font-bold text-white">{setupData.autoSave ? `켜짐 (${setupData.autoSaveInterval}분)` : "꺼짐"}</span></li>
                </ul>
              </div>

              <div className="bg-[#f1f5f9] absolute inset-0 flex items-center justify-center">
                <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${!isLive ? 'hidden' : ''}`} />
                <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />
                {!isLive && (
                  <div className="text-slate-400 flex flex-col items-center gap-3">
                    <Camera className="w-12 h-12 opacity-30" />
                    <span className="text-sm font-medium">카메라 대기 중</span>
                  </div>
                )}
              </div>
            </div>

            {/* 불량 유형별 상세 */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-4 shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <Scan className="w-4 h-4 text-indigo-500" />
                <span className="text-indigo-900 text-sm font-bold">불량 유형별 상세</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[160px] overflow-y-auto pr-1">
                {defectTypes.slice(0, 16).map((dt, idx) => (
                  <div key={idx} className="flex items-center justify-between border border-slate-100 bg-white rounded-lg px-3 py-2.5 shadow-sm hover:border-indigo-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[12px] font-medium text-slate-600 truncate max-w-[90px]" title={dt.typeName}>{dt.typeName}</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md min-w-[24px] text-center">
                      {defectCounts[dt.typeName] || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 오른쪽 영역: 현황판, 로그, 액션 버튼 */}
          <div className="flex flex-col gap-2 overflow-y-auto h-full pr-1 pb-1">
            
            {/* 검사 현황판 */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-4 shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <Scan className="w-4 h-4 text-indigo-500" />
                <span className="text-indigo-900 text-sm font-bold">검사 현황판</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-emerald-600 font-bold mb-1">OK (정상)</p>
                    <p className="text-2xl font-black text-emerald-700">{okCount}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                <div className="bg-rose-50/50 border border-rose-100 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-rose-600 font-bold mb-1">NG (불량)</p>
                    <p className="text-2xl font-black text-rose-700">{ngCount}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-lg p-4 flex items-center justify-between shadow-sm mb-3">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-indigo-500" />
                  <div>
                    <p className="text-[11px] text-slate-700 font-bold">종합 가동률</p>
                    <p className="text-[9px] text-slate-400">Total Efficiency</p>
                  </div>
                </div>
                <span className="text-3xl font-black text-slate-800">{yieldRate}%</span>
              </div>
            </div>

            {/* 실시간 판정 로그 */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl flex-1 flex flex-col min-h-[200px] overflow-hidden relative">
                
                <div className="flex items-center gap-1.5 relative">
                  <button 
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-1.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-slate-200 bg-white transition-colors"
                    title="자동 저장 설정"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={handleManualSave}
                    className="flex items-center gap-1.5 px-2 py-1.5 rounded text-indigo-600 hover:bg-indigo-50 border border-indigo-200 bg-white transition-colors text-[11px] font-semibold"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    검사요청등록 (0)
                  </button>

                  {/* 자동 저장 설정 팝오버 */}
                  {showSettings && (
                    <div className="absolute top-full right-0 mt-2 w-[280px] bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden">
                      <div className="flex flex-col p-4 space-y-4">
                        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                          <span className="text-[13px] font-semibold text-slate-700">자동 저장 설정</span>
                          <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-600">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <label className="text-[13px] font-medium text-slate-700">자동 저장 사용</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={setupData.autoSave}
                                onChange={(e) => setVisionSetupData({ ...setupData, autoSave: e.target.checked })}
                              />
                              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0ea5e9]"></div>
                            </label>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[13px] font-medium text-slate-700">저장 주기 (분)</label>
                            <div className="relative">
                              <input 
                                type="number" 
                                className="w-full text-sm border border-slate-300 rounded-md py-1.5 px-3 focus:border-[#6366f1] outline-none text-slate-700 transition-colors" 
                                value={setupData.autoSaveInterval}
                                onChange={(e) => setVisionSetupData({ ...setupData, autoSaveInterval: Number(e.target.value) })}
                                min={1}
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[13px] font-medium text-slate-700">기본 검사유형</label>
                            <select 
                              className="w-full text-sm border border-slate-300 rounded-md py-1.5 px-3 focus:border-[#6366f1] outline-none text-slate-700 appearance-none bg-white transition-colors"
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1em 1em` }}
                              value={setupData.autoSaveType || ''}
                              onChange={(e) => setVisionSetupData({ ...setupData, autoSaveType: e.target.value })}
                            >
                              <option value="" className="text-slate-400">유형 선택</option>
                              <option value="사내생산">사내생산</option>
                              <option value="외주가공">외주가공</option>
                              <option value="입고검사">입고검사</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 flex flex-col h-full overflow-hidden">
                {/* OK / NG 카운트 */}
                <div className="grid grid-cols-2 gap-3 mb-4 shrink-0">
                  <div className="bg-white border border-emerald-100 rounded-xl p-3 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-[11px] text-emerald-600 font-bold mb-1">OK (정상)</p>
                      <p className="text-2xl font-black text-emerald-700">{okCount}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    </div>
                  </div>
                  <div className="bg-white border border-rose-100 rounded-xl p-3 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-[11px] text-rose-600 font-bold mb-1">NG (불량)</p>
                      <p className="text-2xl font-black text-rose-700">{ngCount}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-rose-500" />
                    </div>
                  </div>
                </div>

                {/* 실시간 판정 로그 타이틀 */}
                <div className="text-slate-700 text-[13px] font-bold mb-2 shrink-0">
                  실시간 판정 로그
                </div>
                
                {/* 실시간 판정 로그 내용 */}
                <div className="flex-1 overflow-auto bg-[#f8f9fc] border border-slate-100 rounded-lg p-2 space-y-1.5 relative">
                  {logs?.filter(log => log.result === 'NG').map((log) => (
                    <div key={log.id} className="bg-white border border-slate-100 rounded-lg p-2 flex items-center justify-between shadow-sm cursor-pointer hover:border-indigo-200 transition-colors" onClick={() => setSelectedImage(log.image)}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${log.result === 'OK' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span className="text-[10px] text-slate-400">[{new Date(log.time).toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit', second: '2-digit' })}]</span>
                        <span className={`text-xs font-bold ${log.result === 'OK' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {log.defectType || '정상'} 
                        </span>
                        <span className="text-[10px] text-slate-400">({log.confidence}%)</span>
                      </div>
                      
                      <div className="w-8 h-8 rounded border border-slate-200 overflow-hidden relative bg-white flex shrink-0 items-center justify-center">
                        <img src={log.image} alt="thumb" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                          <ZoomIn className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!logs || logs.filter(log => log.result === 'NG').length === 0) && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">
                      대기 중...
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 하단 액션 버튼 */}
            <div className="flex flex-col gap-2 shrink-0">
              {!isLive ? (
                <button 
                  onClick={startCamera}
                  className="w-full h-12 rounded-xl bg-[#6c5ce7] hover:bg-[#5a4bcf] text-white font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Scan className="w-4 h-4" /> AI 검사 시작
                </button>
              ) : (
                <button 
                  onClick={stopCamera}
                  className="w-full h-12 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Square className="w-4 h-4" /> 검사 종료
                </button>
              )}
              
              <button 
                className="w-full h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <RefreshCcw className="w-4 h-4" /> 초기화
              </button>
            </div>
            
          </div>
          ) : (
            <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 bg-white border border-fuchsia-200 shadow-[0_2px_10px_-4px_rgba(217,70,239,0.2)] rounded-xl rounded-tl-none -mt-[1px] relative z-10 overflow-hidden">
              {/* Left Panel: Vision Matrix Screen & Raw Data */}
              <div className="flex-[2] flex flex-col gap-4 min-w-0">
                {/* Vision Matrix Screen */}
                <div className="flex-1 bg-[#0f172a] rounded-xl border border-slate-800 shadow-inner flex flex-col overflow-hidden min-h-[350px]">
                  {/* Top Bar */}
                  <div className="flex justify-between items-center px-4 py-3 border-b border-slate-800/50 bg-[#1e293b]/50">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-[3px] text-fuchsia-400">
                        <div className="flex gap-[3px]">
                          <div className="w-[6px] h-[6px] border-[2px] border-current rounded-sm"></div>
                          <div className="w-[12px] h-[6px] border-[2px] border-current rounded-sm"></div>
                        </div>
                        <div className="flex gap-[3px]">
                          <div className="w-[12px] h-[6px] border-[2px] border-current rounded-sm"></div>
                          <div className="w-[6px] h-[6px] border-[2px] border-current rounded-sm"></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm tracking-wide">VISION MATRIX #1 (IPC-001)</h3>
                        <p className="text-slate-500 text-[10px] font-semibold mt-0.5">OFFLINE</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                      <span className="text-slate-400 text-xs font-bold tracking-widest">DISCONNECTED</span>
                    </div>
                  </div>
                  
                  {/* Center content */}
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-4">
                    <div className="flex flex-col gap-[4px] text-slate-600/50">
                      <div className="flex gap-[4px]">
                        <div className="w-[20px] h-[20px] border-[4px] border-current rounded-md"></div>
                        <div className="w-[40px] h-[20px] border-[4px] border-current rounded-md"></div>
                      </div>
                      <div className="flex gap-[4px]">
                        <div className="w-[40px] h-[20px] border-[4px] border-current rounded-md"></div>
                        <div className="w-[20px] h-[20px] border-[4px] border-current rounded-md"></div>
                      </div>
                    </div>
                    <p className="text-sm font-medium">하드웨어 연결을 시작해주세요.</p>
                  </div>
                </div>
                
                {/* Recent Received Data Log */}
                <div className="h-40 bg-[#0f172a] rounded-xl border border-slate-800 shadow-inner flex flex-col overflow-hidden shrink-0">
                  <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                    <Grid className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-700 text-xs font-bold">최근 수신 데이터 (Raw Data API 연동부)</span>
                  </div>
                  <div className="flex-1 p-4 flex flex-col text-slate-400 text-xs justify-center items-center">
                     {/* Placeholder for raw data */}
                  </div>
                </div>
              </div>
              
              {/* Right Panel: Stats & Actions */}
              <div className="flex-1 flex flex-col gap-4 min-w-[320px]">
                <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded flex items-center justify-center">
                        <Database className="w-4 h-4 text-fuchsia-600" />
                      </div>
                      <span className="text-fuchsia-900 text-sm font-bold">연동 검사 현황 (HW)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-slate-200 transition-colors">
                        <Settings className="w-3.5 h-3.5" />
                      </button>
                      <button className="flex items-center gap-1.5 px-2 py-1.5 rounded text-fuchsia-600 hover:bg-fuchsia-50 border border-fuchsia-200 transition-colors text-[11px] font-semibold">
                        <UploadCloud className="w-3.5 h-3.5" />
                        검사요청등록 (0)
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-3 text-center">
                      <p className="text-[11px] text-slate-500 font-bold mb-1">수신된 정상 (OK)</p>
                      <p className="text-2xl font-bold text-emerald-500">0</p>
                    </div>
                    <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-3 text-center">
                      <p className="text-[11px] text-slate-500 font-bold mb-1">수신된 불량 (NG)</p>
                      <p className="text-2xl font-bold text-rose-500">0</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col flex-1 min-h-[200px]">
                    <span className="text-xs font-bold text-slate-700 mb-2">실시간 판정 로그</span>
                    <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400 font-medium">
                      수신된 데이터가 없습니다.
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 shrink-0">
                  <button className="w-full h-12 rounded-lg bg-[#c026d3] hover:bg-[#a21caf] text-white font-bold flex items-center justify-center gap-2 transition-colors shadow-sm text-sm">
                    <Link className="w-4 h-4" /> 장비 실시간 연결 (API)
                  </button>
                  <div className="flex gap-2">
                    <button className="flex-1 h-10 rounded-lg bg-white hover:bg-slate-50 text-slate-400 font-medium text-xs border border-slate-200 flex items-center justify-center gap-1.5 transition-colors">
                      <Bug className="w-3.5 h-3.5" /> 강제 불량 수신 테스트
                    </button>
                    <button className="flex-1 h-10 rounded-lg bg-white hover:bg-slate-50 text-slate-600 font-medium text-xs border border-slate-200 flex items-center justify-center gap-1.5 transition-colors">
                      <RefreshCcw className="w-3.5 h-3.5" /> 통계 초기화
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 검사요청등록 모달 */}
        {showRequestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowRequestModal(false)} />
            <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="bg-[#6366f1] px-4 py-3 flex items-center justify-between text-white">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <UploadCloud className="w-5 h-5" />
                  검사요청등록
                </div>
                <button onClick={() => setShowRequestModal(false)} className="hover:text-white/80 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Body */}
              <div className="p-6 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <label className="w-20 text-right text-sm font-bold text-slate-700">요청일자</label>
                  <input type="date" className="flex-1 border border-slate-200 rounded-md p-2.5 text-sm text-slate-700 outline-none focus:border-[#6366f1] transition-colors" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                
                <div className="flex items-center gap-4">
                  <label className="w-20 text-right text-sm font-bold text-slate-700">검사유형</label>
                  <select className="flex-1 border border-slate-200 rounded-md p-2.5 text-sm text-slate-400 outline-none focus:border-[#6366f1] transition-colors">
                    <option value="">검사요청유형 선택</option>
                    <option value="사내생산">사내생산</option>
                    <option value="외주가공">외주가공</option>
                    <option value="입고검사">입고검사</option>
                  </select>
                </div>
                
                <div className="flex items-start gap-4">
                  <label className="w-20 text-right text-sm font-bold text-slate-700 mt-3">품목목록</label>
                  <div className="flex-1 border border-slate-200 bg-[#f8f9fc] rounded-lg p-3 h-56 overflow-y-auto space-y-2">
                    {logs && logs.filter(log => log.result === 'NG').length > 0 ? logs.filter(log => log.result === 'NG').map((log, index) => (
                      <div key={log.id} className="flex items-center justify-between bg-white border border-slate-100 rounded-lg p-2.5 shadow-sm">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 flex items-center justify-center bg-slate-50 text-slate-500 rounded-full text-xs font-bold">{index + 1}</span>
                          <div className="w-10 h-10 rounded border border-slate-200 overflow-hidden bg-black shrink-0">
                            <img src={log.image} alt="thumb" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-sm font-semibold text-slate-700">{log.defectType || '정상'}</span>
                        </div>
                        <span className="text-xs font-bold text-[#6366f1] bg-indigo-50 px-2.5 py-1 rounded-full">{log.confidence}%</span>
                      </div>
                    )) : (
                      <div className="h-full flex items-center justify-center text-slate-400 text-sm font-medium">
                        판정된 품목이 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-2 bg-slate-50">
                <button onClick={() => setShowRequestModal(false)} className="px-5 py-2.5 bg-white border border-slate-200 rounded-md text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                  취소
                </button>
                <button onClick={handleSendRequest} className="px-5 py-2.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-md text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
                  <UploadCloud className="w-4 h-4" />
                  전송하기 ({logs ? logs.filter(log => log.result === 'NG').length : 0}건)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 커스텀 토스트 알림 */}
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 ease-in-out ${toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-full px-6 py-3 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span className="text-slate-900 font-bold text-sm">{toastMessage}</span>
          </div>
        </div>

        {/* 이미지 상세 모달 */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedImage(null)} />
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2 text-indigo-900 font-bold">
                  <ZoomIn className="w-4 h-4" />
                  불량 이미지 상세
                </div>
                <button onClick={() => setSelectedImage(null)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-slate-900 aspect-video flex items-center justify-center p-2 relative">
                <img src={selectedImage} alt="Detail" className="max-w-full max-h-full object-contain" />
              </div>
            </div>
          </div>
        )}

      </div>
    </SmartFactoryWrapper>
  );
}
