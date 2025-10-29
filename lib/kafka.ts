import { group } from "console"
import {Kafka} from "kafkajs"

export const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"]
})

export const kafkaConsumer = kafka.consumer({ groupId: 'my-consumer-group' })

export const kafkaTasksRenderConsumer = kafka.consumer({groupId:"render-group"})