<?php
/**
 * Action Hooks class.
 *
 * @package RT_TPG
 */

namespace RT\ThePostGrid\Controllers\Hooks;

// Do not allow directly accessing this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'This script cannot be accessed directly.' );
}

/**
 * Action Hooks class.
 */
class ActionHooks {
	/**
	 * Class init.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'pre_get_posts', [ __CLASS__, 'category_query' ], 10 );
	}

	/**
	 * Category query
	 *
	 * @param object $query Query.
	 * @return void
	 */
	public static function category_query( $query ) {
		if ( ! is_admin() && is_category() && $query->is_main_query() ) {
			$settings = get_option( rtTPG()->options['settings'] );
			$sc_id    = isset( $settings['template_category'] ) ? absint( $settings['template_category'] ) : 0;

			if ( $sc_id ) {
				$posts_per_page     = $sc_id ? absint( get_post_meta( $sc_id, 'posts_per_page', true ) ) : 0;
				$pagination         = $sc_id ? get_post_meta( $sc_id, 'pagination', true ) : false;
				$posts_loading_type = $sc_id ? get_post_meta( $sc_id, 'posts_loading_type', true ) : '';

				if ( $pagination && 'pagination' === $posts_loading_type && $posts_per_page ) {
					$query->set( 'posts_per_page', $posts_per_page );
				}
			}
		}
	}
}
