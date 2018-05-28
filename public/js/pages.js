window.getHTML = {
    setHeaderFooter() {
        let body = document.getElementsByClassName('Body')[0];
        body.innerHTML = `
        <link rel="stylesheet" type="text/css" href="css/styles.css" />

        <header>
        <div class="logo">
            <a class="logo" href="index.html"><img class="logoImg" src="Icons/HomeIcon.png" title="MainPage"></a>
            <a class="logoName">Inspiregram</a>

        </div>
        <div class="buttons">
            <a class="buttons" onclick="getHTML.setAddPost()"><img class="addPost" src="Icons/AddPost.png" title="Add new post"/><a> 
            <a class="buttons" onclick="getHTML.setAuthorizationForm()"><img class="sign" src="Icons/LogOutIcon.png" title="Sign"/></a>
            <a class="buttons" onclick="getHTML.setUserPage()"><img class="userIcon" src="Icons/UserIcon.png" title="UserPage"/></a>
            <a class="userName" onclick="getHTML.setErrorPage()">DaryaS</a>
        </div>

        </header>

        <div class="Main">
        </div>

        <footer>
        <div class="left">
            <p>Inspiregram ©</p>
            <p>Last chnges applied: <span class=footerText1>11.03.2018</span></p>
        </div>
        <div class="right">
            <p>Darya Shatrova | 2 year, 5 group</p>
            <p><a href="mailto:darya.shatrov@gmail.com">darya.shatrov@gmail.com</a></p>
        </div>
        </footer>`;
    },

    setMain() {
        let main = document.getElementsByClassName("Main")[0];
        main.innerHTML = `
        <link rel="stylesheet" type="text/css" href="css/styles.css" />

        <div class="searchBlock">
        <input type="submit" class="searchBy" value="Search by: ">
        <input type=search class="searchBy" placeholder="Author...">

        <form><input type="date" name="calendar" class="searchBy"></form>

        <input type=search class="searchBy" placeholder="#Tags...">
        <input type="submit" class="searchBy" value="GO!">
       </div>

       <div class="postsBand">

       </div>

       <div class="showMore">
          <input type="submit" class="showMore" value="Show more">
       </div>`;
    },
    setAddPost() {
        let main = document.getElementsByClassName("Main")[0];
        main.innerHTML = `
        <link rel="stylesheet" type="text/css" href="css/AddPost.css" />
                <div class="formName">ADD NEW POST</div>
                <div class="addField"><input type="file" /></div>
                <div><input type="text" class="inputDesc" name="" value="" placeholder="Description..." id="login" /></div>
                <div class="band">(Click to add a photo)</div>`;
    },
    setAuthorizationForm() {
        let main = document.getElementsByClassName("Main")[0];
        main.innerHTML = `
        <link rel="stylesheet" type="text/css" href="css/LogIn.css" />

        
        <div class="block" method="post" action="#">
            <div class="formName">AUTHORIZATION FORM</div>

            <div class="field">
                <pre><div class="input"><label>Login:   <input type="text" name="" value="" id="login" /></div></label></pre>
            </div>
            <div class="field">
                <div class="input"><label>Password:<input type="password" name="" value="" id="login" /></div></label>
                </div>

                <a href="#">
                    <div class="band">~~~ Enter ~~~</div>
                </a>
            </div>
       `;
    },

    setErrorPage(){
        let main = document.getElementsByClassName("Main")[0];
        main.innerHTML = `
        <link rel="stylesheet" type="text/css" href="css/ErrorPage.css"/>
        <a href="index.html"><img class="errorImg" src="Icons/ErrorPage.png"></a>     `
    },

    setUserPage() {
        let main = document.getElementsByClassName("Main")[0];
        main.innerHTML = `
        <link rel="stylesheet" type="text/css" href="css/UserPage.css"/>
        <div class="userInfo">
        <img class="bigUserPhoto" src="Icons/UserIcon.png"/>  
        <div class="bigUserName">DaryaS
            <div class="status">Hello! How are you?))</div>
        </div>
    </div>

    <div class="searchBlock">
        <input type="submit" class="searchBy" value="Search by: ">        
        <form><input type="date" name="calendar" class="searchBy"></form>
        
        <input type=search class="searchBy" placeholder="#Tags...">
        <input type="submit" class="searchBy" value="GO!">
    </div> 

    <div class="postHolder">
    <img class="photo" src="Images/tree.jpg"/>             

    <div class="authorName"><a><img class="like" src="Icons/Like.png" title="LIKE"/></a>
        <a>DaryaS</a>
            <div class="date"> | 01.03.2018
                    <div class="buttons">
                            <a><img class="delete" src="Icons/Delete.png" title="Delete post"/></a>
                            <a><img class="edit" src="Icons/Edit.png" title="Edit post"/></a> 
                    </div>                                                                           
            </div>            
    </div>     
    <div class="description">Hey, that's so beautifull!!</div>
    <div class="tags">
        <div class="tag">#autumn</div>
        <div class="tag">#yellow</div>
        <div class="tag">#trees</div>
    </div> 
</div>
    
    
    <div class="showMore">
    <input type="submit" class="showMore" value="Show more">
</div> 
`;
    }
}

getHTML.setHeaderFooter();
getHTML.setMain();



