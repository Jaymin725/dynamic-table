import { useEffect, useState } from "react";
import Table from "./components/Table";

export default function App() {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/users");
  const [data, setData] = useState(null);

  return (
    <>
      <h1>Dynamic Table</h1>
      <input
        type="text"
        value={url}
        onChange={(event) => setUrl(event.currentTarget.value)}
      />
      <button
        onClick={() =>
          fetch(url, { method: "GET" })
            .then((response) => response.json())
            .then((data) => setData(data))
        }
      >
        Get Data
      </button>
      {data == null ? <p>No data</p> : <Table data={data} />}
    </>
  );
}
