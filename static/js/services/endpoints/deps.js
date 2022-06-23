export default {
  blog: {
    posts_list: '/admin/api/editor/posts/list',
    per_page: '/admin/api/editor/blog/posts-per-page',
    update_title: '/admin/api/editor/blog/update-title/{post_id}',
    update_preview: '/admin/api/editor/blog/update-preview/{post_id}',
    update_content: '/admin/api/editor/blog/update-content/{post_id}',
    get_posts: '/admin/api/editor/blog/posts?page={page}',
  },
  menu: {
    add_menu: '/admin/api/editor/menu/create',
    update_menu: '/admin/api/editor/menu/update/{id}',
    delete: '/admin/api/editor/menu/delete/{id}',
    sortable: '/admin/api/editor/menu/position',
  },
};
