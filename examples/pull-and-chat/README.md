# Pull and Chat Examples

These examples demonstrate how to pull a model and then use it for chat, similar to the CLI's `ollama run` command.

## Examples

### pull-and-chat.ts

A simple example showing how to:
1. Pull a model (without streaming progress)
2. Use the model for chat

```bash
node pull-and-chat.ts
```

### pull-and-chat-with-progress.ts

An advanced example showing how to:
1. Pull a model with streaming progress updates
2. Use the model for streaming chat

```bash
node pull-and-chat-with-progress.ts
```

## Usage

Both examples can be used with any model by changing the `model` variable:

```javascript
const model = 'llama3.1'  // or 'gpt-oss:120b', 'mistral', etc.
```

## Note

The JavaScript library doesn't have a dedicated `run()` method like the CLI. Instead, you combine `pull()` and `chat()` or `generate()` to achieve the same result. This gives you more flexibility and control over the model lifecycle.
