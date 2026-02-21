/**
 * Course personalisation — proxied through /api/generate.
 * The OpenAI API key lives server-side only; nothing sensitive touches the browser.
 */

export const GENERATION_STAGES = [
  { id: 'reading',   label: 'Reading your profile...',               duration: 800 },
  { id: 'modules',   label: 'Designing your module projects...',     duration: 1200 },
  { id: 'memory',    label: 'Writing your MEMORY.md first draft...', duration: 1000 },
  { id: 'examples',  label: 'Tailoring your use cases...',           duration: 800 },
  { id: 'finishing', label: 'Putting it all together...',            duration: 600 },
]

/**
 * Calls the backend /api/generate endpoint.
 * @param {string} token  — access token issued by /api/redeem
 * @param {object} profile — completed onboarding profile
 * @param {function} onStage — callback(stageId) for UI progress
 * @returns {object} generatedContent
 */
export async function generateWithLLM(token, profile, onStage = () => {}) {
  onStage('reading')

  let response
  try {
    response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, profile }),
    })
  } catch {
    throw new Error('Could not reach the server. Check your connection and try again.')
  }

  const data = await response.json()

  if (response.status === 401) {
    throw new Error(data.message || 'Your access token is invalid. Please re-enter your coupon code.')
  }

  if (response.status === 503) {
    throw new Error(data.message || "We're at capacity right now. Try again in a few hours.")
  }

  if (!response.ok) {
    throw new Error(data.error || `Generation failed (${response.status}). Try again.`)
  }

  if (!data.generatedContent) {
    throw new Error('Server returned an empty response. Try again.')
  }

  onStage('finishing')

  return data.generatedContent
}
