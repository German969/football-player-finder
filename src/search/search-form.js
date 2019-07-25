import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import positions from './positions';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { applyFilters } from '../redux/actions';
import './search-form.css';

export function SearchForm(props) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("Position");
  const [age, setAge] = useState("");

  const renderPositions = function () {
    return positions.map((position, index) =>{
      return (
          <option key={index} value={position}>{position}</option>
      );
    })
  };

  const handleSearchSubmit = function (event) {
    event.preventDefault();

    const filters = {
      name: name,
      position: position,
      age: age
    };

    props.applyFilters(filters);
  };

  return (
        <Form className="search-form" onSubmit={handleSearchSubmit.bind(this)}>
          <Form.Row>
            <Col>
              <Form.Control
                  type="text"
                  placeholder="Player Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                  as="select"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
              >
                <option disabled>Position</option>
                {renderPositions()}
              </Form.Control>
            </Col>
            <Col>
              <Form.Control
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => {setAge(e.target.value)}}
              />
            </Col>
            <Col xs lg="2">
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Col>
          </Form.Row>
        </Form>
  );
}

function mapStateToProps(state) {
  return {
    filters: state.filters
  };
}

const mapDispatchToProps = {
  applyFilters
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchForm);