import Header from './components/header'
import Intro from './components/Intro'
import Introduction from './components/Introduction'
// import Count from './components/Count'
import Portfolio from './components/Portfolio'
import Imformation from './components/Imformation'
import Section5 from './components/Section5'

function App() {
  return (
    <>
      <Header/>
      <Intro/>
      <Introduction/>
      {/* <Count/>  */} {/* Introduction에 추가 */}
      <Portfolio/>
      <Imformation/>
      <Section5/>
    </>
  );
}

export default App;
