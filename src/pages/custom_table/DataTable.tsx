import React, { useMemo, useState } from "react";
import {
  DataGrid, 
  SortDirection, 
  SortColumn, 
  Column,
  Renderers,
  CellRendererProps,
  DataGridHandle
} from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { JSONValue } from "@/lib/internaltypes";
import { getRenderer } from "@/components/ui/renderers";

// Types
export type OrderIdx = {
  idx: number;
  dir: "asc" | "desc";
};

export type ConfigColumns = {
  title: string;
  data: number | string;
  render?: ObjectColumnRender;
};

export interface ObjectColumnRender<T = JSONValue> {
  display(value: T): React.ReactNode;
  isHtml?: boolean;
  isEnum?: boolean;
  options?: string[];
}

interface ReactDataGridTableProps {
  table: React.RefObject<DataGridHandle | null>;
  columnsInfo: ConfigColumns[];
  data: JSONValue[][];
  sort?: OrderIdx | OrderIdx[];
  searchSet: Set<number>;
  visibleColumns?: number[];
}

export function DataTable({
  table,
  columnsInfo,
  data,
  sort,
  searchSet,
  visibleColumns, // TODO
}: ReactDataGridTableProps) {
  // Take a single sort order (e.g. the first entry if an array is provided)
  const initialSort = useMemo<OrderIdx[] | null>(() => {
    if (!sort) return null;
    return Array.isArray(sort) ? sort : [sort];
  }, [sort]);

  const renderers = useMemo(() => {
    return columnsInfo.map((col) => col.render);
  }, [columnsInfo]);

  // Create column definitions for DataGrid
  const gridColumns: Column<JSONValue[]>[] = useMemo(() => {
    const gridCols: Column<JSONValue[]>[] = [
      { key: "index", name: "#", width: 50, sortable: false }
    ];

    columnsInfo.forEach((colInfo, colIndex) => {
      gridCols.push({
        key: String(colIndex),
        name: colInfo.title,
        sortable: true,
        resizable: true,
        draggable: true,
      });
    });

    return gridCols;
  }, [columnsInfo]);

  // Sorting state using SortColumn[] type
  const [sortColumns, setSortColumns] = useState<SortColumn[]>(() =>
      initialSort ? initialSort.map((s) => ({ columnKey: String(s.idx), direction: s.dir === "asc" ? "ASC" : "DESC" })) : []
  );

    // Handle sort changes triggered by clicking on column headers
    const handleSort = (newSort: SortColumn[] | undefined): void => {
      if (newSort) {
        setSortColumns(newSort);
      } else {
        setSortColumns([]);
      }
    };

    
    // Custom renderers for cells using precomputed renderer functions
    const cellRenderers = useMemo<Renderers<JSONValue[], unknown>>(() => {
      const columnRenderers = renderers.map((renderer, colIndex) => {
        if (renderer && renderer.display) {
          return (value: unknown) => renderer.display(value as JSONValue);
        }
        return (value: unknown) => String(value);
      });
      
      return {
        renderCell: (key, { column, row }) => {
          const value = row[column.idx];
          return columnRenderers[column.idx](value as JSONValue);
        },
      };
    }, [renderers]);

  // // Perform client-side sorting based on sortColumns
  // const sortedRows = useMemo(() => {
  //   if (sortColumns.length === 0) return rows;
    
  //   // Apply all sorts in sequence
  //   return [...rows].sort((a, b) => {
  //     for (const sort of sortColumns) {
  //       const { columnKey, direction } = sort;
  //       const aValue = a[columnKey];
  //       const bValue = b[columnKey];
        
  //       if (aValue < bValue) return direction === "ASC" ? -1 : 1;
  //       if (aValue > bValue) return direction === "ASC" ? 1 : -1;
  //     }
  //     return 0;
  //   });
  // }, [rows, sortColumns]);

  function onColumnsReorder(sourceKey: string, targetKey: string) {
    const sourceIndex = parseInt(sourceKey, 10);
    const targetIndex = parseInt(targetKey, 10);

    if (sourceIndex !== targetIndex) {
      const newColumns = [...gridColumns];
      const [movedColumn] = newColumns.splice(sourceIndex, 1);
      newColumns.splice(targetIndex, 0, movedColumn);
      gridColumns.splice(0, gridColumns.length, ...newColumns);
    }
  }
  // rowClass

  return (
    <div style={{ height: 500 }}>
      <DataGrid
        ref={table}
        columns={gridColumns}
        rows={data}
        sortColumns={sortColumns}
        
        onSortColumnsChange={handleSort}
        onColumnsReorder={onColumnsReorder}

        renderers={cellRenderers}
        enableVirtualization={true}
      />
    </div>
  );
}