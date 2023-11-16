if(window.localStorage.getItem("token")){
    window.location.href = "/index.html";
}

class Authentication {
    #username;
    #email;
    #password;
    getUsername(){
        return this.#username;
    }
    getEmail(){
        return this.#email;
    }
    getPassword(){
        return this.#password;
    }
    setUsername(username){
        this.#username = username;
    }
    setEmail(email){
        this.#email = email;
    }
    setPassword(password){
        this.#password = password;
    }
    sendRequest(){

    }
}

class SignIn extends Authentication{
    constructor(email,password){
        super();
        this.setEmail(email);
        this.setPassword(password);
    }
    sendRequest(){
        axios.post("/authentication/logIn",{
            email: this.getEmail(),
            password: this.getPassword()
        }).then((result)=>{
            console.log(result)
            if(result.data.msg == "logIn failed"){
                return alert("try another email or password");
            }
            window.localStorage.setItem("token",result.data.token)
            window.location.href = "/index.html"
        }).catch((error)=>{
            alert("Sign in failed try another email or password")
            console.log(error)
        })
    }

}

class SignUp extends Authentication{
    constructor(username,email,password){
        super();
        this.setUsername(username);
        this.setEmail(email);
        this.setPassword(password);
    }
    sendRequest(){
        axios.post("/authentication/signUp",{
            username: this.getUsername(),
            email: this.getEmail(),
            password: this.getPassword()
        }).then((result)=>{
            alert(result.data)
            window.location.href = "/authentification/signin.html"
        }).catch((error)=>{
            alert("Sign up failed try another email or password")
            console.log(error)
        })
    }

}

const SignInSubmit = document.getElementById("SignIn");
const SignUpSubmit = document.getElementById("SignUp");
try{
    SignInSubmit.addEventListener("click",(event)=>{
        event.preventDefault();
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const user = new SignIn(email,password);
        user.sendRequest()
    })
}catch(err){
}


try{
    SignUpSubmit.addEventListener("click", (event)=>{
        event.preventDefault();
    
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const user = new SignUp(username,email,password);
        user.sendRequest();
    });
}catch(err){

}

const profile = document.getElementById("profile");
const logout = document.getElementById("logout");

try{
    profile.addEventListener("click", ()=>{
        const dropDown = document.getElementById("dropDown");
        if(dropDown.style.display == "none") return dropDown.style.display = "block";
        dropDown.style.display = "none"
    })
    logout.addEventListener("click",()=>{
        window.localStorage.clear();
        window.location.href = "/authentification/signin.html"
    })
}catch(err){

}