import React from 'react';

const state = {
    selectedCatOp: null
}

function GenericHeader({onChangeHandler, data, advertisements, totalElements}) {
    return (
        <>
            <div className="generic-header margin-bottom-30px">
                <p className="showing__text text-start">
                    Showing 1 to {advertisements.length} of {totalElements} entries
                </p>
            </div>
        </>
    );
}

export default GenericHeader;
