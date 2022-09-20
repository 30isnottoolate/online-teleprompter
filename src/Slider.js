import './Teleprompter.css';

const Slider = (props) => {
  const handleTextChange = (e) => {
    props.setText(e.target.value);
  }

  return (
    <div id="text-slider" style={{position: "absolute", top: props.position}}>
      <textarea id="text-container" style={{fontSize: props.fontSize + "px", lineHeight: props.lineHeight}} value={props.text} onChange={handleTextChange} />
    </div>
  );
}

export default Slider;
