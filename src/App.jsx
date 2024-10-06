import { useEffect, useState } from "react";
import TableComponent from "./components/TableWithInput";

export default function App() {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/users");
  const [data, setData] = useState([]);

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
      <TableComponent data={data} />
    </>
  );
}
