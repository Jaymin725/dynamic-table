const TableHeader = ({ data }) => {
  const rows = [];

  // Function to calculate colSpan based on the depth of nested objects
  const calculateColSpan = (obj) => {
    let colSpan = 0;
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          // Recursively calculate colSpan for nested objects
          colSpan += calculateColSpan(obj[key]);
        } else {
          colSpan += 1;
        }
      }
    }
    return colSpan;
  };

  // Recursive function to traverse the object and build table rows
  const traverse = (obj, depth) => {
    // Ensure that the current depth exists in rows
    if (!rows[depth]) {
      rows[depth] = [];
    }

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          // Calculate colSpan based on nested objects
          let colSpan = calculateColSpan(obj[key]);
          rows[depth].push({ heading: key, colSpan });

          // Recursively go deeper
          traverse(obj[key], depth + 1);
        } else {
          // Non-object values will have a rowSpan of 3
          rows[depth].push({ heading: key, rowSpan: Object.keys(obj).length });
        }
      }
    }
  };

  // Start the traversal from depth 0
  traverse(data, 0);

  // Render the table headers based on the rows array
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

export default TableHeader;
