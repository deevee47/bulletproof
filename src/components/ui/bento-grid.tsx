import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  imageSrc,
  altText,
}: {
  className?: string;
  imageSrc: string;
  altText?: string;
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl group hover:shadow-xl transition duration-200 shadow-input dark:shadow-none",
        className
      )}
    >
      <div
        className="absolute inset-0 transform transition-transform duration-500 ease-out group-hover:scale-110 group-hover:translate-y-[-10px]"
        style={{ willChange: "transform" }}
      >
        <img
          src={imageSrc}
          alt={altText || "Bento item"}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
