export default {
  fonts: {
    list_all: '/admin/api/editor/fonts/list',
    list_active: '/admin/api/editor/fonts/active',
    delete: '/admin/api/editor/fonts/delete/{fonts_id}',
    activate: '/admin/api/editor/fonts/activate/{fonts_id}',
    update: '/admin/api/editor/fonts/update-group/{group}',
    reset: '/admin/api/editor/fonts/reset',
  },
  data: {
    list: '/admin/api/editor/page/{page_id}',
    update: '/admin/api/editor/blocks/update/{data_block_id}',
    add: '/admin/api/editor/blocks/add/{page_id}',
    delete: '/admin/api/editor/blocks/delete/{id_data_block}',
    duplicate: '/admin/api/editor/blocks/copy/{id_data_block}',
    sortable: '/admin/api/editor/pages/block-position/{page_id}',
  },
  publish: {
    save: '/admin/api/editor/publish',
  },
  pages: {
    list: '/admin/api/editor/pages',
    add: '/admin/api/editor/pages/add',
    delete: '/admin/api/editor/pages/delete/{pageId}',
    update: '/admin/api/editor/pages/update/{pageId}',
    add_blog: '/admin/api/editor/blog/add',
    delete_blog: '/admin/api/editor/blog/delete/{pageId}',
  },
  blocks: {
    list: '/admin/api/editor/blocks/{page_id}',
  },
  styles: {
    list: '/admin/api/editor/styles',
    list_components: '/admin/api/editor/components',
    activate: '/admin/api/editor/styles/activate/{style_id}',
  },
  components: {
    list: '/admin/api/editor/components',
    update_data_block: '/admin/api/editor/component/update-block/{id_data_block}/{component_name}',
    default_data_block: '/admin/api/editor/styles/component/default-block/{id_data_block}/{component_name}',
    update_data: '/admin/api/editor/component/update/{code}',
    default_all: '/admin/api/editor/styles/component/default/all',
    default_component: '/admin/api/editor/styles/component/default-all/{code}',
  },
  languages: {
    list: '/admin/api/editor/languages',
    all_languages: '/admin/api/editor/languages/list',
    translations: '/admin/api/editor/messages/{language_code}',
    update: '/admin/api/editor/languages/update/{code}',
    reset: '/admin/api/editor/languages/reset',
    make_default: '/admin/api/editor/languages/make-default',
    add: '/admin/api/editor/languages/add',
    active: '/admin/api/editor/languages/active/{code}',
    sortable: '/admin/api/editor/languages/position',
    delete: '/admin/api/editor/languages/delete',
  },
  colors: {
    list: '/admin/api/editor/colors',
    add: '/admin/api/editor/add-color',
    delete: '/admin/api/editor/delete-color/{color_id}',
    update: '/admin/api/editor/update-color/{color_id}',
  },
  files_manager: {
    list: '/admin/api/editor/images/list',
    add: '/admin/api/editor/images/upload',
    delete: '/admin/api/editor/images/delete/{file_id}',
  },
  config: {
    list: '/admin/api/editor/configuration',
  },
  auth: {
    check: '/admin/api/general/check-auth',
  },
};
