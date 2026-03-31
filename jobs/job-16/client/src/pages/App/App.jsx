
import { useState, useEffect } from 'react';
import APIService from '../../services/api.service';
import Candidate from '../../components/Candidate';
import './App.scss';

const App = () => {

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const getCandidates = (async () => {
      const data = await APIService.request('getCandidates');
      setCandidates(data.response.data);
    });
    getCandidates();
  }, []);

  return (
    <div className="container">
      {candidates.map((can, i) =>
        <Candidate
          key={i}
          candidate={can}
        />
      )}
    </div>
  );
};

export default App;