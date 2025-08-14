import App from '../App'
import useAssetPreloader, { assetsToPreload } from './useAssetPreloader';

function AppContainer() {
    // console.log('AppContainer에서 전달하는 애셋 목록:', assetsToPreload);
    const { progress, isLoaded } = useAssetPreloader(assetsToPreload);

    return <App isLoaded={isLoaded} progress={progress} />;
}

export default AppContainer;