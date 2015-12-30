<div class="Grid Grid--6-3-2">
  <?php foreach ($data->data as $media): ?>
    <div class="Grid-item">
      <a href="<?php echo $media->link; ?>" class="FlexEmbed FlexEmbed--1by1 u-trailer-s" target="_blank">
        <img src="<?php echo $media->images->standard_resolution->url; ?>" class="FlexEmbed-item">
      </a>
    </div>
  <?php endforeach; ?>
</div>
