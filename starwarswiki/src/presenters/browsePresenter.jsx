import BrowseView from "../views/browseView.jsx";
import Vortex from "../components/Vortex.jsx";
export default
    function Browse(props){
        function render(searchResult) {
            if (!searchResult) {
                return "no data";
            }
            else if (searchResult.loading) {
            return <Vortex/>;
            }
            else if(searchResult.error) {
                return searchResult.error
            }
            else
                return <BrowseView browseResult={searchResult.data.data}/>
        }

    return render(props.model.searchResult)
}
