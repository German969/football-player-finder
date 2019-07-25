import { connect } from 'react-redux';
import { addPlayers, fetchPlayers } from './redux/actions';
import { getFilteredPlayers } from './redux/selectors';
import PlayersTable from './players/players-table';
import React from 'react';
import SearchForm from './search/search-form';
import './App.css';

export function App(props) {
  props.fetchPlayers();

  return (
    <div className="App">
      <h1 className="App-title">Football Player Finder</h1>
      <SearchForm />
      <PlayersTable playersList={props.players}/>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    players: getFilteredPlayers(state)
  };
}

const mapDispatchToProps = {
  addPlayers,
  fetchPlayers
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
