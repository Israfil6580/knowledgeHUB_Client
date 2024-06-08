import PropTypes from "prop-types";
import titleIcon from "/title_icon.svg";
const Heading = ({ title, subTitle }) => {
  return (
    <div className="text-center">
      <div className="pb-8 pt-20 flex flex-col gap-2">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl uppercase font-extrabold font-title">
            {title}
          </h1>
          <img src={titleIcon} alt="" />
        </div>
        <p className="md:w-3/5 mx-auto">{subTitle}</p>
      </div>
    </div>
  );
};
Heading.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};
export default Heading;
