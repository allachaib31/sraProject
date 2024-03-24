if(window.location.pathname == "/authentification/signup.html" || window.location.pathname == "/authentification/signin.html"){
    if(window.localStorage.getItem("token")){
        window.location.href = "/index.html";
    }
}
if(window.location.pathname == "/" || window.location.pathname == "/index.html"){
    if(!window.localStorage.getItem("token")){
        window.location.href = "/authentification/signin.html";
    }
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

const sendSearch = document.getElementById("sendSearch");
try {
    sendSearch.addEventListener("click",()=>{
        const search = document.getElementById("Search").value;
        axios.get("/search/?search="+search)
        .then((res)=>{
            console.log(res)
            const videos = document.getElementById("videos");
            videos.innerHTML = "";
            for(let i = 0;i < res.data.length;i++){
                videos.innerHTML = `
                <a class="col" href="/videos/video.html?vidId=${res.data[i]._id}" style="text-decoration:none;">
                <div style="cursor: pointer;" class="card bg-dark">
                  <video
                    src="/${res.data[i].video}"
                    class="card-img-top"
                    alt="..."
                    style="width: 398px;height: 223px;"
                  ></video>
                  <div class="card-body">
                    <div class="d-flex align-items-center gap-3">
                      <img
                        src="${res.data[i].idChanel.profile.slice(6)}"
                        class="rounded-circle"
                        width="50"
                        height="50"
                        alt=""
                      />
                      <div>
                        <h5 style="color: #aaa; font-weight: bold">${res.data[i].title}</h5>
                        <h6 style="color: #aaa">${res.data[i].idChanel.Name}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </a>`
            }
        }).catch((err)=>{

        })
    })
} catch (error) {
    
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
            if(res.data == "Channel created successfully"){
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
    const sendSubscribe = document.getElementById("sendSubscribe");
    sendSubscribe.addEventListener("click",()=>{
        //alert(sendSubscribe.getAttribute('data-Id'))
        if(sendSubscribe.getAttribute('data-status') == "Subscribe"){
            axios.post("/abonne/",{
                token: window.localStorage.getItem("token"),
                idChannel: sendSubscribe.getAttribute('data-Id')
            }).then((res)=>{
                if(res.data.msg == true){
                    sendSubscribe.innerText = "Unsubscribe";
                    sendSubscribe.setAttribute('data-status','UnSubscribe')
                }
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            axios.post("/abonne/desabonne",{
                token: window.localStorage.getItem("token"),
                idChannel: sendSubscribe.getAttribute('data-Id')
            }).then((res)=>{
                if(res.data.msg == 'Unsubscribed'){
                    sendSubscribe.innerText = "subscribe";
                    sendSubscribe.setAttribute('data-status','Subscribe')
                }
                console.log(res)
            }).catch((err)=>{

            });
        }
    })
    axios.post('/channel/getchannel',{
        token: window.localStorage.getItem("token")
    }).then((res)=>{
        console.log(res)
        if(res.data.msg == "Channel is found"){
            sendSubscribe.setAttribute("data-Id",res.data.channel._id);
            if(res.data.channel.idUser.subscribes.indexOf(res.data.channel._id) > -1){
                sendSubscribe.innerText = "Unsubscribe";
                sendSubscribe.setAttribute("data-status","Unsubscribe")
            }

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
            const subscribeNumber = document.getElementById("subscribeNumber");
            //document.getElementById("getVideo").src = '/' + res.data.videos[0].video
            changeImageCover.src = res.data.channel.photoDeCouverture.slice(6);
            changeImageProfile.src = res.data.channel.profile.slice(6);
            userChannel.innerText = res.data.channel.Name;
            videoNumber.innerText = res.data.videos.length
            nameChannel.innerText = res.data.channel.Name;
            description.innerText = res.data.channel.Description;
            subscribeNumber.innerHTML = res.data.channel.idUser.subscribes.length + " subscribers"
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
                        src="${changeImageProfile.src}"
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

        axios.post("/upload/uploadVideo/",form).then((res)=>{
            console.log(res)
            if(res.data == 'Video saved'){
                alert("video saved");
                window.location.reload();
            }
        })
    })
} catch (error) {
    
}

if(window.location.pathname == "/videos/video.html"){
    const sendSubscribe = document.getElementById("sendSubscribe");
    sendSubscribe.addEventListener("click",()=>{
        //alert(sendSubscribe.getAttribute('data-Id'))
        if(sendSubscribe.getAttribute('data-status') == "Subscribe"){
            axios.post("/abonne/",{
                token: window.localStorage.getItem("token"),
                idChannel: sendSubscribe.getAttribute('data-Id')
            }).then((res)=>{
                if(res.data.msg == true){
                    sendSubscribe.innerText = "Unsubscribe";
                    sendSubscribe.setAttribute('data-status','UnSubscribe')
                }
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            axios.post("/abonne/desabonne",{
                token: window.localStorage.getItem("token"),
                idChannel: sendSubscribe.getAttribute('data-Id')
            }).then((res)=>{
                if(res.data.msg == 'Unsubscribed'){
                    sendSubscribe.innerText = "subscribe";
                    sendSubscribe.setAttribute('data-status','Subscribe')
                }
                console.log(res)
            }).catch((err)=>{

            });
        }
    })
    const urlParams = new URLSearchParams(window.location.search);
    const vidid = urlParams.get('vidId');
    axios.post("/random/",{
        token: window.localStorage.getItem("token"),
        vidid : vidid
    }).then((res)=>{
       console.log(res);
        const displayVideo = document.getElementById("displayVideo");
        const titleVideo = document.getElementById("titleVideo");
        const subscribers = document.getElementById("subscribers");
        const imageProfile = document.getElementById("imageProfile");
        const titleChannel = document.getElementById("titleChannel");
        const DescriptionVideo = document.getElementById("DescriptionVideo");
        const commentaireImage = document.getElementById("commentaireImage");
        const videos = document.getElementById("videos");
        displayVideo.src = "/" + res.data.video.video;
        imageProfile.src =  res.data.video.idChanel.profile.slice(6)
        commentaireImage.src = res.data.video.idChanel.profile.slice(6);
        titleVideo.innerText = res.data.video.title;
        titleChannel.innerHTML = res.data.video.idChanel.Name;
        DescriptionVideo.innerHTML = res.data.video.Descreption
        subscribers.innerHTML = res.data.video.idChanel.idUser.subscribes.length + " subscribers";
        const originalDate = new Date("2023-11-28T13:29:01.040Z");
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = originalDate.toLocaleDateString('en-US', options);
        const viewsDate = document.getElementById("viewsDate");
        viewsDate.innerHTML = res.data.video.vues + " views " + formattedDate;
        sendSubscribe.setAttribute('data-Id',res.data.video.idChanel._id)
        for(let i = 0;i < res.data.random.length;i++){
            videos.innerHTML += `
            <a class="col" href="/videos/video.html?vidId=${res.data.random[i]._id}" style="text-decoration:none;">
            <div style="cursor: pointer;width:400px;" class="card bg-dark">
              <video
                src="/${res.data.random[i].video}"
                class="card-img-top"
                alt="..."
                style="width: 398px;height: 223px;"
              ></video>
              <div class="card-body">
                <div class="d-flex align-items-center gap-3">
                  <img
                    src="${res.data.random[i].idChanel.profile.slice(6)}"
                    class="rounded-circle"
                    width="50"
                    height="50"
                    alt=""
                  />
                  <div>
                    <h5 style="color: #aaa; font-weight: bold">${res.data.random[i].title}</h5>
                    <h6 style="color: #aaa">${res.data.random[i].idChanel.Name}</h6>
                  </div>
                </div>
              </div>
            </div>
          </a>
            `
        }
        const displayComment = document.getElementById("displayComment");
        for(let x in res.data.video.comment){
            displayComment.innerHTML += `
            <div class="text-white">
            <h4>${res.data.video.comment[x].oauth.username}</h4>
            <p>${res.data.video.comment[x].text}</p>
            </div>
            `
            console.log(res.data.video.comment[x]);
        }
        
    }).catch(()=>{
        window.location.href = "/"
    })
    const sendComment = document.getElementById("sendComment");
    sendComment.addEventListener("click",()=>{
        const comment = document.getElementById("comment");
        axios.post("/comment/",{
            token: window.localStorage.getItem("token"),
            comment: comment.value,
            vidid : vidid
        }).then((result)=>{
            console.log(result)
            if(!result.data.status){
                return alert("try again");
            }
            const displayComment = document.getElementById("displayComment");
            displayComment.innerHTML += `
            <div class="text-white">
            <h4>${document.getElementById("titleChannel").innerText}</h4>
            <p>${comment.value}</p>
            </div>
            `
        }).catch(()=>{
            alert("try again")
        })
    })
}

if(window.location.pathname == "/" || window.location.pathname == "/index.html"){
    axios.get("/showVideos/").then((res)=>{
        const videos = document.getElementById("videos");
        console.log(res)
        for(let i = 0;i < res.data.length;i++){
            videos.innerHTML += `
            <a class="col" href="/videos/video.html?vidId=${res.data[i]._id}" style="text-decoration:none;">
            <div style="cursor: pointer;width:400px;" class="card bg-dark">
              <video
                src="/${res.data[i].video}"
                class="card-img-top"
                alt="..."
                style="width: 398px;height: 223px;"
              ></video>
              <div class="card-body">
                <div class="d-flex align-items-center gap-3">
                  <img
                    src="${res.data[i].idChanel.profile.slice(6)}"
                    class="rounded-circle"
                    width="50"
                    height="50"
                    alt=""
                  />
                  <div>
                    <h5 style="color: #aaa; font-weight: bold">${res.data[i].title}</h5>
                    <h6 style="color: #aaa">${res.data[i].idChanel.Name}</h6>
                  </div>
                </div>
              </div>
            </div>
          </a>
            `
        }
    }).catch((err)=>{
        console.log(err)
    })
}