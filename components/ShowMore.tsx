import { ShowMoreProps } from "@/types";

import { Button } from "./ui/button";

const ShowMore = ({ pageNumber, isNext, setLimit }: ShowMoreProps) => {
  let newLimit;
  const handleNavigation = () => {
    newLimit = (pageNumber + 1) * 10;
    setLimit(newLimit);
  };
  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext ? (
        <Button
          className="custom-btn hover:bg-blue-500"
          onClick={handleNavigation}
          disabled={newLimit == 50}
        >
          Load More
        </Button>
      ) : null}
    </div>
  );
};

export default ShowMore;
