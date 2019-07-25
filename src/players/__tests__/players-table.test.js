import React from 'react';
import Enzyme, {mount} from 'enzyme';
import PlayersTable from '../players-table';
import Adapter from "enzyme-adapter-react-16/build";

describe('PlayersTable', () => {
  Enzyme.configure({ adapter: new Adapter() });

  const playersTableProps = {
    playersList: [
      {
        name: 'testName',
        position: 'testPos1',
        nationality: 'testNationality',
        age: 'testAge'
      },
      {
        name: 'testName2',
        position: 'testPos2',
        nationality: 'testNationality2',
        age: 'testAge2'
      }
    ]
  };
  const PlayersTableWrapper = mount(
      <PlayersTable {...playersTableProps} />
  );

  it('should render players received from props', () => {
    const table = PlayersTableWrapper.find('Table');
    const headers = PlayersTableWrapper.find('th');
    const rows = PlayersTableWrapper.find('tr');
    const player1 = rows.at(1);
    const player2 = rows.at(2);
    const player1Columns = player1.find('td');
    const player2Columns = player2.find('td');

    expect(table.hasClass('players-table')).toBeTruthy();
    expect(table.props()).toMatchObject({
      striped: true,
      bordered: true
    });

    expect(rows.length).toBe(3);

    expect(headers.at(0).text()).toBe('Player');
    expect(headers.at(1).text()).toBe('Position');
    expect(headers.at(2).text()).toBe('Nationality');
    expect(headers.at(3).text()).toBe('Age');

    expect(player1Columns.at(0).text()).toBe('testName');
    expect(player1Columns.at(1).text()).toBe('testPos1');
    expect(player1Columns.at(2).text()).toBe('testNationality');
    expect(player1Columns.at(3).text()).toBe('testAge');

    expect(player2Columns.at(0).text()).toBe('testName2');
    expect(player2Columns.at(1).text()).toBe('testPos2');
    expect(player2Columns.at(2).text()).toBe('testNationality2');
    expect(player2Columns.at(3).text()).toBe('testAge2');
  });
});