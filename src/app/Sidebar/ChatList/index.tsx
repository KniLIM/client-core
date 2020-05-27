import React, {CSSProperties} from 'react';

export default (propStyle: CSSProperties) => {
    const pageName = "chat list"
    return (
        <div style={propStyle}>{pageName}</div>
    )
}
