import React ,{Fragment} from 'react'

export const NotFound = () => {
    return (
        <Fragment>
            <h1 className="x-large text-primary">
                <i className="fas fa-exclamation-triangle">Page Not Found</i>
            </h1>
            <p className='large'>Sorry,Page Doesn't Exist</p>
        </Fragment>
    )
}

export default NotFound;