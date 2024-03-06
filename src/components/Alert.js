import "../App.css"

export default function Alert(props) {
  return (
    <div className={`alert alert-` + props.type} role="alert">
      {props.message}
    </div>
  );
}
