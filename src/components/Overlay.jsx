import React, { Children, Fragment } from 'react'

const Overlay = ({isOpen, onClose, children}) => {
  return (
    <Fragment>
        {isOpen && <div className='overlay'>
            <div className='overlay-background'>
                <div className='overlay-controls'>
                    <button className='overlay-close' type='button' onClick={onClose}>Close</button>
                </div>
                {children}
            </div>
        </div>}
    </Fragment>
  )
}

export default Overlay