import Button from "@/components/ui/button/Button";
import { useNavigate } from "react-router-dom";

const CommingSoon = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full  flex flex-col items-center justify-center ">
      <img src="/uc2.png" alt="" className="flex   my-20" />

      <div className="flex items-center justify-center w-full gap-5">
        <Button onClick={() => navigate(-1)} className="px-10">
          Back
        </Button>
        <Button
          onClick={() => window.location.reload()}
          className="bg-gray-900 dark:bg-gray-500 text-white dark:text-white rounded-lg px-10 py-3"
        >
          Retry
        </Button>
      </div>
    </div>
  );
};

export default CommingSoon;
