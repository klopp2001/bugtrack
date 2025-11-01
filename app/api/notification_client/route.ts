// import { kafka, kafkaConsumer, kafkaProjectsConsumer, kafkaTasksConsumer } from "@/lib/kafka";
// import { KafkaMessage } from "kafkajs";
// import { clients, SSEClient } from "../../../workers/notifications";

// export const runtime = "nodejs"
// let timeOut = 15000

// export async function GET(request: Request): Promise<Response> {
//   const url = new URL(request.url)
//   let userId  = url.searchParams.get("userId")?.toString() as string
//   if (!userId) {
//     console.error("Couldn't find userId in url params")
//     userId = "1234"
//   }

//   //await startKafkaConsumer();
  
    
//     const stream = new ReadableStream<Uint8Array>({
//       start(controller) {
//         const id = crypto.randomUUID()
//         const client :SSEClient = {id, userId, controller}
//         clients.set(userId, client)
//         console.log(clients)
//         console.log(`Client connected ${id}, total ${clients.size}`)
        
//         const pingFunction = () => {
//           try{
//             controller.enqueue(new TextEncoder().encode(":keep-alive \n\n"))
//           } catch (err) {
//             console.log(`Client ${client.userId} disconnected`)
//             clients.delete(client.userId)
//             clearInterval(keepAlive)
//           }
//         }

//         pingFunction()

//         const keepAlive = setInterval (pingFunction, timeOut)

//         controller.signal?.addEventListener("abort", () => {
//           clearInterval(keepAlive)
//           clients.delete(id)
//           console.log(`Client disconnected : {id}`)
//         })
//       }
//     })

//   return new Response (stream, {
//     headers: {
//       "Content-Type":"text/event-stream",
//       "Cache-Control": "no-cache, no-transform",
//       connection:"keep-alive"
//     }
//   })
// }
