import { render, screen, act } from '@testing-library/react';
import CartList from './CartList';
import '@testing-library/jest-dom/extend-expect';

describe('ItemCount', () => {
  it('cuando se presiona el botón "Remover del Carrito" un item del carrito se elimina', () => {
    // Arrange
    render(<CartList />);
    const botonRemover = screen.getByTestId('remover');
    // Act
    act(() => {
      botonRemover.click();
    });
    act(() => {
      botonRemover.click();
    });
    act(() => {
      botonRemover.click();
    });
    // Assert
    // que hago aca? al ser un boton q elimina se modifica toda la tabla no entendo
    const Remover = screen.getByTestId('Remover');
    expect(Remover).toHaveTextContent('0');
  });
});
