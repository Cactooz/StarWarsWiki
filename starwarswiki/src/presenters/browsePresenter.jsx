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

    function handleScroll() {
        const {scrollTop, clientHeight, scrollHeight} =
            document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            addData();
        }
    };

    async function addData() {
        let site = window.location.pathname.split("/")[2];
        if (props.model.isLoading || site)
            return;
        props.model.setLoading(true);
        let string = props.model.browseResult?.info.next.replace("/api/v1/", "");
        
        if (string !== undefined)
            await props.model.addBrowseResult(string);
        props.model.setLoading(false);
        return <Vortex/>
    }

    function render(browseResult) {
        const site = useLocation().pathname.replace("/", "");
        if (props.model.currentBrowse === undefined || props.model.currentBrowse !== site) {
            props.model.setBrowseResult(site);
            return <Vortex/>;
        } else if (browseResult === null)
            return <div>Error While Loading. Please Try Again!</div>
        else if (browseResult) {
            return <BrowseView browseResult={browseResult.data} doAdd={doAddACB} doRemove={doRemoveACB}
                               fav={props.model.favorites}
                               auth={props.model.user}
            />;
        }
    }

    addEventListener("scroll", handleScroll);
    return render(props.model.browseResult);
});
