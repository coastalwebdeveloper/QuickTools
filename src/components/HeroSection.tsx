import { Search, Zap, Shield, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchTools, tools } from "@/lib/toolsData";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchTools>>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedIndex(-1);
    if (query.trim()) {
      const results = searchTools(query);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || searchResults.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < searchResults.slice(0, 6).length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.slice(0, 6).length) {
          handleSelectTool(searchResults[selectedIndex].path);
        }
        break;
      case "Escape":
        setShowResults(false);
        searchInputRef.current?.blur();
        break;
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-900/50 text-inherit">{part}</mark> : part
    );
  };

  const handleSelectTool = (path: string) => {
    navigate(path);
    setShowResults(false);
    setSearchQuery("");
  };

  const popularTools = tools.slice(0, 6);

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              QuickTools
            </span>
            <br />
            <span className="text-2xl md:text-4xl text-gray-600 dark:text-gray-300">Online</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
            Professional online tools for everyday tasks. Fast, secure, and completely free.
          </p>

          <div className="relative max-w-2xl mx-auto mb-8 md:mb-12">
            <div className="relative">
              <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => searchQuery && setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                className="w-full pl-12 md:pl-16 pr-4 md:pr-6 py-4 md:py-5 text-base md:text-lg rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
              />
            </div>

            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50">
                {searchResults.slice(0, 6).map((tool, index) => {
                  const Icon = tool.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleSelectTool(tool.path)}
                      className={`w-full flex items-center gap-4 px-6 py-4 transition-colors text-left border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                        isSelected ? "bg-blue-50 dark:bg-blue-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className={`p-3 rounded-xl ${tool.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {highlightMatch(tool.name, searchQuery)}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {highlightMatch(tool.description, searchQuery)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4 md:mb-6">Popular Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {popularTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => navigate(tool.path)}
                    className="group p-3 md:p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200"
                  >
                    <div className={`p-2 md:p-3 rounded-lg ${tool.color} mb-2 md:mb-3 mx-auto w-fit`}>
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {tool.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 md:gap-3 text-gray-600 dark:text-gray-300">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm md:text-base font-medium">Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-gray-600 dark:text-gray-300">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm md:text-base font-medium">100% Secure</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-gray-600 dark:text-gray-300">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm md:text-base font-medium">Always Free</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
