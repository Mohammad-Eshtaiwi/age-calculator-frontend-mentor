import { useFormContext } from "react-hook-form";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useFormContext(); // retrieve all hook methods
  const onSubmit = (data) => {
    // this is chatgpt stuff I am not that smart

    const { day, month, year } = data;

    // Convert input values to numbers
    const dayNumber = parseInt(day, 10);
    const monthNumber = parseInt(month, 10);
    const yearNumber = parseInt(year, 10);

    // Create a Date object for the entered date
    const enteredDate = new Date(yearNumber, monthNumber - 1, dayNumber);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = currentDate - enteredDate;

    // Convert milliseconds to days, months, and years
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const millisecondsInMonth = millisecondsInDay * 30.44; // Average month length
    const millisecondsInYear = millisecondsInDay * 365.25; // Average year length, accounting for leap years

    const differenceInDays = Math.floor(
      differenceInMilliseconds / millisecondsInDay
    );
    const differenceInMonths = Math.floor(
      differenceInMilliseconds / millisecondsInMonth
    );
    const differenceInYears = Math.floor(
      differenceInMilliseconds / millisecondsInYear
    );

    // Calculate remaining months and days
    const remainingMonths = differenceInMonths % 12;
    const remainingDays = differenceInDays % 30; // Adjust as needed based on your use case

    // Set calculated values back into the form
    setValue("years", differenceInYears);
    setValue("months", remainingMonths);
    setValue("days", remainingDays);
  };

  const { year: yearError, month: monthError, day: dayError } = errors;

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group__container">
        <div className="form-group" data-type={dayError ? "error" : ""}>
          <label className="uppercase" htmlFor="day">
            day
          </label>
          <input
            className="input"
            placeholder="DD"
            type="number"
            {...register("day", {
              required: "Day is required",
              min: {
                value: 1,
                message: "must be a valid day",
              },
              max: {
                value: 31,
                message: "must be a valid day",
              },
              validate: (value, { month, year }) => {
                const currentYear = new Date().getFullYear();
                const currentMonth = new Date().getMonth() + 1; // Adding 1 because months are zero-based

                if (
                  year < currentYear ||
                  (year === currentYear && month < currentMonth)
                ) {
                  return true; // No need to validate if the year and month are in the past
                }

                const currentDate = new Date();
                const inputDate = new Date(`${year}-${month}-${value}`);
                return (
                  inputDate <= currentDate || "Date cannot be in the future"
                );
              },
            })}
          />
          {dayError && <p>{dayError.message}</p>}
        </div>
        <div className="form-group" data-type={monthError ? "error" : ""}>
          <label className="uppercase" htmlFor="month">
            month
          </label>
          <input
            className="input"
            placeholder="MM"
            type="number"
            {...register("month", {
              required: "Month is required",
              min: {
                value: 1,
                message: "must be a valid month",
              },
              max: {
                value: 12,
                message: "must be a valid month",
              },
              validate: (value, { year }) => {
                const currentYear = new Date().getFullYear();

                if (year < currentYear) {
                  return true; // No need to validate if the year is in the past
                }

                const currentMonth = new Date().getMonth() + 1; // Adding 1 because months are zero-based
                return value <= currentMonth || "Month cannot be in the future";
              },
            })}
          />
          {monthError && <p>{monthError.message}</p>}
        </div>
        <div className="form-group" data-type={yearError ? "error" : ""}>
          <label className="uppercase" htmlFor="year">
            year
          </label>
          <input
            className="input"
            placeholder="YYYY"
            type="number"
            {...register("year", {
              required: "Year is required",
              min: {
                value: 1900,
                message: "Year must be at least 1900",
              },
              validate: (value) => {
                const currentYear = new Date().getFullYear();
                return value <= currentYear || "Year cannot be in the future";
              },
            })}
          />
          {yearError && <p>{yearError.message}</p>}
        </div>
      </div>
      <div className="form-group-submit__container">
        <button
          className="form-group-submit btn"
          data-type="primary"
          type="submit"
        >
          <img src="icon-arrow.svg" alt="submit" />
          &nbsp;
        </button>
      </div>
    </form>
  );
}

export default Form;
