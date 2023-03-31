export default function RenderAlert(props) {
    return (
        <div className={`alert alert-` + props.type} role="alert">
            {props.message}
        </div>)
}