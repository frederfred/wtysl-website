<?php

class Main_Nav_Walker_Nav_Menu extends Walker_Nav_Menu {
  public function start_lvl(&$output, $depth = 0, $args = array()) {
    $component_base = "MainNav-";
    $subMenuClass = $depth === 0 ? "subMenu" : "subSubMenu";

    $output .= '<ul class="' . $component_base . $subMenuClass . '">';
  }

  public function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
    $component_base = "MainNav-";
    $is_current = $item->current_item_ancestor || $item->current_item_parent || $item->current;

    if ($depth === 0) {
      $component_li_descendent_class = "item";
      $component_a_descendent_class = "link";
    } else if ($depth === 1) {
      $component_li_descendent_class = "subMenuItem";
      $component_a_descendent_class = "subMenuLink";
    } else {
      $component_li_descendent_class = "subSubMenuItem";
      $component_a_descendent_class = "subSubMenuLink";
    }

    $li_classes = $component_base . $component_li_descendent_class;

    if ($is_current) {
      $li_classes .= " is-current";
    }

    $a_classes = $component_base . $component_a_descendent_class;

    if ($item->current) {
      $a_classes .= " is-current";
    }

    $a_href = !empty($item->url) ? $item->url : "";

    $output .= '<li class="' . $li_classes . '">';

    $item_output = '<a href="'. $a_href .'" class="' . $a_classes . '">';
    $item_output .= $args->link_before . apply_filters("the_title", $item->title, $item->ID) . $args->link_after;
    $item_output .= "</a>";

    if ($item->has_children) {
      $item_output .= '<button class="MainNav-expand ' . ($depth === 0 ? "MainNav-expand--main" : "MainNav-expand--sub") . ($is_current ? " is-expanded" : "") . ' js-expander">Visa undermeny</button>';
    }

    $output .= apply_filters("walker_nav_menu_start_el", $item_output, $item, $depth, $args);
  }

  function display_element($element, &$children_elements, $max_depth, $depth = 0, $args, &$output) {
    $element->has_children = isset($children_elements[$element->ID]) && !empty($children_elements[$element->ID]);

    return parent::display_element($element, $children_elements, $max_depth, $depth, $args, $output);
  }
}
