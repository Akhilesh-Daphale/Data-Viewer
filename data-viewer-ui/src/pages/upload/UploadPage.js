import { useState, useEffect, useContext } from "react";
import Card from "../../components/UI/card/Card";
import Input from "../../components/UI/input/Input";
import Button from "../../components/UI/button/Button";
import classes from "./UploadPage.module.css";
import Message from "../../components/UI/message/Message";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const UploadPage = () => {
	const [file, setfile] = useState("");
	const [invalidFileType, setInvalidFileType] = useState(false);
	const [uploadFailed, setUploadFailed] = useState(false);
	const context = useContext(AuthContext);
	const history = useHistory();

	/**
	 * Hook to reset invalidFileType state
	 */
	useEffect(() => {
		if (invalidFileType) {
			var fileTypeIdentifier = setTimeout(() => {
				setInvalidFileType(false);
			}, 5000);
		}

		return () => {
			clearTimeout(fileTypeIdentifier);
		};
	}, [invalidFileType]);

	/**
	 * Hook to reset uploadFailed state
	 */
	useEffect(() => {
		if (uploadFailed) {
			var uploadFailedIdentifier = setTimeout(() => {
				setUploadFailed(false);
			}, 5000);
		}

		return () => {
			clearTimeout(uploadFailedIdentifier);
		};
	}, [uploadFailed]);

	const uploadData = async (fileData) => {
		try {
			const rawResponse = await fetch("/api/upload", {
				method: "POST",
				body: JSON.stringify(fileData),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
					Authorization: `Bearer ${context.token}`,
				},
			});

			if (rawResponse.ok) {
				history.push("/data");
			} else if (rawResponse.status === 401) {
				throw new Error("Something went wrong");
			}
		} catch (e) {
			setUploadFailed(true);
		}
	};

	const inputChangeHandler = (event) => {
		setfile(event.target.files[0]);
	};

	const validFileType = (file) => {
		return file.type === "application/json";
	};

	const convertToArray = (fileData) => {
		if (fileData.constructor === Array) {
			return fileData;
		} else {
			return [fileData];
		}
	}

	const readAndUpload = (event) => {
		let json = JSON.parse(event.target.result);
		let fileData = convertToArray(json);
		uploadData(fileData);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (file && file.size) {
			if (!validFileType(file)) {
				setInvalidFileType(true);
				return;
			}

			let reader = new FileReader();
			reader.onload = readAndUpload;
			reader.readAsText(file);
		}
	};

	return (
		<Card className={classes.upload}>
			<form onSubmit={submitHandler}>
				<Input
					id="file"
					label="Upload File"
					type="file"
					onChange={inputChangeHandler}
				/>
				{invalidFileType && (
					<Message>Invalid file type, json file required</Message>
				)}
				{uploadFailed && (
					<Message>Upload failed, something went wrong</Message>
				)}
				<Button type="submit" className={classes.btn}>
					Upload
				</Button>
			</form>
		</Card>
	);
};

export default UploadPage;
