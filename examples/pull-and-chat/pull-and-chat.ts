import ollama from 'ollama'

/**
 * This example demonstrates how to pull a model and then use it for chat.
 * This is similar to the CLI command `ollama run <model>` which pulls if needed
 * and then starts an interactive chat.
 */
async function main() {
  const model = 'llama3.1' // Can be any model like 'gpt-oss:120b'
  
  // Step 1: Pull the model (if not already available)
  console.log(`Pulling model: ${model}...`)
  try {
    const pullResponse = await ollama.pull({ 
      model: model, 
      stream: false // Set to true if you want to show progress
    })
    console.log(`✓ Model pulled successfully: ${pullResponse.status}`)
  } catch (error) {
    console.error('Error pulling model:', error)
    return
  }

  // Step 2: Use the model for chat
  console.log(`\nStarting chat with ${model}...`)
  const response = await ollama.chat({
    model: model,
    messages: [{ role: 'user', content: 'Hello! Can you introduce yourself?' }],
  })
  
  console.log('\nModel response:')
  console.log(response.message.content)
}

main().catch(console.error)
