// External dependencies.
const { Client } = require("@notionhq/client");

// Types definitions.
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

module.exports.query = async ({
  database_id,
  sorts = undefined,
  filter = undefined,
}: QueryDatabaseParameters) => {
  const notion = new Client({ auth: process.env.NOTION_SECRET });

  let results = [];
  let has_more = true;
  let args = {
    database_id,
    sorts,
    filter,
    start_cursor: undefined,
  };

  console.log(database_id);

  while (has_more) {
    try {
      const response = await notion.databases.query(args);
      has_more = response.has_more;
      args.start_cursor = response.next_cursor ?? null;
      results.push(...response.results);
    } catch (error) {
      has_more = false;
      return error;
    }
  }

  return {
    status: 200,
    results,
  };
};
