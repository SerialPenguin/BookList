
//helper function that authorizes the user by getting Token from sessionStorage.
export const buildFetchOptions = (body = {}, method = "GET") => {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("Token")
      }
    };
  
    // Add to body if that option is avalible.
    if (body && Object.keys(body).length > 0) {
      options.body = JSON.stringify(body);
    }
  
    return options;
  };