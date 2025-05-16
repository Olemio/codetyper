import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { randomUUID } from "crypto";

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();
  console.log(data);
  const userId = data.userId
  const wpm = data.wpm
  const misClicks = data.misClicks
  const text = data.text
  const time = data.time
  const id = randomUUID()

  if(!userId || !id) return console.log("Missing time or userId", userId, time)



  const client = new DynamoDBClient({ region: "eu-central-1" });

  const putItem = new PutItemCommand({
    TableName: "code-typer",
    Item: {
      id: { S: id },
      userId: { S: userId },
      wpm: { N: String(wpm) },
      mistakes: { N: String(misClicks) },
      text: { S: text },
      time: { N: String(time) },
    },
  });

  const result = await client.send(putItem);

  return json(result);
};
