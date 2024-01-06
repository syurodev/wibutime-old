import { FC, ReactNode, memo, useState } from "react";
import { Button } from "../ui/button";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

type IProps = {
  children: ReactNode
}

const ReadMore: FC<IProps> = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text?.toString().slice(0, 100) : text}
      {/* <span
        onClick={toggleReadMore}
        className="font-semibold"
      >
        {isReadMore ? "...read more" : " show less"}
      </span> */}
      <Button variant="outline" size="icon" onClick={toggleReadMore}>
        {
          isReadMore ? (
            <MdOutlineExpandMore className="text-lg" />
          ) : (
            <MdOutlineExpandLess className="text-lg" />
          )
        }
      </Button>
    </p>
  );
};

export default memo(ReadMore)