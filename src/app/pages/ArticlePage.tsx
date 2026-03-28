import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Chrome, Loader2 } from 'lucide-react';
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

export default function ArticlePage() {
  const [showExtension, setShowExtension] = useState(false);
  const [state, setState] = useState<'idle' | 'loading' | 'results'>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleExtensionClick = () => {
    setShowExtension(true);
  };

  const handleAnalyze = () => {
    setState('loading');
    setIsAnalyzing(true);
    
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
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-8">
      {/* Browser Window */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Browser Top Bar */}
        <div className="bg-gray-200 px-4 py-3 flex items-center gap-3 border-b border-gray-300">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1.5 text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">🔒</span>
            <span>https://globalnewstoday.com/breaking-policy-markets</span>
          </div>
          <button
            onClick={handleExtensionClick}
            className="p-2 hover:bg-gray-300 rounded-md transition-colors relative"
          >
            <Chrome className="w-5 h-5 text-gray-700" />
            {showExtension && (
              <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            )}
          </button>
        </div>

        {/* Article Content */}
        <div className="p-12 relative">
          <div className="max-w-2xl mx-auto">
            <div className="text-xs text-gray-500 mb-2">BREAKING NEWS</div>
            <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
              Breaking: New Policy Will Change Global Markets Overnight
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <span>By Sarah Mitchell</span>
              <span>•</span>
              <span>March 28, 2026</span>
              <span>•</span>
              <span>3 min read</span>
            </div>
            
            <div className="prose prose-lg relative">
              <p className="text-gray-800 mb-6 leading-relaxed">
                In a stunning announcement today, sources close to the administration revealed that a sweeping new economic policy is set to be implemented within the next 48 hours. The policy, which has been developed in secret over the past six months, is expected to fundamentally reshape how global markets operate.
              </p>
              
              <p className="text-gray-800 mb-6 leading-relaxed">
                According to unnamed officials, the changes will affect everything from cryptocurrency regulations to international trade agreements. Financial analysts are already scrambling to understand the potential implications, with some predicting massive shifts in market valuations across multiple sectors.
              </p>
              
              <p className="text-gray-800 mb-6 leading-relaxed">
                While details remain scarce, early reports suggest that major corporations have been quietly preparing for this announcement. Several Fortune 500 companies are rumored to have been briefed on the changes weeks ago, giving them a significant advantage in positioning their portfolios ahead of the official rollout.
              </p>

              {/* Analysis Animation Overlay */}
              <AnimatePresence>
                {isAnalyzing && (
                  <>
                    {/* Scanning lines */}
                    <motion.div
                      initial={{ top: 0 }}
                      animate={{ top: '100%' }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: 2.5, 
                        ease: 'linear',
                        repeat: Infinity 
                      }}
                      className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent pointer-events-none"
                      style={{
                        boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
                      }}
                    />
                    
                    {/* Highlight pulse on paragraphs */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.05, 0.15, 0.05] }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="absolute inset-0 bg-blue-500 pointer-events-none rounded"
                    />
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Floating Extension Popup */}
          <AnimatePresence>
            {showExtension && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute top-8 right-8 shadow-2xl z-10"
              >
                <ExtensionPopup 
                  state={state}
                  result={result}
                  onAnalyze={handleAnalyze}
                  onViewDashboard={() => navigate('/dashboard')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Extension popup component
function ExtensionPopup({ 
  state, 
  result, 
  onAnalyze,
  onViewDashboard
}: { 
  state: 'idle' | 'loading' | 'results';
  result: AnalysisResult | null;
  onAnalyze: () => void;
  onViewDashboard: () => void;
}) {
  return (
    <div className="w-[360px] bg-white rounded-xl overflow-hidden border border-gray-200">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[17px] font-semibold text-black tracking-tight" style={{ fontFamily: 'Alice, serif' }}>
            RealityCheck
          </h1>
        </div>

        {/* Subtle divider */}
        <div className="h-px bg-gray-200 -mx-6 mb-6" />

        {/* Idle State */}
        {state === 'idle' && (
          <button
            onClick={onAnalyze}
            className="w-full bg-black text-white rounded-lg py-2.5 px-4 text-[15px] font-medium
                       hover:bg-gray-900 active:bg-gray-800 transition-colors
                       flex items-center justify-center gap-2"
          >
            Analyze article
          </button>
        )}

        {/* Loading State */}
        {state === 'loading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              disabled
              className="w-full bg-black text-white rounded-lg py-2.5 px-4 text-[15px] font-medium
                         disabled:opacity-70 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2 mb-4"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing…</span>
            </button>
            
            {/* Analysis progress */}
            <div className="space-y-2">
              <AnalysisStep label="Reading article" delay={0} />
              <AnalysisStep label="Cross-checking sources" delay={0.8} />
              <AnalysisStep label="Evaluating credibility" delay={1.6} />
            </div>
          </motion.div>
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
                onClick={onViewDashboard}
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
    </div>
  );
}

// Analysis step component for loading state
function AnalysisStep({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center gap-2 text-[13px] text-gray-600"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2 }}
        className="w-1.5 h-1.5 rounded-full bg-black"
      />
      <span>{label}</span>
    </motion.div>
  );
}