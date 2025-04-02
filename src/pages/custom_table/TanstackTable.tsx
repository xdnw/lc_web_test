// import React, { useMemo, useRef, useState, ReactNode } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   flexRender,
//   ColumnDef,
//   SortingState,
//   createColumnHelper,
//   Row,
//   Table,
// } from "@tanstack/react-table";
// import { useVirtualizer, Virtualizer } from "@tanstack/react-virtual";
// import { getRenderer } from "../../components/ui/renderers";
// import { JSONValue } from "@/lib/internaltypes";

// export type OrderIdx = {
//     idx: number,
//     dir: "asc" | "desc",
// }
// export type ConfigColumns = {
//     title: string,
//     data: number | string,
//     render?: ObjectColumnRender,
// }
// export interface ObjectColumnRender<T = JSONValue> {
//   display(value: T): ReactNode;
//   isHtml?: boolean;
//   isEnum?: boolean;
//   options?: string[];
// }

// // Define a type for our row data
// type RowData = (string | number | number[] | boolean)[];

// // Convert DataTables OrderIdx to TanStack sorting format
// function convertSortToTanStack(sort: OrderIdx | OrderIdx[]): SortingState {
//   if (Array.isArray(sort)) {
//     return sort.map(s => ({
//       id: String(s.idx),
//       desc: s.dir === 'desc'
//     }));
//   }
//   return [{
//     id: String(sort.idx),
//     desc: sort.dir === 'desc'
//   }];
// }

// export function TableWith2DData({ columns, data, renderers, sort }: { 
//   columns: string[], 
//   data: RowData[], 
//   renderers?: (string | undefined)[], 
//   sort?: OrderIdx | OrderIdx[] 
// }) {
//   const tableContainerRef = useRef<HTMLDivElement>(null);
//   const sortFinal = useMemo<OrderIdx | OrderIdx[]>(() => sort ?? { idx: 0, dir: "asc" }, [sort]);
//   const [sorting, setSorting] = useState<SortingState>(convertSortToTanStack(sortFinal));
  
//   const columnHelper = createColumnHelper<RowData>();
  
//   // Create columns definition for TanStack Table
//   const tableColumns = useMemo(() => {
//     // Index column first
//     const result: ColumnDef<RowData>[] = [
//       {
//         id: 'index',
//         header: '#',
//         cell: info => info.row.index + 1,
//         enableSorting: false,
//       }
//     ];
    
//    // Add data columns
//     columns.forEach((col, index) => {
//         const rendererFunc: ((value: string | number | boolean | number[]) => ReactNode) | undefined =
//             renderers && renderers[index] ? getRenderer(renderers[index] as string)?.display as ((value: string | number | boolean | number[]) => ReactNode) : undefined;
//         const rendererFuncFinal = rendererFunc ?? ((value: string | number | boolean | number[]) => String(value));
//         result.push(
//             columnHelper.accessor(
//                 (row: RowData) => row[index],
//                 { 
//                     id: String(index), 
//                     header: col, 
//                     cell: info => { 
//                         return rendererFuncFinal(info.getValue());
//                     },
//                     footer: undefined
//                 }
//             ) as ColumnDef<RowData>
//         );
//     });
    
//     return result;
//   }, [columns, renderers, columnHelper]);
  
//   // Create the table instance
//   const table = useReactTable({
//     data,
//     columns: tableColumns,
//     state: {
//       sorting,
//     },
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//   });

//   // Set up virtualization
//   const { rows } = table.getRowModel();
//   const rowVirtualizer = useVirtualizer({
//     count: rows.length,
//     getScrollElement: () => tableContainerRef.current,
//     estimateSize: () => 35, // approximate row height
//     overscan: 10,
//   });
  
  
//   return useMemo(() => (
//     <>
//       <TanstackTable
//         tableRef={tableContainerRef}
//         table={table}
//         rowVirtualizer={rowVirtualizer}
//       />
//     </>
//   ), [data, table, rowVirtualizer]);
// }

// function TanstackTable({ 
//     tableRef, 
//     table, 
//     rowVirtualizer 
//   }: {
//     tableRef: React.RefObject<HTMLDivElement | null>,
//     table: Table<RowData>,
//     rowVirtualizer: Virtualizer<HTMLDivElement, Element>
//   }) {
//     const { rows } = table.getRowModel();
  
//     const headerContent = useMemo(() => (
//       <thead>
//         {table.getHeaderGroups().map(headerGroup => (
//           <tr key={headerGroup.id}>
//             {headerGroup.headers.map(header => (
//               <th
//                 key={header.id}
//                 className="px-4 py-2 text-left font-medium"
//                 onClick={header.column.getToggleSortingHandler()}
//               >
//                 {flexRender(
//                   header.column.columnDef.header,
//                   header.getContext()
//                 )}
//                 {{
//                   asc: ' ↑',
//                   desc: ' ↓',
//                 }[header.column.getIsSorted() as string] ?? null}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//     ), [table]);
  
//     const bodyContent = useMemo(() => (
//       <tbody
//         style={{
//           height: `${rowVirtualizer.getTotalSize()}px`,
//           position: 'relative',
//         }}
//       >
//         {rowVirtualizer.getVirtualItems().map(virtualRow => {
//           const row = rows[virtualRow.index];
//           return (
//             <tr
//               key={row.id}
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 height: `${virtualRow.size}px`,
//                 transform: `translateY(${virtualRow.start}px)`,
//               }}
//               className={virtualRow.index % 2 ? 'bg-gray-50' : 'bg-white'}
//             >
//               {row.getVisibleCells().map(cell => (
//                 <td
//                   key={cell.id}
//                   className="px-4 py-2 whitespace-nowrap"
//                 >
//                   {flexRender(
//                     cell.column.columnDef.cell,
//                     cell.getContext()
//                   )}
//                 </td>
//               ))}
//             </tr>
//           );
//         })}
//       </tbody>
//     ), [rows, rowVirtualizer]);
  
//     console.log("Table with", rows.length, "rows");
  
//     return (
//       <div 
//         ref={tableRef} 
//         className="overflow-auto h-[500px]"
//         style={{
//           width: '100%',
//         }}
//       >
//         <table className="display table-auto divide-y w-full border-separate border-spacing-y-1 text-xs compact font-mono">
//           {headerContent}
//           {bodyContent}
//         </table>
//       </div>
//     );
//   }