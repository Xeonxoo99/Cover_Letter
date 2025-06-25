import Header from './components/header'
import Intro from './components/Intro'
import Introduction from './components/Introduction'
import Portfolio from './components/Portfolio'
import Imformation from './components/Imformation'
import { ScrollProgressProvider } from './contexts/ScrollProgressContext';

function App() {
  return (
    <ScrollProgressProvider>
      <Header/>
      <Intro/>
      <Introduction/>
      <Portfolio/>
      <Imformation/>
    </ScrollProgressProvider>
  );
}

export default App;
