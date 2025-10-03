import ollama from 'ollama'

/**
 * This example demonstrates how to pull a model with progress updates
 * and then use it for streaming chat.
 * This is similar to the CLI command `ollama run <model>`.
 */
async function main() {
  const model = 'llama3.1' // Can be any model like 'gpt-oss:120b'
  
  // Step 1: Pull the model with progress updates
  console.log(`Pulling model: ${model}...`)
  let currentDigestDone = false
  
  try {
    const pullStream = await ollama.pull({ model: model, stream: true })
    for await (const part of pullStream) {
      if (part.digest) {
        let percent = 0
        if (part.completed && part.total) {
          percent = Math.round((part.completed / part.total) * 100)
        }
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
        process.stdout.write(`${part.status} ${percent}%...`)
        if (percent === 100 && !currentDigestDone) {
          console.log()
          currentDigestDone = true
        } else {
          currentDigestDone = false
        }
      } else {
        console.log(part.status)
      }
    }
    console.log('✓ Model pulled successfully')
  } catch (error) {
    console.error('\nError pulling model:', error)
    return
  }

  // Step 2: Use the model for streaming chat
  console.log(`\nStarting chat with ${model}...`)
  const chatStream = await ollama.chat({
    model: model,
    messages: [{ role: 'user', content: 'Hello! Can you introduce yourself?' }],
    stream: true,
  })
  
  console.log('\nModel response:')
  for await (const part of chatStream) {
    process.stdout.write(part.message.content)
  }
  console.log('\n')
}

main().catch(console.error)
