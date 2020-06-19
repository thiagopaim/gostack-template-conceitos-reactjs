import React, { useState, useEffect } from 'react'
import api from './services/api'

import './styles.css'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api
      .get('repositories')
      .then(({ data }) => {
        setRepositories(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  async function handleAddRepository() {
    const newRepository = {
      id: '123',
      url: 'https://github.com/josepholiveira',
      title: 'Desafio ReactJS',
      techs: ['React', 'Node.js'],
    }

    const response = await api.post('repositories', newRepository)
    const repository = response.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    try {
      api.delete(`repositories/${id}`)
      setRepositories(repositories.filter((item) => item.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
