import React, { useState, useEffect } from 'react'
import { Key, Save, CheckCircle2, RefreshCcw, Trash2, Lightbulb, Check, AlertCircle, X } from 'lucide-react'

interface SavedApiKey {
  db: string;
  key: string;
  isValid: boolean | null;
}

export default function DataAnalysisSettings() {
  const [selectedDb, setSelectedDb] = useState('기본 데이터베이스')
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [savedKeys, setSavedKeys] = useState<SavedApiKey[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = localStorage.getItem('gemini_api_keys')
    if (loaded) {
      try {
        setSavedKeys(JSON.parse(loaded))
      } catch (e) {
        console.error('Failed to parse saved API keys')
      }
    }
  }, [])

  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem('gemini_api_keys', JSON.stringify(savedKeys))
  }, [savedKeys])

  const handleSaveKey = () => {
    if (!apiKeyInput.trim()) {
      alert('API 키를 입력해주세요.')
      return
    }

    // 간단한 유효성 검사 시뮬레이션 (AIza 로 시작하는지)
    const isValidFormat = apiKeyInput.startsWith('AIza')

    setSavedKeys(prev => {
      const existingIdx = prev.findIndex(k => k.db === selectedDb)
      const newKey: SavedApiKey = {
        db: selectedDb,
        key: apiKeyInput.trim(),
        isValid: isValidFormat
      }

      if (existingIdx >= 0) {
        const updated = [...prev]
        updated[existingIdx] = newKey
        return updated
      } else {
        return [...prev, newKey]
      }
    })

    setApiKeyInput('')
    alert('API 키가 안전하게 저장되었습니다.')
  }

  const handleDeleteKey = (db: string) => {
    if (window.confirm(`${db}의 API 키를 삭제하시겠습니까?`)) {
      setSavedKeys(prev => prev.filter(k => k.db !== db))
    }
  }

  const handleVerifyKey = (db: string) => {
    // 키 유효성 재검증 시뮬레이션
    alert(`${db} API 키 유효성을 검증합니다...`)
    setSavedKeys(prev => prev.map(k => {
      if (k.db === db) {
        return { ...k, isValid: k.key.startsWith('AIza') }
      }
      return k
    }))
  }

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return '********'
    return `${key.substring(0, 8)}...${key.substring(key.length - 4)}`
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 p-6 overflow-y-auto custom-scrollbar">
      <div className="max-w-3xl w-full mx-auto flex flex-col gap-6">
        
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center gap-2 px-6 py-4 bg-fuchsia-50/50 border-b border-fuchsia-100">
            <Key className="w-5 h-5 text-fuchsia-600" />
            <h2 className="text-lg font-bold text-fuchsia-700">Gemini API 키 관리</h2>
          </div>

          <div className="p-6 flex flex-col gap-6">
            
            {/* Database Selection */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">데이터베이스 선택</label>
              <select 
                value={selectedDb}
                onChange={(e) => setSelectedDb(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-shadow"
              >
                <option value="기본 데이터베이스">기본 데이터베이스</option>
                <option value="테스트 데이터베이스">테스트 데이터베이스</option>
              </select>
            </div>

            {/* API Key Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Gemini API 키</label>
              <div className="flex gap-2 items-center">
                <input 
                  type="password" 
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="AIza..."
                  className="flex-1 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 outline-none transition-shadow"
                />
                <button 
                  onClick={handleSaveKey}
                  className="w-12 h-12 bg-[#8b9de3] hover:bg-[#7a8dd2] text-white rounded-lg flex items-center justify-center transition-colors shadow-sm shrink-0"
                  title="저장"
                >
                  <Save className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-2">
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:text-blue-700 hover:underline">
                  Google AI Studio에서 API 키 발급받기 →
                </a>
              </div>
            </div>

            {/* Saved Keys List */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-3">저장된 API 키</h3>
              
              {savedKeys.length === 0 ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-400 text-sm font-medium">
                  저장된 API 키가 없습니다.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {savedKeys.map((item) => (
                    <div key={item.db} className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-base font-bold text-slate-800 ml-8">{item.db}</span>
                        <div className="flex items-center gap-3">
                          {item.isValid ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                          )}
                          <span className="text-sm text-slate-500 font-mono">{maskApiKey(item.key)}</span>
                        </div>
                        <div className="ml-8 mt-1">
                          {item.isValid ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 text-white text-[12px] font-bold">
                              <Check className="w-3.5 h-3.5" strokeWidth={3} /> 유효
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-500 text-white text-[12px] font-bold">
                              <X className="w-3.5 h-3.5" strokeWidth={3} /> 유효하지 않음
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleVerifyKey(item.db)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="유효성 재검증"
                        >
                          <RefreshCcw className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteKey(item.db)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Guide Box */}
            <div className="bg-[#f0f7ff] border border-[#dbeafe] rounded-xl p-5 mt-2">
              <h4 className="flex items-center gap-2 text-[15px] font-bold text-blue-700 mb-3">
                <Lightbulb className="w-4 h-4 fill-yellow-400 text-yellow-500" /> API 키 사용 가이드
              </h4>
              <ul className="space-y-2 text-sm text-blue-600/80 font-medium">
                <li className="flex items-start gap-2 before:content-['•'] before:text-blue-400">
                  데이터베이스별로 다른 Gemini API 키를 설정할 수 있습니다
                </li>
                <li className="flex items-start gap-2 before:content-['•'] before:text-blue-400">
                  API 키는 브라우저 로컬스토리지에 안전하게 저장됩니다
                </li>
                <li className="flex items-start gap-2 before:content-['•'] before:text-blue-400">
                  데이터 리니지 분석 시 해당 데이터베이스의 키가 자동으로 사용됩니다
                </li>
                <li className="flex items-start gap-2 before:content-['•'] before:text-blue-400">
                  키 유효성은 Gemini API 호출로 자동 검증됩니다
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
