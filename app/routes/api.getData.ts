import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { ActionFunctionArgs, json } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();
  const userId = data.userId;

  if(!userId) {
    console.log("Missing userId: ", userId)
    return null
  }

  // Jeg har brukt chat gpt til å lage scan kommandoen
  const client = new DynamoDBClient({ region: "eu-central-1" });
  const command = new ScanCommand({
    TableName: "code-typer",
    FilterExpression: "userId = :uid",
    ExpressionAttributeValues: {
      ":uid": { S: userId },
    },
  });

  const result = await client.send(command);

  return json(result.Items ?? []);
};
