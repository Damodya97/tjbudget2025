import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import {backendurl} from './BackEndUrl';
// import Waitload from './Waitload';
import Updateuser from './Updateuser';
import { useParams } from 'react-router-dom';
import './BudgetData.css';

const BudgetData = () => {
    
    const { goBudgetName } = useParams();
    
    return (
    <div className="Budget-container">
     
    </div>
    );
};

export default BudgetData;
