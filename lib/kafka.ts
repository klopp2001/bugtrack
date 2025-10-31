import { group } from "console"
import {Kafka} from "kafkajs"

export const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"]
})

export const kafkaConsumer = kafka.consumer({ groupId: 'my-consumer-group' })

export const kafkaProjectsConsumer = kafka.consumer({groupId: 'project-notifications'})
export const kafkaTasksConsumer = kafka.consumer({groupId: 'tasks-notifications'})

export const kafkaTasksRenderConsumer = kafka.consumer({groupId:"render-group"})