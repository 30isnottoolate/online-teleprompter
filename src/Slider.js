import './Teleprompter.css';

const Slider = (props) => {
  const handleTextChange = (e) => {
    props.setText(e.target.value);
  }

  return (
    <div id="text-slider">
      <textarea id="text-container" value={props.text} onChange={handleTextChange} />
    </div>
  );
}

export default Slider;
