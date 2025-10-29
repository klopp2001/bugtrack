import { kafka, kafkaConsumer as kafkaTasksRenderConsumer } from "@/lib/kafka";

export const runtime = "nodejs"

type SSEClient = {
  id: string;
  userId: string;
  controller: ReadableStreamDefaultController<Uint8Array>;
}

const clients = new Map<string, SSEClient>()

let kafkaStarted = false

async function startKafkaConsumer() {
  if (kafkaStarted) return;
  kafkaStarted = true;

  await kafkaTasksRenderConsumer.connect()
  await kafkaTasksRenderConsumer.subscribe({topic: "notifications.render.tasks", fromBeginning:false})

  console.log("kafka subscribed successfully")
  await kafkaTasksRenderConsumer.run({
    eachMessage: async ({message}) => {
      console.log("new message: " + message)
      if (!message || !message.value) return
      const payload = JSON.parse(message.value?.toString()) 
      console.log("New kafka message:", payload)
      for (const [, client] of clients) {
        if (client.userId == payload.userId)

        client.controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(payload)}\n\n`))
      }
    }
  })
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const userId  = url.searchParams.get("userId")?.toString() as string
  if (!userId) {
    console.error("Couldn't find userId in url params")
  }
  await startKafkaConsumer();
  
  
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const id = crypto.randomUUID()
      const client :SSEClient = {id, userId, controller}
      clients.set(id, client)

      console.log(`Client connected ${id}, total ${clients.size}`)

      const keepAlive = setInterval (() => {
        controller.enqueue(new TextEncoder().encode(":keep-alive \n\n"))
      }, 15000)

      controller.signal?.addEventListener("abort", () => {
        clearInterval(keepAlive)
        clients.delete(id)
        console.log(`Client disconnected : {id}`)
      })
    }
  })

  return new Response (stream, {
    headers: {
      "Content-Type":"text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      connection:"keep-alive"
    }
  })
}
