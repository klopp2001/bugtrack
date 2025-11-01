import { kafkaConsumer, kafkaProjectsConsumer, kafkaTasksConsumer } from "@/lib/kafka";

export type SSEClient = {
  id: string;
  userId: string;
  controller: ReadableStreamDefaultController<Uint8Array>;
}

export const clients = new Map<string, SSEClient>()

export const consumers = [kafkaConsumer, kafkaProjectsConsumer, kafkaTasksConsumer]

export let kafkaStarted = false



export async function startKafkaConsumer() {
  if (kafkaStarted) return;
  kafkaStarted = true;

  await kafkaConsumer.connect()
  await kafkaConsumer.subscribe({topic: "notifications.client", fromBeginning:false})

  await kafkaProjectsConsumer.connect()
  await kafkaProjectsConsumer.subscribe({topic: "notifications.projects", fromBeginning:false})
  console.log(`clinet connected to notifications tasks topic`)

  await kafkaTasksConsumer.connect()
  await kafkaTasksConsumer.subscribe({topic: "notifications.tasks", fromBeginning:false})
  console.log(`clinet connected to notifications projects topic`)
  
  console.log("kafka consumers subscribed successfully")

  
  const hanleMessage = async ({message}) => {
      console.log("new message: " + message)
      if (!message || !message.value) return
      const payload = JSON.parse(message.value?.toString()) 
      console.log("New kafka message:", payload)
      
      const client = clients.get("1234")

      if (client === null || client === undefined) {
        console.log(`Client with ${payload.userId} doesn't connected`)
      } else {
        client.controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(payload)}\n\n`))
      }

    }
  console.log("consumer run")
  await kafkaConsumer.run({
    eachMessage: hanleMessage
  })
  console.log("project consumer run")
  await kafkaProjectsConsumer.run({
    eachMessage: hanleMessage
  })
}

async function run() {
  try {
    await startKafkaConsumer()
    console.log("Kafka start successfully")
  } catch (err) {
    console.error(`BOOT ERROR: ${err}`)
  }
}

run()