const routePath = 'Modules/Forum/controllers/';

const ForumRoutes = {

    createForum: {
        handler: `${routePath}/forum.createForum`,
        events: [
            {
                http: {
                    method: 'post',
                    path: 'forum',
                    cors: true
                }
            }
        ]
    },

    getAllForums: {
        handler: `${routePath}/forum.getAllForums`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'forums',
                    cors: true
                }
            }
        ]
    },


    createThread: {
        handler: `${routePath}/thread.createThread`,
        events: [
            {
                http: {
                    method: 'post',
                    path: 'forum/thread',
                    cors: true
                }
            }
        ]
    },


    getForumThreads: {
        handler: `${routePath}/thread.getForumThreads`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'forum/threads/{forum_id}',
                    cors: true
                }
            }
        ]
    },

}

export default ForumRoutes
