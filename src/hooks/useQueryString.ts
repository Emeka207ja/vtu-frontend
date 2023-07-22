import React, { useState, useEffect } from "react";

const useQuerryString = (route?:string) => {
 const [referral, setQuery] = useState("");
 useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const queryValue = queryParams.get(route?route:"referral")!;
		setQuery(queryValue);
 }, []);

 return [referral]
}

export default useQuerryString