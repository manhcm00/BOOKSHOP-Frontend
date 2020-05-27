import React, { useState } from 'react';

export const AuthContext = React.createContext();

export default ({ children }) => {
	const [ user, setUser ] = useState(null);
	const [ token, setToken ] = useState("");
	const [isAuthentication, setIsAuthentication] = useState(false)

	return <AuthContext.Provider value={
		{ user, setUser, token, setToken, isAuthentication, setIsAuthentication }
	}>
		{children}
	</AuthContext.Provider>;
};
