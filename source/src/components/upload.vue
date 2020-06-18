<template>
<div class="hello">
  <input type="file" @change="onFileChanged">
  <button @click="onUpload">Upload!</button>
</div>
</template>

<script>
export default {
methods: {
  onFileChanged (event) {
    const file = event.target.files[0];
    console.log(file);
  }
  },
  onUpload() {
    // upload file
  }
}
</script>