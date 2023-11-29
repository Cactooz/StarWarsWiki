import {observer} from "mobx-react-lite";
import BrowseView from "../views/browseView.jsx";
import Vortex from "../components/Vortex.jsx";
export default
    function Browse(props){
        function render(data) {
            if (!data) {
                return "no data";
            }
            else if (data.loading) {
            return <Vortex/>;
            }
            else if(data.error) {
                return data.error
            }
            else
                return <BrowseView browseResult={data.data.data}/>
        }

    return render(props.model.searchResult)
}
