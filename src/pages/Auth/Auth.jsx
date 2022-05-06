import React, { useState } from "react";

import logo from "../../res/img/logo.png";
import "./Auth.css";
import InputText from "../../components/InputText/InputText";
import Button from "../../components/Button/Button";
import AboutAuth from "./AboutAuth";
import Loading from "../../components/Loading/Loading";
import { alert } from "../../components/CustomAlert/alert";

const Auth = () => {
	const [isSignedup, setIsSignedup] = useState(true);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordfConfirm] = useState("");

	const handleSwitch = () => {
		setIsSignedup(!isSignedup);
	};

	const loading = false;
	const success = false;

	return (
		<section className="auth-section">
			{!isSignedup && <AboutAuth />}
			<div className="auth-container">
				{isSignedup ? <img src={logo} alt="" /> : null}

				<form>
					{!isSignedup ? (
						<InputText
							type="text"
							label="NAME"
							onChange={(e) => {
								setName(e.target.value);
							}}
							value={name}
						></InputText>
					) : null}
					<InputText
						type="email"
						label="EMAIL"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						value={email}
					></InputText>
					<InputText
						type="password"
						label="PASSWORD"
						optionalInnerHtml={
							isSignedup ? (
								<div className="link">forgot password?</div>
							) : null
						}
						onChange={(e) => setPassword(e.target.value)}
						value={null}
					></InputText>
					{!isSignedup ? (
						<InputText
							type="password"
							label="CONFIRM PASSWORD"
							onChange={(e) => {
								setPasswordfConfirm(e.target.value);
							}}
							value={null}
						></InputText>
					) : null}
					{!isSignedup ? (
						<p className="sub-text">
							Passwords must contain at least eight characters,
							including at least 1 letter and 1 number.
						</p>
					) : null}
					{/* {isSignedup ? (
						<label htmlFor="check">
							<input type="checkbox" name="check" id="check" />
							<p>
								Never miss a thing. Sign up here for our
								newsletter and occasional product updates.
							</p>
						</label>
					) : null} */}
					{!loading ? (
						!success ? (
							<Button
								type="submit"
								buttonType="primary"
								innerText={isSignedup ? "Log in" : "Sign up"}
							></Button>
						) : (
							<Loading type="success"></Loading>
						)
					) : (
						<Loading type="process"></Loading>
					)}

					{!isSignedup ? (
						<p className="sub-text">
							By clicking “Sign up”, you agree to our{" "}
							<a href="#" className="link">
								terms of service
							</a>
							,{" "}
							<a href="#" className="link">
								privacy policy
							</a>{" "}
							and{" "}
							<a href="#" className="link">
								cookie policy
							</a>
						</p>
					) : null}
				</form>
				<div className="sub-text handle-switch-item">
					{!isSignedup
						? "Already have an account?"
						: "Dont have an account?"}
					<Button
						type="Button"
						className="handle-switch-btn"
						buttonType="tertiary"
						onClick={handleSwitch}
						innerText={!isSignedup ? "Log in" : "Sign up"}
					></Button>
				</div>
			</div>
		</section>
	);
};

export default Auth;
