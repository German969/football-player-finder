import { connect } from 'react-redux';
import { addPlayers, fetchPlayers } from './redux/actions';
import PlayersTable from './players/players-table';
import React from 'react';
import SearchForm from './search/search-form'
import './App.css';

function App(props) {
  props.fetchPlayers();

  return (
    <div className="App">
      <h1>Football Player Finder</h1>
      <SearchForm />
      <PlayersTable playersList={props.players}/>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    players: state.players
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
