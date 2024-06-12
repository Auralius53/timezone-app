import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import moment from 'moment-timezone';
import './index.css';

const timeZones = moment.tz.names().map(tz => ({ value: tz, label: tz }));

const App = () => {
  const [time, setTime] = useState(moment().format('LTS'));
  const [selectedZone, setSelectedZone] = useState(moment.tz.guess());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().tz(selectedZone).format('LTS'));
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedZone]);

  const handleChange = (option) => {
    setSelectedZone(option.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Current Time</h1>
      <p className="text-3xl mb-6">{time}</p>
      <div className="w-64">
        <Select
          options={timeZones}
          defaultValue={{ value: selectedZone, label: selectedZone }}
          onChange={handleChange}
          className="text-lg"
        />
      </div>
    </div>
  );
};

export default App;
