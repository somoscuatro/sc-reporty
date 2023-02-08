module.exports.query = async ({
  start_date = "",
  end_date = "",
  user_id = "",
}) => {
  const response = await fetch(
    `https://api.harvestapp.com/v2/time_entries?from=${start_date}&to=${end_date}&user_id=${user_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Harvest-Account-ID": `${process.env.HARVEST_ACCOUNT_ID}`,
        Authorization: `Bearer ${process.env.HARVEST_SECRET}`,
      },
    }
  );

  if (!response.ok) {
    return {
      status: response.status,
      message: await response.text(),
    };
  }

  const results = await response.json();
  return {
    status: 200,
    results,
  };
};
