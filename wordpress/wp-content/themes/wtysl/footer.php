  </main>

  <div class="Wrapper">
    <footer class="Footer">
      <span class="Footer-text Footer-text--before"><?php echo get_option('footer-text-1'); ?></span>

      <img src="<?php bloginfo('template_url'); ?>/public/assets/images/logotype-minimal.svg" alt='"What Took You So Long?" minimal logotype' class="Footer-logotype">

      <span class="Footer-text Footer-text--after"><?php echo get_option('footer-text-2'); ?></span>
    </footer>
  </div>

  <?php if (defined('ENV_GOOGLE_ANALYTICS_ID')): ?>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', '<?php echo ENV_GOOGLE_ANALYTICS_ID; ?>', 'auto');
      ga('send', 'pageview');
    </script>
  <?php endif; ?>

  <script src="<?php bloginfo('template_url'); ?>/public/assets/javascripts/application<?php echo minified_extension(); ?>.js?v=<?php echo get_asset_version(); ?>"></script>
  </body>
</html>
