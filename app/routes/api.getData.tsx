import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { ActionFunctionArgs, json } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();
  console.log(data);
  //   const userId = data.userId;
  //   const email = data.email;

  const client = new DynamoDBClient({ region: "eu-central-1" });

  const getItem = new GetItemCommand({
    TableName: "code-typer",
    Key: {
      id: { S: "test-1" },
    },
  });

  const result = await client.send(getItem);

  return json(result.Item);
};
