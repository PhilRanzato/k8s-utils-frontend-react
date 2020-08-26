import React from 'react'

const Services = ({ svcs }) => {
  return (
    <div>
      <center><h1>Service List</h1></center>
      <table>
        <thead>
        <tr>
          <th>Service Name</th>
          <th>Service Namespace</th>
        </tr>
        </thead>
        <tbody>
        {svcs.map((svc) => {
          let svcName = svc.metadata.name
          let svcNamespace = svc.metadata.namespace
          return <tr key = {svcName}>
            <td>{svcName}</td>
            <td>{svcNamespace}</td>
          </tr>
        })}
         </tbody>
      </table>
    </div>
  )
};

export default Services
