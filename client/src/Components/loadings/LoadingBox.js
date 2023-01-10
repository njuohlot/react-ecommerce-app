import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
const LoadingBox = () => {
  return (
    <div className='loader'>
          <Spinner animation='border' role='status'>
        <span className='visually-hidden spinner'>Loading....</span>
    </Spinner>

    </div>

  )
}

export default LoadingBox