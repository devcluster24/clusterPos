import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <img src="/error.png" alt="" className="h-[400px]" />
      <p className="text-center text-gray-600 font-medium w-[50%] mb-5">
        We're sorry, but there was an error processing your request. Please try
        again later or contact support if the problem persists.
      </p>
      <div className="flex items-center justify-center w-full gap-5">
        <button
          onClick={() => navigate(-1)}
          className="border border-primary text-primary rounded-lg px-10 py-3"
        >
          Back
        </button>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-white rounded-lg px-10 py-3"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default Error;
