import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { randomUUID } from "crypto";

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();
  
  const userId = data.userId
  const email = data.email
  const wpm = data.wpm
  const misClicks = data.misClicks
  const text = data.text
  const time = data.time
  const id = randomUUID()
  const createdAt = new Date().toISOString()

  if(!userId || !id || !email || !text) return console.log("Missing time or userId", userId, time)

  const client = new DynamoDBClient({ region: "eu-central-1" });
  const putItem = new PutItemCommand({
    TableName: "code-typer",
    Item: {
      id: { S: id },
      userId: { S: userId },
      email: { S: email },
      wpm: { N: String(wpm) },
      mistakes: { N: String(misClicks) },
      text: { S: text },
      time: { N: String(time) },
      createdAt: { S: createdAt },
    },
  });

  const result = await client.send(putItem);
  return json(result);
};
