import classes from "./Input.module.css";

function Input(props) {
	return (
		<div className={classes.control}>
			<label htmlFor={props.id}>{props.label}</label>
			<input
				type={props.type}
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder}
			/>
		</div>
	);
}

export default Input;
