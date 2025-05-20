import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { ActionFunctionArgs, json } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();
  
  const itemId = data.id

  if(!itemId) return console.log("Missing itemId", itemId)

  const client = new DynamoDBClient({ region: "eu-central-1" });
  const putItem = new DeleteItemCommand({
    TableName: "code-typer",
    Key: {
      id: { S: itemId },
},
  });

  await client.send(putItem);
  return json({ success: true });
};
