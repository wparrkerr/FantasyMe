/*
Example Token JSON: 
{ 
  token_type: "access", 
  exp: 1585096199, 
  jti: "a4bcb4b540a84477a45949ceece63ffe", 
  user_id: 1
}
*/

export function isValid(token){
  if (token === "") return false;
  let token_json = JSON.parse(atob(token.split(".")[1]));
  let d = new Date(token_json.exp*1000);
  let curr = new Date();
  return (curr < d);
}

export function token_to_json(token){
  if (token === ""){
    console.log("potential error: called token_to_json() on null token!")
    return JSON.parse("");
  }
  return JSON.parse(atob(token.split(".")[1]));
}