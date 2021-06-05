/**
 * @param {object} props
 * @param {JSX.Element} props.pageComponent
 * @param {import("@reach/router").RouteComponentProps} props.path
 * @param {boolean} [props.isDefault]
 * @returns {JSX.Element}
 */
export const PageRoute = (props) => props.pageComponent;
