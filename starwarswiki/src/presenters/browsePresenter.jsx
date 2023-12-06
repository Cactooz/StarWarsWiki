import BrowseView from '../views/browseView.jsx';
import Vortex from '../components/Vortex.jsx';
import {observer} from 'mobx-react-lite';


export default observer(function Browse(props) {
    function render(browseResult) {
        const site = window.location.pathname.replace("/", "");
        if (props.model.currentBrowse === undefined || props.model.currentBrowse !== site) {
            props.model.setBrowseResult(site);
            return <Vortex/>;
        } else if (browseResult === null)
            return <div>Error While Loading. Please Try Again!</div>
        else {
            return <BrowseView browseResult={browseResult.data}/>;
        }
    }

    return render(props.model.browseResult);
});
