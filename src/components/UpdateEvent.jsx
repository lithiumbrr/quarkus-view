import React, { useEffect, useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import axios from 'axios';

export default function Update() {
  const [eventName, setEventName] = useState('');
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [id, setID] = useState(null);
  const [progress, setProgress] = useState(0)

  let history = useNavigate();

  useEffect(() => {
    setID(localStorage.getItem('ID'))
    setEventName(localStorage.getItem('eventName'));
    setInitialDate(localStorage.getItem('initialDate'));
    setFinalDate(localStorage.getItem('finalDate'));

    if (
        eventName.trim() !== '' &&
        initialDate !== '' &&
        finalDate !== ''
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, []);

  const updateAPIData = () => {
    axios.put(`https://localhost:9090/event/${id}`, {
      name:eventName,
      initialDate: initialDate,
      finalDate:finalDate,
    }).then(() => {
      history('/read')
    })
  }

  const handleButtonClick = () => {

    setProgress(100); // Set the progress to 100
    updateAPIData();  // Call the postData function
  }

  return (
    <div>
      <h1>Update</h1>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(100)}
      />
      <Form className="create-form">
        <Form.Field>
          <label>Nome do Evento</label>
          <input
            placeholder='Nome do Evento'
            onChange={(e) => setEventName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label for="initial-date">Data de Inicio:</label>
          <input
            type="datetime-local"
            id="initial-date"
            name="initial-date"
            onChange={(e) => setInitialDate(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label for="final-date">Data de Finalização:</label>
          <input
            type="datetime-local"
            id="final-date"
            name="final-date"
            onChange={(e) => setFinalDate(e.target.value)}
          />
        </Form.Field>
        <Button
          type='submit'
          onClick={handleButtonClick}
          disabled={isButtonDisabled}
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}