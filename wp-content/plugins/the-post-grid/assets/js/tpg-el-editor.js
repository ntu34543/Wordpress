;(function ($) {

    // $(window).on('load', function(){
    $(document).ready(function () {

        elementor.hooks.addAction('panel/open_editor/widget', function (panel, model, view) {


            $('body').on('click', '.the-post-grid-field-hide', function(){
                $(this).toggleClass('is-pro');
                $(this).find('label', 'input').on('click', function(){
                    console.log($(this));
                })
                // return false;
            });


        })

    })


})(jQuery);