import type { CustomCellRendererProps } from "@ag-grid-community/react";
import { type FunctionComponent } from "react";

export const PosterCellRenderer: FunctionComponent<
    CustomCellRendererProps
> = (sourceObject) => (
    <div className='h-full flex items-center justify-center max-w-full max-h-24 rounded-md m-2'>
        <img className='w-16 h-16' src={sourceObject.value} />
    </div>
);
