/* eslint-disable no-unused-vars */
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import Login from "../src/components/Login";
import '@testing-library/jest-dom'

test('Login rendering', async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Login/>
      </Router>
    );
    //const user = userEvent.setup()
    // verify page content for expected route
    // often you'd use a data-testid or role query, but this is also possible
    expect(screen.getByText(/¿No tienes cuenta?/i)).toBeInTheDocument()});