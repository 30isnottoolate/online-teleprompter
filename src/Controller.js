import './Teleprompter.css';

function Controller(props) {
  return (
    <div id="controller">
      <input type="range" id="font-size" min="80" max="150" step="1" value={props.font} />
      <input type="range" id="line-height" min="1" max="1.5" step="0.01" value={props.height} />
      <input type="range" id="text-speed" min="20" max="200" step="1" value={props.speed} />
    </div>
  );
}

export default Controller;
