import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MainHeader from "./components/Header/MainHeader";
import AuthPage from "./pages/login/AuthPage";
import NeedLoginPage from "./pages/not_found/NeedLoginPage";
import TablePage from "./pages/table/TablePage";
import UploadPage from "./pages/upload/UploadPage";
import AuthContext from "./store/auth-context";

function App() {
	const context = useContext(AuthContext);

	return (
		<React.Fragment>
			<MainHeader />
			<Switch>
				<Route path="/" exact>
					<Redirect to="/login" />
				</Route>
				<Route path="/login">
					<AuthPage />
				</Route>
				<Route path="/upload">
					{context.isLoggedIn && <UploadPage />}
					{!context.isLoggedIn && <NeedLoginPage />}
				</Route>
				<Route path="/data">
					{context.isLoggedIn && <TablePage />}
					{!context.isLoggedIn && <NeedLoginPage />}
				</Route>
				<Route path="*">
					<Redirect to="/" />
				</Route>
			</Switch>
		</React.Fragment>
	);
}

export default App;
