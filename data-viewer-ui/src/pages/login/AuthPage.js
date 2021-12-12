import React, { useState, useContext } from "react";
import Button from "../../components/UI/button/Button";
import Card from "../../components/UI/card/Card";
import Input from "../../components/UI/input/Input";
import classes from "./AuthPage.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import Message from "../../components/UI/message/Message";


const AuthPage = () => {
	const context = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const emailChangeHandler = (event) => {
		setEmail(event.target.value);
	};

	const passwordChangeHandler = (event) => {
		setPassword(event.target.value);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if(email !== "" && password !== "") {
			context.onLogin(email, password, history);
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					id="email"
					label="E-Mail"
					type="email"
					placeholder="type here..."
					value={email}
					onChange={emailChangeHandler}
				/>
				<Input
					id="password"
					label="Password"
					type="password"
					placeholder="type here..."
					value={password}
					onChange={passwordChangeHandler}
				/>
				{context.invalidCredentials && (
					<Message>Invalid username or password</Message>
				)}
				<Button type="submit" className={classes.btn}>
					Login
				</Button>
			</form>
		</Card>
	);
};

export default AuthPage;
