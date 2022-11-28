// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import CartContextProvider from './context/CartContext';
import AuthContextProvider from './context/AuthContext';

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <AuthContextProvider>
        <CartContextProvider>
          <Router />
        </CartContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
