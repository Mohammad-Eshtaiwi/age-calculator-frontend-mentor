import { useFormContext } from "react-hook-form";

function Content() {
  const defaultValueText = "--";
  const { watch } = useFormContext(); // retrieve all hook methods
  console.log(watch(), "watch");
  const { years, months, days } = watch();

  return (
    <div className="content">
      <p>
        <span data-value>{years || defaultValueText}</span>
        years
      </p>
      <p>
        <span data-value>{months || defaultValueText}</span>
        months
      </p>
      <p>
        <span data-value>{days || defaultValueText}</span>
        days
      </p>
    </div>
  );
}

export default Content;
