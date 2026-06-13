import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, ChevronDown, User, Search, Clock, Bookmark, SlidersHorizontal, Star,
  LayoutGrid, Sigma, Dna, FlaskConical, Atom, Folder, FileText, BookOpen
} from 'lucide-react';
import Logo from '../components/Logo';

// Asset Imports
import imgDocument from '../assets/halaman library asset materi.png';

const LibraryPage = () => {
  const { user, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'Semua'); // 'Semua', 'Terbaru', 'Tersimpan'
  const [selectedCategory, setSelectedCategory] = useState('Semua'); // 'Semua', 'Matematika', 'Biologi', 'Kimia', 'Fisika'
  const [activeCollection, setActiveCollection] = useState('Dokumen'); // 'Dokumen', 'Ringkasan', 'Favorit'

  // Extract user info
  const displayName = user?.name || "Budi Saputra";
  const firstName = displayName.split(' ')[0];

  // Document List State
  const [documents, setDocuments] = useState([
    { id: 1, name: 'materi matematika.pdf', category: 'Matematika', size: '4.8 MB', date: '13 Juni 2026', isFavorite: true, isSaved: true, color: 'bg-[#1E3A5F] text-white' },
    { id: 2, name: 'materi biologi.pdf', category: 'Biologi', size: '3.8 MB', date: '13 Juni 2026', isFavorite: false, isSaved: false, color: 'bg-[#1E3A5F] text-white' },
    { id: 3, name: 'materi kimia.pdf', category: 'Kimia', size: '2.7 MB', date: '13 Juni 2026', isFavorite: false, isSaved: false, color: 'bg-[#1E3A5F] text-white' },
    { id: 4, name: 'materi fisika.pdf', category: 'Fisika', size: '2.7 MB', date: '13 Juni 2026', isFavorite: false, isSaved: false, color: 'bg-[#1E3A5F] text-white' }
  ]);

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc
    ));
  };

  // Toggle saved status
  const toggleSaved = (id) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, isSaved: !doc.isSaved } : doc
    ));
  };

  // Filter & Search Logic
  const filteredDocuments = documents.filter(doc => {
    // 1. Search Query filter with abbreviation mappings
    const query = searchQuery.toLowerCase().trim();
    let matchesSearch = true;
    
    if (query) {
      const matchesName = doc.name.toLowerCase().includes(query);
      const matchesCategory = doc.category.toLowerCase().includes(query);
      
      let matchesAbbrev = false;
      if (query === 'mtk' && doc.category.toLowerCase() === 'matematika') {
        matchesAbbrev = true;
      } else if (query === 'bio' && doc.category.toLowerCase() === 'biologi') {
        matchesAbbrev = true;
      } else if (query === 'kimia' && doc.category.toLowerCase() === 'kimia') {
        matchesAbbrev = true;
      } else if (query === 'fisika' && doc.category.toLowerCase() === 'fisika') {
        matchesAbbrev = true;
      }
      
      matchesSearch = matchesName || matchesCategory || matchesAbbrev;
    }
    
    // 2. Tab Filter (Semua, Terbaru, Tersimpan)
    let matchesTab = true;
    if (activeTab === 'Tersimpan') {
      matchesTab = doc.isSaved;
    }
    
    // 3. Category Sidebar Filter
    let matchesCategory = true;
    if (selectedCategory !== 'Semua') {
      matchesCategory = doc.category === selectedCategory;
    }

    // 4. Collection Sidebar Filter
    let matchesCollection = true;
    if (activeCollection === 'Favorit') {
      matchesCollection = doc.isFavorite;
    } else if (activeCollection === 'Ringkasan') {
      matchesCollection = doc.name.toLowerCase().includes('ringkasan');
    }

    return matchesSearch && matchesTab && matchesCategory && matchesCollection;
  });

  const getCategoryIcon = (catId, isActive) => {
    const colorClass = isActive ? "text-[#00B4B4]" : "text-[#1E3A5F]";
    switch(catId) {
      case 'Matematika': return <Sigma size={16} className={colorClass} />;
      case 'Biologi': return <Dna size={16} className={colorClass} />;
      case 'Kimia': return <FlaskConical size={16} className={colorClass} />;
      case 'Fisika': return <Atom size={16} className={colorClass} />;
      default: return <BookOpen size={16} className={colorClass} />;
    }
  };

  const getCollectionIcon = (colId, isActive) => {
    const colorClass = isActive ? "text-[#00B4B4]" : "text-[#1E3A5F]";
    switch(colId) {
      case 'Dokumen': return <Folder size={16} className={colorClass} />;
      case 'Ringkasan': return <FileText size={16} className={colorClass} />;
      case 'Favorit': return <Star size={16} className={colorClass} fill={isActive ? "currentColor" : "none"} />;
      default: return <Folder size={16} className={colorClass} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF4FC] overflow-x-hidden font-sans pb-16">
      
      {/* NAVBAR */}
      <nav className="bg-white px-6 py-4 flex justify-between items-center select-none shadow-sm relative z-40 border-b border-slate-100">
        <Logo size="normal" />

        {/* Navigation Items (Middle) */}
        <div className="hidden md:flex items-center gap-8 font-bold text-slate-500">
          <Link to="/dashboard" className="hover:text-[#1E3A5F] transition-colors">Beranda</Link>
          <Link to="/chat" className="hover:text-[#1E3A5F] transition-colors">Socratic Chat</Link>
          <Link to="/library" className="text-[#00B4B4] relative pb-1">
            Library
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00B4B4] rounded-full"></span>
          </Link>
          <Link to="/progress" className="hover:text-[#1E3A5F] transition-colors">Progress</Link>
        </div>

        {/* User Profile Pill (Right) */}
        <div className="relative font-bold">
          <button 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-3.5 bg-[#1E3A5F] hover:bg-[#152a46] text-white px-5 py-2.5 rounded-full transition-all shadow-sm transform hover:scale-[1.01]"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <span className="text-sm font-semibold hidden sm:inline">{displayName}</span>
            <span className="text-sm font-semibold sm:hidden">{firstName}</span>
            <ChevronDown size={16} className={`transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Menu */}
          <AnimatePresence>
            {profileDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 p-1.5"
              >
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50/50 rounded-xl transition-colors font-bold text-sm text-left"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 mt-10">
        
        {/* Title Section */}
        <div className="mb-8 text-left">
          <h1 className="text-3xl font-extrabold text-[#1E3A5F] tracking-tight">
            Library <span className="text-[#00B4B4]">Materi</span>
          </h1>
          <p className="text-slate-500 text-sm font-bold mt-1">
            Temukan, simpan, dan lanjutkan materi belajarmu.
          </p>
        </div>

        {/* Search & Filter Row */}
        <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Search bar */}
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Cari materi, topik, atau file..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#00B4B4]/40 focus:border-transparent transition-all shadow-sm"
            />
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-3 font-extrabold text-xs shrink-0 select-none">
            
            {/* Scrollable Tabs Wrapper */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              <button 
                onClick={() => setActiveTab('Semua')}
                className={`px-5 py-3 rounded-xl transition-all ${
                  activeTab === 'Semua' 
                    ? 'bg-[#00B4B4] text-white' 
                    : 'bg-white border border-slate-200 text-[#1E3A5F] hover:bg-slate-50'
                }`}
              >
                Semua
              </button>
              <button 
                onClick={() => setActiveTab('Terbaru')}
                className={`px-5 py-3 rounded-xl border flex items-center gap-2 transition-all ${
                  activeTab === 'Terbaru' 
                    ? 'bg-[#00B4B4] text-white border-transparent' 
                    : 'bg-white border-slate-200 text-[#1E3A5F] hover:bg-slate-50'
                }`}
              >
                <Clock size={14} />
                <span>Terbaru</span>
              </button>
              <button 
                onClick={() => setActiveTab('Tersimpan')}
                className={`px-5 py-3 rounded-xl border flex items-center gap-2 transition-all ${
                  activeTab === 'Tersimpan' 
                    ? 'bg-[#00B4B4] text-white border-transparent' 
                    : 'bg-white border-slate-200 text-[#1E3A5F] hover:bg-slate-50'
                }`}
              >
                <Bookmark size={14} />
                <span>Tersimpan</span>
              </button>
            </div>

            {/* Filter Dropdown (Moved outside overflow-x-auto to prevent CSS clipping) */}
            <div className="relative">
              <button 
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                className={`px-5 py-3 rounded-xl border flex items-center gap-2 hover:bg-slate-50 transition-all ${
                  filterDropdownOpen || selectedCategory !== 'Semua' || activeCollection !== 'Dokumen'
                    ? 'bg-[#EAF9F9] border-[#00B4B4] text-[#00B4B4]'
                    : 'bg-white border-slate-200 text-[#1E3A5F]'
                }`}
              >
                <SlidersHorizontal size={14} />
                <span>Filter</span>
              </button>

              <AnimatePresence>
                {filterDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-20" 
                      onClick={() => setFilterDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 z-30 text-[#1E3A5F] text-left font-bold"
                    >
                      <h4 className="text-sm font-black mb-3 border-b border-slate-100 pb-2 flex justify-between items-center">
                        <span>Filter Materi</span>
                        {(selectedCategory !== 'Semua' || activeCollection !== 'Dokumen') && (
                          <button 
                            onClick={() => {
                              setSelectedCategory('Semua');
                              setActiveCollection('Dokumen');
                            }}
                            className="text-xs text-red-500 hover:underline"
                          >
                            Reset
                          </button>
                        )}
                      </h4>

                      <div className="mb-4">
                        <label className="text-[11px] text-slate-400 font-extrabold uppercase tracking-wider block mb-2">Kategori</label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {['Semua', 'Matematika', 'Biologi', 'Kimia', 'Fisika'].map(cat => (
                            <button
                              key={cat}
                              onClick={() => setSelectedCategory(cat)}
                              className={`px-3 py-2 rounded-lg text-xs transition-all border ${
                                selectedCategory === cat
                                  ? 'bg-[#EAF9F9] border-[#00B4B4] text-[#00B4B4]'
                                  : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 text-[#1E3A5F]'
                              }`}
                            >
                              {cat === 'Semua' ? 'Semua' : cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-2">
                        <label className="text-[11px] text-slate-400 font-extrabold uppercase tracking-wider block mb-2">Koleksi</label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {['Dokumen', 'Ringkasan', 'Favorit'].map(col => (
                            <button
                              key={col}
                              onClick={() => setActiveCollection(col)}
                              className={`px-2 py-2 rounded-lg text-xs transition-all border ${
                                activeCollection === col
                                  ? 'bg-[#EAF9F9] border-[#00B4B4] text-[#00B4B4]'
                                  : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 text-[#1E3A5F]'
                              }`}
                            >
                              {col}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* TWO-COLUMN DETAILS LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR FILTERS (Kategori & Koleksi) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Kategori Card */}
            <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-sm text-left">
              <div className="flex items-center gap-2.5 text-sm font-black text-[#1E3A5F] uppercase tracking-wider mb-4">
                <LayoutGrid size={18} className="text-[#1E3A5F]" />
                <h3>Kategori</h3>
              </div>
              <div className="space-y-2.5">
                {[
                  { id: 'Semua', name: 'Semua Kategori' },
                  { id: 'Matematika', name: 'Matematika' },
                  { id: 'Biologi', name: 'Biologi' },
                  { id: 'Kimia', name: 'Kimia' },
                  { id: 'Fisika', name: 'Fisika' }
                ].map(cat => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full px-4 py-3 rounded-xl border font-bold text-sm transition-all text-left flex items-center justify-between gap-3 ${
                        isActive 
                          ? 'bg-[#EAF9F9] border-[#00B4B4] text-[#00B4B4]' 
                          : 'border-slate-100 text-[#1E3A5F] hover:bg-[#EEF4FC]/50 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(cat.id, isActive)}
                        <span>{cat.name}</span>
                      </div>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4]" />}
                    </button>
                  );
                })}
              </div>
              <div className="text-center pt-3 border-t border-slate-100 mt-4">
                <a href="#" className="text-xs font-extrabold text-[#00B4B4] hover:underline">Lihat semua kategori</a>
              </div>
            </div>

            {/* Koleksi Card */}
            <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-sm text-left">
              <div className="flex items-center gap-2.5 text-sm font-black text-[#1E3A5F] uppercase tracking-wider mb-4">
                <FileText size={18} className="text-[#1E3A5F]" />
                <h3>Koleksi</h3>
              </div>
              <div className="space-y-2.5">
                {[
                  { id: 'Dokumen', name: 'Dokumen' },
                  { id: 'Ringkasan', name: 'Ringkasan' },
                  { id: 'Favorit', name: 'Favorit' }
                ].map(col => {
                  const isActive = activeCollection === col.id;
                  return (
                    <button
                      key={col.id}
                      onClick={() => setActiveCollection(col.id)}
                      className={`w-full px-4 py-3 rounded-xl border font-bold text-sm transition-all text-left flex items-center justify-between gap-3 ${
                        isActive 
                          ? 'bg-[#EAF9F9] border-[#00B4B4] text-[#00B4B4]' 
                          : 'border-slate-100 text-[#1E3A5F] hover:bg-[#EEF4FC]/50 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {getCollectionIcon(col.id, isActive)}
                        <span>{col.name}</span>
                      </div>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4]" />}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT CONTENT PANEL (Document List) */}
          <div className="lg:col-span-9 bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col text-left min-h-[500px]">
            
            {/* Header / Info bar */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-black text-[#1E3A5F]">
                {filteredDocuments.length} Materi
              </span>
            </div>

            {/* List View of Documents */}
            <div className="space-y-4 flex-1">
              <AnimatePresence initial={false}>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map(doc => {
                    // Check if Segitiga siku-siku is selected to style it with custom blue bg
                    const isSelected = doc.id === 1;
                    return (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`flex items-center justify-between p-4.5 rounded-[20px] border transition-all duration-300 ${
                          isSelected 
                            ? 'bg-[#EAF9F9] border-dashed border-[#00B4B4]' 
                            : 'bg-white border-dashed border-slate-200 hover:shadow-sm'
                        }`}
                      >
                        <a 
                          href={`/documents/${doc.name}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 min-w-0 cursor-pointer hover:opacity-80 transition-opacity flex-1 pr-4"
                        >
                          {/* File Icon */}
                          <img src={imgDocument} alt="Document" className="w-[60px] h-[60px] object-contain shrink-0" />
                          
                          <div className="min-w-0 text-left">
                            {/* File Name */}
                            <h4 className="text-[15px] font-black text-[#1E3A5F] leading-tight truncate">
                              {doc.name}
                            </h4>
                            
                            {/* Metadata & Tag */}
                            <div className="flex items-center gap-2.5 mt-2 flex-wrap">
                              <span className={`px-2.5 py-1.5 rounded-md text-[10px] font-extrabold uppercase ${doc.color}`}>
                                {doc.category}
                              </span>
                              <span className="text-[11px] text-slate-400 font-bold">{doc.size}</span>
                              <span className="text-[11px] text-slate-400 font-bold">•</span>
                              <span className="text-[11px] text-slate-400 font-bold">{doc.date}</span>
                            </div>
                          </div>
                        </a>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2.5">
                          {/* Favorite (Star) Button */}
                          <button 
                            onClick={() => toggleFavorite(doc.id)}
                            className={`p-2 rounded-xl border transition-all ${
                              doc.isFavorite 
                                ? 'bg-amber-400/10 border-amber-400 text-amber-500 hover:bg-amber-400/20' 
                                : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
                            }`}
                          >
                            <Star size={16} fill={doc.isFavorite ? "currentColor" : "none"} />
                          </button>

                          {/* Saved (Bookmark) Button */}
                          <button 
                            onClick={() => toggleSaved(doc.id)}
                            className={`p-2 rounded-xl border transition-all ${
                              doc.isSaved 
                                ? 'bg-[#1E3A5F]/10 border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F]/20' 
                                : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
                            }`}
                          >
                            <Bookmark size={16} fill={doc.isSaved ? "currentColor" : "none"} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <span className="text-4xl">📚</span>
                    <h4 className="text-[#1E3A5F] font-black text-base mt-4">Materi tidak ditemukan</h4>
                    <p className="text-slate-400 text-xs font-bold mt-1">Coba kata kunci lain atau pilih kategori yang berbeda.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default LibraryPage;
