<template>
  <v-footer height="50" app>
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-4 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon
        :icon="item.icon"
        :size="item.icon === '$vuetify' ? 24 : 16"
      />
    </a>

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px;"
    >
      &copy; 2024-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">class project by 許哲晟</span>
      
      
    </div>
  </v-footer>
</template>

<script setup>
  const items = [

    {
      title: 'My GitHub',
      icon: `mdi-github`,
      href: 'https://github.com/p587233200',
    },
    {
      title: 'My instagram',
      icon: `mdi-instagram`,
      href: 'https://www.instagram.com/cheng10_28/',
    },
  ]
</script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
