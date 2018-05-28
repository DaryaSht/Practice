let postToEdit = {
    description: 'very beautifull!!!!!!!',
    photoLink: 'Images/autumn.jpg',
    hashtags: ['#beautiful', '#trees', '#autumn', '#happy'],
};
var options = {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

window.domFunc = (function () {
    let user = 'DaryaS';
    let photoPosts = document.getElementsByClassName("postsBand")[0];
    let userName = document.querySelector('.userName');

    return {
        changeUser: function (currentUser) {
            if (currentUser !== null) {
                user = currentUser;
                let nameFull = document.getElementsByClassName('userName')[0];
                nameFull.style.display = 'flex';
                nameFull.innerHTML = user;

            } else if (currentUser === null) {
                user = currentUser;
                document.getElementsByClassName('sign')[0].style.display = 'flex';
                document.getElementsByClassName('addPost')[0].style.display = 'none';
                document.getElementsByClassName('userIcon')[0].style.display = 'none';
                document.getElementsByClassName('userName')[0].style.display = 'none';
                user = null;
            }
        },

        showHeader: function(header){
            var classes = document.getElementsByClassName("header");
            let head = document.createElement('div');

           head.innerHTML =
            '<div class="logo">' + header.logoImg +
            '<a class="logo"><img class="logoImg" src="Icons/HomeIcon.png" title="MainPage"></a>' + 
            '<a class="logoName">Inspiregram</a>' +       
            '</div>' + 
            '<div class="buttons">' + 
            '<a class="buttons"><img class="addPost" src="Icons/AddPost.png" title="Add new post"/><a>' + 
            '<a class="buttons"><img class="sign" src="Icons/LogOutIcon.png" title="Sign"/></a>' +       
            '<a class="buttons"><img class="userIcon" src="Icons/UserIcon.png" title="UserPage"/></a>' +  
            '<a class="userName">DaryaS</a>' +  
            '</div>'  

        },

        createPost: function (post) {

            var classes = document.getElementsByClassName("postHolder");
            let newPost = document.createElement('div');
            let myclass = classes[0];
            var tags;
            newPost.id = post.id;

            newPost.innerHTML =
                '<div class="postHolder"><img class="photo" src="' + post.photoLink + '" alt="photo">' +

                '<div class="authorName">' + '<a><img class="like" src="Icons/Like.png" title="LIKE"/></a>' +
                post.author + '| <div class="date">' +
                post.createdAt.toLocaleString("en", options) + '</div>' +
                '</div>' +
                '<div class="description">' + post.description + '</div>' +
                '<div class="tags"><div class="tag">' + post.hashtags + '</div></div></div>';

            if (user === post.author)
                newPost.innerHTML =
                    '<div class="postHolder"><img class="photo" src="' + post.photoLink + '" alt="photo">' +
                    '<div class="authorName">' + '<a><img class="like" src="Icons/Like.png" title="LIKE"/></a>' +
                    post.author + '| <div class="date">' +
                    post.createdAt.toLocaleString("en", options) + '</div>' +
                    '<a><img class="delete" src="Icons/Delete.png" title="Delete post"/></a>' +
                    '<a><img class="edit" src="Icons/Edit.png" title="Edit post"/></a>' +
                    '</div>' +
                    '<div class="description">' + post.description + '</div>' +
                    '<div class="tags"><div class="tag">' + post.hashtags + '</div></div></div>';

            return newPost;
        },

        getPosts: function (skip = 0, top = 6, filterConfig) {
            let posts = functionsBlock.getPhotoPosts(skip, top, filterConfig);
            posts.forEach((elem) => {
                photoPosts.appendChild(this.createPost(elem));
            });

        },
        addPost: function (post) {
            if (functionsBlock.addPhotoPost(post)) {
                photoPosts.innerHTML = '';
                this.getPosts();
                return true;
            }
            return false;
        },
        removePost: function (id) {
            if (functionsBlock.removePhotoPost(id)) {
                photoPosts.removeChild(document.getElementById(id));
                let count = document.getElementsByClassName('photo').length;
                this.getPosts(count, 1);
                return true;
            }
            return false;
        },
        editPost: function (id, post) {
            if (functionsBlock.editPhotoPost(id, post)) {
                photoPosts.replaceChild(this.createPost(functionsBlock.getPhotoPost(id)), document.getElementById(id));
                return true;
            }
            return false;
        }
    }
})();

function showAllPosts(skip = 0, top = 10, filterConfig) {
    let content = document.getElementsByClassName('postsBand')[0];
    content.innerHTML = '';
    domFunc.getPosts(skip, top, filterConfig);
}
function addNewPost(post) {
    if (domFunc.addPost(post)) return true;
    else return false;
}
function removePhotoPost(id) {
    if (domFunc.removePost(id)) return true;
    return false;
}
function editPhotoPost(id, post) {
    if (domFunc.editPost(id, post)) return true;
    return false;
}

showAllPosts();
console.log('addNewPost(photoPost1)');
console.log('removePhotoPost(3)');
console.log('editPhotoPost(7, postToEdit)');
console.log('domFunc.changeUser(null);');





