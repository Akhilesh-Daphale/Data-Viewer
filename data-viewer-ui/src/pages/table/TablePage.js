import { useState, useEffect, useContext, useCallback } from "react";
import Card from "../../components/UI/card/Card";
import AuthContext from "../../store/auth-context";
import classes from "./TablePage.module.css";


const TablePage = () => {
	const [uploadedData, setUploadedData] = useState([]);
	const context = useContext(AuthContext);
	const token = context.token;

	const loadData = useCallback(async () => {
		try {
			const rawResponse = await fetch("/api/data", {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
					Authorization: `Bearer ${token}`,
				},
			});

			if (rawResponse.ok) {
				const response = await rawResponse.json();
				setUploadedData(response);
			} else if (rawResponse.status === 401) {
				throw new Error("Something went wrong");
			}
		} catch (e) {
			alert(`Error: ${e.message}`);
		}
	}, [token]);

	useEffect(() => {
		loadData();
	}, [loadData]);

	return (
		<Card className={classes.table}>
			<table className={classes["content-table"]}>
				<thead>
					<tr>
						<th>Id</th>
						<th>User Id</th>
						<th>Title</th>
						<th>Body</th>
					</tr>
				</thead>
				<tbody>
					{uploadedData.map(data => {
						return (
							<tr key={data.id}>
								<td>{data.id}</td>
								<td>{data.userId}</td>
								<td>{data.title}</td>
								<td>{data.body}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</Card>
	);
};

export default TablePage;
