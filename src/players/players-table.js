import React from 'react';
import Table from 'react-bootstrap/Table';

function PlayersTable({playersList}) {
  const renderPlayersList = function () {
    return playersList.map((currentPlayer, index) => {
      return (
          <tr key={index}>
            <td>{currentPlayer.name}</td>
            <td>{currentPlayer.position}</td>
            <td>{currentPlayer.nationality}</td>
            <td>{currentPlayer.age}</td>
          </tr>
      );
    })
  };

  return (
      <Table className="players-table" striped bordered>
        <thead>
        <tr>
          <th>Player</th>
          <th>Position</th>
          <th>Nationality</th>
          <th>Age</th>
        </tr>
        </thead>
        <tbody>
          {renderPlayersList()}
        </tbody>
      </Table>
  );
}

export default PlayersTable;