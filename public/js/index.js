/*if(window.localStorage.getItem("token")){
    window.location.href = "/index.html";
}
*/
//alert(window.location.pathname == "/index.html")
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


const submitChannel = document.getElementById("submitChannel");

try{
    submitChannel.addEventListener("click",()=>{
        const title = document.getElementById("titleChannel").value;
        const description = document.getElementById("descriptionChannel").value;
        const imageCover = document.getElementById("uploadCoverImage");
        const imageProfile = document.getElementById("uploadimageProfile");
        console.log(imageCover.files)
        const form = new FormData();
        form.append("Name",title);
        form.append("Description",description);
        form.append("token",window.localStorage.getItem("token"));
        form.append("imageProfile",imageProfile.files[0]);
        form.append("imageCover",imageCover.files[0]);
        axios.post("/channel/creatchannel",form).then((res)=>{
            console.log(res.data)
            if(res.data == "channel created seccessfully"){
                alert("your channel is created");
                window.location.reload();
            }else{
                alert("try again Error")
            }
        }).catch(()=>{
            
        })
        //alert(title + description)
    })
}catch(err){

}

if(window.location.pathname == "/channel/channel.html"){
    axios.post('/channel/getchannel',{
        token: window.localStorage.getItem("token")
    }).then((res)=>{
        console.log(res)
        if(res.data.msg == "channel is found"){
            const createChannelBtn = document.getElementById("createChannel");
            const imgCover = document.getElementById("imgCover");
            const channelInfo = document.getElementById("channelInfo");
            imgCover.classList.remove("d-none");
            channelInfo.classList.remove("d-none");
            createChannelBtn.remove();

            const changeImageCover = document.getElementById("changeImageCover");
            const changeImageProfile = document.getElementById("changeImageProfile");
            const userChannel = document.getElementById("userChannel");
            const nameChannel = document.getElementById("nameChannel");
            const videoNumber = document.getElementById("videoNumber");
            const description = document.getElementById("description");
            const videos = document.getElementById("videos");
            //document.getElementById("getVideo").src = '/' + res.data.videos[0].video
            changeImageCover.src = '/' + res.data.channel.photoDeCouvertute;
            changeImageProfile.src = '/' + res.data.channel.profile;
            userChannel.innerText = res.data.channel.Name;
            videoNumber.innerText = res.data.videos.length
            nameChannel.innerText = res.data.channel.Name;
            description.innerText = res.data.channel.Descreption;
            for(let i = 0;i < res.data.videos.length;i++){
                videos.innerHTML += `
                <a class="col" href="/videos/video.html?vidId=${res.data.videos[i]._id}" style="text-decoration:none;">
                <div style="cursor: pointer;" class="card bg-dark">
                  <video
                    src="/${res.data.videos[i].video}"
                    class="card-img-top"
                    alt="..."
                    style="width: 398px;height: 223px;"
                  ></video>
                  <div class="card-body">
                    <div class="d-flex align-items-center gap-3">
                      <img
                        src="/${res.data.channel.profile}"
                        class="rounded-circle"
                        width="50"
                        height="50"
                        alt=""
                      />
                      <div>
                        <h5 style="color: #aaa; font-weight: bold">${res.data.videos[i].title}</h5>
                        <h6 style="color: #aaa">${res.data.channel.Name}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
                `
            }
        }else{
            alert(false)
        }
    }).catch((err)=>{
        console.log(err)
    })
}

const submitVideo = document.getElementById("submitVideo");

try {
    submitVideo.addEventListener("click",()=>{
        const title = document.getElementById("titleVideo").value;
        const description = document.getElementById("descriptionVideo").value;
        const video = document.getElementById("uploadVideoFile");

        const form = new FormData();
        console.log(video)

        form.append("title",title);
        form.append("Descreption",description);
        form.append("token",window.localStorage.getItem("token"));
        form.append("video",video.files[0])

        axios.post("/upload/uploadVideo/",form)
    })
} catch (error) {
    
}