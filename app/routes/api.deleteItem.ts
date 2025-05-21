import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { ActionFunctionArgs, json } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();
  
  const itemId = data.id

  if(!itemId) return console.log("Missing itemId", itemId)

  // Jeg har brukt chat gpt for å generere putItem commandoen, og til å lage client
  const client = new DynamoDBClient({ region: "eu-central-1" });
  const putItem = new DeleteItemCommand({
    TableName: "code-typer",
    Key: {
      id: { S: itemId },
},
  });

  // chat gpt har triggret send på client objektet
  await client.send(putItem);
  return json({ success: true });
};
