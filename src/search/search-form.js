import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import React from 'react';

function SearchForm() {
  return (
        <Form>
          <Form.Row>
            <Col>
              <Form.Control type="text" placeholder="Player Name" />
            </Col>
            <Col>
              <Form.Control as="select">
                <option>Position</option>
                <option>Attacking Midfield</option>
                <option>Central Midfield</option>
                <option>Centre-Back</option>
                <option>Centre-Forward</option>
                <option>Defensive Midfield</option>
                <option>Keeper</option>
                <option>Left Midfield</option>
                <option>Left Wing</option>
                <option>Left-Back</option>
                <option>Right-Back</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Control type="number" placeholder="Age" />
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

export default SearchForm;