import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

type Verdict = 'Credible' | 'Misleading' | 'Likely Fake';

interface AnalysisResult {
  verdict: Verdict;
  confidence: number;
  explanation: string;
  reasoning: string[];
  sources: Array<{
    outlet: string;
    finding: string;
  }>;
}

export default function ExtensionPopup() {
  const [state, setState] = useState<'idle' | 'loading' | 'results'>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const navigate = useNavigate();

  // Auto-start analysis when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      handleAnalyze();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAnalyze = () => {
    setState('loading');
    
    // Simulate API call with auto-transition to results
    setTimeout(() => {
      const confidence = 18; // Low confidence = Likely Fake
      let verdict: Verdict;
      
      if (confidence >= 70) {
        verdict = 'Credible';
      } else if (confidence >= 40) {
        verdict = 'Misleading';
      } else {
        verdict = 'Likely Fake';
      }
      
      setResult({
        verdict,
        confidence,
        explanation: 'Conflicting reports across major sources',
        reasoning: [
          'Low authority domain',
          'No coverage from trusted outlets'
        ],
        sources: [
          { outlet: 'BBC', finding: 'No matching report found' },
          { outlet: 'Reuters', finding: 'Conflicting data' },
          { outlet: 'AP News', finding: 'No evidence of claim' }
        ]
      });
      setState('results');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-[360px] bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-[17px] font-semibold text-black tracking-tight" style={{ fontFamily: 'Alice, serif' }}>
                RealityCheck
              </h1>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Subtle divider */}
          <div className="h-px bg-gray-200 -mx-6 mb-6" />

          {/* Idle State */}
          {state === 'idle' && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleAnalyze}
              className="w-full bg-black text-white rounded-lg py-2.5 px-4 text-[15px] font-medium
                         hover:bg-gray-900 active:bg-gray-800 transition-colors
                         flex items-center justify-center gap-2"
            >
              Analyze article
            </motion.button>
          )}

          {/* Loading State */}
          {state === 'loading' && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              disabled
              className="w-full bg-black text-white rounded-lg py-2.5 px-4 text-[15px] font-medium
                         disabled:opacity-70 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing…</span>
            </motion.button>
          )}

          {/* Results Section */}
          <AnimatePresence>
            {state === 'results' && result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {/* Verdict Card */}
                <div className="bg-gray-50 rounded-xl p-5 mb-5 relative overflow-hidden">
                  {/* Colored credibility line */}
                  <div 
                    className={`absolute top-0 left-0 right-0 h-1 ${
                      result.verdict === 'Credible' ? 'bg-green-500' : 
                      result.verdict === 'Misleading' ? 'bg-orange-500' : 
                      'bg-red-500'
                    }`}
                  />
                  
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-[24px] font-bold text-black tracking-tight mb-1">
                        {result.verdict}
                      </h2>
                      <p className="text-[13px] text-gray-500">
                        Confidence {result.confidence}%
                      </p>
                    </div>
                    
                    {/* Confidence Ring */}
                    <svg className="w-14 h-14 -mt-1" viewBox="0 0 56 56">
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        fill="none"
                        stroke="#18181b"
                        strokeWidth="3"
                        strokeDasharray={`${2 * Math.PI * 24}`}
                        strokeDashoffset={`${2 * Math.PI * 24 * (1 - result.confidence / 100)}`}
                        strokeLinecap="round"
                        transform="rotate(-90 28 28)"
                      />
                      <text
                        x="28"
                        y="28"
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[11px] font-semibold"
                        fill="#18181b"
                      >
                        {result.confidence}
                      </text>
                    </svg>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-200 my-3" />

                  {/* Explanation */}
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    {result.explanation}
                  </p>
                </div>

                {/* Reasoning Section */}
                <div className="mb-5">
                  <h3 className="text-[12px] font-semibold text-black mb-2.5 tracking-wide uppercase">
                    Why
                  </h3>
                  <ul className="space-y-1.5">
                    {result.reasoning.map((reason, index) => (
                      <li key={index} className="flex items-start gap-2 text-[13px] text-gray-700">
                        <span className="text-gray-400 mt-1">·</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sources Section */}
                <div className="mb-5">
                  <h3 className="text-[12px] font-semibold text-black mb-2.5 tracking-wide uppercase">
                    Sources
                  </h3>
                  <div className="space-y-0">
                    {result.sources.map((source, index) => (
                      <div key={index}>
                        {index > 0 && <div className="h-px bg-gray-200 my-2.5" />}
                        <div className="py-1">
                          <p className="text-[13px] font-medium text-black mb-0.5">
                            {source.outlet}
                          </p>
                          <p className="text-[12px] text-gray-500">
                            {source.finding}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* View Dashboard Button */}
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-gray-100 text-black rounded-lg py-2.5 px-4 text-[14px] font-medium
                             hover:bg-gray-200 transition-colors"
                >
                  View Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="pb-5 px-6">
          <p className="text-[11px] text-gray-400 text-center">
            AI-generated. Verify critical information.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
