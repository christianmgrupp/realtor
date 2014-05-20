<?php

function niko_link($variables) {
  if (strpos(substr($variables['path'],0,6),':') === FALSE && strpos(substr($variables['path'],0,6),'www.') === FALSE) {
	unset($variables['options']['external']);
  }
  return '<a href="' . check_plain(url($variables['path'], $variables['options'])) . '"' . drupal_attributes($variables['options']['attributes']) . '>' . ($variables['options']['html'] ? $variables['text'] : check_plain($variables['text'])) . '</a>';
}

?>