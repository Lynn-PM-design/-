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

// --- Data ---

const chartDataMulti = [
  { name: '2025-12', '信息安全部': 42, '客服产品研发部': 60, '数据底座保障部': 25, '企业数字化平台部': 80, '无线平台研发部': 15 },
  { name: '2026-01', '信息安全部': 45, '客服产品研发部': 58, '数据底座保障部': 28, '企业数字化平台部': 75, '无线平台研发部': 18 },
  { name: '2026-02', '信息安全部': 40, '客服产品研发部': 62, '数据底座保障部': 22, '企业数字化平台部': 85, '无线平台研发部': 12 },
  { name: '2026-03', '信息安全部': 43, '客服产品研发部': 59, '数据底座保障部': 26, '企业数字化平台部': 78, '无线平台研发部': 16 },
];

const chartLinesMulti = [
  { key: '信息安全部', color: '#3B82F6' },
  { key: '客服产品研发部', color: '#F59E0B' },
  { key: '数据底座保障部', color: '#10B981' },
  { key: '企业数字化平台部', color: '#8B5CF6' },
  { key: '无线平台研发部', color: '#EC4899' },
];

const chartDataDual = [
  { name: '2025-12', '所选组织': 58.7, '集团': 50 },
  { name: '2026-01', '所选组织': 20.7, '集团': 50 },
  { name: '2026-02', '所选组织': 21.2, '集团': 50 },
  { name: '2026-03', '所选组织': 53.3, '集团': 50 },
];

const chartLinesDual = [
  { key: '所选组织', color: '#3B82F6' },
  { key: '集团', color: '#F59E0B' },
];

const tableData1 = [
  { name: '框架架构研发部', base: '94.0', current: '93.0', diff: '-1.0', contrib: '-1.0', contribRate: '33.3%' },
  { name: '系统研发部', base: '74.0', current: '72.0', diff: '-2.0', contrib: '-2.0', contribRate: '66.7%' },
  { name: '基础设施运维中心', base: '152.0', current: '150.0', diff: '-2.0', contrib: '-2.0', contribRate: '66.7%' },
  { name: '无线平台研发部', base: '80.0', current: '80.0', diff: '0.0', contrib: '0.0', contribRate: '0.0%' },
  { name: '用户平台研发部', base: '42.0', current: '42.0', diff: '0.0', contrib: '0.0', contribRate: '0.0%' },
  { name: '公共数据智能部', base: '47.0', current: '48.0', diff: '1.0', contrib: '1.0', contribRate: '-33.3%' },
  { name: '人力资源部', base: '11.0', current: '10.0', diff: '-1.0', contrib: '-1.0', contribRate: '33.3%' },
  { name: '信息安全部', base: '60.0', current: '60.0', diff: '0.0', contrib: '0.0', contribRate: '0.0%' },
  { name: '客服产品部', base: '31.0', current: '30.0', diff: '-1.0', contrib: '-1.0', contribRate: '33.3%' },
  { name: '平台设计部', base: '17.0', current: '17.0', diff: '0.0', contrib: '0.0', contribRate: '0.0%' },
];

const tableData2 = [
  { name: '所选组织', base: '58.7%', current: '53.3%', diff: '-5.4%', contrib: '-0.8', contribRate: '100.0%', denominator: '15' },
];

const tableData3 = [
  { name: '所选组织', base: '0.0%', current: '1.6%', diff: '1.6%', contrib: '15.0', contribRate: '100.0%', denominator: '966.5' },
];

// --- Components ---

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  trendType: string;
  trendValue: string;
  isPositive: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

function MetricCard({ title, value, unit, trendType, trendValue, isPositive, isActive, onClick }: MetricCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex flex-col justify-between p-4 rounded-xl border-[1.5px] cursor-pointer transition-all w-[200px] bg-white shrink-0",
        isActive ? "border-[#5C5CFF] shadow-sm bg-[#F8FAFF]" : "border-transparent shadow-sm hover:shadow hover:border-indigo-100"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-1 text-slate-600 text-[13px] font-medium">
          {title}
          <Info size={13} className="text-slate-400" />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-0.5">
          <span className="text-3xl font-bold text-slate-800 tracking-tight">{value}</span>
          <span className="text-slate-500 text-xs">{unit}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">{trendType}</span>
          <div className={cn(
            "flex items-center gap-0.5 text-xs font-medium",
            isPositive ? "text-emerald-500" : "text-rose-500"
          )}>
            <ArrowUp size={12} className={cn("stroke-[3px]", !isPositive && "rotate-180")} />
            {trendValue}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ placeholder, icon, className, isTag }: { placeholder: string, icon?: React.ReactNode, className?: string, isTag?: boolean }) {
  if (isTag) {
    return (
      <div className="flex items-center gap-2 bg-slate-100/80 text-slate-600 px-3 py-1.5 rounded-md text-[13px] border border-slate-200">
        <span>{placeholder}</span>
        <X size={14} className="text-slate-400 cursor-pointer hover:text-slate-600" />
      </div>
    )
  }
  return (
    <div className={cn("relative flex-1 min-w-[100px] max-w-[160px]", className)}>
      <select 
        defaultValue=""
        className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-1.5 pl-3 pr-8 rounded-md text-[13px] outline-none focus:ring-1 focus:ring-[#5C5CFF] focus:border-[#5C5CFF] cursor-pointer hover:border-slate-300 transition-colors"
      >
        <option value="" disabled hidden>{placeholder}</option>
        <option value="1">选项 1</option>
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center gap-1">
        {icon}
        <ChevronDown size={14} />
      </div>
    </div>
  );
}

function DataTable({ data, hasDenominator = false }: { data: any[], hasDenominator?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mt-4">
      <div 
        className="flex justify-between items-center p-3 border-b border-slate-100 bg-slate-50/50 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-[13px] font-medium text-slate-700">维度下钻明细</h3>
        <ChevronDown size={14} className={cn("text-slate-400 transition-transform duration-200", !isExpanded && "-rotate-90")} />
      </div>
      {isExpanded && (
        <>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-[12px] text-slate-500 bg-white">
                  <th className="p-3 font-medium w-[200px]">维度项</th>
                  <th className="p-3 font-medium">基期值 <span className="text-[10px] text-slate-300 ml-1">↕</span></th>
                  <th className="p-3 font-medium">当期值 <span className="text-[10px] text-slate-300 ml-1">↕</span></th>
                  <th className="p-3 font-medium">对比差值 <span className="text-[10px] text-slate-300 ml-1">↕</span></th>
                  <th className="p-3 font-medium">贡献值 <span className="text-[10px] text-slate-300 ml-1">↕</span></th>
                  <th className="p-3 font-medium">贡献度 <span className="text-[10px] text-slate-300 ml-1">↕</span></th>
                  <th className="p-3 font-medium">当期分母 <span className="text-[10px] text-slate-300 ml-1">↕</span></th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 text-[12px] text-slate-600 hover:bg-slate-50/50">
                    <td className="p-3 flex items-center gap-2">
                      <Plus size={12} className="text-slate-400 cursor-pointer" />
                      {row.name}
                    </td>
                    <td className="p-3">{row.base}</td>
                    <td className="p-3">{row.current}</td>
                    <td className="p-3">{row.diff}</td>
                    <td className="p-3">{row.contrib}</td>
                    <td className="p-3">{row.contribRate}</td>
                    <td className="p-3">{row.denominator || '0.0%'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 flex justify-end items-center gap-2 border-t border-slate-100 bg-white">
            <button className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50"><ChevronLeft size={12} /></button>
            <button className="w-6 h-6 flex items-center justify-center rounded border border-[#5C5CFF] text-[#5C5CFF] bg-indigo-50 text-xs">1</button>
            <button className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs">2</button>
            <button className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50"><ChevronRight size={12} /></button>
          </div>
        </>
      )}
    </div>
  );
}

function DashboardSection({ 
  title, 
  metrics, 
  chartData, 
  chartLines, 
  tableData, 
  rank, 
  aiText 
}: { 
  title: string, 
  metrics: any[], 
  chartData: any[], 
  chartLines: any[], 
  tableData: any[], 
  rank: string,
  aiText?: React.ReactNode
}) {
  const [activeMetric, setActiveMetric] = useState(metrics[0].title);

  return (
    <div className="mb-6">
      {/* Title */}
      <div className="flex items-center mb-4">
        <div className="w-1 h-3.5 bg-[#5C5CFF] rounded-full mr-2"></div>
        <h2 className="text-[15px] font-semibold text-slate-800">{title}</h2>
      </div>

      {/* Metrics */}
      <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
        {metrics.map((m, i) => (
          <MetricCard
            key={i}
            {...m}
            isActive={activeMetric === m.title}
            onClick={() => setActiveMetric(m.title)}
          />
        ))}
        <button className="flex items-center justify-center w-10 rounded-xl border border-dashed border-slate-300 text-slate-400 hover:text-[#5C5CFF] hover:border-[#5C5CFF] hover:bg-indigo-50 transition-colors bg-white shrink-0">
          <Plus size={18} />
        </button>
      </div>
      <div className="text-[11px] text-slate-400 ml-1 mb-4">集团排名: <span className="font-medium text-slate-600">{rank}</span></div>

      {/* Chart & AI */}
      <div className="flex gap-4 h-[320px]">
        {/* Chart Panel */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col min-w-0">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-medium text-slate-800">趋势分析</h3>
              <button className="bg-[#2563EB] text-white px-2 py-0.5 rounded text-[11px] hover:bg-blue-700 transition-colors">下载</button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-slate-500">维度下钻:</span>
              <div className="relative">
                <select className="appearance-none bg-white border border-slate-200 text-slate-600 py-1 pl-2 pr-6 rounded text-[12px] outline-none focus:ring-1 focus:ring-[#5C5CFF] focus:border-[#5C5CFF] cursor-pointer">
                  <option>部门</option>
                  <option>默认</option>
                  <option>事业部</option>
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3 flex-wrap">
              {chartLines.map((line: any) => (
                <div key={line.key} className="flex items-center gap-1.5">
                  <div className="w-4 h-0.5 relative" style={{ backgroundColor: line.color }}>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: line.color }}></div>
                  </div>
                  <span className="text-[11px] text-slate-500">{line.key}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
              <ChevronLeft size={12} className="cursor-pointer hover:text-slate-600" />
              <span>1/4</span>
              <ChevronRight size={12} className="cursor-pointer hover:text-slate-600" />
            </div>
          </div>

          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} dy={10} />
                <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                {chartLines.map((line: any, index: number) => (
                  <Line key={line.key} type="monotone" dataKey={line.key} stroke={line.color} strokeWidth={1.5} dot={{ r: 2.5, fill: line.color, strokeWidth: 0 }} activeDot={{ r: 4, strokeWidth: 0 }}>
                    {index === 0 && <LabelList dataKey={line.key} position="top" formatter={(val: number) => `${val}%`} style={{ fill: '#64748B', fontSize: 9 }} dy={-5} />}
                  </Line>
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Panel */}
        <div className="w-[280px] bg-[#F8FAFC] rounded-xl border border-indigo-50 p-4 flex flex-col shadow-sm shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5 text-[#5C5CFF]">
              <Sparkles size={14} className="fill-indigo-100" />
              <h3 className="font-medium text-[13px]">AI 智能洞察</h3>
            </div>
            <button className="text-indigo-300 hover:text-[#5C5CFF] transition-colors"><Copy size={12} /></button>
          </div>
          
          {aiText ? (
            <div className="flex-1 overflow-y-auto custom-scrollbar text-xs text-slate-600 leading-relaxed pr-1">
              {aiText}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-white rounded-lg border border-slate-100">
              <div className="flex gap-1 mb-2">
                <div className="w-2 h-2 bg-[#5C5CFF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-[#5C5CFF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-[#5C5CFF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <p className="text-[11px]">AI正在分析中...</p>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <DataTable data={tableData} />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#F4F5F7] p-4 md:p-6 font-sans relative flex justify-center">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E2E8F0;
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #CBD5E1;
        }
      `}</style>
      <div className="max-w-[1400px] w-full flex flex-col gap-5 relative z-10">
        
        {/* Top Filters (Full Width) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex flex-col gap-3 shrink-0">
            <div className="flex gap-2 flex-wrap">
              <FilterSelect placeholder="FU-技术..." isTag={true} />
              <FilterSelect placeholder="部门" />
              <FilterSelect placeholder="小组" />
              <FilterSelect placeholder="序列" />
              <FilterSelect placeholder="职能" />
              <FilterSelect placeholder="子职能组" />
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              <FilterSelect placeholder="辖区" />
              <FilterSelect placeholder="国家" />
              <FilterSelect placeholder="职级" />
              <FilterSelect placeholder="2026" icon={<Calendar size={13} />} />
              <div className="flex gap-2 ml-auto">
                <button className="bg-[#5C5CFF] text-white px-5 py-1.5 rounded-md flex items-center justify-center gap-1 text-[12px] font-medium hover:bg-indigo-600 transition-colors shadow-sm">
                  <Search size={13} /> 查询
                </button>
                <button className="bg-white border border-slate-200 text-slate-600 px-5 py-1.5 rounded-md flex items-center justify-center gap-1 text-[12px] font-medium hover:bg-slate-50 transition-colors shadow-sm">
                  重置
                </button>
              </div>
            </div>
          </div>

          {/* Two Columns Layout */}
          <div className="flex gap-5 items-start">
            
            {/* Left Main Content (Scrolling) */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">

              {/* Section 1: 订阅指标 */}
          <DashboardSection 
            title="订阅指标"
            rank="8/17"
            metrics={[
              { title: '在职人数', value: '964', unit: '人', trendType: 'MOM', trendValue: '0.1%', isPositive: true },
              { title: '在职国际化人才占比', value: '22.4', unit: '%', trendType: 'MOM', trendValue: '0.1%', isPositive: true },
              { title: '离职率', value: '1.9', unit: '%', trendType: 'MOM', trendValue: '0.0%', isPositive: true },
              { title: '入职人数', value: '5', unit: '人', trendType: 'MOM', trendValue: '150.0%', isPositive: true },
            ]}
            chartData={chartDataMulti}
            chartLines={chartLinesMulti}
            tableData={tableData1}
            aiText={
              <div className="space-y-3">
                <p>本月<span className="text-[#5C5CFF] font-medium">在职人数</span>整体呈平稳趋势，环比微增 <span className="text-emerald-500 font-medium">0.1%</span>。</p>
                <p>其中，<span className="font-medium text-slate-700">企业数字化平台部</span> 人数增长最为明显，建议关注该部门近期的新业务拓展情况。</p>
                <p>整体离职率保持在 <span className="text-emerald-500 font-medium">1.9%</span> 的健康水平，团队稳定性良好。</p>
              </div>
            }
          />

          {/* Section 2: 在职指标 */}
          <DashboardSection 
            title="在职指标"
            rank="8/17"
            metrics={[
              { title: '在职人数', value: '964', unit: '人', trendType: 'MOM', trendValue: '0.1%', isPositive: true },
              { title: '平均年龄', value: '33.9', unit: '岁', trendType: 'YOY', trendValue: '3.0%', isPositive: true },
              { title: '平均司龄', value: '6.2', unit: '年', trendType: 'YOY', trendValue: '6.9%', isPositive: true },
              { title: '在职国际化人才占比', value: '22.4', unit: '%', trendType: 'MOM', trendValue: '0.1%', isPositive: true },
            ]}
            chartData={chartDataMulti}
            chartLines={chartLinesMulti}
            tableData={tableData1}
          />

          {/* Section 3: 入职指标 */}
          <DashboardSection 
            title="入职指标"
            rank="1/15"
            metrics={[
              { title: '第一学历92比', value: '53.3', unit: '%', trendType: 'MOM', trendValue: '3.3%', isPositive: true },
              { title: '新人绩优率', value: '35.4', unit: '%', trendType: 'MOM', trendValue: '35.4%', isPositive: true },
              { title: '90天留存率', value: '92.9', unit: '%', trendType: 'MOM', trendValue: '6.2%', isPositive: true },
              { title: '入职国际化人才占比', value: '53.3', unit: '%', trendType: 'MOM', trendValue: '6.7%', isPositive: false },
              { title: '入职人数', value: '5', unit: '人', trendType: 'MOM', trendValue: '150.0%', isPositive: true },
            ]}
            chartData={chartDataDual}
            chartLines={chartLinesDual}
            tableData={tableData2}
          />

          {/* Section 4: 离职指标 */}
          <DashboardSection 
            title="离职指标"
            rank="14/15"
            metrics={[
              { title: '淘汰率', value: '1.6', unit: '%', trendType: 'MOM', trendValue: '0.0%', isPositive: true },
              { title: '绩优离职率', value: '0.3', unit: '%', trendType: 'MOM', trendValue: '0.0%', isPositive: true },
              { title: '离职率', value: '1.9', unit: '%', trendType: 'MOM', trendValue: '0.0%', isPositive: true },
              { title: '主动离职率', value: '0.3', unit: '%', trendType: 'MOM', trendValue: '0.0%', isPositive: true },
              { title: '离职人数', value: '18', unit: '人', trendType: 'MOM', trendValue: '20.0%', isPositive: false },
            ]}
            chartData={chartDataDual}
            chartLines={chartLinesDual}
            tableData={tableData3}
          />

          {/* Footer */}
          <div className="text-center text-[12px] text-slate-400 py-6">
            © 2021-2026 大数据与AI应用研发部
          </div>

        </div>

        {/* Right Risk Warning Panel (Sticky) */}
        <div className="w-56 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col sticky top-6 shrink-0 h-[calc(100vh-48px)]">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-xl">
            <h2 className="font-semibold text-slate-800 text-[14px]">风险预警</h2>
            <span className="bg-[#F97316] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">3</span>
          </div>
          <div className="p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
            {/* Card 1 */}
            <div className="border border-slate-100 rounded-lg p-3 shadow-sm bg-white">
              <h3 className="text-[12px] font-medium text-slate-800 mb-2">绩优离职率：阈值预警</h3>
              <div className="flex items-center gap-1 text-[#F97316] mb-2">
                <ArrowUp size={16} strokeWidth={2.5} />
                <span className="text-xl font-bold">0.3%</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">当前值=0.3%, 阈值=1.2%<br/>(month*0.4)</p>
            </div>
            {/* Card 2 */}
            <div className="border border-slate-100 rounded-lg p-3 shadow-sm bg-white">
              <h3 className="text-[12px] font-medium text-slate-800 mb-2">平均年龄：增长率预警</h3>
              <div className="flex items-center gap-1 text-[#F97316] mb-2">
                <ArrowUp size={16} strokeWidth={2.5} />
                <span className="text-xl font-bold">3.0%</span>
              </div>
              <p className="text-[11px] text-slate-500">增长率=3.0%, 阈值&gt;2.5%</p>
            </div>
            {/* Card 3 */}
            <div className="border border-slate-100 rounded-lg p-3 shadow-sm bg-white">
              <h3 className="text-[12px] font-medium text-slate-800 mb-2">平均司龄：增长率预警</h3>
              <div className="flex items-center gap-1 text-[#F97316] mb-2">
                <ArrowUp size={16} strokeWidth={2.5} />
                <span className="text-xl font-bold">6.9%</span>
              </div>
              <p className="text-[11px] text-slate-500">增长率=6.9%, 阈值&gt;2.5%</p>
            </div>
          </div>
        </div>
        
      </div>
      </div>
    </div>
  );
}
