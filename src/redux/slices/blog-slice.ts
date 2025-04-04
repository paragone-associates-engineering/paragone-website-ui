/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_BASE_URL } from '../../services/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface BlogPost {
  _id: string;
  id: string;
  title: string;
  content: string;
  images: string[];
  header: string;
  datePosted: string;
}

interface BlogState {
  posts: BlogPost[];
  postDetails: BlogPost | null;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: BlogState = {
  posts: [],
  postDetails: null,
  totalPages: 1,
  loading: false,
  error: null,
};

// Async thunk for fetching blog posts
export const fetchBlogPosts = createAsyncThunk(
  "blog/fetchPosts",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blog/get-posts?page=${page}`);
      return response.data;
    } catch (error:unknown) {
      return rejectWithValue("Failed to fetch blog posts");
    }
  }
);

// Async thunk for fetching a single blog post
export const fetchBlogPostDetails = createAsyncThunk(
  "blog/fetchPostDetails",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blog/get-post/${postId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch post details");
    }
  }
);

// Blog slice
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(fetchBlogPosts.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.posts = action.payload.results;
        state.totalPages = action.payload.metadata[0].totalPages;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBlogPostDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPostDetails.fulfilled, (state, action: PayloadAction<BlogPost>) => {
        state.loading = false;
        state.postDetails = action.payload;
      })
      .addCase(fetchBlogPostDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default blogSlice.reducer;