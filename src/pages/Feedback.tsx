import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { tools } from "@/lib/toolsData";

interface Feedback {
  id: string;
  tool_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      const { data, error } = await supabase
        .from("user_feedback")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (!error && data) {
        setFeedbacks(data);
      }
    } catch (error) {
      console.error("Error loading feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const getToolName = (toolId: string) => {
    return tools.find((t) => t.id === toolId)?.name || toolId;
  };

  const filteredFeedbacks = filter === "all" 
    ? feedbacks 
    : feedbacks.filter((f) => f.tool_id === filter);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Feedback</h1>
          <p className="text-muted-foreground">See what users think about our tools</p>
        </div>

        <div className="mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-modern w-full md:w-64"
          >
            <option value="all">All Tools</option>
            {tools.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading feedback...</p>
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-2xl">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">No feedback yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFeedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{getToolName(feedback.tool_id)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(feedback.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < feedback.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {feedback.comment && (
                  <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
