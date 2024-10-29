import React, { useState } from "react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

DataTable.use(DT);

export default function TableTest() {
    const [tableData, setTableData] = useState([
        [ 'Tiger Nixon', 'System Architect' ],
        [ 'Garrett Winters', 'Accountant' ],
        // ...
    ]);

    return (
        <DataTable data={tableData} className="display">
            <thead>
            <tr>
                <th>Name</th>
                <th>Position</th>
            </tr>
            </thead>
        </DataTable>
    );
}

interface DataSetRoot {
    columns: string[];
    data: object[][];
    searchable: number[];
    visible: number[];
    cell_format: { [key: string]: number[] };
    row_format: ((row: HTMLElement, data: { [key: string]: object }, index: number) => void) | null;
    sort: [number, string];
}

/**
 * Setup a table element, as well as its container
 * - Adds the table toggles (customize) to the container's collapse
 * @param containerElem
 * @param tableElem
 * @param dataSetRoot
 */
function setupTable(dataSetRoot: DataSetRoot) {
    const visibleColumns = dataSetRoot.visible;
    const dataColumns = dataSetRoot.columns;
    const dataList = dataSetRoot.data;
    const searchableColumns = dataSetRoot.searchable;
    const searchSet = new Set<number>(searchableColumns); // faster
    const cell_format = dataSetRoot.cell_format;
    const row_format = dataSetRoot.row_format;
    let sort = dataSetRoot.sort;
    if (sort == null) sort = [0, 'asc'];

    // Convert the 2d array of cell data to an object list which maps the header name => cell data
    let dataObj: {}[] = [];
    dataList.forEach(function (row, index) {
        let obj: {[key: string]: any} = {}; // Add index signature
        for (let i = 0; i < dataColumns.length; i++) {
            obj[dataColumns[i]] = row[i];
        }
        dataObj.push(obj);
    });

    // Convert the cell format function names to their respective js functions
    let cellFormatByCol: { [key: number]: (data: number, type: any, row: any, meta: any) => void } = {};
    if (cell_format != null) {
        for (let func in cell_format) {
            let cols: number[] = cell_format[func];
            for (let col of cols) {
                let funcObj = (window as any)[func] as Function;
                cellFormatByCol[col] = funcObj as any;
                if (funcObj == null) {
                    console.log("No function found for " + func);
                }
            }
        }
    }

    // Convert the column names and format to the column info object (used by DataTables.js)
    let columnsInfo: { data: string, className?: string, render?: any, visible?: boolean }[] = [];
    if (dataColumns.length > 0) {
        for (let i = 0; i < dataColumns.length; i++) {
            let columnInfo: { orderDataType?: string, data: string; className: string; render?: any } = {data: dataColumns[i], className: 'details-control'};
            let renderFunc = cellFormatByCol[i];
            if (renderFunc != null) {
                columnInfo.render = renderFunc;
                if (renderFunc == (window as any).formatNumber || renderFunc == (window as any).formatMoney) {
                    columnInfo.orderDataType = 'numeric-comma';
                }
            }
            columnsInfo.push(columnInfo);
        }
    }

    // Set column visibility and add the search input to the header
    const jqTr = jqTable.find("thead tr");
    jqTr.append("<th>#</th>");
    const jqTf = jqTable.find("tfoot tr");
    jqTf.append("<th></th>");
    for(let i = 0; i < columnsInfo.length; i++) {
        let columnInfo = columnsInfo[i];
        let title = columnInfo["data"];
        if (visibleColumns != null) {
            columnInfo["visible"] = visibleColumns.includes(i) as boolean;
        }
        let th,tf;
        if (title == null) {
            th = '';
            tf = '';
        } else {
            if (searchableColumns == null || searchableColumns.includes(i)) {
                th = '<input type="text" placeholder="'+ title +'" style="width: 100%;" />';
            } else {
                th = title;
            }
            if (i != 0) {
                let color = columnInfo.visible ? "btn-outline-danger" : "btn-outline-info";
                tf = "<button class='toggle-vis btn btn-sm opacity-75 fw-bold ms-1 mb-1 " + color + "' data-column='" + (i + 1) + "'>" + title + "</button>";
            } else {
                tf = '';
            }
        }
        jqTr.append("<th>" + th + "</th>");
        let rows = jqTf.append("<th>" + tf + "</th>");
        if (i != 0 && typeof columnInfo["visible"] === 'boolean' && columnInfo["visible"] === false) {
            let row = rows.children().last();
            let toggle = row.children().first();
            (toggle[0] as any).oldParent = row[0];
            toggle = jqContainer.find(".table-toggles").append(toggle);
        }
    }
    let table = (jqTable as any).DataTable( {
        // the array of column info
        columns: [
            { data: null, title: "#", orderable: false, searchable: false, className: 'dt-center p-0' },
            ...columnsInfo
        ],
        // columns: columnsInfo,
        // Allow column reordering (colReorder extension)
        colReorder: true,
        // the array of row objects to display
        data: dataObj,
        // Pagination
        paging: true,
        // Pagination settings
        lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        // Render after initialization (faster)
        deferRender: true,
        // Disable ordering (faster)
        orderClasses: false,
        // Set default column sort
        order: [sort],
        // Set row formatting (i.e. coalition colors)
        // // createdRow: row_format,
        rowCallback: function(row, data, displayIndex, displayIndexFull) {
            $('td:eq(0)', row).html(displayIndexFull + 1);
            if (row_format) {
                row_format(row, data, displayIndexFull);
            }
        },
        // Setup searchable dropdown for columns with unique values
        // Not used currently
        initComplete: function () {
            let that = this.api();
            that.columns().every( function (index: number) {
                if (index == 0 || !searchSet.has(index - 1)) return;
                let column = that.column( index );
                let title = columnsInfo[index - 1].data;
                if (title != null) {
                    let data = column.data();
                    let unique = data.unique();
                    let uniqueCount = unique.count();
                    if (uniqueCount > 1 && uniqueCount < 24 && uniqueCount < data.count() / 2) {
                        let select = $('<select><option value=""></option></select>')
                            .appendTo($(column.header()).empty() )
                            .on( 'change', function () {
                                let val = ($.fn as any).dataTable.util.escapeRegex(
                                    $(this).val()
                                );

                                column
                                    .search( val ? '^'+val+'$' : '', true, false )
                                    .draw();
                            });

                        unique.sort().each( function ( d: any, j: any ) {
                            select.append('<option value="'+d+'">'+d+'</option>' );
                        });

                        select.before(title + ": ");
                    }

                }
            });
        }
    });

    // Apply the search for input fields
    table.columns().every( function (index: number) {
        var column = table.column( index );
        let myInput = $( 'input', column.header() );
        myInput.on( 'keyup change clear', function () {
            if ( column.search() !== (this as any).value ) {
                column
                    .search((this as any).value )
                    .draw();
            }
        } );
        myInput.click(function(e) {
            e.stopPropagation();
        });
    });

    // Prevent the search input from triggering the row details toggle
    $("button").click(function(e) {
        e.stopPropagation();
    });

    // Handle clicking the show/hide column buttons
    jqContainer.find('.toggle-vis').on('click', function (e) {
        e.preventDefault();
        // Get the column API object
        let column = table.column( $(this).attr('data-column') );

        // Toggle the visibility
        column.visible(!column.visible());
        // move elem
        if (e.target.parentElement && e.target.parentElement.tagName == "TH") {
            (e.target as any).oldParent = e.target.parentElement;
            let toggles = jqContainer.find(".table-toggles");
            toggles.append(e.target);
            // find the input elem of toggles
            let inputElem = toggles.find('input');
            if(inputElem.val() && !e.target.textContent.includes(inputElem.val())) {
                $(e.target).addClass('d-none');
            }
        } else {
            (e.target as any).oldParent.append(e.target);
        }
        // get names of column names visible
        let visibleColumns = table.columns().indexes()
            .filter((idx: number) => idx > 0 && table.column(idx).visible())
            .map((idx: number) => dataColumns[idx - 1])
            .toArray();
        setQueryParam("columns", visibleColumns.join("."));
    });

    // Formatting function for row details
    // This displays the hidden columns as a table when a row is clicked
    function format (d: any) {
        let rows = "";
        table.columns().every( function (index: any) {
            if (index == 0) return;
            let numFormat = [];
            if (cell_format.formatNumber != null) {
                numFormat.push(cell_format.formatNumber);
            }
            if (cell_format.formatMoney != null) {
                numFormat.push(cell_format.formatMoney);
            }
            let columnInfo = columnsInfo[index - 1];
            let title = columnInfo["data"];
            if (title != null) {
                if (!table.column(index).visible()) {
                    let data = d[title];
                    if (numFormat.includes(index - 1)) {
                        data = data.toLocaleString("en-US");
                    }
                    rows += '<tr>'+
                        '<td>' + title + '</td>'+
                        '<td>'+data+'</td>'+
                        '</tr>';
                }
            }
        });
        if (rows == "") rows = "No extra info";
        return '<table class="table table-striped table-bordered compact" cellspacing="0" border="0">'+rows+'</table>';
    }

    // Add event listener for opening and closing details (of the hidden columns table)
    jqTable.find('tbody').on('click', 'td.details-control', function () {
        let tr = $(this).closest('tr');
        let row = table.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    });
    // Show the table (faster to only display after setup)
    tableElem.classList.remove("d-none");
}