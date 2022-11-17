<?php
/**
 * Elementor Controller class.
 *
 * @package RT_TPG
 */

namespace RT\ThePostGrid\Controllers;

// Do not allow directly accessing this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'This script cannot be accessed directly.' );
}

if ( ! class_exists( 'ElementorController' ) ) :
	/**
	 * Elementor Controller class.
	 */
	class ElementorController {
		/**
		 * Category ID
		 *
		 * @var string
		 */
		public $el_cat_id;

		/**
		 * Version
		 *
		 * @var string
		 */
		private $version;

		/**
		 * Class constructor
		 */
		public function __construct() {
			$this->version   = defined( 'WP_DEBUG' ) && WP_DEBUG ? time() : RT_THE_POST_GRID_VERSION;
			$this->el_cat_id = RT_THE_POST_GRID_PLUGIN_SLUG . '-elements';

			if ( did_action( 'elementor/loaded' ) ) {
				add_action( 'elementor/widgets/register', [ $this, 'init_widgets' ] );
				add_action( 'elementor/elements/categories_registered', [ $this, 'widget_category' ] );
				add_action( 'elementor/editor/after_enqueue_scripts', [ $this, 'el_editor_script' ] );
				add_action( 'wp_footer', [ $this, 'tpg_el_scripts' ] );
				add_action( 'wp_enqueue_scripts', [ $this, 'tpg_el_style' ] );
				add_filter( 'elementor/editor/localize_settings', [ $this, 'promotePremiumWidgets' ] );
			}
		}

		/**
		 * Style
		 *
		 * @return void
		 */
		public function tpg_el_style() {
			// Custom CSS From Settings.
			$css = isset( $settings['custom_css'] ) ? stripslashes( $settings['custom_css'] ) : null;
			if ( $css ) {
				wp_add_inline_style( 'rt-tpg-elementor', $css );
			}
		}

		/**
		 * Scripts
		 *
		 * @return void
		 */
		public function tpg_el_scripts() {
			$ajaxurl = '';

			if ( in_array( 'sitepress-multilingual-cms/sitepress.php', get_option( 'active_plugins' ) ) ) {
				$ajaxurl .= admin_url( 'admin-ajax.php?lang=' . ICL_LANGUAGE_CODE );
			} else {
				$ajaxurl .= admin_url( 'admin-ajax.php' );
			}

			$variables = [
				'nonceID' => esc_attr( rtTPG()->nonceId() ),
				'nonce'   => esc_attr( wp_create_nonce( rtTPG()->nonceText() ) ),
				'ajaxurl' => esc_url( $ajaxurl ),
			];

			wp_localize_script( 'rt-tpg', 'rttpg', $variables );
		}

		/**
		 * Editor Scripts
		 *
		 * @return void
		 */
		public function el_editor_script() {
			wp_enqueue_script( 'tgp-el-editor-scripts', rtTPG()->get_assets_uri( 'js/tpg-el-editor.js' ), [ 'jquery' ], $this->version, true );
			wp_enqueue_style( 'tgp-el-editor-style', rtTPG()->get_assets_uri( 'css/admin/tpg-el-editor.css' ), [], $this->version );
		}

		/**
		 * Elementor widgets
		 *
		 * @param object $widgets_manager Manager.
		 * @return void
		 */
		public function init_widgets( $widgets_manager ) {
			require_once RT_THE_POST_GRID_PLUGIN_PATH . '/app/Widgets/elementor/base.php';
			require_once RT_THE_POST_GRID_PLUGIN_PATH . '/app/Widgets/elementor/rtTPGElementorHelper.php';

			// dir_name => class_name.
			$widgets = [
				'grid-layout'       => '\TPGGridLayout',
				'list-layout'       => '\TPGListLayout',
				'grid-hover-layout' => '\TPGGridHoverLayout',
				'slider-layout'     => '\TPGSliderLayout',
			];

			$widgets = apply_filters( 'tpg_el_widget_register', $widgets );

			foreach ( $widgets as $file_name => $class ) {
				if ( ! rtTPG()->hasPro() && 'slider-layout' === $file_name ) {
					continue;
				}

				$template_name = 'the-post-grid/elementor/' . $file_name . '.php';

				if ( file_exists( STYLESHEETPATH . $template_name ) ) {
					$file = STYLESHEETPATH . $template_name;
				} elseif ( file_exists( TEMPLATEPATH . $template_name ) ) {
					$file = TEMPLATEPATH . $template_name;
				} else {
					$file = RT_THE_POST_GRID_PLUGIN_PATH . '/app/Widgets/elementor/widgets/' . $file_name . '.php';
				}

				require_once $file;

				$widgets_manager->register( new $class() );
			}
		}

		/**
		 * Widget category
		 *
		 * @param object $elements_manager Manager.
		 * @return void
		 */
		public function widget_category( $elements_manager ) {
			$categories['tpg-elementor-builder-widgets'] = [
				'title' => esc_html__( 'TPG Template Builder Element', 'the-post-grid' ),
				'icon'  => 'fa fa-plug',
			];

			$categories[ RT_THE_POST_GRID_PLUGIN_SLUG . '-elements' ] = [
				'title' => esc_html__( 'The Post Grid', 'the-post-grid' ),
				'icon'  => 'fa fa-plug',
			];

			$get_all_categories = $elements_manager->get_categories();
			$categories         = array_merge( $categories, $get_all_categories );
			$set_categories     = function ( $categories ) {
				$this->categories = $categories;
			};

			$set_categories->call( $elements_manager, $categories );
		}

		/**
		 * Promotion
		 *
		 * @param array $config Config.
		 * @return array
		 */
		public function promotePremiumWidgets( $config ) {
			if ( rtTPG()->hasPro() ) {
				return $config;
			}

			if ( ! isset( $config['promotionWidgets'] ) || ! is_array( $config['promotionWidgets'] ) ) {
				$config['promotionWidgets'] = [];
			}

			$pro_widgets = [
				[
					'name'        => 'tpg-slider-layout',
					'title'       => esc_html__( 'TPG - Slider Layout', 'the-post-grid' ),
					'description' => esc_html__( 'TPG - Slider Layout', 'the-post-grid' ),
					'icon'        => 'eicon-post-slider tpg-grid-icon tss-promotional-element',
					'categories'  => '[ "the-post-grid-elements" ]',
				],
			];

			$config['promotionWidgets'] = array_merge( $config['promotionWidgets'], $pro_widgets );

			return $config;
		}
	}
endif;
