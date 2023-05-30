export const buildFetchOptions = (body = {}, method = "GET") => {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("Token")
      }
    };
  
    // Lägg till body i options om det finns
    if (body && Object.keys(body).length > 0) {
      options.body = JSON.stringify(body);
    }
  
    return options;
  };


  
  
  
  
  
  