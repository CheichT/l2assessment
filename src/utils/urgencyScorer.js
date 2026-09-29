/**
 * Urgency Scorer - Rule-based urgency calculation with keyword detection
 */

export function calculateUrgency(message) {
  const lowerMessage = message.toLowerCase()
  
  // Critical keywords → High urgency
  const criticalKeywords = [
    'production', 'down', 'urgent', 'critical', 'error', 'broken', 'crash', 'fail', 'emergency', 'asap', 'immediately',
    'login', 'can\'t login', 'cannot login', 'access denied', 'authentication failed',
    'data loss', 'lost data', 'data corrupted', 'corrupted', 'delete',
    'database', 'db error', 'connection failed', 'timeout',
    'security', 'breach', 'hacked', 'attack', 'unauthorized',
    'outage', 'down time', 'offline', 'not working', 'not responding',
    'api error', 'api down', '500', '503'
  ]
  if (criticalKeywords.some(word => lowerMessage.includes(word))) {
    return "High"
  }
  
  // Payment/billing keywords → Medium to High
  const paymentKeywords = ['payment', 'billing', 'invoice', 'charge', 'subscription', 'can\'t pay', 'payment failed', 'billing error', 'refund', 'money']
  if (paymentKeywords.some(word => lowerMessage.includes(word))) {
    return "Medium"
  }
  
  // Original scoring logic
  let urgencyScore = 50
  
  const exclamationCount = (message.match(/!/g) || []).length
  urgencyScore += exclamationCount * 30
  
  if (message.length < 50) urgencyScore -= 20
  if (message.length < 20) urgencyScore -= 30
  
  if (message === message.toUpperCase() && message.length > 10) {
    urgencyScore += 20
  }
  
  const politeWords = ['please', 'thank', 'thanks', 'appreciate', 'kindly']
  politeWords.forEach(word => {
    if (lowerMessage.includes(word)) urgencyScore -= 10
  })
  
  if (message.includes('?')) urgencyScore += 10
  
  const negativeWords = ['not working', 'doesn\'t work', 'bug', 'issue', 'problem', 'help', 'stuck', 'slow', 'delay', 'late']
  negativeWords.forEach(word => {
    if (lowerMessage.includes(word)) urgencyScore += 15
  })
  
  const positiveWords = ['happy', 'love', 'great', 'excellent', 'wonderful', 'thank you', 'appreciate']
  positiveWords.forEach(word => {
    if (lowerMessage.includes(word)) urgencyScore -= 20
  })
  
  if (urgencyScore > 80) return "High"
  if (urgencyScore < 30) return "Low"
  return "Medium"
}
