import React, { useEffect, useState } from 'react';
import { Button, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Read() {
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:9090/institution')
      .then((response) => {
        setAPIData(response.data);
      })
  }, [])

  const setData = (data) => {
    let { institutionName, institutionType,  } = data;
    localStorage.setItem('institutionName', institutionName);
    localStorage.setItem('institutionType', institutionType);
  }

  const onDelete = (id) => {
    axios.delete(`https://localhost:9090/institution/${id}`)
      .then(() => {
        getData();
      })
  }

  const getData = () => {
    axios.get(`https://localhost:9090/institution`)
      .then((getData) => {
        setAPIData(getData.data);
      })
  }

  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nome da Instituição</Table.HeaderCell>
            <Table.HeaderCell>Tipo de Instituição</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.institutionName}</Table.Cell>
                <Table.Cell>{data.institutionType}</Table.Cell>
                <Link to='/update'>
                  <Table.Cell>
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}