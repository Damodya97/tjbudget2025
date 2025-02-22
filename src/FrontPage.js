import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendurl } from './BackEndUrl';
import Updateuser from './Updateuser';
import Waitload from './Waitload';
import { useNavigate } from 'react-router-dom';
import './FrontPage.css';

const FrontPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
  
      const UpdateUser = async () => {
        const msg = await Updateuser();
        if (msg==='notlog') {
          navigate('/login');
        } else if (msg==="connectionerror"){
          navigate('/login');
        } else if(msg.activebudget==='yes') {
          console.log('you are signed in');
        } else if(msg.activebudget==='no') {
          console.log('you are signed in');
        } else {
          navigate('/login');
        }
      };
      UpdateUser();
    }, [navigate]);

    const [showNewBudget, setShowNewBudget] = useState(false);
    const [showGoToBudget, setShowGoToBudget] = useState(false);
    const [numPersons, setNumPersons] = useState('');
    const [person1, setPerson1] = useState('');
    const [person2, setPerson2] = useState('');
    const [budgetName, setBudgetName] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [goBudgetName, setGoBudgetName] = useState('');
    const [validbudget1, setValidbudget1] = useState(false);
    const [validbudget2, setValidbudget2] = useState(false);
    const [error, setError] = useState('');
    const [waitload, setWaitload] = useState(false);
    const [waitload1, setWaitload1] = useState(false);

    useEffect(() => {
       if (numPersons==='1' && (person1==='' || budgetName==='' || month==='' || year==='')){
        setValidbudget2(false);
       } else if (numPersons==='2' && (person1==='' || person2==='' || budgetName==='' || month==='' || year==='')){
        setValidbudget2(false);
       } else if (numPersons==='' && (budgetName==='' || month==='' || year==='')){
        setValidbudget2(false);
       } else {
        setValidbudget2(true);
       }
    }, [numPersons,person1,person2,budgetName,month,year]);

    useEffect(() => {
        if (goBudgetName===''){
         setValidbudget1(false);
        } else {
         setValidbudget1(true);
        }
     }, [goBudgetName]);

    const handleBack1 = () => {
        setShowNewBudget(false);
    };

    const handleBack2 = () => {
        setShowGoToBudget(false)
    };

    const closepopup = () => {
      setShowNewBudget(false);
      setShowGoToBudget(false);
      setWaitload(false);
      setWaitload1(false);
  };

    const startABudget = async(e) => {
        e.preventDefault();
        setWaitload(true);

        const databudget = {
          month: month,
          year: year,
          numPersons: numPersons,
          person1: person1,
          person2: person2,
          budgetName: budgetName,
        };

        try {
            const response = await axios.post(`${backendurl}/startabudget`, { databudget },{withCredentials: true});
            if (response.data==='datasaved') {
              setError('');
              navigate('/dashboard')
              setWaitload(false);
            } else if (response.data==='connectionerror'){
              setError('connection Error');
              setWaitload(false);
            } else if (response.data==='budgetexist'){
              setError('Budget name exist.');
              setWaitload(false);
            } else if (response.data==='notlog'){
              setError('Please login first');
              navigate('/login')
              setWaitload(false);
            } else if (response.data==='montherror'){
              setError('Please check the selected month and year');
              setWaitload(false);
            } else if (response.data==='haveactivebudget'){
              setError('');
              setWaitload(true);
              setWaitload1(true);
            } else {
              setError(response.data);
              setWaitload(false);
            }
          } catch (error) {
            setError(`${error}`)
            setWaitload(false);
          }
        
    };

    const activenew = async(e) => {
      e.preventDefault();
      setWaitload(true);
      setWaitload1(false);

      const databudget = {
        month: month,
        year: year,
        numPersons: numPersons,
        person1: person1,
        person2: person2,
        budgetName: budgetName,
      };

      try {
          const response = await axios.post(`${backendurl}/activenew`, { databudget },{withCredentials: true});
          if (response.data==='notlog') {
            navigate('/login')
          } else if (response.data==='datasaved') {
            setWaitload(false);
            navigate('/dashboard')
          } else {
            setWaitload(false);
            setError('Error');
          }
        } catch (error) {
          setError(`${error}`)
          setWaitload(false);
        }
  }
    
    return (
        <div className="frontpage-container">
            {!showNewBudget && !showGoToBudget && (
                <div className="button-container">
                    <button className="new-budget-btn" onClick={() => setShowNewBudget(true)}>Start a New Budget</button>
                    <button className="go-budget-btn" onClick={() => setShowGoToBudget(true)}>Go to Your Budget</button>
                </div>
            )}
            {showNewBudget && (
                <div className="new-budget-container">
                    {waitload && (<Waitload waitload1={waitload1} closepopup={closepopup} activenew={activenew}/>)}
                    <button className="back-button" onClick={handleBack1}>← Back</button>
                    {error && <p className="error-message">{error}</p>}
                    <select className="month-dropdown" onChange={(e) => setMonth(e.target.value)} >
                        <option value="" className='placeholderdropdown'>Select the Month</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                    <select className="year-dropdown" onChange={(e) => setYear(e.target.value)}>
                        <option value="" className='placeholderdropdown'>Select the Year</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                    </select>
                    <select className="persons-dropdown" onChange={(e) => setNumPersons(e.target.value)}>
                        <option value="" className='placeholderdropdown'>Persons Together</option>
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                    </select>
                    {(numPersons === '1' || numPersons === '2') && <input className="person1-input" type="text" placeholder="Person 1 Name" onChange={(e) => setPerson1(e.target.value)}/>}
                    {numPersons === '2' && <input className="person2-input" type="text" placeholder="Person 2 Name" onChange={(e) => setPerson2(e.target.value)}/>}
                    <input className="budget-name-input" type="text" placeholder="Budget Name" onChange={(e) => setBudgetName(e.target.value)}/>
                    {validbudget2 && (<button className="start-budget-btn" onClick={startABudget}>Start Budget</button>)}
                </div>
            )}
            {showGoToBudget && (
                <div className="go-budget-container">
                    <button className="back-button" onClick={handleBack2}>← Back</button>
                    {error && <p className="error-message">{error}</p>}
                    <input className="budget-name-input" type="text" placeholder="Budget Name" onChange={(e) => setGoBudgetName(e.target.value)}/>
                    {validbudget1 && (<button className="go-budget-btn" onClick={() => navigate(`/prev=budget/${goBudgetName}`)}>Go to Budget</button>)}
                </div>
            )}
        </div>
    );
};

export default FrontPage;
