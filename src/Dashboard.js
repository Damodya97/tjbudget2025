import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendurl } from './BackEndUrl';
import Updateuser from './Updateuser';
import './Dashboard.css';
import Waitload from './Waitload';

const Dashboard = () => {

  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    balance: '',
    leftdays: '',
    spendperday: '',
    username: '',
    person1:'',
    person2: '',
    person1save: '',
    person2save: '',
    month:'',
    year:'',
  });
  const [showSavemoney, setShowSaveMoney] = useState(false);
  const [showWithdrawMoney, setShowWithdrawMoney] = useState(false);
  const [nuPersons, setnuPerson] = useState(false);
  const [person1Value, setPerson1Value] = useState(0);
  const [person2Value, setPerson2Value] = useState(0);
   const [waitload, setWaitload] = useState(false);
    const [waitload1, setWaitload1] = useState(false);

  useEffect(() => {
    const UpdateUser = async () => {
      const msg = await Updateuser();
      if (msg==='notlog') {
        navigate('/login');
      } else if (msg==="connectionerror"){
        navigate('/login');
      } else if(msg.authThis==='usersignedok') {
        if (msg.activebudget==='no') {
            navigate('/frontpage');
        } else if(msg.activebudget==='yes') {
          setProfile({
            balance: msg.balance,
            leftdays: msg.leftdays,
            spendperday: msg.spendperday,
            budgetame: msg.budgetame ,
            person1: msg.person1,
            person2: msg.person2,
            person1save: msg.person1save,
            person2save: msg.person2save,
            month: msg.month,
            year: msg.year,
          });
          if (msg.nuperson==='2') {
            setnuPerson(true)
          } else {
            setnuPerson(false)
          }
        }
      }  else if(msg.activebudget==='no') {
        navigate('/frontpage');
      } else {
        navigate('/login');
      }
    };
    UpdateUser();
  }, [navigate]);

  const [items, setItems] = useState(
    Array.from({ length: 7 }, (_, i) => ({ [`item${i + 1}`]: "", [`price${i + 1}`]: "" }))
  );

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const totalPrice = items.reduce((sum, entry) => sum + (parseFloat(entry[`price${Object.keys(entry)[1].slice(5)}`]) || 0), 0);
  
  const showSaveMoneyarea = () => {
    setShowSaveMoney(true);
    setShowWithdrawMoney(false);
  }

  const showWithdrawMoneyarea = () => {
    setShowSaveMoney(false);
    setShowWithdrawMoney(true);
  }
  
  const saveMoney = async(e) => {
    e.preventDefault();
    setWaitload(true);

    const databudget = {
      person1Value: person1Value,
      person2Value: person2Value,
      person1: profile.person1,
      person2: profile.person2,
    };

    try {
      const response = await axios.post(`${backendurl}/savemoney`, { databudget },{withCredentials: true});
      if (response.data==='notlog') {
        navigate('/login');
        setWaitload(false);
      } else if (response.data==='datasaved') {
        window.location.reload();
        setWaitload(false);
      } else {
        navigate('/login');
        setWaitload(false);
      }
    } catch (error) {
      console.log(error);
      setWaitload(false);
    }
  }

  const WithdrawMoney = async(e) => {
    e.preventDefault();
    setWaitload(true);
    try {
      const response = await axios.post(`${backendurl}/withdraw`, { items, totalPrice },{withCredentials: true});
      if (response.data==='notlog') {
        navigate('/login');
        setWaitload(false);
      } else if (response.data==='datasaved') {
        navigate('dashboard/prevtransaction');
        setWaitload(false);
      } else if (response.data==='noitem') {
        alert("No data added, Please reload");
      }else {
        navigate('/login');
        setWaitload(false);
      }
    } catch (error) {
      console.log(error);
      setWaitload(false);
    }
  }

  const logout = async(e) => {
    e.preventDefault();
  }

  return (
    <div className="dashboard-container">
      {waitload && (<Waitload waitload1={waitload1}/>)}
      <div className="dashboard-container1">
        {!nuPersons && (<h1 className="dashboard-containerh11">Welcome! {profile.person1} for your {profile.year} {profile.month} budget.</h1>)}
        {nuPersons && (<h1 className="dashboard-containerh11">Welcome! {profile.person1} and {profile.person2} for your {profile.year} {profile.month} budget.</h1>)}
      </div>
      <div className="dashboard-container2">
        <h2 className="dashboard-containerh13">You have <span className='dashboarspan1'>{profile.balance}/= Rupees</span> in your budget.</h2>
        <h2 className="dashboard-containerh13">You have <span className='dashboarspan1'>{profile.leftdays} Days</span> left for this budget.</h2>
        <div className='dashboard-container3'>
          <h2 className="dashboard-containerh14">You can spend</h2>
          <h2 className="dashboard-containerh15"><span className='dashboarspan2'>{profile.spendperday}/= Rupees</span></h2>
          <h2 className="dashboard-containerh14">per day.</h2>
        </div>
      </div>

      
      <div className="button-container1">
          <button className="new-budget-btn1" onClick={showSaveMoneyarea}>Save Money</button>
          <button className="go-budget-btn1" onClick={showWithdrawMoneyarea}>Withdraw Money</button>
      </div>

      {showSavemoney && (
        <div className="savemoneydashboard">
            <table className="styled-tabledash">
              <thead>
                <tr>
                  <th className='tableth1'>PERSON</th>
                  <th className='tableth1'>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='tabletd1'>{profile.person1} - </td>
                  <td className='tabletd2'><input className='inpuuttable' type="number" onChange={(e) => setPerson1Value(e.target.value)}></input> /=</td>
                </tr>
              </tbody>
              <tbody>
              {nuPersons && (
                <tr>
                  <td className='tabletd1'>{profile.person2} - </td>
                  <td className='tabletd2'><input className='inpuuttable' type="number" onChange={(e) => setPerson2Value(e.target.value)}></input> /=</td>
                </tr>)}
              </tbody>
            </table>
            <button className="new-budget-btn2" onClick={saveMoney}>Save Money</button>
        </div>
      )}

      {showWithdrawMoney && (
        <div className="withdrawmoneydashboard">
            <table className="styled-tabledash-2">
              <thead>
                <tr>
                  <th className='tableth1-2'>ITEM</th>
                  <th className='tableth1-2'>PRICE</th>
                </tr>
              </thead>
              {items.map((entry, index) => (
                <tbody key={index}>
                <tr>
                  <td className='tabletd1-2'><input className='inpuuttable1-1' type="text"  value={entry[`item${index + 1}`]} onChange={(e) => handleChange(index, `item${index + 1}`, e.target.value)}></input> - </td>
                  <td className='tabletd1-2'><input className='inpuuttable1' type="number" value={entry[`price${index + 1}`]} onChange={(e) => handleChange(index, `price${index + 1}`, e.target.value)}></input> /=</td>
                </tr>
              </tbody>
              ))}
              <tbody>
                <tr>
                  <td className='tabletd1-2'>Total Amount - </td>
                  <td className='tabletd1-2'>{totalPrice} /=</td>
                </tr>
              </tbody>
            </table>
            <button className="new-budget-btn2" onClick={WithdrawMoney}>Withdraw Money</button>
        </div>
      )}

      {!nuPersons && (<h1 className="dashboard-containerh17">{profile.person1} saved <span className='dashboarspan3'>{profile.person1save}/= Rupees</span> in to the budget.</h1>)}
      {nuPersons && (<h1 className="dashboard-containerh17">{profile.person1} saved <span className='dashboarspan3'>{profile.person1save}/= Rupees</span> in to the budget.</h1>)}
      {nuPersons && (<h1 className="dashboard-containerh17">{profile.person2} saved <span className='dashboarspan3'>{profile.person2save}/= Rupees</span> in to the budget.</h1>)}

      <div className="dashboard-container4">
        <button className="go-budget-btn2" onClick={() => navigate(`dashboard/prevtransaction`)}>See all Transraction</button>
        <button className="go-budget-btn2" onClick={() => navigate(`/frontpage`)}>New Budget</button>
      </div>
    </div>
  );
};

export default Dashboard;
