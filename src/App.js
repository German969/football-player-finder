import { connect } from 'react-redux';
import { fetchPlayers } from './redux/actions';
import { getFilteredPlayers } from './redux/selectors';
import PlayersTable from './players/players-table';
import React, { useEffect } from 'react';
import SearchForm from './search/search-form';
import './App.css';

export function App(props) {
  const { fetchPlayers } = props;

  useEffect( () => {
    fetchPlayers();
  }, [fetchPlayers]);

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
  fetchPlayers
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
