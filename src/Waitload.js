import React from 'react';
import './Waitload.css';

const Waitload = ({waitload1, closepopup,activenew}) => {
  return (
    <div className="wait-container">
      {!waitload1 && (
        <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>)}
      {!waitload1 && (<p className="loading-text">Loading, please wait...</p>)}

      {waitload1 && (
        <div className='hidewaitclass'>
          <p>You already activate this month budget. Do you want to deactivate it and activate a new budget ?</p>
          <button className='btnwaitload' onClick={activenew}>Yes</button>
          <button className='btnwaitload' onClick={closepopup}>No</button>
        </div>
      )}
    
    </div>
  );
};

export default Waitload;
