import { GridApi } from "ag-grid-community";
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';import { useRef, useMemo, useCallback } from "react";
import { Movie } from "../services/api";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default function DisplayGrid({
    gridApiRef,
    rowData,
    onDoubleClick,
    setSelectedRow,
    columnDefs
}: {
    gridApiRef: React.MutableRefObject<GridApi | null> | null;
    rowData: Movie[]; //we could use "any" to keep it generic but for this project we know it's an array of Movie
    onDoubleClick: (data: any) => void;
    setSelectedRow: (data: any) => void;
    columnDefs: any[];
}) {
    const internalGridApiRef = useRef<GridApi | null>(null);
    const gridApiRefToUse = useMemo(() => gridApiRef || internalGridApiRef, [gridApiRef]);

    const defaultColDef = useMemo(() => {
        return {
            sortable: true,
            editable: false,
            filter: true,
        };
    }, []);

    const onSelectionChanged = useCallback((event: { api: { getSelectedNodes: () => any[]; }; }) => {
        const selectedNode = event.api.getSelectedNodes()[0];
        if (selectedNode) {
            setSelectedRow(selectedNode.data);
        }
    }, [setSelectedRow]);

    const onRowDoubleClicked = useCallback((event: { data: any; }) => {
        onDoubleClick(event.data);
    }, [onDoubleClick]);

    const onGridReady = useCallback((params: { api: any; }) => {
        if (gridApiRefToUse) {
            gridApiRefToUse.current = params.api;
        }
    }, [gridApiRefToUse]);

    return (
        <div className="border-separate border-spacing-0 h-[calc(100vh-16rem)]">
            <AgGridReact<Movie>
                className="ag-theme-quartz"
                rowData={rowData}
                columnDefs={columnDefs}
                rowSelection={{
                    mode: 'singleRow',
                    checkboxes: false,
                    enableClickSelection: true,
                }}
                defaultColDef={defaultColDef}
                onSelectionChanged={onSelectionChanged}
                onRowDoubleClicked={onRowDoubleClicked}
                onGridReady={onGridReady}
            />
        </div>
    );
}