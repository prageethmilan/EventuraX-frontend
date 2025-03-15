import React from 'react';
import Select from "react-select";

const state = {
    selectedCatOp: null,
    shortby: [
        {
            value: 'asc',
            label: 'Price: low to high'
        },
        {
            value: 'desc',
            label: 'Price: high to low'
        }
    ]
}

function GenericHeader({onChangeHandler, data, advertisements, totalElements}) {
    return (
        <>
            <div className="generic-header margin-bottom-30px">
                <p className="showing__text text-start">
                    Showing 1 to {advertisements.length} of {totalElements} entries
                </p>
                <div className="short-option me-3">
                    <Select
                        placeholder="Sort by"
                        options={state.shortby}
                        onChange={(e) => onChangeHandler('sortByPrice', e)}
                        value={data?.sortByPrice}
                    />
                </div>
            </div>
        </>
    );
}

export default GenericHeader;
