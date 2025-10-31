import { kafka, kafkaConsumer, kafkaProjectsConsumer, kafkaTasksConsumer } from "@/lib/kafka";
import { KafkaMessage } from "kafkajs";

export const runtime = "nodejs"

type SSEClient = {
  id: string;
  userId: string;
  controller: ReadableStreamDefaultController<Uint8Array>;
}

const clients = new Map<string, SSEClient>()

const consumers = [kafkaConsumer, kafkaProjectsConsumer, kafkaTasksConsumer]

let kafkaStarted = false

async function startKafkaConsumer() {
  if (kafkaStarted) return;
  kafkaStarted = true;

  await kafkaConsumer.connect()
  await kafkaConsumer.subscribe({topic: "notifications.client", fromBeginning:false})

  await kafkaProjectsConsumer.connect()
  await kafkaProjectsConsumer.subscribe({topic: "notifications.tasks", fromBeginning:false})
  console.log(`clinet connected to notifications tasks topic`)

  await kafkaTasksConsumer.connect()
  await kafkaTasksConsumer.subscribe({topic: "notifications.projects", fromBeginning:false})
  console.log(`clinet connected to notifications projects topic`)
  
  console.log("kafka consumers subscribed successfully")

  const hanleMessage = async ({message}) => {
      console.log("new message: " + message)
      if (!message || !message.value) return
      const payload = JSON.parse(message.value?.toString()) 
      console.log("New kafka message:", payload)
      
      clients.get(payload.userId )?.controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(payload)}\n\n`))
    }

  await kafkaConsumer.run({
    eachMessage: hanleMessage
  })

  await kafkaProjectsConsumer.run({
    eachMessage: hanleMessage
  })
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  let userId  = url.searchParams.get("userId")?.toString() as string
  if (!userId) {
    console.error("Couldn't find userId in url params")
    userId = "1234"
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
