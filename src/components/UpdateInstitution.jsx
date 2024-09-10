import React, { useEffect, useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import axios from 'axios';

export default function Update() {
  const [institutionName, setInstitutionName] = useState('');
  const [institutionType, setInstitutionType] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [id, setID] = useState(null);
  const [progress, setProgress] = useState(0)

  let history = useNavigate();

  useEffect(() => {
    setID(localStorage.getItem('ID'))
    setInstitutionName(localStorage.getItem('institutionName'));
    setInstitutionType(localStorage.getItem('institutionType'));

    if (
        institutionName.trim() !== '' &&
        institutionType.trim() !== ''
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, []);

  const updateAPIData = () => {
    axios.put(`https://localhost:9090/institution/${id}`, {
      name: institutionName,
      type: institutionType,
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
          <label>Nome da Instituição</label>
          <input
            placeholder='Nome da Instituição'
            onChange={(e) => setInstitutionName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Tipo de Instituição</label>
          <input
            placeholder='Tipo de Instituição'
            onChange={(e) => setInstitutionType(e.target.value)}
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