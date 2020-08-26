import React from 'react'

const Pods = ({ pods }) => {
  return (
    <div>
      <center><h1>Pod List</h1></center>
      <table>
        <thead>
        <tr>
          <th>Pod Name</th>
          <th>Pod Namespace</th>
          <th>Pod Status</th>
        </tr>
        </thead>
        <tbody>
        {pods.map((pod) => {
          let podName = pod.metadata.name
          let podNamespace = pod.metadata.namespace
          let podStatus = pod.status.phase
          return <tr key = {podName}>
            <td>{podName}</td>
            <td>{podNamespace}</td>
            <td>{podStatus}</td>
          </tr>
        })}
        </tbody>
      </table>
    </div>
  )
};

export default Pods
