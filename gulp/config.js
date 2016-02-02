var publicAssets = "./wordpress/wp-content/themes/wtysl/public/assets";
var sourceFiles = "./wordpress/wp-content/themes/wtysl/assets";
var exclude = [
  ".DS_Store",
  "wordpress/license.txt",
  "wordpress/readme.html",
  "wordpress/wp-activate.php",
  "wordpress/wp-admin",
  "wordpress/wp-blog-header.php",
  "wordpress/wp-comments-post.php",
  "wordpress/wp-config-sample.php",
  "wordpress/wp-cron.php",
  "wordpress/wp-includes",
  "wordpress/wp-links-opml.php",
  "wordpress/wp-load.php",
  "wordpress/wp-login.php",
  "wordpress/wp-mail.php",
  "wordpress/wp-settings.php",
  "wordpress/wp-signup.php",
  "wordpress/wp-trackback.php",
  "wordpress/xmlrpc.php",
  "wordpress/wp-content/index.php",
  "wordpress/wp-content/uploads",
  "wordpress/wp-content/cache",
  "wordpress/wp-content/w3tc-config",
  "wordpress/wp-content/themes/index.php",
  "wordpress/wp-content/themes/wtysl/assets"
];

module.exports = {
  publicAssets: publicAssets,
  sass: {
    src: sourceFiles + "/stylesheets/**/*.{sass,scss}",
    dest: publicAssets + "/stylesheets",
    settings: {
      imagePath: "/assets/images" // Used by the image-url helper
    }
  },
  images: {
    src: sourceFiles + "/images/**",
    dest: publicAssets + "/images"
  },
  browserify: {
    bundleConfigs: [{
      entries: sourceFiles + "/javascripts/application.js",
      dest: publicAssets + "/javascripts",
      outputName: "application.js",
      extensions: [".js"]
    }]
  },
  deploy: {
    rsync: {
      ssh: true,
      src: [
        "./index.php",
        "./auth.php",
        "./favicon.ico",
        "./wordpress"
      ],
      recursive: true,
      excludeFirst: exclude
    }
  }
};
