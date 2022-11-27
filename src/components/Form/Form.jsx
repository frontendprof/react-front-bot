
import { useState, useEffect,useCallback } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './Form.css';

const Form = () => {
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [subject, setSubject] = useState('physical');
  const { tg } = useTelegram();

  const onSendData=useCallback(()=>{
    const data={
      country,street,subject
    }

    tg.sendData(JSON.stringify(data))
  },[country,street,subject])

  useEffect(()=>{
    tg.onEvent('mainButtonClicked', onSendData)

    return ()=>{
      tg.offEvent('mainButtonClicked', onSendData)
    }
  },[onSendData])

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Send infos',
    });
  });

  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [street, country]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className="form">
      <h3>Enter your infos:</h3>
      <input
        className="input"
        type="text"
        placeholder="Country"
        value={country}
        onChange={onChangeCountry}
      />
      {/* <input className="input" type="text" placeholder="City" /> */}
      <input
        className="input"
        type="text"
        placeholder="Street"
        value={street}
        onChange={onChangeStreet}
      />

      <select
        name="select"
        id="select"
        value={subject}
        onChange={onChangeSubject}
      >
        <option value="physical">Individual</option>
        <option value="legal">Legal entity</option>
      </select>
    </div>
  );
};

export default Form;
