
const Show = () => {
    const showPasswordHandler = (setShow: any) => {
        const password: any = document.querySelector("#password");
    
        if (password.type === "password") {
          password.type = "text";
          setShow('Password');
        } else {
          password.type = "password";
          setShow('Show');
        }
    
        console.log('asdasd')
      };

      return {showPasswordHandler}
}

export {Show};
