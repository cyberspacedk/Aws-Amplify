import React, {useEffect, useState} from 'react'
import {API} from 'aws-amplify'

const AmplifyREST = () => {
  const [people, setPeople] = useState();
  const [coins, setCoins] = useState();

  const callApi = async () => {
    try {
      // Call Api.get to make request with endpoint '/people'
      // first arg - name of our Rest API
      const peopleData = await API.get('mainapi', '/people');
      const coinsData = await API.get('mainapi', '/coins');

      setPeople(peopleData);
      setCoins(coinsData);  
    } catch (err) {
      
    }
  };

  useEffect(()=> {
    callApi();
  }, []);


  return (
    <div>
      Try to get data from REST API
      <pre>
        <h2 style={{margin: '20px 0', padding: '10px 0', border: '2px red solid'}}>People</h2>
        {JSON.stringify(people, null, 2)}
        <h2 style={{margin: '20px 0', padding: '10px 0', border: '2px red solid'}}>Coins</h2>
        {JSON.stringify(coins, null, 2)} 
      </pre>
    </div>
  )
}

export default AmplifyREST;