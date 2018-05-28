var photoPosts = [
    {
        id: '1',
        description: 'he breaks through obstacles',
        createdAt: new Date('2018-02-24T23:00:00'),
        author: 'UserA',
        photoLink: 'Images/tree2.jpg',
        likes: ['UserN', 'DaryaS', 'UserT'],
        hashtags: ['#trees']
    },
    {
        id: '2',
        description: 'Golden foliage',
        createdAt: new Date('2018-02-24T23:00:00'),
        author: 'DaryaS',
        photoLink: 'Images/autumn.jpg',
        likes: ['UserN', 'UserK'],
        hashtags: ['#beautiful', '#autumn', '#yellow']
    },
    {
        id: '3',
        description: 'The magic castle of Neuschwanstein!!',
        createdAt: new Date('2018-02-24T23:00:00'),
        author: 'MaryN',
        photoLink: 'Images/castle.jpg',
        likes: ['UserP', 'UserT', 'UserA'],
        hashtags: ['#castle', '#trees']
    },
    {
        id: '4',
        description: 'the sea is so calm...',
        createdAt: new Date('2018-02-24T23:00:00'),
        author: 'UserA',
        photoLink: 'Images/sea.jpg',
        likes: ['UserM', 'UserN'],
        hashtags: ['#sea', '#blue']
    },
    {
        id: '6',
        description: 'Wonderfull!',
        createdAt: new Date('2018-02-24T23:00:00'),
        author: 'DaryaS',
        photoLink: 'Images/tree.jpg',
        likes: ['UserC', 'UserK', 'UserB'],
        hashtags: ['#trees', '#beautiful']
    },
    {
        id: '7',
        description: 'Sea',
        createdAt: new Date('2018-02-23T23:00:00'),
        author: 'MargoL',
        photoLink: 'Images/sea.jpg',
        likes: ['UserN', 'DaryaS'],
        hashtags: ['#trees']
    },

];

let photoPost1 = {
    id: '21',
    description: 'we had a very nice time here',
    createdAt: new Date('2018-03-02T21:00:00'),
    author: 'MargoL',
    photoLink: 'Images/autumn.jpg',
    likes: ['UserA', 'UserK'],
    hashtags: ['#nature']
}
let photoPost2 = {
    id: '12',
    description: 'we had a very nice time here',
    createdAt: new Date('2018-03-02T21:00:00'),
    author: 'UserB',
    photoLink: 'Images/tree',
    likes: ['UserP'],
    hashtags: ['#sea']
}
let photoPost3 = {
    id: '23',
    description: 'we had a very nice time here',
    createdAt: new Date('2018-03-03T21:00:00'),
    photoLink: 'Images/tree',
    likes: ['UserP'],
    hashtags: ['#castle']
}

let functionsBlock = (function () {
    return {
        getPhotoPosts: function (skip = 0, top = 10, filterConfig) {
            if (typeof skip !== 'number' || typeof top !== 'number') {
                console.log("typeError in getPhotoPosts");
                return;
            }
            if (filterConfig === undefined) {
                return photoPosts.slice(skip, skip + top);
            } else {
                if (typeof filterConfig !== 'object') {
                    console.log('typeError in getPhotoPosts');
                    return;
                }
                let photoFilterResult = photoPosts;
                if (filterConfig.author) {
                    photoFilterResult = photoFilterResult.filter(elem => elem.author === filterConfig.author);
                }
                if (filterConfig.createdAt) {
                    photoFilterResult = photoFilterResult.filter(elem =>
                        elem.createdAt.getFullYear() === filterConfig.createdAt.getFullYear() &&
                        elem.createdAt.getMonth() === filterConfig.createdAt.getMonth() &&
                        elem.createdAt.getDate() === filterConfig.createdAt.getDate());
                }
                if (filterConfig.hashtags) {
                    photoFilterResult = photoFilterResult.filter(elem => {
                        return filterConfig.hashtags.every((tag) => {
                            return elem.hashtags.includes(tag);
                        });
                    });
                }
                return photoFilterResult.slice(skip, skip + top);
            }
            return photoPosts;
        },

        getPhotoPost: function (id) {
            return photoPosts.find(elem => elem.id == id);
        },

        validatePhotoPost: function (photoPost) {
            if (typeof photoPost.description !== 'string' || photoPost.description.length > 200 || photoPost.description.length === 0) return false;
            if (typeof photoPost.author !== 'string' || photoPost.author.length === 0) return false;
            if (typeof photoPost.id !== 'string' || photoPost.id.length === 0) return false;
            if (!(photoPost.hashtags instanceof Array)) return false;
            if (!(photoPost.likes instanceof Array)) return false;
            if (!(photoPost.createdAt instanceof Date)) return false;
            if (typeof photoPost.photoLink !== 'string' || photoPost.photoLink.length === 0) return false;
            return true;
        },

        addPhotoPost: function (photoPost) {
            if (this.validatePhotoPost(photoPost) && photoPosts.findIndex(elem => elem.id === photoPost.id) === -1) {
                photoPosts.push(photoPost);
                photoPosts.sort((elem1, elem2) => elem2.createdAt - elem1.createdAt);
                return true;
            }
            else {
                console.log("Can't add this post");
                return false;
            }
        },

        validatePost: function (post) {
            if (post.description)
                if (post.description.length === 0 || post.description.length > 200 || typeof post.description !== 'string') return false;
            if (post.author)
                if (typeof post.author !== 'string' || post.author.length === 0) return false;
            if (post.hashtags)
                if (!(post.hashtags instanceof Array)) return false;
            if (post.photoLink)
                if (typeof post.photoLink !== 'string' || post.photoLink.length === 0) return false;
            if (post.likes)
                if (!(post.likes instanceof Array)) return false;
            if (post.createdAt)
                if (!(post.createdAt instanceof Date)) return false;
            if (post.id)
                if (typeof post.id !== 'string' || post.id.length === 0) return false;
            return true;
        },

        editPhotoPost: function (id, photoPost) {
            if (this.validatePost(photoPost)) {
                let index = photoPosts.findIndex(elem => elem.id == id);
                if (photoPost.description) photoPosts[index].description = photoPost.description;
                if (photoPost.photoLink) photoPosts[index].photoLink = photoPost.photoLink;
                if (photoPost.hashtags) photoPosts[index].hashtags = photoPost.hashtags;
                return true;
            }
            else return false;
        },

        removePhotoPost: function (id) {
            let index = photoPosts.findIndex(elem => elem.id == id);
            if (index !== -1) {
                photoPosts.splice(index, 1);
                return true;
            } else return false;
        }
    }
})();

// getPhotoPosts
// console.log('Get all posts:');
// console.log(functionsBlock.getPhotoPosts(0, 10));

// console.log("Filter by author: {author: 'UserB'}");
// console.log(functionsBlock.getPhotoPosts(0, 10, { author: 'UserB' }));

// console.log("Filter by author and hashtags: {author: 'UserA',hashtags: ['#trees', '#castle']}");
// console.log(functionsBlock.getPhotoPosts(0, 10, { author: 'UserA', hashtags: ['#trees', '#castle'] }));

// console.log("Filter by all fields: {author: 'UserA',createdAt: new Date('2018-02-24'),hashtags: ['#trees', '#castle']}");
// console.log(functionsBlock.getPhotoPosts(0, 10, { author: 'UserA', createdAt: new Date('2018-02-24'), hashtags: ['#trees', '#castle'] }));

// console.log("Filter with wrong type of filter: '2018-02-24'");
// console.log(functionsBlock.getPhotoPosts(0, 10, '2018-02-24'));

// console.log("getPhotoPosts: skip = 6");
// console.log(functionsBlock.getPhotoPosts(6));


// //getPhotoPost
// console.log("getPhotoPost(7)");
// console.log(functionsBlock.getPhotoPost(7));


// //validatePhotoPost
// console.log("isValid: {id: '4', descriprion: 'the sea is so calm...',createdAt: new Date('2018-02-24'),author: 'UserA',photoLink: 'https://avatars', likes: ['UserM', 'UserN'],hashtags: ['#sea', '#blue']}");
// console.log(functionsBlock.validatePhotoPost({ id: '4', descriprion: 'the sea is so calm...', createdAt: new Date('2018-02-24'), author: 'UserA', photoLink: 'https://avatars', likes: ['UserM', 'UserN'], hashtags: ['#sea', '#blue'] }));

// console.log("isValid: {id: '4', descriprion: 'the sea is so calm...',createdAt: '2018-02-24',author: 'UserA',photoLink: 'https://avatars', likes: ['Bobby'],hashtags: ['#победа']}");
// console.log(functionsBlock.validatePhotoPost({ id: '4', descriprion: 'the sea is so calm...', createdAt: '2018-02-24', author: 'UserA', photoLink: 'https://avatars', likes: ['UserM', 'UserN'], hashtags: ['#sea', '#blue'] }));

// console.log("isValid: ...hastags:'hi'");
// console.log(functionsBlock.validatePhotoPost({ id: '4', descriprion: 'the sea is so calm...', createdAt: new Date('2018-02-24'), author: 'UserA', photoLink: 'https://avatars', likes: ['UserM', 'UserN'], hashtags: 'hi' }));


// //addPhotoPost
// console.log("Add valid photoPost: photoPost1")
// console.log(functionsBlock.addPhotoPost(photoPost1));

// console.log("add not valid photoPost: photoPost2 -- id already exists");
// console.log(functionsBlock.addPhotoPost(photoPost2));

// console.log("add not valid photoPost: photoPost3 -- not all fields");
// console.log(functionsBlock.addPhotoPost(photoPost3));

// console.log("Posts after adding:");
// console.log(functionsBlock.getPhotoPosts(0, 23));

// //editPhotoPost
// console.log("edit valid: 10, {descriprion: 'descriotion was changed',hashtags: ['changedTag1', 'changedTag2']}");
// console.log(functionsBlock.editPhotoPost(10, { descriprion: 'descriotion was changed', hashtags: ['changedTag1', 'changedTag2'] }));

// console.log("edit not valid: editPhoto1 -- description>200");
// console.log(functionsBlock.editPhotoPost(3, editPhoto1));

// console.log("edit not valid: {photoLink: 23}");
// console.log(functionsBlock.editPhotoPost(5, { photoLink: 23 }));

// console.log("edit valid: 2, {createdAt: new Date('2018-02-28T21:00:00'),author: 'UserChanged'}");
// console.log(functionsBlock.editPhotoPost(2, { createdAt: new Date('2018-02-28T21:00:00'), author: 'UserChanged' }));

// console.log("Posts after changing:");
// console.log(functionsBlock.getPhotoPosts(0, 23));

// //remove posts
// console.log("remove by id = 5");
// console.log(functionsBlock.removePhotoPost(5));

// console.log("remove by id = 2");
// console.log(functionsBlock.removePhotoPost(2));

// console.log("remove by id = 7 -- does not exist");
// console.log(functionsBlock.removePhotoPost(7));

// console.log("Posts after removing:");
// console.log(functionsBlock.getPhotoPosts(0, 10));