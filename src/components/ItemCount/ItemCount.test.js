import { render, screen, act } from '@testing-library/react';
import ItemCount from './ItemCount';
import '@testing-library/jest-dom/extend-expect';

describe('ItemCount', () => {
  it('cuando se presiona el botón + el contador se incrementa', () => {
    // Arrange
    render(<ItemCount />);
    const botonSumar = screen.getByTestId('sumar');
    // Act
    act(() => {
      botonSumar.click();
    });
    act(() => {
      botonSumar.click();
    });
    act(() => {
      botonSumar.click();
    });
    // Assert
    const Valor = screen.getByTestId('Valor');
    expect(Valor).toHaveTextContent('3');
  });
  // Test Resta
  it('cuando se presiona el botón - el contador se decrementa', () => {
    // Arrange
    render(<ItemCount />);
    const botonRestar = screen.getByTestId('restar');
    // Act
    act(() => {
      botonRestar.click();
    });
    // Assert
    const Valor = screen.getByTestId('Valor');
    expect(Valor).toHaveTextContent('-1');
  });
});
