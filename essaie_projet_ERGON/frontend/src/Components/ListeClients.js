import React, {  useEffect, useState } from "react";
import axios from "axios"

function ListeClients() {
  const [users , setUsers] = useState(null)

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/store/ClientGuest")
      .then(data => setUsers(data.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">NOM</th>
            <th scope="col">PRENOM</th>
            <th scope="col">CONTACT</th>
            <th scope="col">DATE DE RENDEZ-VOUS</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            return <tr key={index}>
            <td>{index+1}</td>
            <td>{user.nom}</td>
            <td>{user.prenom}</td>
            <td>{user.contact}</td>
            <td>{user.rdv}</td>
          </tr> 
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ListeClients