import { useState } from "react";

const flattenObject = (obj) => {
  const flatObject = {};

  const recurse = (cur, prop) => {
    if (Object(cur) !== cur) {
      flatObject[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (let i = 0, l = cur.length; i < l; i++) {
        recurse(cur[i], `${prop}[${i}]`);
      }
      if (l === 0) {
        flatObject[prop] = [];
      }
    } else {
      let isEmpty = true;
      for (let p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? `${prop}.${p}` : p);
      }
      if (isEmpty && prop) {
        flatObject[prop] = {};
      }
    }
  };

  recurse(obj, "");
  return flatObject;
};

// TableHeader Component
const TableHeader = ({ data }) => {
  const rows = [];

  const calculateColSpan = (obj) => {
    let colSpan = 0;
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          colSpan += calculateColSpan(obj[key]);
        } else {
          colSpan += 1;
        }
      }
    }
    return colSpan;
  };

  const traverse = (obj, depth) => {
    if (!rows[depth]) {
      rows[depth] = [];
    }

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          let colSpan = calculateColSpan(obj[key]);
          rows[depth].push({ heading: key, colSpan });
          traverse(obj[key], depth + 1);
        } else {
          rows[depth].push({ heading: key, rowSpan: Object.keys(obj).length });
        }
      }
    }
  };

  traverse(data, 0);

  return (
    <thead>
      {rows.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <th
              key={cellIndex}
              colSpan={cell.colSpan || 1}
              rowSpan={cell.rowSpan || 1}
            >
              {cell.heading}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

// TableBody Component
const TableBody = ({ data }) => {
  const renderRow = (obj) => {
    const cells = [];
    const flattenObj = flattenObject(obj); // Flatten the object here

    for (let key in flattenObj) {
      cells.push(<td key={key}>{flattenObj[key]}</td>);
    }

    return <tr key={obj.id || Math.random()}>{cells}</tr>;
  };

  return <tbody>{data.map((obj) => renderRow(obj))}</tbody>;
};

// Main Table Component with Search Functionality
export default function TableComponent({ data }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const flatItem = flattenObject(item);
    return Object.values(flatItem).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (!data || data.length === 0) return <p>No data available</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "10px" }}
      />
      <table border="1">
        <TableHeader data={data[0]} />
        <TableBody data={filteredData} />
      </table>
    </div>
  );
}
