// import { useEffect } from "react";

// function generateTableStructure(obj) {
//   const rows = [];

//   function traverse(obj, depth) {
//     // Ensure that the current depth exists in rows
//     if (!rows[depth]) {
//       rows[depth] = [];
//     }

//     for (let key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         if (typeof obj[key] === "object" && obj[key] !== null) {
//           const subKeys = Object.keys(obj[key]);

//           // If the nested object is another object, increase column span accordingly
//           let colSpan = subKeys.length;
//           rows[depth].push({ heading: key, colSpan });

//           // Recursively go deeper
//           traverse(obj[key], depth + 1);
//         } else {
//           rows[depth].push({ heading: key, rowSpan: Object.keys(obj).length });
//         }
//       }
//     }
//   }

//   traverse(obj, 0);
//   return rows;
// }

// function* lastHope(obj) {
//   const depth = findDepth(obj);

//   for (const key in obj) {
//     if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
//       yield { depth, heading: key };
//       yield* lastHope(obj[key]);
//     } else {
//       yield { depth, heading: key };
//     }
//   }
// }

// function findDepth(obj) {
//   let depth = 1;

//   for (let key in obj) {
//     if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
//       depth = Math.max(depth, findDepth(obj[key]) + 1);
//     }
//   }

//   return depth;
// }

// function countNestedItems(list) {
//   let count = 0;

//   for (const item of list) {
//     if (typeof item === "object") {
//       for (let key in item) {
//         count = Math.max(count, countNestedItems(item[key]) + count);
//       }
//     } else {
//       count++;
//     }
//   }

//   return count;
// }

// function getHeaders(obj) {
//   const headers = [];
//   for (const key in obj) {
//     if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
//       headers.push({ [key]: getHeaders(obj[key]) });
//     } else {
//       headers.push(key);
//     }
//   }
//   return headers;
// }

// function flattenObject(obj) {
//   let result = {};

//   for (let key in obj) {
//     if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
//       let flatObject = flattenObject(obj[key]);
//       for (let subKey in flatObject) {
//         result[subKey] = flatObject[subKey];
//       }
//     } else {
//       result[key] = obj[key];
//     }
//   }

//   return result;
// }

// function generateTH(list) {
//   let depth = findDepth(list);
//   const ths = [];

//   for (const th of list) {
//     if (typeof th === "object" && !Array.isArray(th)) {
//       for (const key in th) {
//         ths.push(
//           <th key={key} colSpan={countNestedItems(th[key])}>
//             {key}
//           </th>
//         );
//       }
//     } else {
//       ths.push(
//         <th key={th} rowSpan={depth}>
//           {th}
//         </th>
//       );
//     }
//   }

//   return ths;
// }

// function f1(obj) {
//   const list = [];

//   for (const key in obj) {
//     if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
//       list.push([key, ...f1(obj[key])]);
//     } else {
//       list.push(key);
//     }
//   }

//   return list;
// }

// export default function Table({ data }) {
//   const headers = getHeaders(data[0]);

//   useEffect(() => {
//     console.log("Hello");
//     for (const item of lastHope(data[0])) {
//       console.log(item);
//     }
//   });

//   return (
//     <>
//       <span>{JSON.stringify(data[0])}</span>
//     </>
//   );
// }

// function TableHeader({ headers }) {
//   return (
//     <thead>
//       {headers.map((header) => {
//         if (typeof header === "object" && !Array.isArray(header)) {
//         } else {
//         }
//       })}
//     </thead>
//   );
// }

import React from "react";

const TableHeader = ({ data }) => {
  const rows = [];

  // Recursive function to traverse the object and build table rows
  const traverse = (obj, depth) => {
    // Ensure that the current depth exists in rows
    if (!rows[depth]) {
      rows[depth] = [];
    }

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          const subKeys = Object.keys(obj[key]);

          // Calculate colSpan based on sub-keys
          let colSpan = subKeys.length;
          rows[depth].push({ heading: key, colSpan });

          // Recursively go deeper
          traverse(obj[key], depth + 1);
        } else {
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

// export default TableHeader;
