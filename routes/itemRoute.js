const Item = require('../model/item'); // Import Blog Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

  /* ===============================================================
     CREATE NEW BLOG
  =============================================================== */
  router.post('/newitem', (req, res) => {
    // Check if blog title was provided
    if (!req.body.title) {
      res.json({ success: false, message: 'Item title is required.' }); // Return error message
    } else {
      // Check if blog body was provided
      if (!req.body.body) {
        res.json({ success: false, message: 'Item Desc is required.' }); // Return error message
      } 
       else {
          // Create the blog object for insertion into database
          const newitem  = new Item({
            title: req.body.title, // Title field
            body: req.body.body
          });
          // Save blog into database
          newitem.save((err) => {
            // Check if error
            if (err) {
              // Check if error is a validation error
              if (err.errors) {
                // Check if validation error is in the title field
                if (err.errors.title) {
                  res.json({ success: false, message: err.errors.title.message }); // Return error message
                } else {
                  // Check if validation error is in the body field
                  if (err.errors.body) {
                    res.json({ success: false, message: err.errors.body.message }); // Return error message
                  } else {
                    res.json({ success: false, message: err }); // Return general error message
                  }
                }
              } else {
                res.json({ success: false, message: err }); // Return general error message
              }
            } else {
              res.json({ success: true, message: 'Item saved!' }); // Return success message
            }
          });
        }
      
    }
  });

router.get('/allBlogs', (req, res) => {
    // Search database for all blog posts
    Item.find({}, (err, blogs) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if blogs were found in database
        if (!blogs) {
          res.json({ success: false, message: 'No Item found.' }); // Return error of no blogs found
        } else {
          res.json({ success: true, blogs: blogs }); // Return success and blogs array
        }
      }
    }); // Sort blogs from newest to oldest
  });

  router.get('/singleitem/:id', (req, res) => {
    Item.findOne({_id: req.params.id}, function (err, docs) {
         res.json(docs);
    });
    console.log("get");
  });

  router.put('/update/:id', function(req, res){
    
    Item.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json({data:data,success:true,message:'Updated'});
    });
});
  router.delete('/delete/:id', function(req, res){
      Item.remove({_id:req.params.id}, function(err, docs){
         res.json({data:docs,success:true,message:'Deleted'});
    });
})


   return router;
};