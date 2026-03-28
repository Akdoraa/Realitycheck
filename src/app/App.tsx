import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

type Verdict = 'Credible' | 'Misleading' | 'Likely Fake';

interface AnalysisResult {
  verdict: Verdict;
  confidence: number;
  explanation: string;
  reasoning: string[];
  sources: Array<{
    title: string;
    domain: string;
  }>;
}

export default function App() {
  const [state, setState] = useState<'initial' | 'loading' | 'results'>('initial');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    setState('loading');
    
    // Simulate API call
    setTimeout(() => {
      const confidence = 82;
      let verdict: Verdict;
      
      // Higher confidence = more credible, lower = more misleading/fake
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
        explanation: 'Article contains verified facts from reputable sources with strong journalistic standards.',
        reasoning: [
          'Multiple reputable sources confirm',
          'High authority domain',
          'Recent publication with citations'
        ],
        sources: [
          { title: 'Fact-check by Reuters', domain: 'reuters.com' },
          { title: 'Expert commentary', domain: 'sciencemag.org' }
        ]
      });
      setState('results');
    }, 2000);
  };

  return (
    <div className="w-[360px] min-h-[500px] max-h-[600px] bg-white overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[17px] font-semibold text-black tracking-tight" style={{ fontFamily: 'Alice, serif' }}>
            RealityCheck
          </h1>
        </div>

        {/* Subtle divider */}
        <div className="h-px bg-gray-200 -mx-6 mb-6" />

        {/* Primary Action */}
        <button
          onClick={handleAnalyze}
          disabled={state === 'loading'}
          className="w-full bg-black text-white rounded-lg py-2.5 px-4 text-[15px] font-medium
                     hover:bg-gray-900 active:bg-gray-800 transition-colors
                     disabled:opacity-70 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
        >
          {state === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing…</span>
            </>
          ) : (
            'Analyze article'
          )}
        </button>

        {/* Results Section */}
        <AnimatePresence>
          {state === 'results' && result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-6"
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
              <div>
                <h3 className="text-[12px] font-semibold text-black mb-2.5 tracking-wide uppercase">
                  Sources
                </h3>
                <div className="space-y-0">
                  {result.sources.map((source, index) => (
                    <div key={index}>
                      {index > 0 && <div className="h-px bg-gray-200 my-2.5" />}
                      <div className="py-1">
                        <p className="text-[13px] font-medium text-black mb-0.5">
                          {source.title}
                        </p>
                        <p className="text-[12px] text-gray-500">
                          {source.domain}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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