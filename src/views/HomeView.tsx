import React, { useState, useMemo } from 'react';
import { MP, ScoreCalculationResult, Topic, UserScores, UserWeights } from '../types';
import { PARTIES, UNIQUE_PARTIES } from '../data/parties';
import { MpCard } from '../components/MpCard';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Scale, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  PlusCircle,
  HelpCircle
} from 'lucide-react';

interface HomeViewProps {
  mps: MP[];
  topics: Topic[];
  userWeights: UserWeights;
  userScores: UserScores;
  mpCalculationResults: Record<string, ScoreCalculationResult>;
  onSelectMp: (mpId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  mps,
  topics,
  userWeights,
  userScores,
  mpCalculationResults,
  onSelectMp,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParty, setSelectedParty] = useState<string>('all');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'highest_match' | 'lowest_match' | 'most_scored' | 'name' | 'province'>('highest_match');

  // Distinct provinces from mps
  const availableProvinces = useMemo(() => {
    const set = new Set<string>();
    mps.forEach(m => {
      if (m.province) set.add(m.province);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'tr'));
  }, [mps]);

  // Stats calculation
  const totalScoredMps = useMemo(() => {
    return (Object.values(mpCalculationResults) as ScoreCalculationResult[]).filter(r => r.scoredTopicsCount > 0).length;
  }, [mpCalculationResults]);

  const averageMatchPercent = useMemo(() => {
    const scored = (Object.values(mpCalculationResults) as ScoreCalculationResult[]).filter(r => r.scoredTopicsCount > 0);
    if (scored.length === 0) return 0;
    const sum = scored.reduce((acc, curr) => acc + curr.compatibilityPercentage, 0);
    return Math.round((sum / scored.length) * 10) / 10;
  }, [mpCalculationResults]);

  // Filtered and sorted MPs
  const filteredMps = useMemo(() => {
    return mps.filter((mp) => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const party = PARTIES[mp.partyId];
      const matchSearch = 
        !query ||
        mp.fullName.toLowerCase().includes(query) ||
        mp.province.toLowerCase().includes(query) ||
        mp.title.toLowerCase().includes(query) ||
        (party && party.name.toLowerCase().includes(query)) ||
        (party && party.shortName.toLowerCase().includes(query));

      // Party match
      const matchParty = selectedParty === 'all' || mp.partyId === selectedParty || (PARTIES[mp.partyId]?.id === selectedParty);

      // Province match
      const matchProvince = selectedProvince === 'all' || mp.province === selectedProvince;

      return matchSearch && matchParty && matchProvince;
    }).sort((a, b) => {
      const resA = mpCalculationResults[a.id];
      const resB = mpCalculationResults[b.id];

      if (sortBy === 'highest_match') {
        // First sort by whether scored
        if (resA.scoredTopicsCount === 0 && resB.scoredTopicsCount > 0) return 1;
        if (resA.scoredTopicsCount > 0 && resB.scoredTopicsCount === 0) return -1;
        return resB.compatibilityPercentage - resA.compatibilityPercentage;
      }
      if (sortBy === 'lowest_match') {
        if (resA.scoredTopicsCount === 0 && resB.scoredTopicsCount > 0) return 1;
        if (resA.scoredTopicsCount > 0 && resB.scoredTopicsCount === 0) return -1;
        return resA.compatibilityPercentage - resB.compatibilityPercentage;
      }
      if (sortBy === 'most_scored') {
        return resB.scoredTopicsCount - resA.scoredTopicsCount;
      }
      if (sortBy === 'province') {
        return a.province.localeCompare(b.province, 'tr');
      }
      // 'name'
      return a.fullName.localeCompare(b.fullName, 'tr');
    });
  }, [mps, searchQuery, selectedParty, sortBy, mpCalculationResults]);

  return (
    <div className="space-y-6">
      {/* Hero / Overview Banner */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-6 sm:p-8 overflow-hidden shadow-xl border border-slate-800">
        {/* Subtle decorative architectural grid lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kişiselleştirilmiş Siyasi Pusula & Tutanak Skoru</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-white leading-tight">
            Milletvekillerinin Tutumlarına Göre Kişisel Uyumunuzu Keşfedin
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Türk siyasetinin 18 kritik ve tartışmalı gündem maddesinde milletvekillerinin doğrulanmış tutanak özetlerini inceleyin, kendi değerlerinize göre puanlayın ve şeffaf uyum yüzdenizi hesaplayın.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-slate-800/60 px-3.5 py-2 rounded-xl border border-slate-700/60">
              <Users className="w-4 h-4 text-sky-400" />
              <span><strong>{totalScoredMps} / {mps.length}</strong> MV Puanlandı</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-800/60 px-3.5 py-2 rounded-xl border border-slate-700/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Ortalama Uyum: <strong className="font-mono text-emerald-300">%{averageMatchPercent}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="search-mps-input"
              type="text"
              placeholder="Milletvekili adı, il veya parti ile arayın (Örn: Özgür Özel, Manisa, CHP)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 focus:outline-none text-sm bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Province and Sort Selectors */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Province Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                İl:
              </span>
              <select
                id="filter-province-select"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:border-slate-800 cursor-pointer"
              >
                <option value="all">Tüm İller ({mps.length})</option>
                {availableProvinces.map((prov) => {
                  const provCount = mps.filter(m => m.province === prov).length;
                  return (
                    <option key={prov} value={prov}>
                      {prov} ({provCount})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sırala:
              </span>
              <select
                id="sort-mps-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:border-slate-800 cursor-pointer"
              >
                <option value="highest_match">En Yüksek Uyum (%)</option>
                <option value="lowest_match">En Düşük Uyum (%)</option>
                <option value="most_scored">En Çok Puanlanan Konu</option>
                <option value="name">İsim (A-Z)</option>
                <option value="province">İl (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Party Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            id="filter-party-all"
            onClick={() => setSelectedParty('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedParty === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tüm Partiler ({mps.length})
          </button>

          {UNIQUE_PARTIES.map((party) => {
            const count = mps.filter(m => m.partyId === party.id || PARTIES[m.partyId]?.id === party.id).length;
            if (count === 0) return null;
            const isSelected = selectedParty === party.id;

            return (
              <button
                key={party.id}
                id={`filter-party-${party.id}`}
                onClick={() => setSelectedParty(party.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'ring-2 ring-slate-800 shadow-xs'
                    : 'opacity-85 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: party.bgColor,
                  borderColor: party.borderColor,
                  color: party.color,
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: party.color }}></span>
                <span>{party.shortName}</span>
                <span className="text-[10px] opacity-75 font-mono">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MP Cards Grid */}
      {filteredMps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMps.map((mp) => (
            <MpCard
              key={mp.id}
              mp={mp}
              calculationResult={mpCalculationResults[mp.id]}
              onSelect={onSelectMp}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Aradığınız kriterlere uygun milletvekili bulunamadı</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Lütfen arama teriminizi değiştirin veya parti filtresini sıfırlayın.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedParty('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}
    </div>
  );
};
