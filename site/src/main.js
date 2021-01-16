// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

// Bootstrap
// import 'bootstrap/dist/css/bootstrap/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  head.link.push({
    rel: 'stylesheet',
    href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Lato&family=Open+Sans&display=swap'
  })
  // Add an external JavaScript before the closing </body> tag
  head.script.push({
    src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js',
    body: true
  })
  
  head.script.push({
    src: 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
    body: true
  })

  head.script.push({
    src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js',
    body: true
  })
}