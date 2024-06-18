import { cn } from "@/lib/utils";

export const StepItem = (props: {
  stepNumber: number;
  className?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) => {
  const { stepNumber, title, description, children, className } = props;

  return (
    <div
      className={cn(
        "my-16 flex items-center justify-center flex-col",
        className
      )}
    >
      <div className="mb-8">
        <p className="text-center text-3xl mb-2 dark:text-gray-600 text-gray-300 font-extralight dark:border-gray-800 border-gray-200 border-2 h-12 w-12 rounded-full pt-[3px]">
          {stepNumber}
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-center dark:text-gray-200 text-gray-600 text-2xl font-light">
          {title}
        </h2>
        {description ? (
          <h3 className=" dark:text-gray-500 text-gray-300">{description}</h3>
        ) : (
          <h3 className="text-white dark:text-black">yo</h3>
        )}
      </div>

      {children}
    </div>
  );
};
