import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full fixed top-0 left-0 right-0 bottom-0 bg-background/80 z-50">
      <Loader2 className="h-10 w-10 text-primary animate-spin" />
    </div>
  );
};

export default Loading;
