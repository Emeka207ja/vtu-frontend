import React, { useState, useEffect } from "react";

const useQuerryString = () => {
 const [referral, setQuery] = useState("");
 useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const queryValue = queryParams.get("referral")!;
		setQuery(queryValue);
 }, []);

 return [referral]
}

export default useQuerryString