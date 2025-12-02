import { categories, getToolsByCategory } from "@/lib/toolsData";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            All Tools by Category
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose from our comprehensive collection of professional online tools
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const categoryTools = getToolsByCategory(category.id);
            if (categoryTools.length === 0) return null;

            const Icon = category.icon;

            return (
              <div key={category.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${category.color}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {categoryTools.length} tools available
                    </p>
                  </div>
                </div>

                {/* Tools List */}
                <div className="space-y-3 mb-6">
                  {categoryTools.slice(0, 4).map((tool) => {
                    const ToolIcon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => navigate(tool.path)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group"
                      >
                        <div className={`p-2 rounded-lg ${tool.color}`}>
                          <ToolIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {tool.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {tool.description.slice(0, 50)}...
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
                      </button>
                    );
                  })}
                </div>

                {/* View All Button */}
                {categoryTools.length > 4 && (
                  <button
                    onClick={() => document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    View all {categoryTools.length} tools
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
