export interface BlogPost {
    id: string
    title: string
    date: string
    content?: string
    image: string
    author?: string
    category?: string;
    excerpt?: string
   
  }
  
  export interface RelatedPost {
    id: string
    title: string
    date: string
    image: string
  }
  