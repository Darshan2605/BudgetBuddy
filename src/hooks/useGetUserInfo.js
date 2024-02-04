export const useGetUserInfo = () => {
  const { name, profilePhoto, isAuth, email } = JSON.parse(
    localStorage.getItem("auth")
    /*
    JSON.parse() is a method in JavaScript that parses a JSON string and returns JavaScript object or value. It is the counterpart to JSON.stringify(), which converts a JavaScript object or value to a JSON string. The JSON.parse() method takes a single argument, which is the JSON string to parse */
  );
  return { name, profilePhoto, isAuth, email };
};
//this hook extract information from application storage of browser (where we had store logged in user's login information)
