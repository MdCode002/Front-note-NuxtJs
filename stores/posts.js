import { useFetch } from '#app'
import { defineStore } from 'pinia'
export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: [],
  }),
  actions: {
    async fetchPosts() {
      try {
        const { data, error } = await useFetch('/api/posts')
        if (error.value) throw new Error(error.value)
        
        this.posts = data.value
      } catch (error) {
        console.error('Fetch posts error:', error)
        throw error
      }
    },
    async createPost(post) {
      try {
        const { data, error } = await useFetch('/api/posts', {
          method: 'POST',
          body: post
        })
        if (error.value) throw new Error(error.value)

        this.posts.push(data.value)
      } catch (error) {
        console.error('Create post error:', error)
        throw error
      }
    },
    async updatePost(post) {
      try {
        const { data, error } = await useFetch(`/api/posts/${post.id}`, {
          method: 'PUT',
          body: post
        })
        if (error.value) throw new Error(error.value)

        const index = this.posts.findIndex(p => p.id === post.id)
        if (index !== -1) {
          this.posts[index] = data.value
        }
      } catch (error) {
        console.error('Update post error:', error)
        throw error
      }
    },
    async deletePost(postId) {
      try {
        const { error } = await useFetch(`/api/posts/${postId}`, {
          method: 'DELETE'
        })
        if (error.value) throw new Error(error.value)

        this.posts = this.posts.filter(p => p.id !== postId)
      } catch (error) {
        console.error('Delete post error:', error)
        throw error
      }
    },
  },
})
