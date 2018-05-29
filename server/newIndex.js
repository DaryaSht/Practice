const postsPath = './server/data/posts.json';
const idPath = './server/data/ID.json';
const fs = require('fs');

let photoPosts = [];

const serverModule = {
        getPhotoPosts: function (skip = 0, top = 10, filterConfig) {
            let result;

            photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json'), function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });

            // if (typeof skip !== 'number' || typeof top !== 'number') {
            //     console.log("typeError in getPhotoPosts");
            //     return;
            // }
            if (filterConfig === undefined || arguments.length < 3 || filterConfig === {}) {
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
                            //return elem.hashtags.includes(tag);
                        });
                    });
                }
                return photoFilterResult.slice(skip, skip + top);
            }
            return photoPosts.sort((elem1, elem2) => elem2.createdAt - elem1.createdAt);
        },

        getPhotoPost(id) {
            photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json'), function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
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

        addPhotoPost(photoPost) {
            photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json'), function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });

            if (this.validatePhotoPost(photoPost) && photoPosts.findIndex(elem => elem.id === photoPost.id) === -1) {
                photoPosts.push(photoPost);
                photoPosts.sort((elem1, elem2) => elem2.createdAt - elem1.createdAt);
                fs.writeFileSync('./server/data/posts.json', JSON.stringify(photoPosts));
                fs.writeFileSync(`./server/data/ID.json`, `{"id":"${(parseInt(photoPost.id) + 1)}"}`);
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
            photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json'), function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            if (this.validatePost(photoPost)) {
                let index = photoPosts.findIndex(elem => elem.id == id);
                if(index !== -1){
                if (photoPost.description) photoPosts[index].description = photoPost.description;
                if (photoPost.photoLink) photoPosts[index].photoLink = photoPost.photoLink;
                if (photoPost.hashtags) photoPosts[index].hashtags = photoPost.hashtags;
                fs.writeFileSync('./server/data/posts.json', JSON.stringify(photoPosts));
                return true;
                }
            }
            else return false;
        },
               
        removePhotoPost(id) {
            photoPosts = JSON.parse(fs.readFileSync(postsPath), (key, value) => {
                if (key === 'createdAt') return new Date(value);
                return value;
            });

            let index = photoPosts.findIndex(elem => elem.id == id);
            if (index !== -1) {
                photoPosts.splice(index, 1);
                fs.writeFileSync('./server/data/posts.json', JSON.stringify(photoPosts));
                return true;
            } else return false;
        }
};
module.exports = serverModule;
