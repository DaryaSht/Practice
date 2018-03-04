(function () {
    function isString(s)g {
        return typeof s === "string" || s instanceof String;
    }

    class PhotoPost {
        /**
         * @param {String} description 
         * @param {Date} createdAt 
         * @param {String} author 
         * @param {String} photoLink 
         * @param {[String]} tags 
         */
        constructor(description, createdAt, author, photoLink, tags = []) {
            this.id = PhotoPost.nextId();
            this.description = description;
            this.createdAt = createdAt;
            this.author = author;
            this.photoLink = photoLink;
            this.tags = tags;
        
        }
        static nextId() {
            let id = 0;
            this.nextId = () => (id++).toString();
            return this.nextId();
        }

        /**
         * @param {PhotoPost} post 
         */
        static validate(post) {
            return (
                post instanceof PhotoPost && 
                isString(post.id) && 
                isString(post.description) && post.description.length < 200 &&
                (post.createdAt instanceof Date) && 
                isString(post.author) && post.author.length > 0 &&
                isString(post.photoLink) && post.photoLink.length > 0 &&
                post.tags instanceof Array);
        }
    }

    class PhotoPosts {
        constructor() {
            this.photoPosts = [];
            this.isSorted = true;
        }


        /**
         * @param {number} skip 
         * @param {number} top 
         * @param {{author? : String, fromDate? : Date, toDate? : Date, tags? : [String]}} filterConfig 
         * @returns {[PhotoPost]}
         */
        getPhotoPosts(skip = 0, top = 10, filterConfig) {
            if (!this.isSorted) {
                this.photoPosts.sort((p1, p2) => p1.createdAt > p2.createdAt);
                this.isSorted = true;
            }
            const result = [];
            for (let i = skip; i < Math.min(this.photoPosts.length, skip + top); i++) {
                let isGood = true;
                const post = this.photoPosts[i];
                if (filterConfig) {
                    if (filterConfig.author && post.author !== filterConfig.author)
                        isGood = false;
                    if (filterConfig.fromDate && post.createdAt < filterConfig.fromDate)
                        isGood = false;
                    if (filterConfig.toDate && post.createdAt > filterConfig.toDate)
                        isGood = false;
                    if (filterConfig.tags && !filterConfig.tags.every(tag => post.tags.indexOf(tag) !== -1))
                        isGood = false;
                }
                if (isGood)
                    result.push(Object.assign({}, this.photoPosts[i]));
            }
            return result;
        }

        /**
         * @param {PhotoPost} post 
         * @returns {Boolean} success / failure
         */
        addPhotoPost(post) {
            if (!PhotoPost.validate(post))
                return false;
            this.photoPosts.push(post);
            this.isSorted = false;
            return true;
        }

        getPhotoPostsCnt() {
            return this.photoPosts.length;
        }

        /**
         * @param {String} id 
         * @returns {PhotoPost | null} Returns post with such id or null if not found.
         */
        getPhotoPost(id) {
            return this.photoPosts.find(post => post.id === id) || null;
        }

        /**
         * @returns {Boolean} success / failure
         */
        editPhotoPost(id, {description, tags, photoLink}) {
            const ind = this.photoPosts.findIndex(post => post.id === id);
            if (ind == -1)
                return false;
            const editedPost = Object.assign({}, this.photoPosts[ind], {description, tags, photoLink});
            if (!PhotoPost.validate(editedPost))
                return false;
            this.photoPosts[ind] = editedPost;
            return true;        
        }

        /**
         * @param {String} id 
         * @returns {Boolean} success / failure
         */
        removePhotoPost(id) {
            const ind = this.photoPosts.findIndex(post => post.id === id);
            if (ind === -1)
                return false;
            this.photoPosts.splice(ind, 1);
            return true;
        }
    }

    global.PhotoPost = PhotoPost;
    global.PhotoPosts = PhotoPosts;
})();

(function test() {
    var post = new PhotoPost("description", new Date(), "Simon", "http:/", ["cool", "up"]);
    console.log("Post should be valid(return true):", PhotoPost.validate(post));
    post = new PhotoPost("description", null, 123, "", ["cool", "up"]);
    console.log("Post should be invalid(return false):", PhotoPost.validate(post));
})();