import PropTypes from "prop-types";
const Container = ({ children }) => {
  return <div className="container mx-auto px-2">{children}</div>;
};
Container.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Container;
