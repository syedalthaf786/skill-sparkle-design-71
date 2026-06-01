import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  tags: string[];
  published: boolean;
}

export default function BlogDetails() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!id) {
        setError("Post ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Try to load from Supabase first
        const { error: checkError } = await supabase
          .from("blog_posts")
          .select("id")
          .limit(1);

        if (checkError && !checkError.message.includes("could not find the table")) {
          console.warn("Could not load blog post from Supabase:", checkError);
          // Fallback to localStorage
          const saved = localStorage.getItem("blogPosts");
          if (saved) {
            const posts: BlogPost[] = JSON.parse(saved);
            const foundPost = posts.find((p) => p.id === id);
            if (foundPost) {
              setPost(foundPost);
            } else {
              setError("Post not found");
            }
          } else {
            setError("No posts available");
          }
          setLoading(false);
          return;
        }

        if (!checkError) {
          const { data, error } = await supabase
            .from("blog_posts")
            .select("*")
            .eq("id", id)
            .single();

          if (error) throw error;
          if (data) {
            setPost(data);
          } else {
            setError("Post not found");
          }
        }
      } catch (err: any) {
        console.warn("Could not load blog post:", err);
        // Fallback to localStorage
        try {
          const saved = localStorage.getItem("blogPosts");
          if (saved) {
            const posts: BlogPost[] = JSON.parse(saved);
            const foundPost = posts.find((p) => p.id === id);
            if (foundPost) {
              setPost(foundPost);
            } else {
              setError("Post not found");
            }
          } else {
            setError("No posts available");
          }
        } catch (parseError) {
          setError("Error loading post data");
        }
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full border-4 border-primary border-t-transparent h-8 w-8"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold">Post Not Found</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          <div className="mt-6 flex justify-center">
            <a href="/blog" className="btn-primary">
              Back to Blog
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">No post selected</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="border-b border-border bg-surface py-12">
        <div className="container-x">
          <div className="flex items-center gap-2 text-sm text-primary hover:underline mb-4">
            <a href="/blog" className="flex items-center gap-1">
              <ArrowLeft size={16} /> Back to Blog
            </a>
          </div>
          <h1 className="text-4xl font-bold md:text-5xl mb-2">{post.title}</h1>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <User size={14} />
              {post.author}
            </span>
          </div>
        </div>
      </section>

      <section className="container-x py-12">
        {post.image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br>") }} />
          
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="text-sm font-medium text-muted-foreground">Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}