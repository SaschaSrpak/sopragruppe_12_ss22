import { useNavigate, useParams } from "react-router-dom";


/**
 * A wrapper for class based components around React hooks.
 * 
 * @see [react-router-dom](https://reactrouter.com/docs/en/v6)
 * @see [withRouter](https://reactrouter.com/docs/en/v6/faq)
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}