import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import {
  AdminPageContainer,
  Header,
  SubHeader,
} from "../components/Elements/AdminPageElements";

export default function AdminPage() {
  const [result, setResult] = useState([]);

  /*  Getting the data  */
  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/admin/users`
      );
      setResult(data);
    };

    search();
  }, []);

  /*  Create the table after get the data  */
  const renderedRowToTable = result.map((item, index) => {
    return (
      <tr key={index}>
        <td>{index}</td>
        <td>{item.id}</td>
        <td>{item.username}</td>
        <td>{item.password}</td>
        <td>{item.nickname}</td>
        <td>{item.create_time}</td>
        <td>{item.ROLE}</td>
        <td>{item.status ? "Connected" : "Disconnected"}</td>
      </tr>
    );
  });

  /*  Render the Admin page  */
  return (
    <AdminPageContainer>
      <Header>Admin Page</Header>
      <SubHeader>User Table</SubHeader>

      <Table striped bordered hover size="md">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>User Name</th>
            <th>Password</th>
            <th>Nick Name</th>
            <th>Create Time</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{renderedRowToTable}</tbody>
      </Table>
    </AdminPageContainer>
  );
}
