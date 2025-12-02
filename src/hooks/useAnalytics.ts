import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export const useAnalytics = () => {
  const trackToolUsage = async (toolId: string) => {
    try {
      // Get user IP (simplified - in production you'd use a proper IP service)
      const userIP = 'anonymous'
      
      await supabase
        .from('tool_usage')
        .insert({
          tool_id: toolId,
          user_ip: userIP
        })
    } catch (error) {
      console.error('Analytics tracking error:', error)
    }
  }

  const submitFeedback = async (toolId: string, rating: number, comment?: string) => {
    try {
      const userIP = 'anonymous'
      
      const { error } = await supabase
        .from('user_feedback')
        .insert({
          tool_id: toolId,
          rating,
          comment: comment || null,
          user_ip: userIP
        })

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Feedback submission error:', error)
      return { success: false, error }
    }
  }

  const getToolStats = async (toolId: string) => {
    try {
      const [usageResult, feedbackResult] = await Promise.all([
        supabase
          .from('tool_usage')
          .select('*', { count: 'exact' })
          .eq('tool_id', toolId),
        supabase
          .from('user_feedback')
          .select('rating')
          .eq('tool_id', toolId)
      ])

      const usageCount = usageResult.count || 0
      const ratings = feedbackResult.data || []
      const avgRating = ratings.length > 0 
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
        : 0

      return {
        usageCount,
        avgRating: Math.round(avgRating * 10) / 10,
        totalRatings: ratings.length
      }
    } catch (error) {
      console.error('Stats fetch error:', error)
      return { usageCount: 0, avgRating: 0, totalRatings: 0 }
    }
  }

  return {
    trackToolUsage,
    submitFeedback,
    getToolStats
  }
}