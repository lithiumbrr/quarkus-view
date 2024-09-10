import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Form} from 'semantic-ui-react';
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';

export default function Create() {
    const [institutionName, setInstitutionName] = useState('');
    const [institutionType, setInstitutionType] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [progress, setProgress] = useState(0)
    let history = useNavigate();

    const postData = () => {
        axios.post('https://localhost:9090/institution', {
            name: institutionName,
            type: institutionType,
        }).then(() => {
            history('/read');
        })
    }

    const handleButtonClick = () => {
        postData();   // Call the postData function
        setProgress(100); // Set the progress to 100
    }

    useEffect(() => {
        if (
            institutionName.trim() !== '' &&
            institutionType.trim() !== ''
        ) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [institutionName, institutionType]);

    return (
        <div>
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