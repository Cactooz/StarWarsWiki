import BrowseView from '../views/browseView.jsx';
import Vortex from '../components/Vortex.jsx';
import {observer} from 'mobx-react-lite';
import {useLocation} from "react-router-dom";


export default observer(function Browse(props) {
    function doAddACB(card) {
        props.model.addToFavorites(card)
    }

    function doRemoveACB(card) {
        props.model.removeFromFavorites(card)
    }

    function render(browseResult) {
        const site = useLocation().pathname.replace("/", "");
        if (props.model.currentBrowse === undefined || props.model.currentBrowse !== site) {
            props.model.setBrowseResult(site);
            return <Vortex/>;
        } else if (browseResult === null)
            return <div>Error While Loading. Please Try Again!</div>
        else {
            return <BrowseView browseResult={browseResult.data} doAdd={doAddACB} doRemove={doRemoveACB}
                               fav={props.model.favorites}
                               auth={props.model.user}/>;
        }
    }

    return render(props.model.browseResult);
});
