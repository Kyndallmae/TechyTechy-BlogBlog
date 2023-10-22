      const router = require('express').Router();
      const { User, Post, Comment } = require('../models');
      const withAuth = require('../utils/auth');

      router.get('/', async (req, res) => {
        try {
          // Get all posts
          const results = await Post.findAll({
            include: {
              model: User,
            },
          });

          // Makes the template readable
          const postsFlat = results.map((post) => post.get({ plain: true }));

          // Sends data and session to template
          if (req.session.user_name === undefined) {
            res.render('homepage', {
              post: postsFlat,
            });

          } else {
            // Renders the homepage
            res.render('homepage', {
              posts: postsFlat,
              user: req.session.user_name,
            });
          }
        } catch (err) {
          res.status(500).json(err);
        }
      });

      router.post('/', async (req, res) => {
        try {
          const post = await Post.create({
            body: req.body.body,
            title: req.body.title,
            user_id: req.session.user.id,
          });
          // Checks that users are logged in
          if (req.session.user === undefined) {
            res.redirect('/login');

          } else {
            // Renders homepage
            res.redirect('/');
          }

        } catch (error) {
          console.log(error);
        }
      });

      // Use withAuth middleware to prevent access to route
      router.get('/dashboard', withAuth, async (req, res) => {
        try {
          // Find the logged in user based on the session ID
          const result = await Post.findAll({
            where: {
              user_id: req.session.user_id,
            },
            include: [User],
          });

          const postsFlat = result.map((post) => post.get({ plain: true }));

          if (req.session.user_id === undefined) {
            res.redirect('/login');
          } else {
            // Renders dashboard
            res.render('dashboard', {
              posts: postsFlat,
              user: req.session.user_name,
              user_id: req.session.user_id,
            });
          }
        } catch (err) {}
      });

      router.get('/post/:id/comment', withAuth, async (req, res) => {
        try {
          // Gets the selected post
          const result = await Post.findOne({
            where: {
              id: req.params.id,
            },
            include: [
              { model: User },
              {
                model: Comment,
                include: {
                  model: User,
                },
              },
            ],
          });

          // Makes the data readable
          const postsFlat = result.get({ plain: true });
          // Checks if the users are logged in
          if (req.session.user_id === undefined) {
            res.redirect('/login');

          } else {
            res.render('addComment', {
              post: postsFlat,
              user: req.session.user,
            });
          }
        } catch (err) {
          console.log(err);

        }
      });

      router.get('/post', async (req, res) => {
        try {
          // Checks if the users are logged in
          if (req.session.user_id === undefined) {
            res.redirect('/login');
          } else {
            res.render('addPost', {
              user: req.session.user_name,
            });
          }

        } catch (err) {
          res.status(500).json(err);
        }
      });

      router.post('/post', async (req, res) => {
        try {
          // Creates the post with the body
          const post = await Post.create({
            body: req.body.postBody,
            date: req.body.postDate,
            title: req.body.postTitle,
            post_id: req.params.post_id,
            user_id: req.session.user_id,
          });

        } catch (err) {
          res.status(500).json(err);
        }
      });

      // Adds post request for adding comments
      router.post('/:post_id/comment', async (req, res) => {
        try {
          // Creates the comment
          const comment = await Comment.create({
            body: req.body.commentText,
            post_id: req.params.post_id,
            user_id: req.session.user_id,
          });

          // Checks if the users are logged in
          if (req.session.user_id === undefined) {
            res.redirect('/login');

          } else {
            // Renders the comment page
            res.redirect(`/post/${req.params.post_id}/comment`);
          }
        } catch (err) {}
      });

      // Adds get request for editing comments
      router.get('/post/edit/:id', async (req, res) => {
        try {
          // Gets the selected post
          const result = await Post.findOne({
            where: {
              id: req.params.id,
            },
            include: [
              { model: User },
              {
                model: Comment,
                include: {
                  model: User,
                },
              },
            ],
          });

          // Makes the template readable
          const postsFlat = result.get({ plain: true });

          // Checks if the users are logged in
          if (req.session.user_id === undefined) {
            res.redirect('/login');

          } else {
            // argument is handlebars file
            res.render('editPost', {
              post: postsFlat,
              user: req.session.user,
            });
          }
        } catch (err) {}
      });

      // Adds post request for editing posts
      router.put('/edit/:id', async (req, res) => {
        try {
          // Udates the posts with body and title
          const post = await Post.update(
            {
              body: req.body.postText,
              title: req.body.postTitle,
            },
            {
              where: {
                id: req.params.id,
              },
            },
          );

          // Checks if the users are logged in
          if (req.session.user_id === undefined) {
            res.redirect('/login');

          } else {
            // Renders the dashboard
            res.redirect('/dashboard');
          }
        } catch (err) { }
      });

      // Adds post request for deleting posts
      router.post('/delete/:id', async (req, res) => {
        try {
          // Deletes the posts with post_id
          const post = await Post.destroy({
            where: {
              post_id: req.params.id,
            },
            force: true,
            cascade: true,
          });

          // Checks if the users are logged in
          if (req.session.user_id === undefined) {
            res.redirect('/login');

          } else {

            // renders the dashboard
            res.redirect('/dashboard');
          }
        } catch (err) {
        }
      });

      // Adds get request for the register
      router.get('/register', (req, res) => {

        // Renders handlebars
        res.render('register', {
          user: req.session.user_name,
        });
      });

      // Adds a get request for the login
      router.get('/login', (req, res) => {
        // Renders the login handlebars
        res.render('login');
      });

      // Adds get request for the login
      router.get('/logout', (req, res) => {

        // Checks if users are logged in
        if (req.session.user_name) {
          // Destroys the current session
          req.session.destroy(() => {
            res.status(200).render('homepage');
          });

        } else {
          res.status(404).end();
        }
      });


      module.exports = router;
