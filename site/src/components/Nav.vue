<template>
  <nav class="bg-white dark:bg-gray-700 text-gray-700 dark:text-white">
    <div class="container mx-auto px-6 py-3">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex justify-between items-center">
          <div class="text-xl font-semibold">
            <g-link
              class="text-gray-800 dark:text-white text-xl font-bold md:text-2xl hover:text-gray-700 dark:hover:text-gray-200"
              to="/"
              >Fullstack.chat</g-link
            >
          </div>

          <!-- Mobile menu button -->
          <div class="flex md:hidden">
            <button
              type="button"
              class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
              @click="isMenuOpen = !isMenuOpen"
            >
              <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <div
          class="md:flex md:items-center md:justify-end flex-1"
          :class="{ hidden: !isMenuOpen }"
        >
          <button
            class="rounded-lg p-2 focus:outline-none"
            @click="toggleTheme"
            aria-label="Toggle color mode"
          >
            <template v-if="theme">
              <svg
                class="w-6 h-6 text-white"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                ></path>
              </svg>
            </template>
            <template v-if="!theme">
              <svg
                class="w-6 h-6 text-yellow-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </template>
          </button>
          <div class="flex flex-col -mx-4 md:flex-row md:items-center md:mx-4 dark:text-white">
            <g-link
              to="/"
              class="mx-2 mt-2 md:mt-0 px-2 py-1 text-gray-700 dark:text-white font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-800"
              >Home</g-link
            >
            <g-link
              to="/profiles"
              class="mx-2 mt-2 md:mt-0 px-2 py-1 text-gray-700 dark:text-white font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-800"
              >Members</g-link
            >
            <a
              href="#"
              class="mx-2 mt-2 md:mt-0 px-2 py-1 text-gray-700 dark:text-white font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-800"
              >Docs</a
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      isMenuOpen: false,
      dark: JSON.parse(localStorage.getItem("theme")),
    };
  },
  computed: {
    theme: function() {
      return this.dark;
    },
  },
  methods: {
    toggleTheme() {
      if (this.dark) {
        this.dark = false;
        localStorage.setItem("theme", "false"),
          document.body.classList.remove("dark");
      } else {
        this.dark = true;
        document.body.classList.add("dark");
        localStorage.setItem("theme", "true");
      }
    },
  },
  created() {
    let cookie = localStorage.getItem("theme");

    if (cookie === "true") {
      this.dark == true;
      document.body.classList.add("dark");
    } else {
      this.dark == false;
      document.body.classList.remove("dark");
    }
  },
};
</script>
