const ChartInputs = ({ onAdd }) => {
  const addHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const submittedValue = formData.get("submittedValue");
    console.log(submittedValue);
    onAdd((prevData) => {
      return [...prevData, submittedValue];
    });
  };

  return (
    <form className="chart-input" onSubmit={addHandler}>
      <input type="number" name="submittedValue"></input>
      <button type="submit">Add</button>
    </form>
  );
};

export default ChartInputs;
