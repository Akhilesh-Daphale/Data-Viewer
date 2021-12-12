import React, { useState, useEffect } from "react";


const AuthContext = React.createContext({
	isLoggedIn: false,
	token: "",
	invalidCredentials: false,
	onLogout: () => {},
	onLogin: (email, password) => {},
});


// Custom context provider function
export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState("");
	const [invalidCredentials, setInvalidCredentials] = useState(false);

	/**
	 * Hook to read data from session storage
	 */
	useEffect(() => {
		const userLoggedInInfo = window.sessionStorage.getItem("isLoggedIn");
		const userTokenInfo = window.sessionStorage.getItem("access-token");

		if (userLoggedInInfo === "1" && userTokenInfo) {
			setIsLoggedIn(true);
			setToken(userTokenInfo);
		}
	}, [isLoggedIn, token]);

	/**
	 * Hook to reset invalidCredentials state
	 */
	useEffect(() => {
		if (invalidCredentials) {
			var validCredIdentifier = setTimeout(() => {
				setInvalidCredentials(false);
			}, 5000);
		}

		return () => {
			clearTimeout(validCredIdentifier);
		};
	}, [invalidCredentials]);

	const loginHandler = async (email, password, history) => {
		const param = window.btoa(`${email}:${password}`);
		try {
			const rawResponse = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json;charset=UTF-8",
					Authorization: `Basic ${param}`,
				},
			});

			if (rawResponse.ok) {
				const data = await rawResponse.json();
				window.sessionStorage.setItem("access-token", data.token);
				window.sessionStorage.setItem("isLoggedIn", "1");
				setIsLoggedIn(true);
				setToken(data.token);
				history.push("/upload");
			} else if (rawResponse.status === 401) {
				setInvalidCredentials(true);
			} else {
				throw new Error("Something went wrong");
			}
		} catch (e) {
			alert(`Error: ${e.message}`);
		}
	};

	const logoutHandler = () => {
		window.sessionStorage.removeItem("isLoggedIn");
		window.sessionStorage.removeItem("access-token");
		setIsLoggedIn(false);
		setToken("");
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				token: token,
				invalidCredentials: invalidCredentials,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
