import { ReactNode, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Info, Star, MessageSquare } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  children: ReactNode;
  tips?: string[];
  toolId: string;
}

const ToolLayout = ({
  title,
  description,
  icon: Icon,
  iconColor,
  children,
  tips,
  toolId,
}: ToolLayoutProps) => {
  const { trackToolUsage, submitFeedback, getToolStats } = useAnalytics();
  const [stats, setStats] = useState({ usageCount: 0, avgRating: 0, totalRatings: 0 });
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const loadStats = useCallback(async () => {
    const toolStats = await getToolStats(toolId);
    setStats(toolStats);
  }, [toolId, getToolStats]);

  useEffect(() => {
    const initTool = async () => {
      await trackToolUsage(toolId);
      await loadStats();
    };
    initTool();
  }, [toolId, trackToolUsage, loadStats]);

  const handleFeedbackSubmit = async () => {
    if (rating === 0) return;
    
    const result = await submitFeedback(toolId, rating, comment);
    if (result.success) {
      setFeedbackSubmitted(true);
      setShowFeedback(false);
      loadStats();
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className={`p-4 rounded-2xl ${iconColor}`}>
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
        </div>

        {/* Tool Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              {children}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Tool Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Uses</span>
                  <span className="font-medium">{stats.usageCount.toLocaleString()}</span>
                </div>
                {stats.totalRatings > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{stats.avgRating}</span>
                      <span className="text-xs text-muted-foreground">({stats.totalRatings})</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Feedback */}
            {!feedbackSubmitted && (
              <div className="bg-card border border-border rounded-2xl p-6">
                {!showFeedback ? (
                  <>
                    <h3 className="font-semibold mb-2">Rate this tool</h3>
                    <p className="text-sm text-muted-foreground mb-4">Help others by sharing your experience</p>
                    <Button onClick={() => setShowFeedback(true)} className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Leave Feedback
                    </Button>
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold mb-4">Rate this tool</h3>
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <Textarea
                      placeholder="Optional comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mb-4"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleFeedbackSubmit} disabled={rating === 0}>
                        Submit
                      </Button>
                      <Button variant="outline" onClick={() => setShowFeedback(false)}>
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Tips */}
            {tips && tips.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Tips & Info</h3>
                </div>
                <ul className="space-y-3">
                  {tips.map((tip, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolLayout;
