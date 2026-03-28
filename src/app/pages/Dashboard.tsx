import { motion } from 'motion/react';
import { ArrowLeft, TrendingDown, FileText, Shield } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      value: '32%',
      label: 'Fake News Rate',
      icon: TrendingDown,
      description: 'Articles flagged as misleading'
    },
    {
      value: '128',
      label: 'Articles Verified',
      icon: FileText,
      description: 'Total analyses performed'
    },
    {
      value: '68',
      label: 'Credibility Score',
      icon: Shield,
      description: 'Your verification rate'
    }
  ];

  const recentAnalyses = [
    {
      title: 'Breaking: New Policy Will Change Global Markets Overnight',
      domain: 'globalnewstoday.com',
      verdict: 'Likely Fake',
      confidence: 18,
      time: '2 minutes ago'
    },
    {
      title: 'Study Confirms Climate Change Effects Accelerating',
      domain: 'nature.com',
      verdict: 'Credible',
      confidence: 94,
      time: '1 day ago'
    },
    {
      title: 'Tech Giant Announces Revolutionary Battery Technology',
      domain: 'techbuzz.io',
      verdict: 'Misleading',
      confidence: 52,
      time: '3 days ago'
    }
  ];

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'Credible':
        return 'bg-green-500';
      case 'Misleading':
        return 'bg-orange-500';
      case 'Likely Fake':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[14px]">Back to article</span>
          </button>
          
          <h1 className="text-[32px] font-semibold text-black tracking-tight mb-2" style={{ fontFamily: 'Alice, serif' }}>
            RealityCheck
          </h1>
          <p className="text-[15px] text-gray-500">
            Dashboard
          </p>
        </motion.div>

        {/* Subtle divider */}
        <div className="h-px bg-gray-200 mb-12" />

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-white rounded-lg">
                  <stat.icon className="w-5 h-5 text-black" />
                </div>
              </div>
              <div className="text-[36px] font-bold text-black mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-[14px] font-medium text-black mb-1">
                {stat.label}
              </div>
              <div className="text-[12px] text-gray-500">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h2 className="text-[20px] font-semibold text-black mb-6">
            Recent Analysis
          </h2>

          <div className="space-y-4">
            {recentAnalyses.map((analysis, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-gray-300 transition-colors relative overflow-hidden"
              >
                {/* Colored verdict line */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${getVerdictColor(analysis.verdict)}`} />
                
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-medium text-black mb-1 line-clamp-1">
                      {analysis.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 mb-3">
                      {analysis.domain}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-medium text-black">
                        {analysis.verdict}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-[13px] text-gray-500">
                        {analysis.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {/* Confidence Ring (Small) */}
                    <svg className="w-12 h-12 mb-2" viewBox="0 0 48 48">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke="#18181b"
                        strokeWidth="3"
                        strokeDasharray={`${2 * Math.PI * 20}`}
                        strokeDashoffset={`${2 * Math.PI * 20 * (1 - analysis.confidence / 100)}`}
                        strokeLinecap="round"
                        transform="rotate(-90 24 24)"
                      />
                      <text
                        x="24"
                        y="24"
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[10px] font-semibold"
                        fill="#18181b"
                      >
                        {analysis.confidence}
                      </text>
                    </svg>
                    <p className="text-[11px] text-gray-400">
                      {analysis.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-[12px] text-gray-400 text-center">
            AI-generated analysis. Always verify critical information from multiple sources.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
