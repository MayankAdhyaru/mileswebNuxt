<script setup>
useHead({
  title: 'cPanel Hosting - Manage Websites Easily | MilesWeb',
  meta: [
    { name: 'description', content: 'Deploy and manage Node.js apps with cPanel hosting.' }
  ]
})
</script>

<template>
  <section class="p-10 bg-gray-50">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-4xl font-bold mb-2">cPanel Hosting</h1>
      <p class="text-gray-600 mb-10">
        Full control with cPanel. Manage websites, databases, and emails effortlessly.
      </p>

      <!-- Image Banner -->

      <!-- Features Grid -->
      <div class="grid md:grid-cols-2 gap-6 mb-10">
        <div class="bg-white p-6 rounded-xl shadow">
          <h3 class="font-semibold text-lg mb-2">Full Root Access</h3>
          <p>Advanced users can manage every server configuration directly.</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow">
          <h3 class="font-semibold text-lg mb-2">Email Accounts Included</h3>
          <p>Host your business emails easily through cPanel mail tools.</p>
        </div>
      </div>

      <!-- FAQ Section -->
      <h2 class="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <ul class="space-y-3">
        <li>
          <strong>Can I host WordPress on cPanel?</strong><br />
          Yes, you can install it with a single click using Softaculous.
        </li>
        <li>
          <strong>Does it include backups?</strong><br />
          Yes, daily backups are included in all plans.
        </li>
      </ul>
    </div>
  </section>
</template>
