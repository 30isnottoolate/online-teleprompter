import './Teleprompter.css';

const Slider = () => {
  const handleTextChange = (e) => {

  }

  return (
    <div id="text-slider">
      <textarea id="text-container" value={text} onChange={handleTextChange} />
    </div>
  );
}

export default Slider;
