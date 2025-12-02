-- Create tool_usage table to track tool usage analytics
CREATE TABLE tool_usage (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tool_id VARCHAR(100) NOT NULL,
    user_ip VARCHAR(45) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_feedback table to store user ratings and feedback
CREATE TABLE user_feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tool_id VARCHAR(100) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    user_ip VARCHAR(45) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_tool_usage_tool_id ON tool_usage(tool_id);
CREATE INDEX idx_tool_usage_created_at ON tool_usage(created_at);
CREATE INDEX idx_user_feedback_tool_id ON user_feedback(tool_id);
CREATE INDEX idx_user_feedback_rating ON user_feedback(rating);

-- Enable Row Level Security (RLS)
ALTER TABLE tool_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since these are anonymous usage stats)
CREATE POLICY "Allow public insert on tool_usage" ON tool_usage
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on tool_usage" ON tool_usage
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on user_feedback" ON user_feedback
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on user_feedback" ON user_feedback
    FOR SELECT USING (true);