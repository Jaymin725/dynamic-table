import { useEffect } from "react";

function findDepth(arr) {
  let depth = 1;

  for (let item of arr) {
    if (typeof item === "object") {
      // If it's an object, find depth of its values (array or object inside)
      for (let key in item) {
        depth = Math.max(depth, findDepth(item[key]) + 1);
      }
    }
  }

  return depth;
}

function getHeaders(obj) {
  const headers = [];
  for (const key in obj) {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      headers.push({ [key]: getHeaders(obj[key]) });
    } else {
      headers.push(key);
    }
  }
  return headers;
}

function flattenObject(obj) {
  let result = {};

  for (let key in obj) {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      let flatObject = flattenObject(obj[key]);
      for (let subKey in flatObject) {
        result[subKey] = flatObject[subKey];
      }
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}

export default function Table({ data }) {
  const headers = Object.keys(flattenObject(data[0]));

  useEffect(() => {
    console.log(getHeaders(data[0]));
  });

  return (
    <table border={1}>
      <TableHeader headers={headers} />
    </table>
  );
}

function TableHeader({ headers }) {
  const theads = headers.map((header) => <th key={header}>{header}</th>);
  return (
    <thead>
      <tr>{theads}</tr>
    </thead>
  );
}
