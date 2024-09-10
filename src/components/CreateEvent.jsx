import React, {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Form} from 'semantic-ui-react';
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';

export default function Create() {
    const [eventName, setEventName] = useState('');
    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [progress, setProgress] = useState(0)
    let history = useNavigate();

    // const postData = () => {
    //   axios.post('https://localhost:9090/event', {
    //     eventName,
    //     initialDate,
    //     finalDate,
    //   }).then(() => {
    //     history('/read');
    //   })
    // }

    const postData = () => {
        axios.post('https://localhost:9090/event', {
            name:eventName,
            initialDate: initialDate,
            finalDate:finalDate,
        }).then(() => {
            history('/read');
        })
    }

    useEffect(() => {
        if (
            eventName.trim() !== '' &&
            initialDate !== '' &&
            finalDate !== ''
        ) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [eventName, initialDate, finalDate]);

    const handleButtonClick = () => {

        if (!validateDate()) {
            return;
        }
        postData();   // Call the postData function
        setProgress(100); // Set the progress to 100
    }

    const validateDate = () => {
        let currentDate = new Date();
        let startDate = new Date(initialDate);
        let endDate = new Date(finalDate);

        if (startDate < currentDate) {
            alert("A data de início não pode ser anterior à data atual. Por favor Verifique o campo de Data Inicial");
            return false;
        }

        if (endDate < startDate) {
            alert("A data de final do evento não pode ser anterior à data de início. Por favor Verifique o campo de Data Final");
            return false;
        }

        return true;

    }
    return (<div>
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
                Enviar Formulario
            </Button>
        </Form>
    </div>)
}