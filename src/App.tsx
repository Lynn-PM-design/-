import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts';
import {
  Info,
  X,
  Plus,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Copy,
  Search,
  Calendar,
  ArrowUp
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Data
const chartData = [
  { name: '2025-12', '金服SBU': 47.37, 'BG-旅游事业群': 58.72, 'FU-内容中心': 41.55, 'FU-质量体验中心': 39.25, 'FU-市场营销部': 37.04, 'E': 31.71 },
  { name: '2026-01', '金服SBU': 30, 'BG-旅游事业群': 50, 'FU-内容中心': 40, 'FU-质量体验中心': 33.33, 'FU-市场营销部': 28.57, 'E': 20 },
  { name: '2026-02', '金服SBU': 40.62, 'BG-旅游事业群': 50, 'FU-内容中心': 33.33, 'FU-质量体验中心': 43.9, 'FU-市场营销部': 25, 'E': 30 },
  { name: '2026-03', '金服SBU': 30, 'BG-旅游事业群': 40, 'FU-内容中心': 30, 'FU-质量体验中心': 30, 'FU-市场营销部': 20, 'E': 25 },
];

const chartLines = [
  { key: '金服SBU', color: '#3B82F6' },
  { key: 'BG-旅游事业群', color: '#F59E0B' },
  { key: 'FU-内容中心', color: '#10B981' },
  { key: 'FU-质量体验中心', color: '#64748B' },
  { key: 'FU-市场营销部', color: '#8B5CF6' },
  { key: 'E', color: '#38BDF8' },
];

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  trendType: 'MOM' | 'YOY';
  trendValue: string;
  isPositive: boolean;
  isActive?: boolean;
  onClose?: () => void;
  onClick?: () => void;
}

function MetricCard({ title, value, unit, trendType, trendValue, isPositive, isActive, onClose, onClick }: MetricCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex flex-col justify-between p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 w-64 bg-white shrink-0",
        isActive ? "border-indigo-500 shadow-md bg-indigo-50/30" : "border-transparent shadow-sm hover:shadow-md hover:border-indigo-200"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-1.5 text-slate-600 text-[13px] font-medium">
          {title}
          <Info size={14} className="text-slate-400" />
        </div>
        {isActive && onClose && (
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-slate-800 tracking-tight">{value}</span>
          <span className="text-slate-500 text-sm">{unit}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">{trendType}</span>
          <div className={cn(
            "flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium",
            isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            {isPositive ? '↗' : '↘'} {trendValue}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ placeholder, icon, className }: { placeholder: string, icon?: React.ReactNode, className?: string }) {
  return (
    <div className={cn("relative flex-1 min-w-[120px] max-w-[200px]", className)}>
      <select 
        defaultValue=""
        className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-2 pl-3 pr-8 rounded-lg text-[13px] outline-none focus:ring-1 focus:ring-[#5C5CFF] focus:border-[#5C5CFF] cursor-pointer hover:border-slate-300 transition-colors"
      >
        <option value="" disabled hidden>{placeholder}</option>
        <option value="1">选项 1</option>
        <option value="2">选项 2</option>
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center gap-1">
        {icon}
        <ChevronDown size={14} />
      </div>
    </div>
  );
}

function RiskWarningPanel({ isExpanded, setIsExpanded }: { isExpanded: boolean, setIsExpanded: (v: boolean) => void }) {
  if (!isExpanded) {
    return (
      <div className="w-12 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center py-6 relative shrink-0 h-full">
         <button onClick={() => setIsExpanded(true)} className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-10 bg-white border border-slate-200 rounded-l-md flex items-center justify-center shadow-sm text-slate-400 hover:text-slate-600 z-10 cursor-pointer">
            <ChevronLeft size={14} />
         </button>
         <div className="text-slate-600 font-medium tracking-widest mt-2" style={{ writingMode: 'vertical-rl' }}>
           风险预警
         </div>
         <div className="mt-4 bg-[#F97316] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
           2
         </div>
      </div>
    )
  }

  return (
    <div className="w-72 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col relative transition-all duration-300 shrink-0 h-full">
       <button onClick={() => setIsExpanded(false)} className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-10 bg-white border border-slate-200 rounded-l-md flex items-center justify-center shadow-sm text-slate-400 hover:text-slate-600 z-10 cursor-pointer">
          <ChevronRight size={14} />
       </button>
       <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-800 text-[15px]">风险预警</h2>
          <span className="bg-[#F97316] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">2</span>
       </div>
       <div className="p-5 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          {/* Card 1 */}
          <div className="border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white">
             <h3 className="text-[13px] font-medium text-slate-800 mb-3">绩优离职率：阈值预警</h3>
             <div className="flex items-center gap-1 text-[#F97316] mb-3">
                <ArrowUp size={18} strokeWidth={2.5} />
                <span className="text-2xl font-bold">3.1%</span>
             </div>
             <p className="text-xs text-slate-500 leading-relaxed">当前值=3.1%, 阈值=4.8%<br/>(month*0.4)</p>
          </div>
          {/* Card 2 */}
          <div className="border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white">
             <h3 className="text-[13px] font-medium text-slate-800 mb-3">平均司龄：增长率预警</h3>
             <div className="flex items-center gap-1 text-[#F97316] mb-3">
                <ArrowUp size={18} strokeWidth={2.5} />
                <span className="text-2xl font-bold">7.4%</span>
             </div>
             <p className="text-xs text-slate-500">增长率=7.4%, 阈值&gt;2.5%</p>
          </div>
       </div>
    </div>
  )
}

export default function App() {
  const [isAIExpanded, setIsAIExpanded] = useState(true);
  const [isRiskExpanded, setIsRiskExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-[#F4F5F7] p-4 md:p-6 font-sans relative overflow-hidden flex flex-col gap-4">
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-50" style={{
        backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="max-w-[1600px] w-full mx-auto relative z-10 flex flex-col gap-4 h-[calc(100vh-32px)] md:h-[calc(100vh-48px)]">
        
        {/* Top Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200 p-4 flex flex-col gap-3 shrink-0">
          <div className="flex gap-3 flex-wrap">
            <FilterSelect placeholder="事业部" />
            <FilterSelect placeholder="部门" />
            <FilterSelect placeholder="小组" />
            <FilterSelect placeholder="序列" />
            <FilterSelect placeholder="职能" />
            <FilterSelect placeholder="子职能组" />
          </div>
          <div className="flex gap-3 items-center flex-wrap">
            <FilterSelect placeholder="辖区" />
            <FilterSelect placeholder="国家" />
            <FilterSelect placeholder="职级" />
            <FilterSelect placeholder="2026" icon={<Calendar size={14} />} />
            <div className="flex gap-2 ml-1">
              <button className="bg-[#5C5CFF] text-white px-6 py-2 rounded-lg flex items-center justify-center gap-1.5 text-[13px] font-medium hover:bg-indigo-600 transition-colors shadow-sm min-w-[80px]">
                <Search size={14} /> 查询
              </button>
              <button className="bg-white border border-slate-200 text-slate-600 px-6 py-2 rounded-lg flex items-center justify-center gap-1.5 text-[13px] font-medium hover:bg-slate-50 transition-colors shadow-sm min-w-[80px]">
                重置
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex gap-4 flex-1 min-h-0">
          
          {/* Left Main Content */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            
            {/* Header & Metrics */}
            <div className="shrink-0">
              <div className="flex items-center mb-3">
                <div className="w-1 h-4 bg-[#5C5CFF] rounded-full mr-2"></div>
                <h1 className="text-[15px] font-semibold text-slate-800">订阅指标</h1>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                <MetricCard
                  title="第一学历92比"
                  value="17.61"
                  unit="%"
                  trendType="MOM"
                  trendValue="3.54%"
                  isPositive={false}
                  isActive={true}
                />
                <MetricCard
                  title="平均年龄"
                  value="32.3"
                  unit="岁"
                  trendType="YOY"
                  trendValue="1.57%"
                  isPositive={true}
                />
                <MetricCard
                  title="离职率"
                  value="2.92"
                  unit="%"
                  trendType="MOM"
                  trendValue="0.0%"
                  isPositive={true}
                />
                {/* Add Button */}
                <button className="flex items-center justify-center w-12 rounded-xl border-2 border-dashed border-slate-300 text-slate-400 hover:text-[#5C5CFF] hover:border-[#5C5CFF] hover:bg-indigo-50 transition-colors bg-white shrink-0">
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Chart & AI Row */}
            <div className="flex gap-4 flex-1 min-h-0">
              {/* Chart Section */}
              <div className={cn(
                "bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col transition-all duration-500 ease-in-out relative",
                isAIExpanded ? "w-[60%]" : "w-full"
              )}>
                {/* Chart Header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-[15px] font-semibold text-slate-800">趋势分析</h2>
                    <button className="flex items-center gap-1 bg-[#2563EB] hover:bg-blue-700 text-white px-2.5 py-1 rounded text-xs font-medium transition-colors">
                      下载
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-slate-500">维度下钻:</span>
                      <div className="relative">
                        <select className="appearance-none bg-white border border-slate-200 text-slate-600 py-1 pl-2 pr-6 rounded text-[13px] outline-none focus:ring-1 focus:ring-[#5C5CFF] focus:border-[#5C5CFF] cursor-pointer">
                          <option>事业部</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* AI Trigger Button */}
                    {!isAIExpanded && (
                      <button
                        onClick={() => setIsAIExpanded(true)}
                        className="group flex items-center gap-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 text-[#5C5CFF] px-3 py-1.5 rounded-full hover:from-indigo-100 hover:to-purple-100 transition-all shadow-sm hover:shadow"
                      >
                        <Sparkles size={14} className="text-[#5C5CFF] group-hover:animate-pulse" />
                        <span className="text-[13px] font-medium">AI 智能洞察</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Chart Legend */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    {chartLines.map(line => (
                      <div key={line.key} className="flex items-center gap-1.5">
                        <div className="w-6 h-0.5 relative" style={{ backgroundColor: line.color }}>
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: line.color }}></div>
                        </div>
                        <span className="text-[12px] text-slate-600">{line.key}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 ml-2 text-[13px] text-slate-500 shrink-0">
                    <ChevronLeft size={14} className="cursor-pointer hover:text-slate-800" />
                    <span>1/4</span>
                    <ChevronRight size={14} className="cursor-pointer hover:text-slate-800" />
                  </div>
                </div>

                {/* Chart */}
                <div className="flex-1 min-h-0 w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94A3B8', fontSize: 11 }}
                        dy={10}
                      />
                      <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                        itemStyle={{ color: '#1E293B', fontWeight: 500 }}
                      />
                      {chartLines.map((line, index) => (
                        <Line
                          key={line.key}
                          type="monotone"
                          dataKey={line.key}
                          stroke={line.color}
                          strokeWidth={2}
                          dot={{ r: 3, fill: line.color, strokeWidth: 0 }}
                          activeDot={{ r: 5, strokeWidth: 0 }}
                          isAnimationActive={true}
                        >
                          {index === 0 && <LabelList dataKey={line.key} position="top" formatter={(val: number) => `${val}%`} style={{ fill: '#64748B', fontSize: 10, fontWeight: 500 }} dy={-8} />}
                        </Line>
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Insight Panel */}
              {isAIExpanded && (
                <div className="w-[40%] bg-[#F8FAFC] rounded-2xl border border-indigo-100 p-5 flex flex-col shadow-sm relative animate-in slide-in-from-right-8 duration-500">
                  {/* Panel Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1.5 text-[#5C5CFF]">
                      <Sparkles size={16} className="fill-indigo-100" />
                      <h2 className="font-semibold text-[15px]">AI 智能洞察</h2>
                      <button className="ml-1 text-indigo-400 hover:text-[#5C5CFF] transition-colors" title="复制内容">
                        <Copy size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => setIsAIExpanded(false)}
                      className="flex items-center text-[13px] text-slate-500 hover:text-[#5C5CFF] transition-colors cursor-pointer"
                    >
                      <ChevronRight size={14} className="mr-0.5" /> 收起
                    </button>
                  </div>

                  {/* Panel Content - Loading State */}
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-500 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex gap-1.5 mb-3">
                      <div className="w-2.5 h-2.5 bg-[#5C5CFF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2.5 h-2.5 bg-[#5C5CFF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2.5 h-2.5 bg-[#5C5CFF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <p className="text-[13px] font-medium text-slate-500">AI正在分析中...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Risk Warning Panel */}
          <RiskWarningPanel isExpanded={isRiskExpanded} setIsExpanded={setIsRiskExpanded} />
          
        </div>
      </div>
    </div>
  );
}
