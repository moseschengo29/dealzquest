
const Section = ({
  className,
  id,
  customPaddings,
  children,
}) => {
  return (
    <div
      id={id}
      className={`
      relative 
      ${
        customPaddings ||
        `py-10 lg:py-8 xl:py-2 `
      } 
      ${className || ""}`}
    >
      {children}

      
    </div>
  );
};

export default Section;
